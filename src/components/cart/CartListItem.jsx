import React, { Component } from 'react';

class CartListItem extends Component {
    render() {
        const {item, removeFromBasket} = this.props
        return (
            <tr>
                <td class="product-remove">
                    <a class="remove" href="#">×</a>
                </td>
                <td class="product-thumbnail">
                    <a href={item.url}>
                        <img width="180" height="180" alt="" class="wp-post-image" src={item.imageUrl} />
                    </a>
                </td>
                <td data-title="Product" class="product-name">
                    <div class="media cart-item-product-detail">
                        <a href={item.url}>
                            <img width="180" height="180" alt="" class="wp-post-image" src={item.imageUrl} />
                        </a>
                        <div class="media-body align-self-center">
                            <a href={item.url}>{item.title}</a>
                        </div>
                    </div>
                </td>
                <td data-title="Price" class="product-price">
                    <span class="woocommerce-Price-amount amount">
                        <span class="woocommerce-Price-currencySymbol">₺</span>{item.price}</span>
                </td>
                <td class="product-quantity" data-title="Quantity">
                    <div class="quantity">
                        <label for="quantity-input-1">Adet</label>
                        <input id="quantity-input-1" type="number" name="cart[e2230b853516e7b05d79744fbd4c9c13][qty]" value={item.quantity} title="Qty" class="input-text qty text" size="4" />
                    </div>
                </td>
                <td data-title="Total" class="product-subtotal">
                    <span class="woocommerce-Price-amount amount">
                        <span class="woocommerce-Price-currencySymbol">₺</span>{item.totalPrice}</span>
                    <a title="Remove this item" class="remove" href="#">×</a>
                </td>
            </tr>
        );
    }
}

export default CartListItem;