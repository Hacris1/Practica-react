import React from 'react';

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="site-footer" role="contentinfo">
            <div className="footer-inner">
                <div className="brand">
                    <strong>PostManager</strong>
                    <span className="tagline">Aprendiendo React paso a paso</span>
                </div>
                <nav aria-label="Footer links" className="footer-nav">
                    <a href="https://react.dev/" target="_blank" rel="noreferrer">React Docs</a>
                    <a href="https://developer.mozilla.org/" target="_blank" rel="noreferrer">MDN</a>
                    <a href="https://jsonplaceholder.typicode.com/" target="_blank" rel="noreferrer">API Posts</a>
                </nav>
                <div className="legal">
                    <small>&copy; {year} CI2 Demo. Todos los derechos reservados.</small>
                </div>
            </div>
        </footer>
    );
}
