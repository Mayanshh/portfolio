import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import SmoothScroll from "@/utils/SmoothScroll";
import Navbar from "@/components/Navbar";

// ✅ NEW
import ClientLoaderWrapper from "@/components/ClientLoaderWrapper";

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

export const metadata: Metadata = {
  title: "Mayansh Bangali | Creative Developer",
  description:
    "Portfolio of Mayansh Bangali, an immersive and creative Fullstack developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${sofiaBold.variable} ${sofiaSemiBold.variable} ${splineLight.variable} ${splineRegular.variable} antialiased`}
      >
        <ClientLoaderWrapper>
          <Navbar />
          <SmoothScroll>{children}</SmoothScroll>
        </ClientLoaderWrapper>
      </body>
    </html>
  );
}