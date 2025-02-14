import styles from "./page.module.scss";
import Projects from "@/components/Project/Projects";
import { getBlogs } from "@/utils/api";
import Blogs from "@/components/Blogs/Blogs";
import Link from "next/link";
import { notFound } from "next/navigation";
import info from "../assets/joneralInfo.json"

const data = [
  { title: "Trading : ", desc: "Enhancing visibility for financial trading platforms.", },
  { title: "eCommerce : ", desc: "Driving sales through effective digital marketing strategies.", },
  { title: "Clothing : ", desc: "Building brand presence and increasing customer engagement.", },
  { title: "Business Consultancy : ", desc: "Creating strategies for client acquisition and retention.", },
  { title: "Food : ", desc: "Promoting food businesses and enhancing online presence.", },
  { title: "Blogs (Media) : ", desc: "Increasing readership and online traffic.", }
]



export default async function Home() {

  let items = { blogs: [], category: [] };

  try {
    items = await getBlogs(3);
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
            <p>Hey, this is <b>Krishika</b>, a Passionate <b>Digital Marketing Enthusiast</b> with a flair for crafting digital success stories.</p>
          </div>
          {/* <div className={styles.imgSection}>
            <Image src={img1} alt="img1" />
          </div> */}
        </div>
        <section className={`ccontainer ${styles.experience}`}>
          <div >
            <h2 className={styles.title}>My Experience</h2>
            <h3 className={styles.subtitle}>Industries I&apos;ve Worked With</h3>
            <ul className={styles.list}>
              {data.map((item, index) => (
                <li key={index} className={styles.listItem}>
                  <h4 className={styles.itemTitle}>{item.title}</h4>
                  <p className={styles.itemDesc}>{item.desc}</p>
                </li>
              ))}
            </ul>
            <Link href="/about#experience" className={styles.button}>
              Learn More
            </Link>
          </div>
        </section>
        <Projects />

        <div className={styles.likemyWork}>
          {/* <h2 className={styles.title}>Like my work? Want to have a good quality photographies?<br /> You can contact me now!</h2> */}
          <a href={`mailto:${info.email}?subject=Inquiry about Marketing Work`} className={styles.contactBtn}>contact</a>
        </div>
        {items.blogs.length && <div className={styles.blogging}>
          <div className=" ccontainer">

            <h2 className={`${styles.title} commonContent`}> <Link href="/blog" ><span>Blogging</span></Link></h2>

            <Blogs items={items.blogs} />
          </div>
        </div>}
      </main>
    </>
  );
}