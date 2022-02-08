import React, { Component } from "react";

class FooterInfo extends Component {

    render() {
        return (
            <div className="col-lg-5 col-md-12 col-sm-12 col-12 form-inline footer-contact mt-5 footer-content">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 footer-info">
                    <div className="footer-logo mb-lg-5 mb-3">
                        <a href="#" className="custom-logo-link" rel="home">
                            <img src="/assets/images/LOGOf.svg" className="footer-logo" />
                        </a>
                    </div>
                    <div className="footer-contact-info">
                        <div className="media">
                            <span className="media-left icon media-middle">
                            </span>
                            <div className="media-body">
                                <span className="call-us-title">ÇAĞRI MERKEZİMİZE 7/24 ULAŞIN</span>
                                <span className="call-us-text">0 (212) 485 28 29</span>
                                <address className="footer-contact-address">Nur Yıldız Plaza, 15 Temmuz Mah.
                                    Gülbahar Cad. B Blok. No:7 Kapı No 21
                                    Bağcılar / İSTANBUL
                                </address>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className="footer-payment-info  mx-auto">
                        <div className="media">
                            <span className="media-left icon media-middle">
                            </span>
                            <div className="media-body">
                                <h5 className="footer-payment-info-title mt-0">100% GÜVENLİ ALIŞVERİŞ</h5>
                                <div className="footer-payment-icons mb-3">
                                    <ul className="list-payment-icons nav">
                                        <li className="nav-item">
                                            <img className="payment-icon-image"
                                                src="/assets/images/credit-cards/mastercard.svg"
                                                alt="mastercard" />
                                        </li>
                                        <li className="nav-item">
                                            <img className="payment-icon-image"
                                                src="/assets/images/credit-cards/visa.svg" alt="visa" />
                                        </li>
                                        <li className="nav-item">
                                            <img className="payment-icon-image logo-troy"
                                                src="/assets/images/credit-cards/troy-logo-6A31281792-seeklogo.com.png"
                                                alt="troy" />
                                        </li>
                                    </ul>

                                <img src="/assets/images/credit-cards/internette-guvenli-alisveris.svg" width='180' />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default FooterInfo