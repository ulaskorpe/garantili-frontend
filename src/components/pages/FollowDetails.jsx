import { useState } from "react"
import OrderReview from "../cart/OrderReview"
import BreadCrumb from "../layout/BreadCrumb"
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"

function FollowDetails(props) {
    const { basket, onAddToBasket, removeFromBasket } = props

    const [crumb, setCrumb] = useState([
        { url: '#', title: 'Onarım Detayları' }
    ])

    const [orderDetails, setDetails] = useState({
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
                <HeaderMain basket={basket}
                    onRemoveBasket={removeFromBasket}
                />
            </div>
            <div id="content" className="site-content" tabIndex="-1">
                <div className="col-full">
                    <div className="row">
                        <BreadCrumb crumbs={crumb} />
                        <div id="primary" class="content-area">
                            <main id="main" class="site-main">
                                <div class="page hentry">
                                    <div class="entry-content">
                                        <div class="woocommerce">
                                            <div class="woocommerce-order">
                                                <section class="woocommerce-order-details">
                                                    <br />
                                                    <h2 class="woocommerce-order-details__title">{orderDetails.pageTitle}</h2>
                                                    <hr />
                                                    <ul class="woocommerce-order-overview woocommerce-thankyou-order-details order_details">
                                                        <li class="woocommerce-order-overview__order order">
                                                            Sipariş Numarası:<strong>{orderDetails.orderNumber}</strong>
                                                        </li>
                                                        <li class="woocommerce-order-overview__date date">
                                                            Tarih:<strong>{orderDetails.orderDate}</strong>
                                                        </li>
                                                        <li class="woocommerce-order-overview__total total">
                                                            Durumu:<strong><span class="woocommerce-Price-amount amount"><span
                                                                class="woocommerce-Price-currencySymbol"></span>{orderDetails.status}</span></strong>
                                                        </li>
                                                    </ul>
                                                    <table class="woocommerce-table woocommerce-table--order-details shop_table order_details">
                                                        <thead>
                                                            <tr>
                                                                <th class="woocommerce-table__product-name product-name">Açıklama</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {orderDetails.statusUpdate.map((item, index) => {
                                                                return (
                                                                    <tr class="woocommerce-table__line-item order_item" key={index}>

                                                                        <td class="woocommerce-table__product-name product-name">
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