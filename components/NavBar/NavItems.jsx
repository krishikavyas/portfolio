"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import style from './NavBar.module.scss'
import { TbMenu } from 'react-icons/tb';
import { usePathname, useRouter } from 'next/navigation';
import logo from "@/public/LOGOO.png"
import Image from 'next/image';



const items = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Work", href: "/works" },
    { title: "Journal", href: "/blog" },
    { title: "Contact", href: "/contact" },
]


function NavItems() {
    const [isActive, setIsActive] = useState(false)
    const path = usePathname()

    return (
        <>
            <div className={style.menu} onClick={() => { console.log("Clicked"); setIsActive(true)}} > menu <span><TbMenu /></span> </div>
            <div className={`${style.container} centerRing ${isActive ? style.visible : style.hidden}`}>
                <div className='ccontainer'>
                    <div className={style.footerSection} >
                        <div><Image src={logo} />  </div>
                        <div className={style.menu} onClick={() => { console.log("Clicked"); setIsActive(p => !p)}} > Close <span><IoMdClose /></span> </div>
                    </div>
                    <ul className={style.menuItems}>
                        {items.map(e => (
                            <li 
                                onClick={() => setIsActive(false)} 
                                key={e.href} 
                                className={`LinkStyle ${isActive ? style.animated : ''} ${path == e.href ? `LinkStyleActive ${style.active}` : ""}`}
                            > <Link href={e.href}> <span>{e.title}</span></Link></li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default NavItems