import Hero from '@/components/HeroSection/Hero'
import Image from 'next/image'
import React from 'react'
import Img from "../../public/assets/img1.jpeg"
import style from "./About.module.scss"
import ExperienceTimeline from '@/components/Experience/Experience'

const data = [
    {title: "Trading : ", desc: "Enhancing visibility for financial trading platforms.",},
    {title: "eCommerce : ", desc: "Driving sales through effective digital marketing strategies.",},
    {title: "Clothing : ", desc: "Building brand presence and increasing customer engagement.",},
    {title: "Business Consultancy : ", desc: "Creating strategies for client acquisition and retention.",},
    {title: "Food : ", desc: "Promoting food businesses and enhancing online presence.",},
    {title: "Blogs (Media) : ", desc: "Increasing readership and online traffic.",}

]


export const metadata = {
    metadataBase : new URL(process.env.NEXT_PUBLIC_HOST),
    title: "About Me | SEO & Digital Marketing Enthusiast | Krishika Vyas",
    description: "A passionate digital marketing enthusiast specializing in SEO, Meta ads, and social media strategies. Discover how I help businesses grow online.",
    keywords: ["About me", "SEO enthusiast", "digital marketing professional", "Meta ads strategist", "social media marketing", "online growth", "marketing consultant", "Krishika Vyas"],
    author: "Krishika",
    robots: "index, follow",
    alternates: {
        canonical: `${new URL(process.env.NEXT_PUBLIC_HOST)}about`,
    },
    openGraph: {
      url: `${new URL(process.env.NEXT_PUBLIC_HOST)}about`,
      title: "About Me | SEO & Digital Marketing Enthusiast | Krishika Vyas",
      type: "profile",
      url: new URL(process.env.NEXT_PUBLIC_HOST),
      images: [`${new URL(process.env.NEXT_PUBLIC_HOST)}/LOGOO.png`], 
      description: "A passionate digital marketing enthusiast specializing in SEO, Meta ads, and social media strategies. Discover how I help businesses grow online.",
      card: "summary_large_image",
      locale: "en_US",
      siteName: "Krishika's portfolio",
      site:"@krishika"
    },
  };

function page() {
  return (
    <div className={`ccontainer ${style.container}`}>
        <Hero content="About" />
        <section className={style.main} >
            <h2 className='commonContent' ><span>A passionate</span> <br/> Digital Marketing Enthusiast.</h2>
            <div>
                <div className='imgWrapper'>
                    <Image  priority={false} fill sizes='(max-width: 768px) 100vw, 1000px' loading='eager'
                        alt="Profile image" src="/assets/01_img.jpg"
                    >
                    </Image>
                </div> 
                <div className={style.content}>
                    <h4>I'm Krishika Vyas</h4>
                    <p>I'm a digital marketer who loves helping brands connect with their audience. Over the past few years, I've worked on SEO, SEM, content marketing, and social media. I enjoy creating strategies that mix creative ideas with data to get real results. My focus is on helping brands find their voice and share it in a way that stands out. When I'm not working, I like to explore new places and read to keep my mind fresh and inspired.</p>
                </div>
            </div>
        </section>
        <section className={style.experience} id="experience">
            <h2 className='commonContent' >My <span>Exposure.</span></h2>
            <ExperienceTimeline/>
        </section>
    </div>
  )
}

export default page