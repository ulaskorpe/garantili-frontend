import FooterInfo from "./FooterInfo";
import FooterMenu from "./FooterMenu";

import React, { Component } from 'react';

class Footer extends Component {

//

 

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            socialIcons: [],
        };
    }
    componentDidMount() {
         fetch("https://buyback.garantiliteknoloji.com/api/site/social-icons", {
       // fetch("http://buyback.test/api/site/social-icons", {

        
            headers: {
                'x-api-key': '5c35640a3da4f1e3970bacbbf7b20e6c'
            }
        })
            .then((res) => res.json())
            .then(
                (result) => {

                    this.setState({ isLoaded: true, socialIcons: result });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
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