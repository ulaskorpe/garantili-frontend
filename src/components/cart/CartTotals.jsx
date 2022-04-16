import React from 'react';
import {useSelector} from "react-redux";
import {ayir, getBasketTotalPrice} from "../../store/selectors/basket";

const CartTotals = () => {
    const totalPrice = useSelector(getBasketTotalPrice);

    return (
        <div className="cart-collaterals">
            <div className="cart_totals">
                <h2>Toplam</h2>
                <table className="shop_table shop_table_responsive">
                    <tbody>
                    <tr className="cart-subtotal">
                        <th>Ara toplam</th>
                        <td data-title="Subtotal">
                                    <span className="woocommerce-Price-amount amount">
                                        {ayir(totalPrice)}
                                        <span className="woocommerce-Price-currencySymbol">₺</span>
                                    </span>
                        </td>
                    </tr>
                    <tr className="order-total">
                        <th>Toplam</th>
                        <td data-title="Total">
                            <strong>
                                        <span className="woocommerce-Price-amount amount">
                                            {ayir(totalPrice)}
                                            <span className="woocommerce-Price-currencySymbol">₺</span>
                                        </span>
                            </strong>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className="wc-proceed-to-checkout">
                    <a className="checkout-button button alt wc-forward" href="/odeme">Ödemeye geçin</a>
                    <a className="back-to-shopping" href="/">Alışverişe Devam Et</a>
                </div>
            </div>
        </div>
    );
}

export default CartTotals