import React from 'react'
import img2 from '@/public/assets/img1.jpeg'
import img3 from '@/public/assets/img2.jpeg'
import img5 from '@/public/assets/img4.jpeg'
import Image from 'next/image'
import style from './projectDetails.module.scss'

const projectDetails = () => {
    return (
        <div className={`ccontainer ${style.workdesc}`}>
            <div className={style.imgSection}>
                <div>
                    <Image src={img2} alt='img2' />
                </div>
                <div>
                    <Image src={img3} alt='img2' />
                </div>
                <div>
                    <Image src={img5} alt='img2' />
                </div>
            </div>
            <div className={style.contentSection}>

            </div>
        </div>
    )
}

export default projectDetails