import type { Metadata } from "next";
import "./globals.css";

// Google Font Setup, We are using inter font face
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // optional
})
// Fontawesome configuration setup fo
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false; // We are adding the autoAddClass to avoid the hydration page
// Desktop Navivation 
import DesktopNavigation from "@/components/ui/navigation/Desktop";

// SEO meta description
export const metadata: Metadata = {
  title: "Humber Learning APP",
  description: "Learning through the online educational tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="{inter.className}">
      <body>
        <DesktopNavigation />
        {children}
      </body>
    </html>
  );
}
