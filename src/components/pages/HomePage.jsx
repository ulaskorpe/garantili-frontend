import React, { Component } from "react";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import TopBar from "../layout/TopBar";
import Banner from "../main/banner/Banner";
import FullMessage from "../main/messageArea/FullMessage";
import PartnerList from "../main/partner/PartnerList";
import HomeProductList from "../main/product/HomeProducts/HomeProductList";
import NewArrivals from "../main/product/HomeProducts/NewArrivals";
import Slider from "../main/slider/Slider";

const HomePage = (props) => {
    const { homeContent } = props;

    return (
        <div className="woocommerce-active garantili-design-pattern-homepage-v1 can-uppercase">
            <div id="page" className="hfeed site">
                <TopBar />
                <HeaderMain />

                <div id="content" className="site-content">
                    <div className="col-full">
                        <div className="row">
                            <div id="primary" className="content-area">
                                <main id="main" className="site-main">
                                    <Slider />
                                    <FullMessage />
                                    <Banner />
                                    <HomeProductList content={homeContent} />
                                    <PartnerList />
                                    <NewArrivals />
                                    <Banner />
                                </main>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default HomePage