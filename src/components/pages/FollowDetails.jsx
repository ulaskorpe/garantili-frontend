import React from 'react';
import { useState } from "react"
import BreadCrumb from "../layout/BreadCrumb"
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"

function FollowDetails() {
    const [crumb] = useState([
        { url: '#', title: 'Onarım Detayları' }
    ])

    const [orderDetails] = useState({
        products: [
            { id: 1, title: 'iPhone 13 Pro', quantity: 1, price: '23000', url: '/' }
        ],
        orderNumber: "301A23",
        orderDate: '10 Mart, 2022',
        status: "Onarımda",
        statusUpdate: [
            "Duis gravida dui ut massa porta, ac euismod risus volutpat. ",
            "Nunc semper sapien nec ipsum venenatis, vel pretium est porta.",
            "Aenean in augue lectus."
        ],
        pageTitle: "Onarım Detayları"
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
                                                <section className="woocommerce-order-details">
                                                    <br />
                                                    <h2 className="woocommerce-order-details__title">{orderDetails.pageTitle}</h2>
                                                    <hr />
                                                    <ul className="woocommerce-order-overview woocommerce-thankyou-order-details order_details">
                                                        <li className="woocommerce-order-overview__order order">
                                                            Sipariş Numarası:<strong>{orderDetails.orderNumber}</strong>
                                                        </li>
                                                        <li className="woocommerce-order-overview__date date">
                                                            Tarih:<strong>{orderDetails.orderDate}</strong>
                                                        </li>
                                                        <li className="woocommerce-order-overview__total total">
                                                            Durumu:
                                                            <strong>
                                                            <span className="woocommerce-Price-amount amount"> <span className="woocommerce-Price-currencySymbol" />
                                                                {orderDetails.status}
                                                            </span>
                                                            </strong>
                                                        </li>
                                                    </ul>
                                                    <table className="woocommerce-table woocommerce-table--order-details shop_table order_details">
                                                        <thead>
                                                            <tr>
                                                                <th className="woocommerce-table__product-name product-name">Açıklama</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {orderDetails.statusUpdate.map((item, index) => {
                                                                return (
                                                                    <tr className="woocommerce-table__line-item order_item" key={index}>

                                                                        <td className="woocommerce-table__product-name product-name">
                                                                            {item}
                                                                        </td>


                                                                    </tr>

                                                                )
                                                            })}
                                                        </tbody>

                                                        <tfoot>
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

export default FollowDetails