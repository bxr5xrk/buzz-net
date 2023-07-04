import { APP_NAME } from '@/shared/const/appName';
import { cl } from '@/shared/lib';
import './_styles/globals.css';
import { Navbar } from '@/widgets/Navbar';
import { Inter } from 'next/font/google';
import { FetchProvider, ToasterProvider } from './_providers';
import { ReactNode } from 'react';

export const metadata = {
  title: APP_NAME,
  description: 'A Reddit clone built with Next.js and TypeScript.'
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  authModal
}: {
  children: ReactNode;
  authModal: ReactNode;
}) {
  return (
    <html
      className={cl(
        'light bg-white text-slate-900 antialiased',
        inter.className
      )}
      lang="en"
    >
      <body className="min-h-screen bg-slate-50 pt-12 antialiased">
        <FetchProvider>
          {/* @ts-expect-error Server Component */}
          <Navbar />

          <div className="container mx-auto h-full max-w-7xl pt-12">
            {children}
          </div>
          <ToasterProvider />

          {/* parallel routes */}
          {authModal}
        </FetchProvider>
      </body>
    </html>
  );
}
