import type { Viewport } from 'next';
import { Syne, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { SanityLive } from '@/sanity/lib/live';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity';
import { DisableDraftMode } from '@/components/DisableDraftMode';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeScript } from './components/ThemeScript';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plusJakartaSans',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();
  return (
    <html
      lang='en'
      className={`${syne.variable} ${plusJakartaSans.className}`}
      suppressHydrationWarning
    >
      <body className='bg-gray-500 text-gray-900 dark:bg-green-500 dark:text-white'>
        <ThemeScript />
        <ThemeProvider>
          {isDraftMode && (
            <>
              <VisualEditing />
              <DisableDraftMode />
            </>
          )}

          <SanityLive />
          <>{children}</>
        </ThemeProvider>
      </body>
    </html>
  );
}
