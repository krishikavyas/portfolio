import React from 'react'
import styles from "./Project.module.scss"
import details from "@/assets/projectDetail.js"
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'
import "../../blog.scss"

const renderDesc = ({data}) => <p>{data.desc}</p>
const renderImg = ({data}) => (
  <div className='imgWrapper'>
    <Image priority={false} fill sizes='(max-width: 768px) 100vw, 1000px' loading='eager' alt={`${data.title} image`} src={data.img} />
  </div>
)

const renderMain = ({data}) => {
  return (
    <main className={styles.about}>
      <p>{data.main.description}</p>
      {/* <div>
        <p><strong>Role:</strong> {data.main.role}</p>
        <p><strong>Timeline:</strong> {data.main.timeline}</p>
        <p><strong>Platform:</strong> {data.main.platform}</p>
      </div> */}
    </main>
  )
}

const renderFaq = ({data}) => {
  return (
    <div className={styles.faq}>
      {data.faq.map((item, i) => (
        <div key={i} className={styles.faqItem}>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      ))}
    </div>
  )
}

const renderList = ({data}) => {
  return (
    <ul className={styles.list}>
      {data.list.map((item, i) => {
          const data = item.split(":")
          const isB = data.length > 1;
          const value = isB  ? data[1] : data[0]
          
          return <li key={i}>{isB && <b>{data[0]} : </b>}{value}</li>
      })}
    </ul>
  )
}

const renderListIcon = ({data}) => {
  return (
    <div className={styles.iconList}>
      {data.iconList.map(el => (
        <div key={el.title}>
          <div><el.img size={40}/></div>
          {el.title}
        </div>
      ))}
    </div>
  )
}

const componentMap = {
  "desc": renderDesc, 
  "img": renderImg,
  // "main": renderMain,
  "list": renderList,
  "faq": renderFaq,
  "iconList": renderListIcon
}




export async function generateMetadata({params: {projectId}}) {
  const data = details.find(pro => pro.slug == projectId)
  if(!data) return {}
  const title = data.seo?.title || data.title
  const desc = data.seo?.desc || data.sections[0]?.desc || `Description about the project : ${data.title}`
  const keywords = data.seo?.keywords || ["Krishika", "SEO expert", "onsite SEO", "offsite SEO", "technical SEO", "website ranking", "visibility"]

  return {
    title: {
      template: `%s | ${data.title}`,
      default: title,
    },
    description : desc,
    openGraph: {
      title : title,
      description : desc,
      images: [`/project/${projectId}/og/${projectId}.png`],
      url : `/project/${projectId}`,
      card: "summary_large_image",
      locale: "en_US",
      type: "article",
      siteName: "Krishika's portfolio",
      site:"@krishika"
    },
    alternates: {
      canonical: `/project/${projectId}`
    },
    keywords: keywords,
    author: "Krishika",
    robots: "index, follow",
  }
}


function ProjectDetail({params: {projectId}}) {
  const data = details.find(pro => pro.slug == projectId)
  if(!data) notFound()

  return (
    <div className={`${styles.container} rightRing centerRing`}>
      <h1>{data.title}</h1>
      <div>
        <div className={styles.imgContainer}>
          <Image  priority={false} fill sizes='(max-width: 768px) 100vw, 1000px' loading='eager'
            alt={`${data.title} image`} src={data.bannerImg} className={styles.banner}
          >
          </Image>
        </div>
        <div className={`${styles.main} blog-post`}>
          {data.sections.map((section, index) => (
            <section key={index} className={`${styles.section}`} style={section.style || {}}>
              <h2 className={styles.title}>{section.title}</h2>
              {Object.keys(section).map(e => {
                const Component = componentMap[e]
                if(!Component) return null
                return <Component key={e} data={section} />
              })}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}


export default ProjectDetail

