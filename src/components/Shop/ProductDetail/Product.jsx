import React, { Component } from "react";
import {ayir} from "../../../store/selectors/basket";

class Product extends Component {
    render() {
        const { product, openModalEvent } = this.props
        return (
            <div className="product">
                <a href={product.url} className="woocommerce-LoopProduct-link">
                    <img src={product.imageUrl} width="224" height="197" className="wp-post-image" alt="" />
                    <span className="price">
                        <ins>
                            <span className="amount"> </span>
                        </ins>
                        <span className="amount">{ayir(product.price)}₺</span>
                    </span>
                    <h2 className="woocommerce-loop-product__title">{product.title}</h2>
                </a>
                <div className="hover-area">
                    <a className="button add_to_cart_button" onClick={openModalEvent(product)} rel="nofollow">Sepete Ekle</a>
                </div>
            </div>
        )
    }

    getClassses(i) {
        if ((i % 4) === 0) return 'product last'
        if ((i % 4) === 1) return 'product first'
        return 'product'
    }
}
export default Product