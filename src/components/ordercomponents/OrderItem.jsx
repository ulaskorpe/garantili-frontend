import React, { Component } from 'react';
import {ayir} from "../../store/selectors/basket";

class OrderItem extends Component {
    render() {
        const {item} = this.props
        return (
            <tr>
                <td data-title="Product" className="product-name">
                    <div className="media cart-item-product-detail">
                        <a href={item.url}>
                            <img width="180" height="180" alt="" className="wp-post-image" src={item.imageUrl} />
                        </a>
                        <div className="media-body align-self-center">
                            <a href={item.url}>{item.title}</a>
                        </div>
                    </div>
                </td>
                <td data-title="Price" className="product-price">
                    <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol">₺</span>{ayir(item.price)}</span>
                </td>
                <td className="product-quantity" data-title="Quantity">
                    <div className="quantity">
                        <label htmlFor="quantity-input-1">Adet</label>
                        <span id="quantity-input-1" className="qty text">{item.quantity}</span>
                    </div>
                </td>
                <td data-title="Total" className="product-subtotal text-right">
                    <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol">₺</span>{ayir(item.price * item.quantity)}</span>
                </td>
            </tr>
        );
    }
}

export default OrderItem;