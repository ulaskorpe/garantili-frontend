import React from 'react';
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"
import BreadCrumb from "../layout/BreadCrumb"
import { useState } from "react"

function Address(props) {

    const { basket, onAddToBasket, removeFromBasket } = props

    const [crumb, setCrumb] = useState([
        { url: '#', title: 'Adreslerim' }
    ])

    const [deliveryAddress, setDeliveryAddress] = useState({
        name: 'Garantili',
        lastName: 'Teknoloji',
        birthDate: '01/01/2022',
        phone: '0212-222-22-22',
        email: 'info@garantiliteknoloji.com.tr',
        address: 'Nur Yıldız Plaza, 15 Temmuz Mah. Gülbahar Cad. B Blok. No:7 Kapı No 21 Bağcılar / İSTANBUL'
    })

    const [billAddress, setBillAddress] = useState({
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
                <HeaderMain basket={basket}
                    onRemoveBasket={removeFromBasket}
                />
            </div>
            <div id="content" className="site-content" tabIndex="-1">
                <div className="col-full">
                    <div className="row">
                        <BreadCrumb crumbs={crumb} />
                        <div id="primary" className="content-area">
                            <main id="main" className="site-main">

                                <div class="type-page hentry">

                                    <div class="entry-content">
                                        <section className="section-hot-new-arrivals section-products-carousel-tabs techmarket-tabs">
                                            <header className="section-header">
                                                <ul role="tablist" className="nav justify-content-end">
                                                    <li className="nav-item"><a className="nav-link active" href="#tab-delivery-address" data-toggle="tab">Teslimat Adresim</a></li>
                                                    <li className="nav-item"><a className="nav-link" href="#tab-bill-address" data-toggle="tab">Fatura Adresim</a></li>
                                                </ul>
                                            </header>
                                            <div className="tab-content">
                                                <div className="tab-pane active" role="tabpanel" id="tab-delivery-address">

                                                    <div class="row contact-info">
                                                        <div class="col-md-12 left-col">
                                                            <div class="contact-form">
                                                                <div role="form" class="wpcf7" id="wpcf7-f425-o1" lang="en-US" dir="ltr">
                                                                    <div class="screen-reader-response"></div>
                                                                    <form class="wpcf7-form" novalidate="novalidate">
                                                                        <div class="form-group row">
                                                                            <div class="col-xs-12 col-md-6">
                                                                                <label>Adınız
                                                                                    <abbr title="required" class="required">*</abbr>
                                                                                </label>
                                                                                <br />
                                                                                <span class="wpcf7-form-control-wrap first-name">
                                                                                    <input type="text" aria-invalid="false" aria-required="true"
                                                                                        class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                        size="40" value={deliveryAddress.name} name="first-name" />
                                                                                </span>
                                                                            </div>
                                                                            <div class="col-xs-12 col-md-6">
                                                                                <label>Soyadınız
                                                                                    <abbr title="required" class="required">*</abbr>
                                                                                </label>
                                                                                <br />
                                                                                <span class="wpcf7-form-control-wrap last-name">
                                                                                    <input type="text" aria-invalid="false" aria-required="true"
                                                                                        class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                        size="40" value={deliveryAddress.lastName} name="last-name" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group row">
                                                                            <div class="col-xs-12 col-md-6">
                                                                                <label>E-Posta
                                                                                    <abbr title="required" class="required">*</abbr>
                                                                                </label>
                                                                                <br />
                                                                                <span class="wpcf7-form-control-wrap first-name">
                                                                                    <input type="email" aria-invalid="false" aria-required="true"
                                                                                        class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                        size="40" value={deliveryAddress.email} name="email" />
                                                                                </span>
                                                                            </div>
                                                                            <div class="col-xs-12 col-md-6">
                                                                                <label>Telefon
                                                                                    <abbr title="required" class="required">*</abbr>
                                                                                </label>
                                                                                <br />
                                                                                <span class="wpcf7-form-control-wrap last-name">
                                                                                    <input type="text" aria-invalid="false" aria-required="true"
                                                                                        class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                        size="40" value={deliveryAddress.phone} name="last-name" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group row">
                                                                            <div class="col-xs-12 col-md-12">
                                                                                <label>Adres
                                                                                    <abbr title="required" class="required">*</abbr>
                                                                                </label>
                                                                                <br />
                                                                                <span class="wpcf7-form-control-wrap first-name">

                                                                                    <textarea class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text" name="address">{deliveryAddress.address}</textarea>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group clearfix">
                                                                            <p>
                                                                                <input type="submit" value="Kaydet" class="wpcf7-form-control wpcf7-submit btn-navy" />
                                                                            </p>
                                                                        </div>
                                                                        <div class="wpcf7-response-output wpcf7-display-none"></div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane" role="tabpanel" id="tab-bill-address">

                                                    <div class="row contact-info">
                                                        <div class="col-md-12 left-col">
                                                            <div class="contact-form">
                                                                <div role="form" class="wpcf7" id="wpcf7-f425-o1" lang="en-US" dir="ltr">
                                                                    <div class="screen-reader-response"></div>
                                                                    <form class="wpcf7-form" novalidate="novalidate">
                                                                        <div class="form-group row">
                                                                            <div class="col-xs-12 col-md-6">
                                                                                <label>Adınız
                                                                                    <abbr title="required" class="required">*</abbr>
                                                                                </label>
                                                                                <br />
                                                                                <span class="wpcf7-form-control-wrap first-name">
                                                                                    <input type="text" aria-invalid="false" aria-required="true"
                                                                                        class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                        size="40" value={billAddress.name} name="first-name" />
                                                                                </span>
                                                                            </div>
                                                                            <div class="col-xs-12 col-md-6">
                                                                                <label>Soyadınız
                                                                                    <abbr title="required" class="required">*</abbr>
                                                                                </label>
                                                                                <br />
                                                                                <span class="wpcf7-form-control-wrap last-name">
                                                                                    <input type="text" aria-invalid="false" aria-required="true"
                                                                                        class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                        size="40" value={billAddress.lastName} name="last-name" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group row">
                                                                            <div class="col-xs-12 col-md-6">
                                                                                <label>E-Posta
                                                                                    <abbr title="required" class="required">*</abbr>
                                                                                </label>
                                                                                <br />
                                                                                <span class="wpcf7-form-control-wrap first-name">
                                                                                    <input type="email" aria-invalid="false" aria-required="true"
                                                                                        class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                        size="40" value={billAddress.email} name="email" />
                                                                                </span>
                                                                            </div>
                                                                            <div class="col-xs-12 col-md-6">
                                                                                <label>Telefon
                                                                                    <abbr title="required" class="required">*</abbr>
                                                                                </label>
                                                                                <br />
                                                                                <span class="wpcf7-form-control-wrap last-name">
                                                                                    <input type="text" aria-invalid="false" aria-required="true"
                                                                                        class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                        size="40" value={billAddress.phone} name="last-name" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group row">
                                                                            <div class="col-xs-12 col-md-12">
                                                                                <label>Adres
                                                                                    <abbr title="required" class="required">*</abbr>
                                                                                </label>
                                                                                <br />
                                                                                <span class="wpcf7-form-control-wrap first-name">

                                                                                    <textarea class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text" name="address">{billAddress.address}</textarea>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group row">
                                                                            <div className="col-md-12">
                                                                                <p className="f-12px">*Kurumsal fatura için vergi bilgilerinizi doldurunuz.</p>
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group row">
                                                                            <div class="col-xs-12 col-md-6">
                                                                                <label>Vergi Dairesi
                                                                                </label>
                                                                                <br />
                                                                                <span class="wpcf7-form-control-wrap first-name">
                                                                                    <input type="email" aria-invalid="false" aria-required="true"
                                                                                        class="wpcf7-form-control wpcf7-text input-text"
                                                                                        size="40" value={billAddress.taxOffice} name="email" />
                                                                                </span>
                                                                            </div>
                                                                            <div class="col-xs-12 col-md-6">
                                                                                <label>Vergi Numarası
                                                                                </label>
                                                                                <br />
                                                                                <span class="wpcf7-form-control-wrap last-name">
                                                                                    <input type="text" aria-invalid="false" aria-required="true"
                                                                                        class="wpcf7-form-control input-text"
                                                                                        size="40" value={billAddress.taxNumber} name="last-name" />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group clearfix">
                                                                            <p>
                                                                                <input type="submit" value="Kaydet" class="wpcf7-form-control wpcf7-submit btn-navy" />
                                                                            </p>
                                                                        </div>
                                                                        <div class="wpcf7-response-output wpcf7-display-none"></div>
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
                        <div id="secondary" class="widget-area shop-sidebar" role="complementary">
                            <div class="widget woocommerce widget_product_categories techmarket_widget_product_categories" id="techmarket_product_categories_widget-2">
                                <ul class="product-categories ">
                                    <li class="product_cat">
                                        <span>Kullanıcı Bilgilerim</span>
                                        <ul>
                                            <li class="cat-item">
                                                <a href="/uyelik-bilgilerim">
                                                    <span class="no-child"></span>Üyelik Bilgilerim</a>
                                            </li>
                                            <li class="cat-item">
                                                <a href="/sifre-guncelleme">
                                                    <span class="no-child"></span>Şifre Güncelleme</a>
                                            </li>
                                            <li class="cat-item  current-cat">
                                                <a href="/adreslerim">
                                                    <span class="no-child"></span><strong>Adres Bilgilerim</strong></a>
                                            </li>

                                        </ul>
                                    </li>
                                    <li class="product_cat">
                                        <ul>
                                            <li class="cat-item">
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