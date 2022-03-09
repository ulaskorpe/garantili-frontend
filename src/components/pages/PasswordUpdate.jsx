import React  from 'react';
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"
import BreadCrumb from "../layout/BreadCrumb"
import { useState } from "react"

function PasswordUpdate(props) {

    const { basket, onAddToBasket, removeFromBasket } = props

    const [crumb, setCrumb] = useState([
        { url: '#', title: 'Şifre Güncelleme' }
    ])



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
                                        <div class="row contact-info">
                                            <div class="col-md-12 left-col">
                                                <div class="text-block">
                                                    <h2 class="contact-page-title">Şifre Güncelleme</h2>

                                                </div>
                                                <div class="contact-form">
                                                    <div role="form" class="wpcf7" id="wpcf7-f425-o1" lang="en-US" dir="ltr">
                                                        <div class="screen-reader-response"></div>
                                                        <form class="wpcf7-form" novalidate="novalidate">
                                                            <div class="form-group row">
                                                                <div class="col-xs-12 col-md-6">
                                                                    <label>Mevcut Şifre
                                                                        <abbr title="required" class="required">*</abbr>
                                                                    </label>
                                                                    <br />
                                                                    <span class="wpcf7-form-control-wrap first-name">
                                                                        <input type="password" aria-invalid="false" aria-required="true"
                                                                            class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                            size="40" name="current-password" />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="form-group row">
                                                                <div class="col-xs-12 col-md-6">
                                                                    <label>Yeni Şifre
                                                                        <abbr title="required" class="required">*</abbr>
                                                                    </label>
                                                                    <span class="wpcf7-form-control-wrap last-name">
                                                                        <input type="password" aria-invalid="false" aria-required="true"
                                                                            class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                            size="40" name="new-password" />
                                                                    </span>
                                                                </div>
                                                                <div class="col-xs-12 col-md-6">
                                                                    <label>Yeni Şifre
                                                                        <abbr title="required" class="required">*</abbr>
                                                                    </label>
                                                                    <span class="wpcf7-form-control-wrap last-name">
                                                                        <input type="password" aria-invalid="false" aria-required="true"
                                                                            class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                            size="40" name="new-password-again" />
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
                            </main>
                        </div>
                        <div id="secondary" class="widget-area shop-sidebar" role="complementary">
                            <div id="garantili_product_categories_widget-2"
                                class="widget woocommerce widget_product_categories garantili_widget_product_categories">
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
                                                    <span class="no-child"></span><strong>Şifre Güncelleme</strong></a>
                                            </li>
                                            <li class="cat-item  current-cat">
                                                <a href="/adreslerim">
                                                    <span class="no-child"></span>Adres Bilgilerim</a>
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

export default PasswordUpdate