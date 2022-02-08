import React, { Component } from "react";
import Branding from "./Branding"
import MainNavigation from './Navigation/MainNavigation'
import MainBasket from './Basket/MainBasket'
import HeaderBottom from "./HeaderBottom/HeaderBottom";
import MobileNav from "./Navigation/MobileNav";

class HeaderMain extends Component {
    render() {
        const { basket, onRemoveBasket } = this.props
        return (
            <header id="masthead" className="site-header header-v1">
                <div className="col-full desktop-only">
                    <div>
                        <div className="row">
                            <Branding />
                            <MainNavigation />
                            <MainBasket basket={basket} onRemoveBasket={onRemoveBasket} />
                        </div>
                    </div>
                    <HeaderBottom />
                </div>
                <MobileNav basket={basket} />
            </header>
        )
    }
}

export default HeaderMain