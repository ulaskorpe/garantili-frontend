import { useState } from "react"
import CartListItem from "./CartListItem"

function CartList() {

    const [items, setCartItems] = useState([
        { id: 1, title: 'Apple iPhone 12 Pro Pacific Blue', quantity: 2, price: 24000, totalPrice: 48000, imageUrl: '', url: '/urun-detay/iphone-12-mini-64-gb-3', imageUrl: '/assets/images/products/L10.jpg' }
    ])

    return (
        <form method="post" action="#" class="woocommerce-cart-form">
            <table class="shop_table shop_table_responsive cart">
                <thead>
                    <tr>
                        <th class="product-remove">&nbsp;</th>
                        <th class="product-thumbnail">&nbsp;</th>
                        <th class="product-name">Ürünler</th>
                        <th class="product-price">Fiyat</th>
                        <th class="product-quantity">Adet</th>
                        <th class="product-subtotal">Toplam</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(_ => <CartListItem item={_} />)}
                    <tr>
                        <td class="actions" colspan="6">
                            <br />
                            <div class="coupon">
                                <label for="coupon_code">Kupon kodu:</label>
                                <input type="text" placeholder="Kupon kodu" value="" id="coupon_code" class="input-text" name="coupon_code" />
                                <input type="submit" value="Uygula" name="apply_coupon" class="button btn-navy" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}

export default CartList