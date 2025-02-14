import React from 'react'
import style from './NavBar.module.scss'
import NavItems from './NavItems';
import logo from "@/public/LOGOO.png"
import Image from 'next/image';
import Link from 'next/link';

function NavBar() {
  return (
    <div className={`${style.footerSection} ccontainer`}>
      <Link href="/" ><Image src={logo} alt='KV Logo' /> </Link> 
      <NavItems/>
    </div>
  )
}

export default NavBar