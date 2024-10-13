"use client"

import React, { useEffect } from 'react';
import Script from 'next/script';

function VerticalAds() {



    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch (error) {
            console.log({error})
        }
    },[])

    return (
        <>
            <Script 
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                strategy="lazyOnload"
            />
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-5251887967635650"
                data-ad-slot="1275872546"
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </>
    );
}

export default VerticalAds;
