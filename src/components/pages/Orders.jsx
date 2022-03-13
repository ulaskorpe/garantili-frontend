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
                                <div className="type-page hentry">
                                    <div className="entry-content">
                                        <div className="woocommerce">
                                            <div className="">
                                                <OrderItemList removeFromBasket={removeFromBasket} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                        <div id="secondary" className="widget-area shop-sidebar" role="complementary">
                            <div id="garantili_product_categories_widget-2"
                                className="widget woocommerce widget_product_categories garantili_widget_product_categories">
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
                                                    <span className="no-child" />Adres Bilgilerim</a>
                                            </li>

                                        </ul>
                                    </li>
                                    <li className="product_cat">
                                        <ul>
                                            <li className="cat-item">
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