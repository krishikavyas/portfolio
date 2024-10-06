import style from './BlogPage.module.scss';
import { notFound } from 'next/navigation';
import { getBlogs } from '@/utils/api';
import Blogs from '@/components/Blogs/Blogs';
import Hero from '@/components/HeroSection/Hero';
import { IoSearch } from 'react-icons/io5';


export const revalidate = 0

export default async function Page() {
  let items = { blogs : [], category: []};

  try {
    items = await getBlogs();
    console.log({ttt: items})
  } catch (error) {
    console.error('Error in getData:', error);
    return notFound(); 
  }


  const data = {
    "Recent Posts": items.blogs.map(e => ({title: e.title, url: `/blog/${e.slug}`})),
    // "Categories": items.category.map(e => ({title: `${e.name} (${e.count})`, url: `?${e.name}`})),
    "Categories": items.category.map(e => ({title: `${e.name} (${e.count})`, url: `#`})),

}

  return (
    <main className={`${style.journalSection} ccontainer`}>
            <Hero content="Journal" />
            <div className={style.journalcontent}>
                <div className={style.blog}>
                    <Blogs items={items.blogs} />
                    <div className={style.btnSection}>
                        <a href="#">load more</a>
                    </div>
                </div>
                <div className={style.searchSection}>
                    {/* <div className={style.search}>
                        <input type='text' placeholder='Type something to search' />
                        <span><IoSearch /></span>
                    </div> */}
                    {
                        Object.keys(data).map((e, i) => {
                            return (
                                <div className={style.search} key={e}>
                                    <div className={style.listSectoion}>
                                        <h5>{e}</h5>
                                        <ul>
                                            {data[e].map((item => (<li key={item}><a href={item.url}>{item.title}</a></li>)))}
                                        </ul>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </main>
  );
}
