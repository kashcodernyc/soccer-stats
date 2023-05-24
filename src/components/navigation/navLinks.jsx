import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ activeLink, setActiveLink }) => {

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <nav className="navigation-bar">
            <Link
                to="/nba"
                className={`nav-item ${activeLink === 'nba' ? 'active' : ''}`}
                onClick={() => handleLinkClick('nba')}
            >
                NBA
            </Link>
            <Link
                to="/soccer"
                className={`nav-item ${activeLink === 'soccer' ? 'active' : ''}`}
                onClick={() => handleLinkClick('soccer')}
            >
                SOCCER
            </Link>
            <Link
                to="/ufc"
                className={`nav-item ${activeLink === 'ufc' ? 'active' : ''}`}
                onClick={() => handleLinkClick('ufc')}
            >
                UFC
            </Link>
        </nav>
    );
};

export default Navigation;