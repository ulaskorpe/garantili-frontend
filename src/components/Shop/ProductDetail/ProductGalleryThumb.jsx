import React, { Component } from "react";

class ProductGalleryThub extends Component {
    render() {
        const { image } = this.props
        return (
            <figure data-thumb={image.imageUrl}
                className="techmarket-wc-product-gallery__image">
                <img width="108" height="108" src={`https://buyback.garantiliteknoloji.com/${image.imageUrl}`}
                    className="attachment-shop_thumbnail size-shop_thumbnail wp-post-image" alt="" />
            </figure>
        )
    }
}

export default ProductGalleryThub