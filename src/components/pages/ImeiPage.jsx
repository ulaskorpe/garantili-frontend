import React from 'react';
import { useState } from "react";
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import TopBar from "../layout/TopBar";

export default function ImeiCheck() {
    const [crumbs] = useState([{ url: '#', title: 'IMEI Sorgulama' }])


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
                                        <div className="page-header-caption text-center">
                                            <h1 className="entry-title">IMEI Sorgulama</h1>
                                            <br />
                                        </div>
                                    </header>
                                    <div className="entry-content">
                                        <div className="woocommerce w-100 ">
                                            <form className="track_order ml-auto" method="post" action="#">
                                                <p>To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
                                                <p className="form-row">
                                                    <span className="col-md-3" />
                                                    <p className="col-md-5" >
                                                        <label htmlFor="orderid">IMEI Kodu</label>
                                                        <input type="text" placeholder="IMEI kodu gir" id="orderid" name="orderid" className="input-text" />
                                                    </p>
                                                    <p className="col-md-1 imei-btn">
                                                        <input type="submit" name="track" value="Gönder" className="border-button" /></p>
                                                </p>
                                            </form>
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