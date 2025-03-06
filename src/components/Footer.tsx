import { FaGithub } from "react-icons/fa";

import "../styles/Footer.css";

export const Footer = () =>{
    return(
        <div className="outerFooter">
            <footer>
                <p> Copyright @ Pauleena Phan 2025. All Rights Reserved </p>
                <a href="https://github.com/pauleenaphan/past-deserts" target="_blank" rel="noopener noreferrer">
                    <FaGithub id="githubIcon"/>
                </a>
            </footer>
        </div>
        
    )
}