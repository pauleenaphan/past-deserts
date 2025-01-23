import { FaGithub } from "react-icons/fa";

import "../styles/Footer.css";

export const Footer = () =>{
    return(
        <footer>
            <p> Copyright @ Pauleen Phan 2025 </p>
            <a href="https://github.com/pauleenaphan/past-deserts" target="_blank" rel="noopener noreferrer">
                <FaGithub id="githubIcon"/>
            </a>
        </footer>
    )
}