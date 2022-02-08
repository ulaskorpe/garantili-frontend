import React, { Component } from "react";
import DealList from "./DealList";
import HomeProducts from "./HomeProduct";

class HomeProductList extends Component {
    render() {
        const { content, onAddToBasket } = this.props
        return (
            <div className="section-deals-carousel-and-products-carousel-tabs row">
                <DealList />
                <HomeProducts
                    products={content.products}
                    onAddToBasket={onAddToBasket} />
            </div>
        )
    }
}

export default HomeProductList