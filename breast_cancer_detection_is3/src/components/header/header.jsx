import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import { Us } from "react-flags-select";
import { Es } from "react-flags-select";
import { useTranslation } from 'react-i18next';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleChangeLanguage = () => {
        const newLanguage = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    return (
        <header className="header">
            <div className="logo">
                Medical Center
            </div>
            <nav className={`nav ${isOpen ? 'open' : ''}`}>
                <ul style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <li><Link to="/home">{t('header:home')}</Link></li>
                    <li><Link to="/about">{t('header:about')}</Link></li>
                    <li><Link to={`/attention/${11111111}`} >{t('header:attentions')}</Link></li>
                    <li><Link to="/search">{t('header:search')}</Link></li>
                    <li><Link to="/contact" >{t('header:contact')}</Link></li>
                    <li><button style={{backgroundColor:'transparent', paddingBlock:'0rem',border:'none',outline:'none'}} onClick={handleChangeLanguage}>{i18n.language === 'en' ? <Es style={{fontSize:'2rem'}}/> : <Us style={{fontSize:'2rem'}}/>}</button></li>
                </ul>
            </nav>
            <div className="menu-toggle" onClick={toggleMenu}>
                <div className="hamburger"></div>
            </div>
        </header>
    );
}

export default Header;