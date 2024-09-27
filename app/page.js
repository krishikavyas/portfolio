import Image from "next/image";
import styles from "./page.module.scss";
import img1 from '../public/assets/01_img.jpg'
import Projects from "@/components/Project/Projects";
import { getBlogs } from "@/utils/api";
import Blogs from "@/components/Blogs/Blogs";
import Link from "next/link";
import { notFound } from "next/navigation";




export default async function Home() {

  let items = { blogs : [], category: []};

  try {
    items = await getBlogs();
  } catch (error) {
    console.error('Error in getData:', error);
    return notFound(); // Return 404 if data fetching fails
  }

  return (
    <>
      <main className={styles.main}>
        {/* <a href="https://store.adveits.com/project/oxer/wp/demo/" target="__blank"/> */}
        <div className={`${styles.topSection} ccontainer`}>
          <div className={styles.contentSection}>
            <h1 className={styles.title}>Hello<span>.</span></h1>
            <div className={styles.title}>Hello</div>
            <p>Hey, this is Krishika, a Passionate Digital Marketing Enthusiast with a flair for crafting digital success stories.</p>
          </div>
          {/* <div className={styles.imgSection}>
            <Image src={img1} alt="img1" />
          </div> */}
        </div>
        <Projects/>
        <div className={styles.likemyWork}>
          {/* <h2 className={styles.title}>Like my work? Want to have a good quality photographies?<br /> You can contact me now!</h2> */}
          <a href="#" className={styles.contactBtn}>contact</a>
        </div>
        {items.blogs.length && <div className={styles.blogging}>
          <div className=" ccontainer">

            <h2 className={`${styles.title} commonContent`}> <Link href="/blog" ><span>Blogging</span></Link></h2>
            
            <Blogs items={items.blogs}/>
          </div>
        </div>}
      </main>
    </>
  );
}



// https://store.adveits.com/project/oxer/wp/demo/