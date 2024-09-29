import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_HOST),
  title: {
    default: "Unlock Business Growth with Expert SEO, Meta Ads, & Social Media",
    template: " %s | Krishika"
  },
  description: "Drive your business forward with personalized SEO strategies, targeted Meta ads, and social media marketing. Reach your goals with proven methods for online success.",
  keywords: ["SEO services", "Meta ads", "social media marketing", "digital marketing", "business growth", "online visibility", "brand building", "targeted advertising"],
  author: "Krishika",
  robots: "index, follow",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: new URL(process.env.NEXT_PUBLIC_HOST),
    title: "Krishika - Unlock Business Growth with Expert SEO, Meta Ads, & Social Media",
    type: "profile",
    images: [`${new URL(process.env.NEXT_PUBLIC_HOST)}/LOGOO.png`],
    description: "Drive your business forward with personalized SEO strategies, targeted Meta ads, and social media marketing. Reach your goals with proven methods for online success.",
    card: "summary_large_image",
    locale: "en_US",
    siteName: "Krishika's portfolio",
    site: "@krishika"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-43H4YCPWGF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-43H4YCPWGF', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Toaster position="top-center" reverseOrder={false} />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
