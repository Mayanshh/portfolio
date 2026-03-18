import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import SmoothScroll from "@/utils/SmoothScroll";
import Navbar from "@/components/Navbar";
import ClientLoaderWrapper from "@/components/ClientLoaderWrapper";

// --- FONTS ---
const sofiaBold = localFont({
  src: "../../public/fonts/SofiaSansCondensed-Bold.woff2",
  variable: "--font-sofia-bold",
});
const sofiaSemiBold = localFont({
  src: "../../public/fonts/SofiaSansCondensed-SemiBold.woff2",
  variable: "--font-sofia-semibold",
});
const splineLight = localFont({
  src: "../../public/fonts/SplineSansMono-Light.woff2",
  variable: "--font-spline-light",
});
const splineRegular = localFont({
  src: "../../public/fonts/SplineSansMono-Regular.woff2",
  variable: "--font-spline-regular",
});

// --- VIEWPORT & THEME ---
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

// --- METADATA (SEO, OpenGraph, Twitter) ---
export const metadata: Metadata = {
  metadataBase: new URL("https://mayanshbangali.vercel.app/"),
  title: {
    default: "Mayansh Bangali | Creative Developer",
    template: "%s | Mayansh Bangali",
  },
  description: "Portfolio of Mayansh Bangali, an immersive and creative Fullstack developer specializing in award-level web experiences.",
  keywords: ["Mayansh Bangali", "Creative Developer", "Next.js Portfolio", "Three.js", "GSAP Animations", "Fullstack Developer India"],
  authors: [{ name: "Mayansh Bangali" }],
  creator: "Mayansh Bangali",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo-sqr.png",
  },
  openGraph: {
    type: "website",
    url: "https://your-portfolio-domain.com",
    title: "Mayansh Bangali | Creative Developer",
    description: "Explore the immersive digital experiences crafted by Mayansh Bangali.",
    siteName: "Mayansh Bangali Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mayansh Bangali Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayansh Bangali | Creative Developer",
    description: "Immersive web experiences and high-performance development.",
    images: ["/logo-sqr.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD Structured Data for Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mayansh Bangali",
    "url": "https://your-portfolio-domain.com",
    "jobTitle": "Creative Fullstack Developer",
    "description": "Specializing in Next.js, Three.js, and immersive web animations.",
    "sameAs": [
      "https://github.com/your-username",
      "https://linkedin.com/in/your-profile"
    ]
  };

  return (
    <html lang="en">
      <head>
        {/* Inject JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${sofiaBold.variable} ${sofiaSemiBold.variable} ${splineLight.variable} ${splineRegular.variable} antialiased`}
      >
        <ClientLoaderWrapper>
          <Navbar />
          <SmoothScroll>{children}</SmoothScroll>
        </ClientLoaderWrapper>

        {/* NoScript Fallback */}
        <noscript>
          <div className="fixed inset-0 flex items-center justify-center bg-black text-white p-10 text-center z-9999">
            <p>Please enable JavaScript to experience this immersive portfolio.</p>
          </div>
        </noscript>
      </body>
    </html>
  );
}