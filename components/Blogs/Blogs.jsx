import React from 'react'
import styles from './Blogs.module.scss'
import Image from 'next/image'
import Link from 'next/link'

  
const Blogs = ({items}) => {
    return (
        <div className={styles.blogItems}>
            {items?.map((item, index) => {
                const isPriority = index <= 3; 
                return <Link href={`/blog/${item.slug}`} key={item.slug} className={styles.singleItem}>
                    <div>
                        <div className={styles.blogImg}>
                            <div className='imgWrapper imgWithAspec' style={{height: "100%"}}>
                                <Image 
                                    priority={isPriority} 
                                    loading={isPriority ? 'eager' : 'lazy'} 
                                    style={{height: "100%"}}  
                                    fill 
                                    sizes='(max-width: 768px) 100vw, 1000px' 
                                    src={item.img} 
                                    alt={`Image for ${item.img}`} 
                                />
                            </div>
                            <div className={styles.hoverItem}>{item.category}</div>
                        </div>
                        <div>
                            <p className={styles.title}>{item.title}</p>
                        </div>
                    </div>
                </Link>
            })}
        </div>
    )
}

export default Blogs