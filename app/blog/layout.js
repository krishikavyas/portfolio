import "@/app/blog.scss"

export const metadata = {
  metadataBase : new URL(process.env.HOST),
  title: "Blog | Insights on SEO, Meta Ads, and Digital Marketing",
  description: "Explore the latest insights, tips, and strategies on SEO, Meta ads, and social media marketing. Join Krishika Vyas as she shares her expertise to help your business grow online.",
  keywords: ["contact", "get in touch", "digital marketing inquiries", "SEO questions", "Meta ads support", "social media marketing", "Krishika Vyas"],
  author: "Krishika",
  robots: "index, follow",
  openGraph: {
    title: "Blog | Insights on SEO, Meta Ads, and Digital Marketing",
    type: "profile",
    url: new URL(process.env.HOST),
    images: [`${new URL(process.env.HOST)}/LOGOO.png`], 
    description: "Explore the latest insights, tips, and strategies on SEO, Meta ads, and social media marketing. Join Krishika Vyas as she shares her expertise to help your business grow online.",
    card: "summary_large_image",
    locale: "en_US",
    siteName: "Krishika's portfolio",
    site:"@krishika"
  },
};

export default function Layout({ children }) {
  return (
    <>
          {children}
    </>
  )
}