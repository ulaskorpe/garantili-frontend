import React, { Component } from "react";

class SmallListItem extends Component {
    render() {

        const { item, addToBasket, listCount } = this.props
        return (
            <div className="product list-view-small first ">
                <div className="media">
                    <img width="224" height="197" alt="" className="attachment-shop_catalog size-shop_catalog wp-post-image" src={item.imageUrl} />
                    <div className="media-body">
                        <div className="product-info">
                            <a className="woocommerce-LoopProduct-link woocommerce-loop-product__link"
                                href="#">
                                <h2 className="woocommerce-loop-product__title">{item.title}</h2>
                                <div className="techmarket-product-rating">
                                    <div title="Rated 5.00 out of 5" className="star-rating">
                                        <span className="w-100">
                                            5 üzerinden <strong className="rating">{item.rating}</strong>
                                        </span>
                                    </div>
                                    <span className="review-count">({item.reviewCount})</span>
                                </div>
                            </a>
                            <div className="woocommerce-product-details__short-description">
                                <ul>
                                    {item.details.map((detail, i) => <li key={i}>{detail}</li>)}
                                </ul>
                            </div>
                        </div>
                        <div className="product-actions">
                            <span className="price">
                                <span className="woocommerce-Price-amount amount"><span className="woocommerce-Price-currencySymbol">₺</span>{item.price}</span>
                            </span>
                            <a className="button add_to_cart_button" href="#">Sepete ekle</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SmallListItem