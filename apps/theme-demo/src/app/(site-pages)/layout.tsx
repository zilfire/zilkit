import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import { DisableDraftMode } from '@/components/DisableDraftMode';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Merriweather } from 'next/font/google';
import { LAYOUT_QUERY } from '@/sanity/queries';
import type { LayoutQueryData } from '@/sanity/queries';
import { client } from '@/sanity/client';
import { Header, Footer } from '@zilfire/core-theme/web/blocks';
import { ThemeProvider } from '@/components/ThemeProvider';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const merriweather = Merriweather({
  variable: '--font-merriweather',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ZILCORE | A Toolkit for Building Modern Web Apps',
  description: 'A Next.js application with TypeScript, TailwindCSS, and Sanity CMS',
  icons: {
    icon: '/icon.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const layoutData: LayoutQueryData | null = await client.fetch(LAYOUT_QUERY);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" sizes="any" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          {layoutData && <Header promoBar={false} data={layoutData} />}
          {children}
          {layoutData && <Footer footerLogo={layoutData.footerLogo} />}
        </ThemeProvider>
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  );
}
