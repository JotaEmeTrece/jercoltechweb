import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { BackgroundAmbientVideo } from '@/components/ui/BackgroundAmbientVideo';
import { SessionProvider } from '@/components/providers/SessionProvider';
import { MutationEngine } from '@/components/mutation/MutationEngine';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}>
      <body className="bg-[#101010] text-white overflow-x-hidden min-h-full flex flex-col">
        <SessionProvider>
          <BackgroundAmbientVideo />
          <MutationEngine />
          <main className="relative z-10">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}