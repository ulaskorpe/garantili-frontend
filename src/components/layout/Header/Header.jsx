import React from "react";
import Branding from "./Branding"
import MainNavigation from './Navigation/MainNavigation'
import MainBasket from './Basket/MainBasket'
import HeaderBottom from "./HeaderBottom/HeaderBottom";
import MobileNav from "./Navigation/MobileNav";

const HeaderMain = () => {
    return (
        <header id="masthead" className="site-header header-v1">
            <div className="col-full desktop-only">
                <div>
                    <div className="row">
                        <Branding />
                        <MainNavigation />
                        <MainBasket />
                    </div>
                </div>
                <HeaderBottom />
            </div>
            <MobileNav />
        </header>
    )
};

export default HeaderMain