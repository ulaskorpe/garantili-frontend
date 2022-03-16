import React from 'react';
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"
import BreadCrumb from "../layout/BreadCrumb"
import { useState } from "react"

function Address() {
    const [crumb] = useState([
        { url: '#', title: 'Adreslerim' }
    ])

    const [deliveryAddress] = useState({
        name: 'Garantili',
        lastName: 'Teknoloji',
        birthDate: '01/01/2022',
        phone: '0212-222-22-22',
        email: 'info@garantiliteknoloji.com.tr',
        address: 'Nur Yıldız Plaza, 15 Temmuz Mah. Gülbahar Cad. B Blok. No:7 Kapı No 21 Bağcılar / İSTANBUL'
    })

    const [billAddress] = useState({
        name: 'Teknoloji',
        lastName: 'Garantili',
        birthDate: '01/01/2022',
        phone: '0212-222-22-22',
        email: 'info@garantiliteknoloji.com.tr',
        address: 'Nur Yıldız Plaza, 15 Temmuz Mah. Gülbahar Cad. B Blok. No:7 Kapı No 21 Bağcılar / İSTANBUL',
        taxNumber: '',
        taxOffice: ''
    })

    return (
        <div className="woocommerce-active left-sidebar">
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
                                        <section className="section-hot-new-arrivals section-products-carousel-tabs techmarket-tabs">
                                            <header className="section-header">
                                                <ul role="tablist" className="nav justify-content-end">
                                                    <li className="nav-item"><a className="nav-link active" href="#tab-delivery-address" data-toggle="tab">Teslimat Adresim</a></li>
                                                    <li className="nav-item"><a className="nav-link" href="#tab-bill-address" data-toggle="tab">Fatura Adresim</a></li>
                                                </ul>
                                            </header>
                                            <div className="tab-content">
                                                <div className="tab-pane active" role="tabpanel" id="tab-delivery-address">

                                                    <div className="row contact-info">
                                                        <div className="col-md-12 left-col">
                                                            <div className="contact-form">
                                                                <div role="form" className="wpcf7" id="wpcf7-f425-o1" lang="en-US" dir="ltr">
                                                                    <div className="screen-reader-response" />
                                                                    <form className="wpcf7-form" noValidate="novalidate">
                                                                        <div className="form-group row">
                                                                            <div className="col-xs-12 col-md-6">
                                                                                <label>Adınız
                                                                                    <abbr title="required" className="required">*</abbr>
                                                                                </label>
                                                                                <br />
                                                                                <span className="wpcf7-form-control-wrap first-name">
                                                                                    <input type="text" aria-invalid="false" aria-required="true"
                                                                                        className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                        size="40" value={deliveryAddress.name} name="first-name" />
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
                                                                                        size="40" value={deliveryAddress.lastName} name="last-name" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group row">
                                                                            <div className="col-xs-12 col-md-6">
                                                                                <label>E-Posta
                                                                                    <abbr title="required" className="required">*</abbr>
                                                                                </label>
                                                                                <br />
                                                                                <span className="wpcf7-form-control-wrap first-name">
                                                                                    <input type="email" aria-invalid="false" aria-required="true"
                                                                                        className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                        size="40" value={deliveryAddress.email} name="email" />
                                                                                </span>
                                                                            </div>
                                                                            <div className="col-xs-12 col-md-6">
                                                                                <label>Telefon
                                                                                    <abbr title="required" className="required">*</abbr>
                                                                                </label>
                                                                                <br />
                                                                                <span className="wpcf7-form-control-wrap last-name">
                                                                                    <input type="text" aria-invalid="false" aria-required="true"
                                                                                        className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                        size="40" value={deliveryAddress.phone} name="last-name" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group row">
                                                                            <div className="col-xs-12 col-md-12">
                                                                                <label>Adres
                                                                                    <abbr title="required" className="required">*</abbr>
                                                                                </label>
                                                                                <br />
                                                                                <span className="wpcf7-form-control-wrap first-name">

                                                                                    <textarea className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text" name="address">{deliveryAddress.address}</textarea>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group clearfix">
                                                                            <p>
                                                                                <input type="submit" value="Kaydet" className="wpcf7-form-control wpcf7-submit btn-navy" />
                                                                            </p>
                                                                        </div>
                                                                        <div className="wpcf7-response-output wpcf7-display-none" />
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane" role="tabpanel" id="tab-bill-address">

                                                    <div className="row contact-info">
                                                        <div className="col-md-12 left-col">
                                                            <div className="contact-form">
                                                                <div role="form" className="wpcf7" id="wpcf7-f425-o1" lang="en-US" dir="ltr">
                                                                    <div className="screen-reader-response" />
                                                                    <form className="wpcf7-form" noValidate="novalidate">
                                                                        <div className="form-group row">
                                                                            <div className="col-xs-12 col-md-6">
                                                                                <label>Adınız
                                                                                    <abbr title="required" className="required">*</abbr>
                                                                                </label>
                                                                                <br />
                                                                                <span className="wpcf7-form-control-wrap first-name">
                                                                                    <input type="text" aria-invalid="false" aria-required="true"
                                                                                        className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                        size="40" value={billAddress.name} name="first-name" />
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
                                                                                        size="40" value={billAddress.lastName} name="last-name" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group row">
                                                                            <div className="col-xs-12 col-md-6">
                                                                                <label>E-Posta
                                                                                    <abbr title="required" className="required">*</abbr>
                                                                                </label>
                                                                                <br />
                                                                                <span className="wpcf7-form-control-wrap first-name">
                                                                                    <input type="email" aria-invalid="false" aria-required="true"
                                                                                        className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                        size="40" value={billAddress.email} name="email" />
                                                                                </span>
                                                                            </div>
                                                                            <div className="col-xs-12 col-md-6">
                                                                                <label>Telefon
                                                                                    <abbr title="required" className="required">*</abbr>
                                                                                </label>
                                                                                <br />
                                                                                <span className="wpcf7-form-control-wrap last-name">
                                                                                    <input type="text" aria-invalid="false" aria-required="true"
                                                                                        className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                        size="40" value={billAddress.phone} name="last-name" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group row">
                                                                            <div className="col-xs-12 col-md-12">
                                                                                <label>Adres
                                                                                    <abbr title="required" className="required">*</abbr>
                                                                                </label>
                                                                                <br />
                                                                                <span className="wpcf7-form-control-wrap first-name">

                                                                                    <textarea className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text" name="address">{billAddress.address}</textarea>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group row">
                                                                            <div className="col-md-12">
                                                                                <p className="f-12px">*Kurumsal fatura için vergi bilgilerinizi doldurunuz.</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group row">
                                                                            <div className="col-xs-12 col-md-6">
                                                                                <label>Vergi Dairesi
                                                                                </label>
                                                                                <br />
                                                                                <span className="wpcf7-form-control-wrap first-name">
                                                                                    <input type="email" aria-invalid="false" aria-required="true"
                                                                                        className="wpcf7-form-control wpcf7-text input-text"
                                                                                        size="40" value={billAddress.taxOffice} name="email" />
                                                                                </span>
                                                                            </div>
                                                                            <div className="col-xs-12 col-md-6">
                                                                                <label>Vergi Numarası
                                                                                </label>
                                                                                <br />
                                                                                <span className="wpcf7-form-control-wrap last-name">
                                                                                    <input type="text" aria-invalid="false" aria-required="true"
                                                                                        className="wpcf7-form-control input-text"
                                                                                        size="40" value={billAddress.taxNumber} name="last-name" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group clearfix">
                                                                            <p>
                                                                                <input type="submit" value="Kaydet" className="wpcf7-form-control wpcf7-submit btn-navy" />
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
                                        </section>

                                    </div>
                                </div>
                            </main>
                        </div>
                        <div id="secondary" className="widget-area shop-sidebar" role="complementary">
                            <div className="widget woocommerce widget_product_categories techmarket_widget_product_categories" id="techmarket_product_categories_widget-2">
                                <ul className="product-categories ">
                                    <li className="product_cat">
                                        <span>Kullanıcı Bilgilerim</span>
                                        <ul>
                                            <li className="cat-item">
                                                <a href="/uyelik-bilgilerim">
                                                    <span className="no-child" />Üyelik Bilgilerim</a>
                                            </li>
                                            <li className="cat-item">
                                                <a href="/sifre-guncelleme">
                                                    <span className="no-child" />Şifre Güncelleme</a>
                                            </li>
                                            <li className="cat-item  current-cat">
                                                <a href="/adreslerim">
                                                    <span className="no-child" /><strong>Adres Bilgilerim</strong></a>
                                            </li>

                                        </ul>
                                    </li>
                                    <li className="product_cat">
                                        <ul>
                                            <li className="cat-item">
                                                <a href="/siparislerim">
                                                    Siparişlerim</a>
                                            </li>

                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Address