import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import UserNavbar from '@/components/UserNavbar';
import UserFooter from '@/components/UserFooter';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ServiceHub - Premium Services',
  description: 'Purchase and manage your services with ServiceHub',
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <UserNavbar />
          <main className="flex-1">
            {children}
          </main>
          <UserFooter />
        </div>
      </body>
    </html>
  );
}
