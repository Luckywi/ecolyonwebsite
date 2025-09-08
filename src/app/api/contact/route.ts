// src/app/api/contact/route.ts
import { createClient } from 'redis';
import { NextRequest, NextResponse } from 'next/server';

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
    // TODO: Ajouter authentification admin ici
    redis = await getRedisClient();
    
    const { searchParams } = new URL(request.url);
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