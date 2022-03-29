import React, { Component } from "react";

class ProductGalleryItem extends Component {
    render() {
        const { galleryItem } = this.props
        return (
            <div data-thumb={galleryItem.imageUrl}
                className="woocommerce-product-gallery__image">
                <a href={galleryItem.imageUrl} tabIndex="0">
                    <img width="550" height="550" src={galleryItem.imageUrl} className="attachment-shop_single size-shop_single wp-post-image" alt="" />
                </a>
            </div>
        )
    }
}

export default ProductGalleryItem