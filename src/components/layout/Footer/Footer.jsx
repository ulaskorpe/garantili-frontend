import FooterInfo from "./FooterInfo";
import FooterMenu from "./FooterMenu";

import React, { Component } from 'react';

class Footer extends Component {
    state = {
        socialIcons: [
            { id: 1, url: 'https://facebook.com', icon: 'fa fa-facebook' },
            { id: 2, url: 'https://twitter.com', icon: 'fa fa-twitter' },
            { id: 3, url: 'https://instagram.com', icon: 'fa fa-instagram' },
            { id: 4, url: 'https://linkedin.com', icon: 'fa fa-linkedin' },
            { id: 5, url: 'https://youtube.com', icon: 'fa fa-youtube-play' },
        ]
    }
    render() {
        return (
            <footer className="site-footer footer-v1">
                <div className="col-full">
                    <div className="before-footer-wrap">
                        <div className="col-full">
                            <div className="footer-newsletter">
                                <div className="media">
                                    <i className="footer-newsletter-icon tm tm-newsletter"></i>
                                    <div className="media-body">
                                        <div className="clearfix">
                                            <div className="newsletter-header">
                                                <h5 className="newsletter-title">Bültenimize Abone Ol</h5>
                                                <span className="newsletter-marketing-text">
                                                    <strong>10 TL indirim</strong> kuponu kazan!
                                                </span>
                                            </div>
                                            <div className="newsletter-body">
                                                <form className="newsletter-form">
                                                    <input type="text" placeholder="E-posta adresinizi yazın" />
                                                    <button className="button" type="button">Gönder</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-social-icons">
                                <ul className="social-icons nav">
                                    {this.state.socialIcons.map((_, i) => {
                                        return <li className="nav-item" key={i}>
                                            <a className="sm-icon-label-link nav-link" href={_.url}>
                                                <i className={_.icon}></i>
                                            </a>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="row mx-0">
                            <FooterInfo />
                            <FooterMenu />
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer