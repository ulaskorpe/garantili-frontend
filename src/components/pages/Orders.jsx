import React, {useEffect} from 'react';
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"
import BreadCrumb from "../layout/BreadCrumb"
import { useState } from "react"
import OrderItemList from "../ordercomponents/OrderItemList"
import {useQuery} from "react-query";
import {DEFAULT_API_KEY, fetchThis, GET_ORDER_SUMMARY, retry} from "../../api";
import {useParams} from "react-router-dom";
import {useAuth} from "../../context";

const ROOT_CRUMB = { url: '/siparişlerim', title: 'Siparişler' };

function Orders(props) {
    const params = useParams();
    const { state: customer, isLogged } = useAuth();
    const [crumb, setCrumb] = useState([
        ROOT_CRUMB,
    ]);

    const orderDetail = useQuery(
        ['get-order-history', params, customer],
        () => (
            fetchThis(
                GET_ORDER_SUMMARY,
                {
                    order_id: params.id,
                    customer_id: '1000109',
                },
                DEFAULT_API_KEY,
                {},
            )
        ),
        {
            retry,
            refetchOnWindowFocus: false,
            enabled: Boolean(
                isLogged
                && typeof params.id !== 'undefined'
            ),
        },
    );

    useEffect(() => {
        if (crumb.length === 1) {
            if (
                orderDetail.isSuccess
                && orderDetail.data
                && orderDetail.data.status
            ) {
                setCrumb([
                    ROOT_CRUMB,
                    { url: '#', title: 'Test' },
                ]);
            } else if (params && params.id) {
                setCrumb([
                    ROOT_CRUMB,
                    { url: '#', title: params.id },
                ]);
            }
        }
    }, [orderDetail, crumb, params])

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
                                        <div className="woocommerce">
                                            <div className="">
                                                {Boolean(
                                                    orderDetail.isSuccess
                                                    && orderDetail.data.status
                                                ) && (
                                                    <OrderItemList
                                                        data={orderDetail.data.data.order}
                                                    />
                                                )}
                                                {orderDetail.isLoading && (
                                                    <span>Sipariş bilgileri getiriliyor, lütfen bekleyiniz...</span>
                                                )}
                                                {orderDetail.isError && (
                                                    <span>Hata!</span>
                                                )}
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
                                                <a href="#">
                                                    <strong>Sipariş detay</strong>
                                                </a>
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