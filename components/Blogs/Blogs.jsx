import React from 'react'
import styles from './Blogs.module.scss'
import Image from 'next/image'
import Link from 'next/link'

  
const Blogs = ({items}) => {
    return (
        <div className={styles.blogItems}>
            {items?.map(item => (
                <Link href={`/blog/${item.slug}`} key={item.type} className={styles.singleItem}>
                    <div>
                        <div className={styles.blogImg}>
                            <div className='imgWrapper imgWithAspec' style={{height: "100%"}}>
                                <Image style={{height: "100%"}}  priority={false} fill sizes='(max-width: 768px) 100vw, 1000px' loading='eager'
                                    src={item.img} alt={`Image for ${item.img}`} 
                                />
                            </div>
                            <div className={styles.hoverItem}>{item.category}</div>
                        </div>
                        <div>
                            <p className={styles.title}>{item.title}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Blogs