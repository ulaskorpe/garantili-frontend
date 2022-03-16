import React from 'react';
import { useState } from "react"
import BreadCrumb from "../layout/BreadCrumb"
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"

function OrderSummary() {
    const [crumb] = useState([
        { url: '#', title: ' Sipariş Özeti' }
    ])

    const [orderDetails] = useState({
        products: [
            { id: 1, title: 'iPhone 13 Pro', quantity: 1, price: '23000', url: '/' }
        ],
        orderNumber: "301A23",
        orderDate: '10 Mart, 2022',
        price: 5032,
        paymentMethod: 'Kredi Kartı',
        subTotal: 24000,
        shippingPrice: 1000,
        totalPrice: 25000
    })

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
                                                    Teşekkürler, siparişiz alındı.</p>

                                                <section className="woocommerce-order-details">
                                                    <br />
                                                    <h2 className="woocommerce-order-details__title">Sipariş Detayları</h2>
                                                    <hr />
                                                    <ul className="woocommerce-order-overview woocommerce-thankyou-order-details order_details">
                                                        <li className="woocommerce-order-overview__order order">
                                                            Sipariş Numarası:<strong>{orderDetails.orderNumber}</strong>
                                                        </li>
                                                        <li className="woocommerce-order-overview__date date">
                                                            Tarih:<strong>{orderDetails.orderDate}</strong>
                                                        </li>
                                                        <li className="woocommerce-order-overview__total total">
                                                            Toplam:<strong><span className="woocommerce-Price-amount amount"><span
                                                                className="woocommerce-Price-currencySymbol">₺</span>{orderDetails.price}</span></strong>
                                                        </li>
                                                        <li className="woocommerce-order-overview__payment-method method">
                                                            Ödeme Yöntemi: <strong>{orderDetails.paymentMethod}</strong>
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
                                                            {orderDetails.products.map((item, index) => {
                                                                return (
                                                                    <tr className="woocommerce-table__line-item order_item" key={index}>

                                                                        <td className="woocommerce-table__product-name product-name">
                                                                            <a href={item.url}>{item.title}</a>
                                                                            <strong className="product-quantity"> × {item.quantity}</strong>
                                                                        </td>

                                                                        <td className="woocommerce-table__product-total product-total">
                                                                            <span className="woocommerce-Price-amount amount"><span
                                                                                className="woocommerce-Price-currencySymbol">₺</span>{item.price}</span>
                                                                        </td>

                                                                    </tr>

                                                                )
                                                            })}
                                                        </tbody>

                                                        <tfoot>
                                                            <tr>
                                                                <th scope="row">Ara Toplam:</th>
                                                                <td><span className="woocommerce-Price-amount amount"><span
                                                                    className="woocommerce-Price-currencySymbol">₺</span>{orderDetails.subTotal}</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Kargo:</th>
                                                                <td><span className="woocommerce-Price-amount amount"><span
                                                                    className="woocommerce-Price-currencySymbol">₺</span>{orderDetails.shippingPrice}</span></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Ödeme Yöntemi:</th>
                                                                <td>{orderDetails.paymentMethod}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Toplam:</th>
                                                                <td><span className="woocommerce-Price-amount amount">
                                                                    <span
                                                                        className="woocommerce-Price-currencySymbol"><strong>₺<span>{orderDetails.totalPrice}</span></strong></span>
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