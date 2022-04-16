import React  from 'react';
import useBasket from "../../store/hooks/useBasket";
import {ayir} from "../../store/selectors/basket";

const OrderReviewItemList = (props) => {
    const {
        installmentFee = { fee: 0 }
    } = props;
    const {
        totalPrice: subTotal,
        basketArray,
    } = useBasket();

    let totalPrice = subTotal;

    let installmentFeeCalc = (installmentFee?.fee || 0) - totalPrice;
    if (installmentFeeCalc < 0) installmentFeeCalc = 0;
    else totalPrice += installmentFeeCalc;

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
            {Boolean(installmentFeeCalc) && (
                <tr className="cart-subtotal">
                    <th>Taksit Ücreti</th>
                    <td>
                            <span className="woocommerce-Price-amount amount">
                                {ayir(installmentFeeCalc)}
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
                                    {ayir(totalPrice)}
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