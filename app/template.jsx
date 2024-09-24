"use client"; 
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import './FlashScreen.css'; 
import logo from "@/public/logo.png"
import Image from "next/image";

const blackBox = {
  initial: {
    width: "100vw", 
    right: 0, 
  },
  animate: {
    transform: "translateX(100%)",
    transition: {
      delay: 2, 
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const textVariants = {
  initial: {
    opacity: 0,
    scale: 0.5, 
  },
  animate: {
    opacity: 1,
    scale: 1, 
    transition: {
      duration: 0.5, 
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const toTop = () => {
  // if (typeof window !== "undefined") {
  //   window.scrollTo(0, 0);
  // }
}

const FlashScreen = ({ children }) => {

  return (
    <>
        <motion.div
          className="flash-wrapper"
          initial="initial"
          animate="animate"
          variants={blackBox}
          onAnimationComplete={toTop}
        >

          <motion.div
            style={{ position: 'relative', width: '200px', height: '200px' }}
            variants={textVariants} 
          >
            <Image
              src={logo}
              alt="Logo"
              layout="fill" 
              objectFit="contain" 
            />
          </motion.div>
        </motion.div>

      {children}
    </>
  );
};

export default FlashScreen;
