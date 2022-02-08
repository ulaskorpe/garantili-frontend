import React, { Component } from "react";
    
class ListLarge extends Component {
    render() {
        const { item, addToBasket, listCount } = this.props
        return (
            <div className="product list-view-large first ">
                <div className="media">
                    <img width="224" height="197" alt="" className="attachment-shop_catalog size-shop_catalog wp-post-image"
                        src={item.imageUrl} />
                    <div className="media-body">
                        <div className="product-info">
                            <a className="woocommerce-LoopProduct-link woocommerce-loop-product__link"
                                href={item.url}>
                                <h2 className="woocommerce-loop-product__title">{item.title}</h2>
                                <div className="techmarket-product-rating">
                                    <div className="star-rating">
                                        <span className="w-100">5 üzerinden <strong className="rating">{item.rating}</strong></span>
                                    </div>
                                    <span className="review-count">{item.reviewCount}</span>
                                </div>
                            </a>
                            <div className="brand">
                                <a href="#">
                                    <img alt={item.brandName} src={item.brandImage} />
                                </a>
                            </div>
                            <div className="woocommerce-product-details__short-description">
                                <ul>
                                    {
                                        item.details.map((detail, i) => {
                                            return (<li key={i}>{detail}</li>)
                                        })
                                    }
                                </ul>
                            </div>
                            <span className="sku_wrapper">SKU:
                                <span className="sku">{item.stockCode}</span>
                            </span>
                        </div>
                        <div className="product-actions">
                            <div className="availability">
                                Stok:
                                <p className="stock in-stock">{item.stockCount}</p>
                            </div>
                            <span className="price">
                                <span className="woocommerce-Price-amount amount">
                                    <span className="woocommerce-Price-currencySymbol">₺</span>{item.price}</span>
                            </span>
                            <a className="button add_to_cart_button" href="#">Sepete Ekle</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListLarge