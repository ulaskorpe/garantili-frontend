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
        </a>
    </div>
);

class GridItem extends Component {
    render() {
        const { item, addToBasket, listCount, isPlaceholder = false } = this.props;
        const className = this.getClassses(listCount);

        if (isPlaceholder) return <Placeholder className={className} />;
        return (
            <div className={className}>
                <a className="woocommerce-LoopProduct-link woocommerce-loop-product__link" href={item.url} >
                    <img width="224" height="197" alt="" className="attachment-shop_catalog size-shop_catalog wp-post-image" src={item.imageUrl} />
                    <br />
                    <div className="price">
                        <span className="woocommerce-Price-amount amount">
                            <span className="woocommerce-Price-currencySymbol">₺</span>{item.price}
                        </span>
                    </div>
                    <h2 className="woocommerce-loop-product__title">
                        {item.title}
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