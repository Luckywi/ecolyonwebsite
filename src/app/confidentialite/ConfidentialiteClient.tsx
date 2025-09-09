"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ConfidentialiteClient() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation de retour */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-black hover:text-ecolyon-green transition-colors group"
          >
            <Image
              src="/icons/arrowright.svg"
              alt="Flèche retour"
              width={20}
              height={20}
              className="w-5 h-5 rotate-180 back-link-arrow"
            />
            <span className="font-medium">Retour à l&apos;accueil</span>
          </Link>
        </motion.div>

        {/* Titre principal */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black mb-4">
            Politique de Confidentialité
          </h1>
          <p className="text-gray-600">
            EcoLyon - Air & Ville
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Dernière mise à jour : 2 septembre 2025
          </p>
        </motion.div>

        {/* Contenu */}
        <motion.div 
          className="prose prose-lg max-w-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Introduction */}
          <section className="mb-8">
            <p className="text-gray-700 leading-relaxed">
              Cette politique de confidentialité décrit comment l&apos;application EcoLyon et son site web traitent vos informations personnelles. 
              Notre engagement principal est votre vie privée : <strong>nous ne collectons, ne stockons et ne partageons aucune donnée personnelle</strong>.
            </p>
          </section>

          {/* Collecte de données */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-medium text-black mb-4">
              1. Collecte de données
            </h2>
            <div className="rounded-xl p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>L&apos;application EcoLyon et le site web ne collectent <strong>aucune donnée personnelle</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Aucun compte utilisateur n&apos;est requis pour utiliser nos services</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Aucun identifiant personnel, adresse email, numéro de téléphone ou autre information personnelle n&apos;est demandé</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Toutes les informations environnementales affichées proviennent de sources de données publiques consultées de manière anonyme</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Stockage des données */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-medium text-black mb-4">
              2. Stockage des données
            </h2>
            <div className="rounded-xl p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Aucune donnée n&apos;est stockée sur nos serveurs</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>L&apos;application fonctionne entièrement en local sur votre appareil</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Les seules informations conservées sont vos préférences d&apos;utilisation (arrondissement sélectionné, paramètres d&apos;affichage) qui restent stockées localement sur votre appareil</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Ces préférences ne quittent jamais votre appareil</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Géolocalisation */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-medium text-black mb-4">
              3. Géolocalisation (Application mobile uniquement)
            </h2>
            <div className="rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                Si vous autorisez l&apos;application mobile à accéder à votre position géographique :
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>L&apos;information reste exclusivement sur votre appareil</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Elle n&apos;est jamais transmise à nos serveurs</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Elle est utilisée uniquement pour personnaliser l&apos;affichage des équipements urbains proches</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Elle peut être désactivée à tout moment dans les réglages de votre appareil</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Elle n&apos;est jamais partagée avec des tiers ou des services externes</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Cookies et suivi */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-medium text-black mb-4">
              4. Cookies et suivi
            </h2>
            <div className="rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                Notre engagement envers votre vie privée signifie que :
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">✕</span>
                  <span>Aucun cookie n&apos;est utilisé</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✕</span>
                  <span>Aucun tracker publicitaire n&apos;est présent</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✕</span>
                  <span>Aucun outil d&apos;analyse comportementale n&apos;est installé</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✕</span>
                  <span>Aucune statistique d&apos;usage n&apos;est collectée</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✕</span>
                  <span>Aucun partage de données avec des tiers</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Sources de données */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-medium text-black mb-4">
              5. Sources de données
            </h2>
            <div className="rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                L&apos;application consulte plusieurs APIs publiques pour obtenir des informations environnementales :
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-black mb-2">Qualité de l&apos;air</h3>
                  <p className="text-gray-700 text-sm">
                    Données fournies par ATMO Auvergne-Rhône-Alpes, organisme agréé pour la surveillance de la qualité de l&apos;air
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-black mb-2">Équipements urbains</h3>
                  <p className="text-gray-700 text-sm">
                    Données ouvertes du Grand Lyon disponibles publiquement sur data.grandlyon.com
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  ℹ️ Toutes ces consultations sont effectuées de manière anonyme et ne permettent pas de vous identifier ou de vous tracer.
                </p>
              </div>
            </div>
          </section>

          {/* Vos droits */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-medium text-black mb-4">
              6. Vos droits
            </h2>
            <div className="rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                Étant donné que nous ne collectons aucune donnée personnelle :
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Il n&apos;existe aucune donnée vous concernant à consulter, modifier ou supprimer</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Vous conservez un contrôle total sur les autorisations accordées à l&apos;application via les réglages de votre appareil</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Vous pouvez désinstaller l&apos;application à tout moment, supprimant ainsi toutes les préférences locales</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-medium text-black mb-4">
              7. Contact
            </h2>
            <div className="rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                Pour toute question concernant cette politique de confidentialité :
              </p>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Email :</span>{' '}
                  <a href="mailto:contact@ecolyon.fr" className="text-ecolyon-green hover:underline">
                    contact@ecolyon.fr
                  </a>
                </p>
                <p>
                  <span className="font-medium">Développeur :</span> Lucky Lebeurre
                </p>
              </div>
            </div>
          </section>

          {/* Modifications */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-medium text-black mb-4">
              8. Modifications
            </h2>
            <div className="rounded-xl p-6">
              <p className="text-gray-700">
                Cette politique de confidentialité peut être mise à jour pour refléter des évolutions de l&apos;application ou des exigences réglementaires. 
                Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour. 
                Nous vous encourageons à consulter régulièrement cette politique.
              </p>
            </div>
          </section>

          {/* Conformité */}
          <section className="mb-12">
            <div className="rounded-xl p-6">
              <p className="text-sm text-gray-700 text-center">
                Cette politique de confidentialité est conforme aux exigences de l&apos;App Store d&apos;Apple 
                et au Règlement Général sur la Protection des Données (RGPD) européen.
              </p>
            </div>
          </section>

          {/* Note finale */}
          <div className="text-center text-sm text-gray-600 mb-8">
            <p>
              EcoLyon est une application gratuite dédiée à l&apos;information environnementale de la métropole lyonnaise.
            </p>
            <p className="mt-2">
              Elle s&apos;appuie sur les données ouvertes du Grand Lyon et d&apos;ATMO Auvergne-Rhône-Alpes.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}