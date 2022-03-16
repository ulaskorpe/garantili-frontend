import React  from 'react';
import { useState } from "react"
import BreadCrumb from "../layout/BreadCrumb"
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"

function OrderFollow() {
    const [crumb] = useState([
        { url: '#', title: 'Sipariş Takibi' }
    ])

    return (
        <div className="woocommerce-active single-product full-width normal">
            <div id="page" className="hfeed site">
                <TopBar />
                <HeaderMain />
            </div>
            <div id="content" className="site-content" tabIndex="-1">
                <div className="col-full">
                    <div className="row">
                        <BreadCrumb crumbs={crumb} />
                        <div id="primary" className="content-area">
                            <main id="main" className="site-main">
                                <div className="type-page hentry">
                                    <div className="entry-content">
                                        <br />
                                        <br />
                                        <div className="woocommerce">
                                            <div className="customer-login-form">
                                                <div id="customer_login" className="u-columns col2-set">
                                                    <div className="col-md-4 col-sm-12 plr-6 right-seperator">
                                                        <h2>Sipariş Takip</h2>
                                                        <form method="post" className="woocomerce-form woocommerce-form-login login">
                                                            <p className="before-login-text form-text-cb">
                                                                Siparşinizi kargo takibinizi yapabilirsiniz.
                                                            </p>
                                                            <p className="form-row form-row-wide">
                                                                <label htmlFor="username">Sipariş Takip Numarası
                                                                    <span className="required">*</span>
                                                                </label>
                                                                <input type="text" className="input-text" name="username" id="username" value="" />
                                                            </p>
                                                            <p className="form-row">
                                                                <input className="woocommerce-Button button btn-navy" type="submit" value="Ara"
                                                                    name="login" />
                                                            </p>
                                                        </form>
                                                    </div>
                                                    <div className="col-md-4 col-sm-12 plr-6 right-seperator">
                                                        <h2>Onarım Takip</h2>
                                                        <form className="woocommerce-form woocommerce-form-login register" method="post">
                                                            <p className="before-register-text form-text-cb mb-4">
                                                                Cihaz Onarım Takibinizi Yapabilirsiniz
                                                            </p>

                                                            <p className="form-row form-row-wide">
                                                                <label htmlFor="reg_email">Onarım Takip Numarası
                                                                    <span className="required">*</span>
                                                                </label>
                                                                <input type="email" value="" id="reg_email" name="email"
                                                                    className="woocommerce-Input woocommerce-Input--text input-text" />
                                                            </p>
                                                            <p className="form-row">
                                                                <input type="submit" className="woocommerce-Button button btn-navy" name="register"
                                                                    value="Ara" />
                                                            </p>
                                                        </form>
                                                    </div>
                                                    <div className="col-md-4 col-sm-12 plr-6">
                                                        <h2>Telefon Sat Takip</h2>
                                                        <form className="woocommerce-form woocommerce-form-login register" method="post">
                                                            <p className="before-register-text form-text-cb mb-4">Telefon Sat Kargo Takibinizi Yapabilirsiniz</p>

                                                            <p className="form-row form-row-wide">
                                                                <label htmlFor="reg_email">Telefon Satış Takip Numarası
                                                                    <span className="required">*</span>
                                                                </label>
                                                                <input type="email" value="" id="reg_email" name="email"
                                                                    className="woocommerce-Input woocommerce-Input--text input-text" />
                                                            </p>
                                                           
                                                            <p className="form-row">
                                                                <input type="submit" className="woocommerce-Button button btn-navy" name="register"
                                                                    value="Ara" />
                                                            </p>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default OrderFollow