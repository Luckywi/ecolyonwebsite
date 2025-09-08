"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import SchemaHead from '@/components/schema/SchemaHead';

export default function MentionsLegalesPage() {
  return (
    <>
      <SchemaHead />
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
            Mentions Légales
          </h1>
          <p className="text-gray-600">
            EcoLyon - Air & Ville
          </p>
          <p className="text-sm text-gray-500 mt-2">
            En vigueur au 2 septembre 2025
          </p>
        </motion.div>

        {/* Contenu */}
        <motion.div 
          className="prose prose-lg max-w-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          
          {/* Éditeur */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-medium text-black mb-4">
              1. Éditeur de l&apos;application et du site
            </h2>
            <div className="rounded-xl p-6">
              <div className="space-y-3 text-gray-700">
                <p>
                  <span className="font-medium">Nom :</span> Lucky Lebeurre
                </p>
                <p>
                  <span className="font-medium">Statut :</span> Particulier
                </p>
                <p>
                  <span className="font-medium">Email :</span>{' '}
                  <a href="mailto:contact@ecolyon.fr" className="text-ecolyon-green hover:underline">
                    contact@ecolyon.fr
                  </a>
                </p>
                <p>
                  <span className="font-medium">Site web :</span>{' '}
                  <a href="https://ecolyon.fr" className="text-ecolyon-green hover:underline">
                    www.ecolyon.fr
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Hébergement */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-medium text-black mb-4">
              2. Hébergement
            </h2>
            <div className="rounded-xl p-6">
              <div className="space-y-3 text-gray-700">
                <div className="pb-4">
                  <h3 className="font-medium text-black mb-2">Site web</h3>
                  <p>
                    <span className="font-medium">Hébergeur :</span> Vercel Inc.
                  </p>
                  <p>
                    <span className="font-medium">Adresse :</span> 340 S Lemon Ave #4133, Walnut, CA 91789, USA
                  </p>
                  <p>
                    <span className="font-medium">Site :</span>{' '}
                    <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-ecolyon-green hover:underline">
                      vercel.com
                    </a>
                  </p>
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium text-black mb-2">Application mobile</h3>
                  <p>
                    <span className="font-medium">Distribution :</span> Apple App Store
                  </p>
                  <p>
                    <span className="font-medium">Plateforme :</span> iOS (iPhone, iPad)
                  </p>
                  <p className="text-sm mt-2 text-gray-600">
                    L&apos;application est hébergée et distribuée via l&apos;App Store d&apos;Apple conformément aux conditions de service d&apos;Apple.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-medium text-black mb-4">
              3. Propriété intellectuelle
            </h2>
            <div className="rounded-xl p-6">
              <div className="space-y-4 text-gray-700">
                <p>
                  L&apos;ensemble du contenu présent sur le site web et dans l&apos;application EcoLyon, incluant mais non limité aux textes, 
                  graphiques, logos, icônes, images, clips audio, téléchargements numériques et compilations de données, 
                  est la propriété de Lucky Lebeurre ou de ses fournisseurs de contenu et est protégé par les lois françaises 
                  et internationales sur le droit d&apos;auteur.
                </p>
                
                <div className="p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Note :</strong> Les données environnementales affichées proviennent de sources publiques et restent 
                    la propriété de leurs fournisseurs respectifs (ATMO Auvergne-Rhône-Alpes, Grand Lyon).
                  </p>
                </div>
                
                <p>
                  Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments 
                  du site et de l&apos;application, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation 
                  écrite préalable de Lucky Lebeurre.
                </p>
              </div>
            </div>
          </section>

          {/* Données et sources */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-medium text-black mb-4">
              4. Sources de données
            </h2>
            <div className="rounded-xl p-6">
              <div className="space-y-4">
                <p className="text-gray-700">
                  EcoLyon utilise exclusivement des données publiques et ouvertes provenant de :
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="mr-2">•</span>
                    <div>
                      <strong>ATMO Auvergne-Rhône-Alpes</strong>
                      <p className="text-sm text-gray-600 mt-1">
                        Organisme agréé pour la surveillance de la qualité de l&apos;air
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="mr-2">•</span>
                    <div>
                      <strong>Grand Lyon - Métropole de Lyon</strong>
                      <p className="text-sm text-gray-600 mt-1">
                        Données ouvertes disponibles sur data.grandlyon.com
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 italic">
                  Ces données sont utilisées conformément aux licences open data respectives de chaque fournisseur.
                </p>
              </div>
            </div>
          </section>

          {/* Responsabilité */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-medium text-black mb-4">
              5. Limitation de responsabilité
            </h2>
            <div className="rounded-xl p-6">
              <div className="space-y-4 text-gray-700">
                <p>
                  Les informations fournies par EcoLyon sont présentées à titre indicatif et général uniquement 
                  et ne prétendent pas à l&apos;exhaustivité, l&apos;exactitude ou la mise à jour en temps réel.
                </p>
                
                <p>
                  Lucky Lebeurre ne pourra être tenu responsable des dommages directs et indirects causés au matériel 
                  de l&apos;utilisateur, lors de l&apos;accès au site web ou à l&apos;application EcoLyon.
                </p>
                
                <p>
                  Lucky Lebeurre décline toute responsabilité :
                </p>
                
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">-</span>
                    <span>Pour toute interruption du site ou de l&apos;application</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">-</span>
                    <span>Pour toute survenance de bugs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">-</span>
                    <span>Pour toute inexactitude ou omission dans les informations fournies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">-</span>
                    <span>Pour tout dommage résultant d&apos;une intrusion frauduleuse d&apos;un tiers</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-medium text-black mb-4">
              6. Cookies et trackers
            </h2>
            <div className="rounded-xl p-6">
              <div className="p-4 rounded-lg">
                <p className="text-green-800 font-medium mb-2">
                  ✅ Aucun cookie n&apos;est utilisé
                </p>
                <p className="text-gray-700 text-sm">
                  Le site web et l&apos;application EcoLyon n&apos;utilisent aucun cookie, tracker ou outil d&apos;analyse. 
                  Votre navigation est totalement anonyme et aucune donnée personnelle n&apos;est collectée.
                </p>
              </div>
            </div>
          </section>

          {/* Protection des données */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-medium text-black mb-4">
              7. Protection des données personnelles
            </h2>
            <div className="rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés :
              </p>
              
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Aucune donnée personnelle n&apos;est collectée</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Aucun traitement de données personnelles n&apos;est effectué</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Aucune inscription ou création de compte n&apos;est requise</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Aucune donnée n&apos;est partagée avec des tiers</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mt-4">
                Pour plus d&apos;informations, consultez notre{' '}
                <Link href="/confidentialite" className="text-ecolyon-green hover:underline">
                  Politique de Confidentialité
                </Link>
              </p>
            </div>
          </section>

          {/* Droit applicable */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-medium text-black mb-4">
              8. Droit applicable et juridiction
            </h2>
            <div className="rounded-xl p-6">
              <p className="text-gray-700">
                Les présentes mentions légales sont régies par le droit français. En cas de litige et après 
                échec de toute tentative de recherche d&apos;une solution amiable, les tribunaux français seront 
                seuls compétents pour connaître de ce litige.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-medium text-black mb-4">
              9. Contact
            </h2>
            <div className="rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                Pour toute question concernant ces mentions légales ou l&apos;utilisation de l&apos;application :
              </p>
              
              <div className="space-y-3">
                <p className="text-gray-700">
                  <span className="font-medium">Email :</span>{' '}
                  <a href="mailto:contact@ecolyon.fr" className="text-ecolyon-green hover:underline">
                    contact@ecolyon.fr
                  </a>
                </p>
                
                <p className="text-gray-700">
                  <span className="font-medium">Formulaire de contact :</span>{' '}
                  <Link href="/contact" className="text-ecolyon-green hover:underline">
                    Accéder au formulaire
                  </Link>
                </p>
              </div>
            </div>
          </section>

          {/* Crédits */}
          <section className="mb-12">
            <h2 className="text-xl sm:text-2xl font-medium text-black mb-4">
              10. Crédits
            </h2>
            <div className="rounded-xl p-6">
              <div className="space-y-4 text-gray-700">
                <div>
                  <p className="font-medium mb-2">Conception et développement :</p>
                  <p>Lucky Lebeurre</p>
                </div>
                
                <div>
                  <p className="font-medium mb-2">Technologies utilisées :</p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      <span>Next.js (Site web)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      <span>Swift & SwiftUI (Application iOS)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      <span>Tailwind CSS (Design)</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <p className="font-medium mb-2">Remerciements :</p>
                  <p className="text-sm">
                    ATMO Auvergne-Rhône-Alpes et le Grand Lyon pour la mise à disposition des données publiques.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Note finale */}
          <div className="text-center text-sm text-gray-600 mb-8">
            <p>
              EcoLyon - Air & Ville
            </p>
            <p className="mt-2">
              Application gratuite d&apos;information environnementale pour la métropole lyonnaise
            </p>
          </div>
        </motion.div>
      </div>
      </div>
    </>
  );
}