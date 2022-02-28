import React, { Component } from 'react';

class DeviceListItem extends Component {
    render() {
        const { item, listCount } = this.props
        return (
            <div className={this.getClassses(listCount)}>
                <a className="woocommerce-LoopProduct-link woocommerce-loop-product__link" href={item.url}>
                    <img width="224" height="197" alt="" className="attachment-shop_catalog size-shop_catalog wp-post-image" src={item.imageUrl} />
                    <br />
                    <h2 className="woocommerce-loop-product__title">{item.title}
                    </h2>
                </a>
                <div className="hover-area">
                    <a className="button add_to_cart_button" href={item.url} rel="nofollow">Telefon Onar / Yenile</a>
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

export default DeviceListItem;