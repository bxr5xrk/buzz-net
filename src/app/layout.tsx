import { cl } from '@/shared/lib';
import '@/styles/globals.css';
import { Navbar } from '@/widgets/Navbar';
import { Inter } from 'next/font/google';

export const metadata = {
  title: 'Buzz-Net',
  description: 'A Reddit clone built with Next.js and TypeScript.',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
      </body>
    </html>
  );
}
