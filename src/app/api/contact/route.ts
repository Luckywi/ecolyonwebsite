// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ContactFormData {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Préparation des données pour l'email
    const emailData = {
      from: 'EcoLyon <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'contact@ecolyon.fr'],
      subject: `🌱 Nouveau message EcoLyon - ${data.sujet}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #46952C;">📧 Nouveau message de contact reçu</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>De:</strong> ${data.nom.trim()} (${data.email.trim().toLowerCase()})</p>
            <p><strong>Sujet:</strong> ${data.sujet}</p>
            <div style="margin-top: 20px;">
              <strong>Message:</strong>
              <div style="background: white; padding: 15px; border-left: 4px solid #46952C; margin-top: 10px;">
                ${data.message.trim().replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          <div style="font-size: 12px; color: #666; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p><strong>Reçu le:</strong> ${new Date().toLocaleString('fr-FR')}</p>
            <p><strong>Email de réponse:</strong> ${data.email.trim().toLowerCase()}</p>
          </div>
        </div>
      `
    };

    // Envoi de l'email avec Resend
    const { data: resendData, error } = await resend.emails.send(emailData);

    if (error) {
      console.error('❌ Erreur envoi email Resend:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      );
    }

    // Pour le développement - log en console
    console.log('📧 Nouveau message de contact reçu:', {
      nom: data.nom.trim(),
      email: data.email.trim().toLowerCase(),
      sujet: data.sujet,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message envoyé avec succès',
        id: resendData?.id
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