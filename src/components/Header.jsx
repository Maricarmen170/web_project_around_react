import React from 'react';
import logo from '../Blocks/images/__logoheader.png'

function Header() {
    return(
        <header className="header">
            <img className="header__logo" 
            src={logo} 
            alt="logo" />
        </header>
    );
}

export default Header;