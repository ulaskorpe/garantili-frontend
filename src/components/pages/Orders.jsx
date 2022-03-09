import React from 'react';
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"
import BreadCrumb from "../layout/BreadCrumb"
import { useState } from "react"
import OrderItemList from "../ordercomponents/OrderItemList"
import OrderBox from "../ordercomponents/OrderBox"
function Orders(props) {

    const { basket, onAddToBasket, removeFromBasket } = props

    const [crumb, setCrumb] = useState([
        { url: '#', title: 'Siparişlerim' }
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
                                        <div class="woocommerce">

                                            <div class="">
                                                <OrderItemList removeFromBasket={removeFromBasket} />
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
                                                    <span class="no-child"></span>Şifre Güncelleme</a>
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
                                                    <strong>Siparişlerim</strong></a>
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

export default Orders