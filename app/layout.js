import { Inter } from "next/font/google";
import { Archivo } from "next/font/google";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeRegistry from "./ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });
const archivo = Archivo({ subsets: ["latin"] });

import Navbar from "./components/Navbar";
export const metadata = {
  title: "AI Flashcards - StudyZap",
  description: "AI Flashcard Creator. Need to cram for a test? Generate flashcards in a flash with Studyzap. Upload text, PDFs, or take a picture of your notes and generate custom flashcards with the power of AI."
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.variable}>
          <ThemeRegistry>
            <Navbar />
            {children}
          </ThemeRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}