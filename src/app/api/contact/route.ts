// src/app/api/contact/route.ts
import { createClient } from 'redis';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ContactFormData {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}

// Connexion Redis
const getRedisClient = async () => {
  const redis = createClient({
    url: process.env.REDIS_URL || process.env.KV_URL || 'redis://localhost:6379'
  });
  
  if (!redis.isOpen) {
    await redis.connect();
  }
  
  return redis;
};

// Fonction d'envoi d'email
const sendNotificationEmail = async (messageData: any) => {
  if (!process.env.NOTIFY_NEW_MESSAGES || process.env.NOTIFY_NEW_MESSAGES === 'false') {
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY manquante, pas de notification email');
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'EcoLyon <noreply@ecolyon.fr>',
      to: [process.env.ADMIN_EMAIL || 'contact@ecolyon.fr'],
      subject: `🌱 Nouveau message EcoLyon - ${messageData.sujet}`,
      html: `
        <h2>📧 Nouveau message de contact reçu</h2>
        <p><strong>De:</strong> ${messageData.nom} (${messageData.email})</p>
        <p><strong>Sujet:</strong> ${messageData.sujet}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f5f5f5; padding: 15px; border-left: 4px solid #46952C;">
          ${messageData.message.replace(/\n/g, '<br>')}
        </blockquote>
        <hr>
        <small>
          <strong>ID:</strong> ${messageData.id}<br>
          <strong>Reçu le:</strong> ${new Date(messageData.timestamp).toLocaleString('fr-FR')}<br>
          <a href="https://ecolyon.fr/api/contact?token=${process.env.ADMIN_API_TOKEN}">Voir tous les messages</a>
        </small>
      `
    });
    
    console.log('✅ Email de notification envoyé');
  } catch (error) {
    console.error('❌ Erreur envoi email:', error);
  }
};

export async function POST(request: NextRequest) {
  let redis;
  
  try {
    const data: ContactFormData = await request.json();
    redis = await getRedisClient();
    
    // Validation des données
    if (!data.nom || !data.email || !data.sujet || !data.message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Format email invalide' },
        { status: 400 }
      );
    }

    // Créer l'objet message avec timestamp
    const messageData = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      nom: data.nom.trim(),
      email: data.email.trim().toLowerCase(),
      sujet: data.sujet,
      message: data.message.trim(),
      timestamp: new Date().toISOString(),
      status: 'nouveau',
    };

    // Sauvegarder dans Redis
    await redis.hSet(`contact:${messageData.id}`, messageData);
    
    // Ajouter à la liste des messages (pour faciliter la récupération)
    await redis.lPush('contact:messages', messageData.id);
    
    // Optionnel: garder seulement les 1000 derniers messages
    await redis.lTrim('contact:messages', 0, 999);

    // Pour le développement - log en console
    console.log('📧 Nouveau message de contact reçu:', {
      id: messageData.id,
      nom: messageData.nom,
      email: messageData.email,
      sujet: messageData.sujet,
      timestamp: messageData.timestamp
    });

    // Envoyer notification email
    await sendNotificationEmail(messageData);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message envoyé avec succès',
        id: messageData.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Erreur lors du traitement du message de contact:', error);
    
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  } finally {
    // Fermer la connexion Redis
    if (redis) {
      await redis.quit();
    }
  }
}

// Route GET pour récupérer les messages (admin uniquement)
export async function GET(request: NextRequest) {
  let redis;
  
  try {
    // Vérification du token d'authentification
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (!token || token !== process.env.ADMIN_API_TOKEN) {
      return NextResponse.json(
        { error: 'Accès non autorisé' },
        { status: 401 }
      );
    }
    
    redis = await getRedisClient();
    
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Récupérer la liste des IDs de messages
    const messageIds = await redis.lRange('contact:messages', offset, offset + limit - 1);
    
    // Récupérer les détails de chaque message
    const messages = await Promise.all(
      messageIds.map(async (id: string) => {
        const message = await redis.hGetAll(`contact:${id}`);
        return message;
      })
    );

    return NextResponse.json({
      messages,
      total: messages.length,
      limit,
      offset
    });

  } catch (error) {
    console.error('❌ Erreur lors de la récupération des messages:', error);
    
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  } finally {
    // Fermer la connexion Redis
    if (redis) {
      await redis.quit();
    }
  }
}