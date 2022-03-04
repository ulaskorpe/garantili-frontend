import React, { Component } from "react";

const Placeholder = ({ className }) => (
    <div className={`is-placeholder ${className}`}>
        <a className="woocommerce-LoopProduct-link woocommerce-loop-product__link" >
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: 224, height: 197, backgroundColor: '#eaeaea', margin: '0 auto 6px', borderRadius: 5, }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4, marginBottom: 8, }}>
                <div style={{ display: 'block', width: 90, height: 8, backgroundColor: '#eaeaea', borderRadius: 2, }} />
            </div>

            <div className="woocommerce-loop-product__title" style={{ display: 'flex', justifyContent: 'center'}}>
                <div style={{ display: 'block', width: 150, height: 12, backgroundColor: '#eaeaea', borderRadius: 4, }} />
            </div>

            <div className="techmarket-product-rating" style={{ marginTop: 8, }}>
                <div className="star-rating">
                        <span className="w-100">
                            <strong className="rating">5.00</strong> out of 5
                        </span>
                </div>
            </div>
        </a>
    </div>
);
class GridExtended extends Component {
    render() {
        const { item, addToBasket, listCount, isPlaceholder = false } = this.props;
        const className = this.getClassses(listCount);

        if (isPlaceholder) return <Placeholder className={className} />;
        return (
            <div className={this.getClassses(listCount)}>
                <a className="woocommerce-LoopProduct-link woocommerce-loop-product__link"
                    href="single-product-fullwidth.html">
                    <img width="224" height="197" alt=""
                        className="attachment-shop_catalog size-shop_catalog wp-post-image"
                        src={item.imageUrl} />
                    <span className="price">
                        <span className="woocommerce-Price-amount amount">
                            <span className="woocommerce-Price-currencySymbol">₺</span>{item.price}</span>
                    </span>
                    <h2 className="woocommerce-loop-product__title">{item.title}</h2>
                </a>
                <div className="techmarket-product-rating">
                    <div title="Rated 5.00 out of 5" className="star-rating">
                        <span className="w-100">
                            <strong className="rating">5.00</strong> out of 5</span>
                    </div>
                    <span className="review-count">{item.reviewCount}</span>
                </div>
                <span className="sku_wrapper">SKU:
                    <span className="sku">{item.stockCode}</span>
                </span>
                <div className="woocommerce-product-details__short-description">
                    <ul>

                        {item.details.map((listitem, i) => {
                            return (<li key={i}>{listitem}</li>)
                        })}
                    </ul>
                </div>
                <a className="button product_type_simple add_to_cart_button"
                    href="cart.html">Sepete ekle</a>
            </div>
        )


    }

    getClassses(i) {
        if ((i % 4) === 1) return 'product first'
        if ((i % 4) === 0) return 'product last'
        return 'product'
    }
}

export default GridExtended