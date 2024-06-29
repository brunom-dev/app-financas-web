import React from "react";
import './style.css';

export const Header = () => {
    return(
        <header>
            <div className={'box-logo-principal'}>
                <h1>App Finanças</h1>
            </div>

            <div className="menu">
                <ul>
                    <li>
                        <a href="https://github.com/brunom-dev" target="_blank">
                            <i className="bi bi-github"></i>
                            <span>Github</span>
                        </a>
                    </li>
                    
                    <li>
                        <a href="https://instagram.com/brunomacedo.dev" target="_blank">
                            <i className="bi bi-instagram"></i>
                            <span>Instagram</span>
                        </a>    
                    </li>
                    
                    <li>
                        <a href="https://linkedin.com/in/bruno-macedo-dev/" target="_blank">
                            <i className="bi bi-linkedin"></i>
                            <span>Linkedin</span>
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    )
}