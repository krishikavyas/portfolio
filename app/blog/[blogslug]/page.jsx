import Image from 'next/image'
import React from 'react'
import style from './blogSlug.module.scss'
import usericon from '../../../public/images/usericon1.png'
import info from '../../../assets/joneralInfo.json'
import { JSDOM } from 'jsdom';
import GoBack from './GoBack'

const { firstname, lastname } = info

export const revalidate = 0

let prevData = null

const getData = async (slug) => {
    if(prevData) {
        return prevData.blogs
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/blog?id=${slug}`, {
        next: { revalidate: 0 }
    });

    if (!res.ok) {
        const errorData = await res.text()
        throw new Error(`Failed to fetch data: ${errorData}`);
    } 
    prevData = await res.json()
    return prevData.blogs;
};

function generateTOC(content) {
    const dom = new JSDOM(content);
    const headers = Array.from(dom.window.document.querySelectorAll('h2, h3, h4'));
    const tocItems = [];

    headers.forEach(header => {
        if (header.textContent) {
            const slug = header.textContent.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
            const id = header.id || slug;

            header.id = id;

            tocItems.push({
                id,
                title: header.textContent,
                level: parseInt(header.tagName.substring(1)),
            });
        }
    });

    const updatedContent = dom.window.document.body.innerHTML;

    return { tocItems, updatedContent };
}

export async function generateMetadata({ params: { blogslug } }) {
    let data = {};
    try {
        data = await getData(blogslug);
    } catch (e) {
        return {};
    }

    const { seo } = data;

    return {
        title: seo?.title || data.title,
        description: seo?.description || data.description,
        keywords: seo?.keywords || '',
        alternates: {
            canonical: seo?.canonical ? `${process.env.NEXT_PUBLIC_HOST}/blog/${seo.canonical}` : `${process.env.NEXT_PUBLIC_HOST}/blog/${data.slug}`,
        },
        openGraph: {
            title: `Blog - ${seo.title || data.title}`,
            type: "article",
            url: new URL(`${process.env.NEXT_PUBLIC_HOST}/blog/${data.slug}`),
            images: [data.img], 
            description: seo?.description || data.description,
            card:[data.img],
            locale: "en_IN",
            siteName: "Krishika's Blog",
            site:"@krishika",
            author: "krishika"
          },
    };
}


const Page = async ({ params: { blogslug } }) => {
    let data = {}
    try {
        data = await getData(blogslug);
    } catch (e) {
        return notFound()
    }

    const { tocItems, updatedContent } = generateTOC(data.content);



    return (
        <main className="container">
            <section className={style.blogpageSection}>
                <div className={style.backbtnContent}>
                    <GoBack/>
                </div>
                <div className={style.wrapper}>
                    <div className={style.blogContent}>
                        <div>
                            <h1 className={style.title}>{data.title}</h1>
                            <div>
                                <div className={style.bloginfo}>
                                    <div className={style.bloguser}>
                                        <Image src={usericon} alt="usericon" />
                                    </div>
                                    <div className={style.details}>
                                        <p>{firstname + ' ' + lastname}</p>
                                        <p>
                                            <span>{new Date(data.date).toLocaleString()}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className='imgWrapper imgWithAspec'>
                            <Image priority={false} fill sizes='(max-width: 768px) 100vw, 1000px' loading='eager'
                                alt={`${data.title} image`} src={data.img} className={style.blogImg}
                            />
                        </div> */}
                        <div className={`${style.content} blog-post`} dangerouslySetInnerHTML={{ __html: updatedContent }}>
                        </div>
                    </div>

                    <div className={style.sidebar}>
                        <div className={style.toc}>
                            <h2>Table of Contents</h2>
                            <ul className={style.tocList}>
                                {tocItems.map((item) => (
                                    <li key={item.id} className={style.tocItem} style={{ marginLeft: `${(item.level - 1) * 30}px` }}>
                                        <a href={`#${item.id}`} className={style.tocLink}>
                                            {item.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Page;
