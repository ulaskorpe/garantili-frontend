import React  from 'react';
import useBasket from "../../store/hooks/useBasket";
import {ayir} from "../../store/selectors/basket";

const OrderReviewItemList = (props) => {
    const {
        interestRate = 0
    } = props;
    const {
        totalPrice: subTotal,
        basketArray,
    } = useBasket();
    const shippingPrice = 50;

    const kdv = 3;
    const kdvTotal = subTotal * kdv / 100;

    const totalPrice = subTotal + kdvTotal + shippingPrice;
    const interestTotal = (totalPrice * interestRate) / 100;

    return (
        <table className="shop_table woocommerce-checkout-review-order-table">
            <thead>
            <tr>
                <th className="product-name">Ürün</th>
                <th className="product-total">Fiyat</th>
            </tr>
            </thead>
            <tbody>
            {basketArray.map((item) => {
                return (
                    <tr className="cart_item" key={`cartItem_${item.id}`}>
                        <td className="product-name">
                            <strong className="product-quantity">{item.quantity} ×</strong>
                            <span> {item.product}</span>
                        </td>
                        <td className="product-total">
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
            <tr className="cart-subtotal">
                <th>Ara Toplam</th>
                <td>
                            <span className="woocommerce-Price-amount amount">
                                {ayir(subTotal)}
                                <span className="woocommerce-Price-currencySymbol">₺</span>
                            </span>
                </td>
            </tr>
            <tr className="cart-subtotal">
                <th>Kargo Ücreti</th>
                <td>
                            <span className="woocommerce-Price-amount amount">
                                {ayir(shippingPrice)}
                                <span className="woocommerce-Price-currencySymbol">₺</span>
                            </span>
                </td>
            </tr>
            <tr className="cart-subtotal">
                <th>KDV (%{kdv})</th>
                <td>
                            <span className="woocommerce-Price-amount amount">
                                {ayir(kdvTotal)}
                                <span className="woocommerce-Price-currencySymbol">₺</span>
                            </span>
                </td>
            </tr>
            {Boolean(interestRate) && (
                <tr className="cart-subtotal">
                    <th>Taksit Komisyonu (%{interestRate})</th>
                    <td>
                            <span className="woocommerce-Price-amount amount">
                                {ayir(interestTotal)}
                                <span className="woocommerce-Price-currencySymbol">₺</span>
                            </span>
                    </td>
                </tr>
            )}
            <tr className="order-total">
                <th>Toplam</th>
                <td>
                    <strong>
                                <span className="woocommerce-Price-amount amount">
                                    {ayir(totalPrice + interestTotal)}
                                    <span className="woocommerce-Price-currencySymbol">₺</span>
                                </span>
                    </strong>
                </td>
            </tr>
            </tfoot>
        </table>
    );
}

export default OrderReviewItemList;