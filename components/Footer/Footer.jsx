import React from 'react'
import style from './Footer.module.scss'
const Footer = () => {
    return (
        <div className={`${style.footerSection} ccontainer`}>
            <div>
                <p>Built with ♥ by Krishika</p>
            </div>
            <div>
                <ul>
                    <li><a href="https://www.instagram.com/marketing_with.k/">Instagram</a></li>
                    <li><a href="https://www.linkedin.com/in/krishika-vyas-35790221b/?originalSubdomain=in">Linked In</a></li>

                </ul>
            </div>
        </div>
    )
}

export default Footer