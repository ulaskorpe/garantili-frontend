import React  from 'react';
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import TopBar from "../layout/TopBar";

export default function Contact() {
    const crumbs = [
        { url: '#', title: 'İletişim' }
    ];

    return (
        <div className="woocommerce-active single-product full-width normal">
            <div id="page" className="hfeed site">
                <TopBar />
                <HeaderMain />
            </div>
            <div id="content" className="site-content" tabIndex="-1">
                <div className="col-full">
                    <div className="row">
                        <BreadCrumb crumbs={crumbs} />
                        <div id="primary" className="content-area">
                            <main id="main" className="site-main">
                                <div className="type-page hentry">
                                    <header className="entry-header border-no">
                                        <div className="page-header-caption border-no text-center">
                                            <h1 className="entry-title border-no">İletişim</h1>
                                        </div>
                                    </header>
                                    <div className="entry-content">
                                        <br />
                                        <div className="track-order w-100 text-center">
                                        <p className="w-80 text-center ml-auto">Nunc ac porta est. Aenean eget elit vitae arcu commodo consectetur. Etiam id aliquam neque, ullamcorper dapibus diam. Ut congue, arcu non aliquam interdum, risus libero ultricies felis, quis blandit mauris sem in felis. </p>
                                        <br />
                                        <br />
                                        </div>
                                        <div className="stretch-full-width-map">
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.7331136664284!2d28.812489415824608!3d41.03109452596853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa51308b0340f%3A0x942e31ece339b666!2sGarantili%20Teknoloji%20Cep%20Telefonu%20Yenileme%20Merkezi!5e0!3m2!1str!2str!4v1645373990418!5m2!1str!2str"
                                                width="600"
                                                height="450"
                                                loading="lazy"
                                                allowFullScreen
                                            />
                                        </div>
                                        <div className="row contact-info">
                                            <div className="col-md-9 left-col">
                                                <div className="text-block">
                                                    <h2 className="contact-page-title">Bize mesaj bırakın</h2>
                                                </div>
                                                <div className="contact-form">
                                                    <div role="form" className="wpcf7" id="wpcf7-f425-o1" lang="en-US" dir="ltr">
                                                        <div className="screen-reader-response" />
                                                        <form className="wpcf7-form" noValidate="novalidate">
                                                            <div className="d-none">
                                                                <input type="hidden" name="_wpcf7" value="425" />
                                                                <input type="hidden" name="_wpcf7_version" value="4.5.1" />
                                                                <input type="hidden" name="_wpcf7_locale" value="en_US" />
                                                                <input type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f425-o1" />
                                                                <input type="hidden" name="_wpnonce" value="e6363d91dd" />
                                                            </div>
                                                            <div className="form-group row">
                                                                <div className="col-xs-12 col-md-6">
                                                                    <label>Adınız
                                                                        <abbr title="required" className="required">*</abbr>
                                                                    </label>
                                                                    <br />
                                                                    <span className="wpcf7-form-control-wrap first-name">
                                                                        <input type="text" aria-invalid="false" aria-required="true"
                                                                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                            size="40" value="" name="first-name" />
                                                                    </span>
                                                                </div>
                                                                <div className="col-xs-12 col-md-6">
                                                                    <label>Soyadınız
                                                                        <abbr title="required" className="required">*</abbr>
                                                                    </label>
                                                                    <br />
                                                                    <span className="wpcf7-form-control-wrap last-name">
                                                                        <input type="text" aria-invalid="false" aria-required="true"
                                                                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                            size="40" value="" name="last-name" />
                                                                    </span>
                                                                </div>

                                                            </div>

                                                            <div className="form-group">
                                                                <label>Konu</label>
                                                                <br />
                                                                <span className="wpcf7-form-control-wrap subject">
                                                                    <input type="text" aria-invalid="false"
                                                                        className="wpcf7-form-control wpcf7-text input-text" size="40" value=""
                                                                        name="subject" />
                                                                </span>
                                                            </div>

                                                            <div className="form-group">
                                                                <label>Mesajınız</label>
                                                                <br />
                                                                <span className="wpcf7-form-control-wrap your-message">
                                                                    <textarea
                                                                        aria-invalid="false"
                                                                        className="wpcf7-form-control wpcf7-textarea"
                                                                        rows="10"
                                                                        cols="40"
                                                                        name="your-message"
                                                                    />
                                                                </span>
                                                            </div>

                                                            <div className="form-group clearfix">
                                                                <p>
                                                                    <input type="submit" value="Mesaj Gönder" className="wpcf7-form-control wpcf7-submit" />
                                                                </p>
                                                            </div>

                                                            <div className="wpcf7-response-output wpcf7-display-none" />
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-3 store-info">
                                                <div className="text-block">
                                                    <h2 className="contact-page-title">Merkez</h2>
                                                    <address>
                                                        Nur Yıldız Plaza, 15 Temmuz Mah. Gülbahar Cad. B Blok. No:7 Kapı No 21
                                                        Bağcılar / İSTANBUL
                                                    </address>
                                                    <h3>Çalışma Saatleri</h3>
                                                    <ul className="list-unstyled operation-hours inner-right-md">
                                                        <li className="clearfix">
                                                            <span className="day">Pazartesi:</span>
                                                            <span className="pull-right flip hours">09:00 - 18:00</span>
                                                        </li>
                                                        <li className="clearfix">
                                                            <span className="day">Salı:</span>
                                                            <span className="pull-right flip hours">09:00 - 18:00</span>
                                                        </li>
                                                        <li className="clearfix">
                                                            <span className="day">Çarşamba:</span>
                                                            <span className="pull-right flip hours">09:00 - 18:00</span>
                                                        </li>
                                                        <li className="clearfix">
                                                            <span className="day">Perşembe:</span>
                                                            <span className="pull-right flip hours">09:00 - 18:00</span>
                                                        </li>
                                                        <li className="clearfix">
                                                            <span className="day">Cuma:</span>
                                                            <span className="pull-right flip hours">09:00 - 18:00</span>
                                                        </li>
                                                        <li className="clearfix">
                                                            <span className="day">Cumartesi:</span>
                                                            <span className="pull-right flip hours">09:00 - 18:00</span>
                                                        </li>
                                                        <li className="clearfix">
                                                            <span className="day">Pazar:</span>
                                                            <span className="pull-right flip hours">Kapalı</span>
                                                        </li>
                                                    </ul>
                                                    <h3>E-Posta</h3>
                                                    <p className="inner-right-md">E-Posta: <a href="mailto:info@garantili.com.tr">info@garantili.com.tr</a></p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </div >
    )
}