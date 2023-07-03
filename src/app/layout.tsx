import { APP_NAME } from '@/shared/const/appName';
import { cl } from '@/shared/lib';
import '@/styles/globals.css';
import { Navbar } from '@/widgets/Navbar';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { ToasterProvider } from './_providers/ToasterProvider';

export const metadata = {
  title: APP_NAME,
  description: 'A Reddit clone built with Next.js and TypeScript.',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  authModal,
}: {
  children: ReactNode;
  authModal: ReactNode;
}) {
  return (
    <html
      className={cl(
        'bg-white text-slate-900 antialiased light',
        inter.className
      )}
      lang="en"
    >
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
        {/* @ts-expect-error Server Component */}
        <Navbar />

        <div className="container max-w-7xl mx-auto h-full pt-12">
          {children}
        </div>
        <ToasterProvider />

        {/* parallel routes */}
        {authModal}
      </body>
    </html>
  );
}
