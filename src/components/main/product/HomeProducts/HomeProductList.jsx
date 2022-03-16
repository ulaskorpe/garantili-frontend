import React, { Component } from "react";
import DealList from "./DealList";
import HomeProducts from "./HomeProduct";

class HomeProductList extends Component {
    render() {
        return (
            <div className="section-deals-carousel-and-products-carousel-tabs row">
                <DealList />
                <HomeProducts />
            </div>
        )
    }
}

export default HomeProductList