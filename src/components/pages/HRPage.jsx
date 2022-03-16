import React from 'react';
import { useState } from "react";
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import TopBar from "../layout/TopBar";

export default function HRPage() {
    const [crumbs] = useState([{ url: '#', title: 'İnsan Kaynakları' }])
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
                                    <header className="entry-header">
                                        <div className="page-header-caption text-center">
                                            <h1 className="entry-title">İnsan Kaynakları</h1>
                                        </div>
                                    </header>
                                    <div className="entry-content">
                                        <div className="row contact-info">
                                            <div className="col-md-12 left-col">
                                                <div className="text-block">
                                                    <h2 className="contact-page-title">Bizimle çalışmak ister misiniz?</h2>

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
                                                                <div className="col-xs-12 col-md-4">
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
                                                                <div className="col-xs-12 col-md-4">
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

                                                                <div className="col-xs-12 col-md-4">
                                                                    <label>Net ücret beklentisi (₺)
                                                                        <abbr title="required" className="required">*</abbr>
                                                                    </label>
                                                                    <br />
                                                                    <span className="wpcf7-form-control-wrap first-name">
                                                                        <input type="text" aria-invalid="false" aria-required="true"
                                                                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                            size="40" value="" name="salary" />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <div className="col-xs-12 col-md-4">
                                                                    <label>Departman
                                                                        <abbr title="required" className="required">*</abbr>
                                                                    </label>
                                                                    <br />
                                                                    <span className="wpcf7-form-control-wrap last-name">
                                                                        <input type="text" aria-invalid="false" aria-required="true"
                                                                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                            size="40" value="" name="depeartment" />
                                                                    </span>
                                                                </div>

                                                                <div className="col-xs-12 col-md-4">
                                                                    <label>CV</label>
                                                                    <br />
                                                                    <span className="wpcf7-form-control-wrap subject">
                                                                        <input type="file" aria-invalid="false"
                                                                            className="wpcf7-form-control wpcf7-text input-text" size="40" value=""
                                                                            name="cv-file" />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="form-group clearfix">
                                                                <p>
                                                                    <input type="submit" value="Başvur" className="wpcf7-form-control wpcf7-submit" />
                                                                </p>
                                                            </div>

                                                            <div className="wpcf7-response-output wpcf7-display-none" />
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