import { MdOutlineArrowRightAlt } from 'react-icons/md'
import styles from "./projects.module.scss"
import Image from 'next/image'
import data from "@/assets/projectsData.json"
import Link from 'next/link'

function Projects() {

    return (
        <div className={styles.myWork}>
            <h2 className={`${styles.title} commonContent ccontainer`}> <a href="#" >My <span>work</span></a></h2>
            <div >
                <div>
                    <div className={styles.tabImg}>
                    {data.map((item, index) => {
                        const isPriority = index <= 3; 
                        return (
                            <Link href={`/work/${item.slug}`} key={index} className={styles.imgcontent}>
                                <div className={`imgWrapper ${styles.catImg}`}>
                                    <Image
                                        priority={isPriority} 
                                        loading={isPriority ? 'eager' : 'lazy'} 
                                        fill
                                        sizes='(max-width: 750px) 90vw, 750px'
                                        alt={`${item.title} Image`}
                                        src={item.img}
                                    />
                                </div>
                                <div className={styles.hoverContent}>
                                    <h3>{item.title}</h3>
                                    <span>Look Inside <MdOutlineArrowRightAlt /> </span>
                                </div>
                            </Link>
                        );
                    })}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects