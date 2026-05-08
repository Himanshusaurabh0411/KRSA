import type { Metadata } from "next";
import { DM_Sans, Oswald } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL("https://krsasports.in"),
  title: "KRSA | Krishna Rattan Sports Academy",
  description: "Official website and athlete management portal for Krishna Rattan Sports Academy, a Khelo India Accredited Academy in Wazirabad, Delhi.",
  keywords: ["sports academy Delhi", "Khelo India academy Wazirabad", "sports coaching Delhi", "KRSA", "Krishna Rattan Sports Academy"],
  openGraph: {
    title: "Krishna Rattan Sports Academy",
    description: "Khelo India Accredited Academy in Wazirabad, Delhi.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${oswald.variable} font-sans antialiased`}>
        <ThemeProvider>
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <SiteHeader />
          <div id="main-content">{children}</div>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
