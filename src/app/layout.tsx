import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import WhatsAppFloatingCTA from '@/components/ui/WhatsAppFloatingCTA';
import CursorGlow from '@/components/ui/CursorGlow';
import ParticleCanvas from '@/components/ui/ParticleCanvas';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://inalabs.id'),
  title: {
    default: 'INALABS INDONESIA | Digital Innovation Partner & Enterprise AI Agency',
    template: '%s | Inalabs Indonesia'
  },
  description: 'Inalabs Indonesia helps businesses transform ideas into scalable digital products through software engineering, artificial intelligence, automation, and creative digital solutions.',
  keywords: [
    'Inalabs Indonesia',
    'Digital Agency Jakarta',
    'AI Startup Indonesia',
    'Software Development Company',
    'Enterprise AI Solutions',
    'Custom Software Development',
    'Mobile Application Agency',
    'Next.js Enterprise Partner'
  ],
  authors: [{ name: 'Inalabs Indonesia Engineering Team', url: 'https://inalabs.id' }],
  creator: 'Inalabs Indonesia',
  publisher: 'Inalabs Indonesia',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://inalabs.id',
    siteName: 'Inalabs Indonesia',
    title: 'INALABS INDONESIA | Digital Innovation Partner & Enterprise AI Agency',
    description: 'Transforming ideas into scalable digital products through software engineering, artificial intelligence, automation, and creative solutions.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Inalabs Indonesia Enterprise AI & Digital Innovation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INALABS INDONESIA | Digital Innovation Partner',
    description: 'Building Digital Experiences Beyond Imagination through software engineering and artificial intelligence.',
    images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'],
    creator: '@inalabs_id',
  },
  icons: {
    icon: [
      { url: '/images/logo-ci.png', type: 'image/png' },
    ],
    shortcut: '/images/logo-ci.png',
    apple: '/images/logo-ci.png',
  },
};

import ClientProviders from '@/components/ClientProviders';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${spaceGrotesk.variable} dark scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo-ci.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/images/logo-ci.png" />

        {/* Anti-FOUC Theme & Language Initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('inalabs_theme');
                  var root = document.documentElement;
                  if (savedTheme === 'light') {
                    root.classList.remove('dark');
                    root.classList.add('light');
                    root.setAttribute('data-theme', 'light');
                    root.style.colorScheme = 'light';
                  } else {
                    root.classList.remove('light');
                    root.classList.add('dark');
                    root.setAttribute('data-theme', 'dark');
                    root.style.colorScheme = 'dark';
                  }
                  var savedLang = localStorage.getItem('inalabs_lang');
                  if (savedLang) {
                    root.lang = savedLang;
                  } else {
                    root.lang = 'id';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />

        {/* JSON-LD Structured Data for Enterprise Agency */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Inalabs Indonesia',
              url: 'https://inalabs.id',
              logo: 'https://inalabs.id/images/logo-ci.png',
              description: 'Digital innovation partner and enterprise AI software development company.',
              sameAs: [
                'https://github.com/inalabs-indonesia',
                'https://linkedin.com/company/inalabs-indonesia'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+62-817-7680-3118',
                contactType: 'Customer Service',
                areaServed: 'ID',
                availableLanguage: ['Indonesian', 'English']
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Jl. Raya Kalibata 2-9, RT.1, Rawajati, Kec. Pancoran',
                addressLocality: 'Jakarta Selatan',
                addressRegion: 'Daerah Khusus Ibukota Jakarta',
                postalCode: '12750',
                addressCountry: 'ID'
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg-main)] text-[var(--foreground)] antialiased relative overflow-x-hidden transition-colors duration-300">
        <ClientProviders>
          {/* Subtle Film Grain Texture */}
          <div className="noise-overlay" />

          {/* Ambient Subtle Studio Top Glow */}
          <div className="ambient-glow-top" />

          {/* Minimal Stardust Ambient Background */}
          <ParticleCanvas />
          
          {/* Interactive Subtle Cursor Glow Spotlight */}
          <CursorGlow />

          {/* Main Floating Navbar */}
          <Navbar />

          {/* Dynamic Page Content */}
          <main className="relative z-10 flex-grow">
            {children}
          </main>

          {/* Futuristic Agency Footer */}
          <Footer />

          {/* Floating Minimal WhatsApp CTA */}
          <WhatsAppFloatingCTA />
        </ClientProviders>
      </body>
    </html>
  );
}
