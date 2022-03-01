import React, { Component } from "react";

class GridItem extends Component {
    render() {
        const { item, addToBasket, listCount } = this.props
        console.log(item);
        return (
            <div className={this.getClassses(listCount)}>
                <a className="woocommerce-LoopProduct-link woocommerce-loop-product__link" href={item.url}>
                    <img width="224" height="197" alt="" className="attachment-shop_catalog size-shop_catalog wp-post-image" src={item.imageUrl} />
                    <br />
                    <span className="price">
                        <span className="woocommerce-Price-amount amount">
                            <span className="woocommerce-Price-currencySymbol">₺</span>{item.price}</span>
                    </span>
                    <h2 className="woocommerce-loop-product__title">{item.title}
                    </h2>
                </a>
                <div className="hover-area">
                    <a className="button" href="#" onClick={() => addToBasket(item.id)}>Sepete ekle</a>
                </div>
            </div>
        )
    }
    getClassses(i) {
        if ((i % 4) === 1) return 'product first'
        if ((i % 4) === 0) return 'product last'
        return 'product'
    }
}

export default GridItem