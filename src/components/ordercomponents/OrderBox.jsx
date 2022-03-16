import React, { Component } from 'react';
class OrderBox extends Component {
    state = {
        subTotal: 48000,
        total: 48000,
        deliveryAddress: 'Nur Yıldız Plaza, 15 Temmuz Mah.'
    }
    render() {
        return (
            <div className="cart-collaterals w-100 mr-0 mt-15px">
                <div className="cart_totals">
                    <h2>Ödeme Bilgileri</h2>
                    <table className="shop_table shop_table_responsive">
                        <tbody>
                            <tr className="cart-subtotal">
                                <th>Ara Toplam</th>
                                <td data-title="Subtotal">
                                    <span className="woocommerce-Price-amount amount">
                                        <span className="woocommerce-Price-currencySymbol">₺</span>{this.state.subTotal}</span>
                                </td>
                            </tr>
                            <tr className="shipping">
                                <th>Kargo</th>
                                <td data-title="Shipping">Sabit Fiyat</td>
                            </tr>
                            <tr className="order-total">
                                <th>Toplam</th>
                                <td data-title="Total">
                                    <strong>
                                        <span className="woocommerce-Price-amount amount">
                                            <span className="woocommerce-Price-currencySymbol">₺</span>{this.state.total}</span>
                                    </strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <h2>Adres Bilgileri</h2>
                    <table className="shop_table shop_table_responsive m-tb">
                        <tbody>
                            <tr className="cart-subtotal">
                                <th><strong>Teslimat Adresi</strong></th>
                                <td data-title="Subtotal">
                                </td>
                            </tr>
                            <tr className="shipping">
                                <th>{this.state.deliveryAddress}</th>
                            </tr>
                            <tr className="top-gray-seperator">
                                <th className="pt-3"><strong>Fatura Adresi</strong></th>
                                <td data-title="Subtotal">
                                </td>
                            </tr>
                            <tr className="shipping">
                                <th>{this.state.deliveryAddress}</th>
                            </tr>
                            <tr className="order-total">
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default OrderBox