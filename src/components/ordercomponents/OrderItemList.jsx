import React from 'react';
import { useState } from "react"
import OrderBox from "./OrderBox"
import OrderItem from "./OrderItem"
import {ayir} from "../../store/selectors/basket";
import moment from "moment";

function OrderItemList(props) {
    const { data, title = 'Siparişlerim' } = props;

    const order = data.order;
    const paymentInformations = data.payment_informations;

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
        totalPrice: 25000,
        deliveryAddress: 'Nur Yıldız Plaza, 15 Temmuz Mah. Gülbahar Cad. B Blok. No:7 Kapı No 21 Bağcılar / İSTANBUL',
        billAddress: 'Nur Yıldız Plaza, 15 Temmuz Mah. Gülbahar Cad. B Blok. No:7 Kapı No 21 Bağcılar / İSTANBUL'
    });

    const date = moment
        .unix(order.date_time)
        .format('DD MMMM YYYY')

    return (
        <div>
            <h2 className="woocommerce-order-details__title bottom-gray-seperator">{title}</h2>
            <div className="container-fluid">
                <div className="row">
                    <div className="woocommerce-cart-form col-md-9">
                        <ul className="woocommerce-order-overview woocommerce-thankyou-order-details order_details bottom-seperator">
                            <li className="woocommerce-order-overview__order order">
                                Sipariş Numarası:<strong>{order.order_id}</strong>
                            </li>
                            <li className="woocommerce-order-overview__date date">
                                Tarih:<strong>{date}</strong>
                            </li>
                            <li className="woocommerce-order-overview__payment-method method">
                                Ödeme Yöntemi: <strong>{order.order_method}</strong>
                            </li>
                            <li className="woocommerce-order-overview__total total order-cost-position">
                                Sipariş Bedeli:<strong><span className="woocommerce-Price-amount amount"><span
                                    className="woocommerce-Price-currencySymbol ">₺</span>{ayir(paymentInformations.total)}</span></strong>
                            </li>
                        </ul>
                        <table className="shop_table shop_table_responsive cart">
                            <thead>
                                <tr>
                                    <th className="product-name">Ürünler</th>
                                    <th className="product-price">Fiyat</th>
                                    <th className="product-quantity">Adet</th>
                                    <th className="product-subtotal text-right">Toplam</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order?.items?.map((item, itemIDX) => (
                                    <OrderItem
                                        key={`order_item_${itemIDX}`}
                                        item={item}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-3 mr-0 pr-0">
                        <OrderBox
                            details={paymentInformations.details}
                            total={paymentInformations.total}
                            shippingAddress={order.shipping_address}
                            invoiceAddress={order.invoice_address}
                        />
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default OrderItemList