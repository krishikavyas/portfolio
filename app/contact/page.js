import Hero from '@/components/HeroSection/Hero'
import React from 'react'
import style from "./contact.module.scss"
import Form from './Form'

const data = [
    {title: "City", desc: "Mumbai"},
    {title: "Email", desc: "krishikavyas0408@gmail.com"},
]

export const metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_HOST),
    title: "Contact Me | Get in Touch with Krishika Vyas",
    description: "Have questions or want to collaborate? Reach out to Krishika Vyas, a digital marketing enthusiast. I&apos;m here to help you with SEO, Meta ads, and social media strategies.",
    keywords: ["contact", "get in touch", "digital marketing inquiries", "SEO questions", "Meta ads support", "social media marketing", "Krishika Vyas"],
    author: "Krishika",
    robots: "index, follow",
    openGraph: {
      title: "Contact Me | Get in Touch with Krishika Vyas",
      type: "profile",
      url: new URL(process.env.NEXT_PUBLIC_HOST),
      images: [`${new URL(process.env.NEXT_PUBLIC_HOST)}/LOGOO.png`], 
      description: "Have questions or want to collaborate? Reach out to Krishika Vyas, a digital marketing enthusiast. I&apos;m here to help you with SEO, Meta ads, and social media strategies.",
      card: "summary_large_image",
      locale: "en_US",
      siteName: "Krishika's portfolio",
      site: "@krishika"
    },
};

function page() {
  return (
    <div className={`ccontainer ${style.container}`}>
        <Hero content="Contact" />
        <section className={style.details}>
            <div className={style.info}>
                 <h2 className='commonContent'>Get in Touch <a><span>with Me!</span></a></h2>
                 <p>Whether you have questions, want to collaborate, or are looking for guidance on marketing strategies, I&apos;m here to help! Let&apos;s work together to bring your ideas to life and boost your brand&apos;s success.</p>
            </div>
            <div className={style.cards}>
                {data.map(e => (
                    <div key={e.title}>
                        <h4>{e.title}</h4>
                        <p>{e.desc}</p>
                    </div>
                ))}
            </div>
        </section>
        <Form />
    </div>
  )
}

export default page
