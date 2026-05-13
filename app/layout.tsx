import type { Metadata, Viewport } from "next";
import { ServiceWorkerRegistration } from "@/src/components/ServiceWorkerRegistration";
import "./globals.css";

export const metadata: Metadata = {
  applicationName: "Career Mode Lab",
  title: "Career Mode Lab",
  description: "A mobile-only club randomizer and challenge builder for FIFA and EA FC career mode saves.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Career Lab"
  },
  formatDetection: {
    telephone: false
  },
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/apple-touch-icon.svg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#c84036"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
