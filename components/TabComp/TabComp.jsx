'use client'
import React from 'react'
import style from './TabComp.module.scss'

const TabComp = ({items, setActive,active}) => {
    
    return (
        <div className={style.items}>
            {items.map((e, i) => 
                <p key={e}
                    style={active == i ? { backgroundColor: "#F7AB1E", color: "black" } : {}}
                    onClick={() => setActive(i)}
                >{e}</p>
            )} 
        </div>
    )
}

export default TabComp