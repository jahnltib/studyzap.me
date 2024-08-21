// app/layout.js
import { Inter } from 'next/font/google';
import { Archivo } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import ThemeRegistry from './ThemeRegistry';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import { UserProvider } from './context/UserContext'; // Import the UserProvider

const inter = Inter({ subsets: ['latin'] });
const archivo = Archivo({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.variable}>
          <ThemeRegistry>
            <UserProvider> {/* Wrap with UserProvider */}
              <Navbar />
              {children}
            </UserProvider>
            <Analytics />
          </ThemeRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
