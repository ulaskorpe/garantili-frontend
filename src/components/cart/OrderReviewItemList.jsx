import React, { Component } from 'react';

class OrderReviewItemList extends Component {
    state = {
        products : [
            {id: 1, title: 'Apple iPhone 13 Pro Sapphire Blue', quantity:1, price: 24000}
        ],
        subtotal: 24000,
        totalPrice: 25000
    }
    render() {
        return (
            <table class="shop_table woocommerce-checkout-review-order-table">
                <thead>
                    <tr>
                        <th class="product-name">Ürün</th>
                        <th class="product-total">Fiyat</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.products.map((item, index) => {
                        return (
                            <tr class="cart_item">
                                <td class="product-name">
                                    <strong class="product-quantity">{item.quantity} ×</strong>{item.title}
                                </td>
                                <td class="product-total">
                                    <span class="woocommerce-Price-amount amount">
                                        <span class="woocommerce-Price-currencySymbol">₺</span>{item.price}</span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr class="cart-subtotal">
                        <th>Ara Toplam</th>
                        <td>
                            <span class="woocommerce-Price-amount amount">
                                <span class="woocommerce-Price-currencySymbol">₺</span>{this.state.subtotal}</span>
                        </td>
                    </tr>
                    <tr class="order-total">
                        <th>Toplam</th>
                        <td>
                            <strong>
                                <span class="woocommerce-Price-amount amount">
                                    <span class="woocommerce-Price-currencySymbol">₺</span>{this.state.totalPrice}</span>
                            </strong>
                        </td>
                    </tr>
                </tfoot>
            </table>
        );
    }
}

export default OrderReviewItemList;