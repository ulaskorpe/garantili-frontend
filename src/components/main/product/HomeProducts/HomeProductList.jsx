import React  from "react";
import DealList from "./DealList";
import HomeProducts from "./HomeProduct";

const HomeProductList = (props) => {
    const { openModalEvent } = props;

    return (
        <div className="section-deals-carousel-and-products-carousel-tabs row">
            <DealList />
            <HomeProducts
                openModalEvent={openModalEvent}
            />
        </div>
    );
};

export default HomeProductList