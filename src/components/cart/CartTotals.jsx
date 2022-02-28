import React, { Component } from 'react';
class CartTotals extends Component {
    state = {
        subTotal: 48000,
        total: 48000
    }
    render() {
        return (
            <div class="cart-collaterals">
                <div class="cart_totals">
                    <h2>Toplam</h2>
                    <table class="shop_table shop_table_responsive">
                        <tbody>
                            <tr class="cart-subtotal">
                                <th>Ara Toplam</th>
                                <td data-title="Subtotal">
                                    <span class="woocommerce-Price-amount amount">
                                        <span class="woocommerce-Price-currencySymbol">₺</span>{this.state.subTotal}</span>
                                </td>
                            </tr>
                            <tr class="shipping">
                                <th>Kargo</th>
                                <td data-title="Shipping">Sabit Fiyat</td>
                            </tr>
                            <tr class="order-total">
                                <th>Toplam</th>
                                <td data-title="Total">
                                    <strong>
                                        <span class="woocommerce-Price-amount amount">
                                            <span class="woocommerce-Price-currencySymbol">₺</span>{this.state.total}</span>
                                    </strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="wc-proceed-to-checkout">
                        
                        <a class="checkout-button button alt wc-forward" href="/odeme">Ödemeye geçin</a>
                        <a class="back-to-shopping" href="/">Alışverişe Devam Et</a>
                    </div>
                </div>
            </div>
        )
    }
}
export default CartTotals