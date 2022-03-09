import React from 'react';
import { useState } from "react"
import OrderBox from "./OrderBox"
import OrderItem from "./OrderItem"

function OrderItemList() {

    const [items, setCartItems] = useState([
        { id: 1, title: 'Apple iPhone 12 Pro Pacific Blue', quantity: 2, price: 24000, totalPrice: 48000, url: '/urun-detay/iphone-12-mini-64-gb-3', imageUrl: '/assets/images/products/L10.jpg' },
        { id: 1, title: 'Apple iPhone 12 Pro Pacific Blue', quantity: 2, price: 24000, totalPrice: 48000, url: '/urun-detay/iphone-12-mini-64-gb-3', imageUrl: '/assets/images/products/L10.jpg' },
        { id: 1, title: 'Apple iPhone 12 Pro Pacific Blue', quantity: 2, price: 24000, totalPrice: 48000, url: '/urun-detay/iphone-12-mini-64-gb-3', imageUrl: '/assets/images/products/L10.jpg' }
    ])
    const [orderDetails, setDetails] = useState({
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
    })
    return (
        <div>
            <h2 class="woocommerce-order-details__title bottom-gray-seperator">Siparişlerim</h2>
            <div className="container-fluid">
                <div className="row">
                    <div className="woocommerce-cart-form col-md-9">
                        <ul class="woocommerce-order-overview woocommerce-thankyou-order-details order_details bottom-seperator">
                            <li class="woocommerce-order-overview__order order">
                                Sipariş Numarası:<strong>{orderDetails.orderNumber}</strong>
                            </li>
                            <li class="woocommerce-order-overview__date date">
                                Tarih:<strong>{orderDetails.orderDate}</strong>
                            </li>
                            <li class="woocommerce-order-overview__payment-method method">
                                Ödeme Yöntemi: <strong>{orderDetails.paymentMethod}</strong>
                            </li>
                            <li class="woocommerce-order-overview__total total order-cost-position">
                                Sipariş Bedeli:<strong><span class="woocommerce-Price-amount amount"><span
                                    class="woocommerce-Price-currencySymbol ">₺</span>{orderDetails.price}</span></strong>
                            </li>
                        </ul>
                        <table class="shop_table shop_table_responsive cart">
                            <thead>
                                <tr>
                                    <th class="product-name">Ürünler</th>
                                    <th class="product-price">Fiyat</th>
                                    <th class="product-quantity">Adet</th>
                                    <th class="product-subtotal text-right">Toplam</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(_ => <OrderItem item={_} />)}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-3 mr-0 pr-0">
                        <OrderBox />
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default OrderItemList