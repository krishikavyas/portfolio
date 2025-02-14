import { MdOutlineArrowRightAlt } from 'react-icons/md'
import styles from "./projects.module.scss"
import Image from 'next/image'
import data from "@/assets/projectsData.json"
import Link from 'next/link'

function Projects() {
    return (
        <section className={`ccontainer ${styles.projects}`}>
            <div >
                <h2 className={`commonContent `}>My <span>Skills</span></h2>
                <div className={styles.grid}>
                    {data.map((item, index) => {
                        const isPriority = index <= 3;
                        return (
                            <Link href={`/work/${item.slug}`} key={index} className={styles.project}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        priority={isPriority}
                                        loading={isPriority ? 'eager' : 'lazy'}
                                        fill
                                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                        alt={`${item.title} Image`}
                                        src={item.img || "/placeholder.svg"}
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.overlay}>
                                    <h3 className={styles.projectTitle}>{item.title}</h3>
                                    <span className={styles.viewProject}>
                                        View Project <MdOutlineArrowRightAlt className={styles.icon} />
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default Projects
