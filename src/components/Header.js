import React from 'react';
import logo from '../images/__logoheader.png';
import { Link, useRouteMatch } from 'react-router-dom';

function Header({ handleSignOut, email }) {
    const [open, setOpen] = React.useState(false);

    const handleMenu = () => {
        setOpen(!open);
    }

    const onSignOut = () => {
        handleSignOut();
        setOpen(false);
    };

    return(
        <header className="header">
            <img className="header__logo" src={logo} alt="logo" />
            {useRouteMatch("/signin") && (
                <Link to="/signup" className="header__link">
                    Regístrate
                </Link>
            )}

            {useRouteMatch("/signup") && (
                <Link to="/signin" className="header__link">
                    Inicia sesión
                </Link>
            )}
        </header>
    );
}

export default Header;