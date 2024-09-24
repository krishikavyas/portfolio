import React from 'react'
import style from "./Hero.module.scss"

function Hero({content}) {
  return (
    <div className={style.container}>
        <h1>{content}<span>.</span></h1>
        <div>{content}</div>
    </div>
  )
}

export default Hero