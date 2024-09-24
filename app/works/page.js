import Hero from '@/components/HeroSection/Hero'
import Image from 'next/image'
import React from 'react'
import Img from "@/public/assets/01_img.jpg"
import style from "./work.module.scss"
import Projects from '@/components/Project/Projects'


export const metadata = {
  metadataBase : new URL(process.env.HOST),
  title: "My Work | Digital Marketing Skills & Projects",
  description: "Explore the diverse digital marketing skills and projects of Krishika Vyas.",
  keywords: ["work", "digital marketing skills", "SEO", "Meta ads", "social media marketing", "marketing projects", "portfolio", "Krishika Vyas"],
  author: "Krishika",
  robots: "index, follow",
  openGraph: {
    title: "My Work | Digital Marketing Skills & Projects",
    type: "profile",
    url: new URL(process.env.HOST),
    images: [`${new URL(process.env.HOST)}/LOGOO.png`], 
    description: "Explore the diverse digital marketing skills and projects of Krishika Vyas.",
    card: "summary_large_image",
    locale: "en_US",
    siteName: "Krishika's portfolio",
    site:"@krishika"
  },
};

function page() {
  return (
    <div className={`ccontainer ${style.container}`}>
        <Hero content="Work" />
        <Projects/>
    </div>
  )
}

export default page