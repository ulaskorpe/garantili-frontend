import React, { Component } from 'react';

class OrderItem extends Component {
    render() {
        const {item, removeFromBasket} = this.props
        return (
            <tr>
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
                        <span id="quantity-input-1" type="text" name="cart[e2230b853516e7b05d79744fbd4c9c13][qty]" value={item.quantity} title="Qty" class="qty text">{item.quantity}</span>
                    </div>
                </td>
                <td data-title="Total" class="product-subtotal text-right">
                    <span class="woocommerce-Price-amount amount">
                        <span class="woocommerce-Price-currencySymbol">₺</span>{item.totalPrice}</span>
                </td>
            </tr>
        );
    }
}

export default OrderItem;