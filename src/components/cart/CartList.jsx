import React from 'react';
import CartListItem from "./CartListItem"
import {useSelector} from "react-redux";
import {getBasketItemsObject} from "../../store/selectors/basket";

function CartList() {
    const basket = useSelector(getBasketItemsObject);

    return (
        <form method="post" onClick={(e) => e.preventDefault()} className="woocommerce-cart-form">
            <table className="shop_table shop_table_responsive cart">
                <thead>
                    <tr>
                        <th className="product-remove">&nbsp;</th>
                        <th className="product-thumbnail">&nbsp;</th>
                        <th className="product-name">Ürünler</th>
                        <th className="product-price">Fiyat</th>
                        <th className="product-quantity">Adet</th>
                        <th className="product-subtotal">Toplam</th>
                    </tr>
                </thead>
                <tbody>
                {Boolean(Object.keys(basket).length) ? (
                    Object.keys(basket).map((basketItemKey, basketItemIDX) => {
                        const basketItem = basket[basketItemKey];
                        return (
                            <CartListItem
                                item={basketItem}
                                key={`basket_item_${basketItem.id}_${basketItemIDX}`}
                            />
                        );
                    })
                ): (
                    <tr>
                        <td colSpan={6}>
                            <div
                                style={{ padding: '20px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            >
                                <span>Sepetiniz boş</span>
                            </div>
                        </td>
                    </tr>
                )}
                    <tr>
                        <td className="actions" colSpan="6">
                            <br />
                            <div className="coupon">
                                <label
                                    htmlFor="coupon_code"
                                >Kupon kodu:</label>
                                <input type="text" placeholder="Kupon kodu" defaultValue="" id="coupon_code" className="input-text" name="coupon_code" />
                                <input type="submit" defaultValue="Uygula" name="apply_coupon" className="button btn-navy" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}

export default CartList