import React, {useMemo} from 'react';
import { useState } from "react"
import BreadCrumb from "../layout/BreadCrumb"
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"
import {useQuery} from "react-query";
import {DEFAULT_API_KEY, fetchThis, GET_ORDER_SUMMARY, retry} from "../../api";
import useAuth from "../../store/hooks/useAuth";
import {ayir} from "../../store/selectors/basket";
import moment from "moment";
import {useLocation} from "react-router-dom";

function OrderSummary() {
    const location = useLocation();
    const { account, isLogged = false } = useAuth();
    const [crumb] = useState([
        { url: '#', title: ' Sipariş Özeti' }
    ])

    const orderDetail = useQuery(
        ['get-order-detail', account, location],
        () => (
            fetchThis(
                GET_ORDER_SUMMARY,
                {
                    order_id: location?.state?.order_id,
                    customer_id: account.customer_id.toString(),
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
                && typeof location?.state?.order_id !== 'undefined'
            ),
        },
    );
    const order = useMemo(() => (
        orderDetail.isSuccess ? (orderDetail?.data?.data?.order || {}) : {}
    ), [orderDetail]);
    const paymentInformations = useMemo(() => (
        orderDetail.isSuccess ? (orderDetail?.data?.data?.payment_informations || {}) : {}
    ), [orderDetail]);

    const date = useMemo(() => (
        moment
            .unix(order?.date_time || (new Date()).getTime())
            .format('DD MMMM YYYY')
    ), [order]);




    return (
        <div className=" woocommerce-checkout woocommerce-page woocommerce-order-received can-uppercase woocommerce-active full-width">
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
                                <div className="page hentry">
                                    <div className="entry-content">
                                        <div className="woocommerce">
                                            <div className="woocommerce-order">
                                                <p className="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received">
                                                    Teşekkürler, siparişiniz alındı.
                                                </p>

                                                <section className="woocommerce-order-details">
                                                    <br />
                                                    <h2 className="woocommerce-order-details__title">Sipariş Detayları</h2>
                                                    <hr />
                                                    <ul className="woocommerce-order-overview woocommerce-thankyou-order-details order_details">
                                                        <li className="woocommerce-order-overview__order order">
                                                            Sipariş Numarası:<strong>{order?.order_id || location?.state?.order_id}</strong>
                                                        </li>
                                                        <li className="woocommerce-order-overview__date date">
                                                            Tarih:<strong>{date}</strong>
                                                        </li>
                                                        <li className="woocommerce-order-overview__total total">
                                                            Toplam:
                                                            <strong>
                                                                <span className="woocommerce-Price-amount amount">
                                                                    <span className="woocommerce-Price-currencySymbol">₺</span>
                                                                    {ayir(paymentInformations.total)}
                                                                </span>
                                                            </strong>
                                                        </li>
                                                        <li className="woocommerce-order-overview__payment-method method">
                                                            Ödeme Yöntemi: <strong>{order.order_method}</strong>
                                                        </li>
                                                    </ul>
                                                    <table className="woocommerce-table woocommerce-table--order-details shop_table order_details">
                                                        <thead>
                                                            <tr>
                                                                <th className="woocommerce-table__product-name product-name">Ürün</th>
                                                                <th className="woocommerce-table__product-table product-total">Fiyat</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {order?.items?.map((item, index) => {
                                                                return (
                                                                    <tr className="woocommerce-table__line-item order_item" key={index}>
                                                                        <td className="woocommerce-table__product-name product-name">
                                                                            <a href={item.url}>{item.title}</a>
                                                                            <strong className="product-quantity"> × {item.quantity}</strong>
                                                                        </td>

                                                                        <td className="woocommerce-table__product-total product-total">
                                                                            <span className="woocommerce-Price-amount amount">
                                                                                {ayir(item.price)}
                                                                                <span className="woocommerce-Price-currencySymbol">₺</span>
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>

                                                        <tfoot>
                                                        {paymentInformations.details?.map((item, index) => (
                                                            <tr key={`item_${index}_${item.id}`}>
                                                                <th>{item.name}</th>
                                                                <td>
                                                                    <span className="woocommerce-Price-amount amount"><span
                                                                    className="woocommerce-Price-currencySymbol">₺</span>{ayir(item.value)}</span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                            <tr>
                                                                <th scope="row">Ödeme Yöntemi:</th>
                                                                <td>{order.order_method}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Toplam:</th>
                                                                <td><span className="woocommerce-Price-amount amount">
                                                                    <span className="woocommerce-Price-currencySymbol">
                                                                        <strong>
                                                                        <span>{ayir(paymentInformations.total)}</span>
                                                                        ₺
                                                                    </strong>
                                                                    </span>
                                                                </span>
                                                                </td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </section>
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

export default OrderSummary