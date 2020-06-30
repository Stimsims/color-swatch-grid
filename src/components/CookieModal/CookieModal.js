import React, {useState, useEffect} from 'react';
import CookieConsent from "react-cookie-consent";
import './styles.css';

const Cookie = (props) => {
    return <CookieConsent
        location="bottom"
        buttonText="Okay"
        cookieName="cookieMedallion"
        style={{ background: "#A7B8C0", opacity: 0, transform: 'translateY(50%)', animation: 'fadeInCookie 1s ease forwards' }}
        buttonStyle={{ color: "#A7B8C0", backgroundColor: '#334C73', fontSize: "13px" }}
        expires={150}
    >
        <p className="cookieConsent" style={{color: '#334C73'}}>This website uses cookies to improve your experience.</p>
    </CookieConsent>
}

export default Cookie;