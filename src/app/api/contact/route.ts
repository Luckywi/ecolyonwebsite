// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
// import { kv } from '@vercel/kv';

interface ContactFormData {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();
    
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

    // TODO: Décommenter quand les variables d'environnement Vercel KV seront configurées
    
    // Sauvegarder dans Vercel KV
    // await kv.hset(`contact:${messageData.id}`, messageData);
    
    // Ajouter à la liste des messages (pour faciliter la récupération)
    // await kv.lpush('contact:messages', messageData.id);
    
    // Optionnel: garder seulement les 1000 derniers messages
    // await kv.ltrim('contact:messages', 0, 999);

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
  }
}

// Route GET pour récupérer les messages (admin uniquement)
export async function GET(request: NextRequest) {
  try {
    // TODO: Ajouter authentification admin ici
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // TODO: Décommenter quand les variables d'environnement Vercel KV seront configurées
    
    // Récupérer la liste des IDs de messages
    // const messageIds = await kv.lrange('contact:messages', offset, offset + limit - 1);
    
    // Récupérer les détails de chaque message
    // const messages = await Promise.all(
    //   messageIds.map(id => kv.hgetall(`contact:${id}`))
    // );

    // Pour le développement
    const messages = [
      {
        id: 'dev_message_1',
        nom: 'Message de développement',
        email: 'dev@example.com',
        sujet: 'test',
        message: 'Ceci est un message de test pour le développement',
        timestamp: new Date().toISOString(),
        status: 'nouveau'
      }
    ];

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
  }
}