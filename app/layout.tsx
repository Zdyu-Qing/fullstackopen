import './globals.css';
import NavBar from '@/app/components/NavBar';
import Notification from '@/app/components/Notification';
import { NotificationProvider } from '@/app/components/NotificationContext';
import AuthSessionProvider from '@/app/components/SessionProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            <div className="flex flex-col items-center mx-4">{children}</div>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
