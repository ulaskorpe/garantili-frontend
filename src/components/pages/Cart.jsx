import React from 'react';
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"
import BreadCrumb from "../layout/BreadCrumb"
import { useState } from "react"
import CartList from "../cart/CartList"
import CartTotals from "../cart/CartTotals"
function Cart(props) {
    const [crumb, setCrumb] = useState([
        { url: '#', title: 'Alışveriş Sepeti' }
    ])

    return (
        <div className="woocommerce-active single-product full-width normal">
            <div id="page" className="hfeed site">
                <TopBar />
                <HeaderMain />
            </div>
            <div id="content" className="site-content" tabIndex="-1">
                <div className="col-full">
                    <div className="row">
                        <BreadCrumb crumbs={crumb} />
                        <div id="primary" className="content-area">
                            <main id="main" className="site-main">
                                <div className="type-page hentry">
                                    <div className="entry-content">
                                        <div className="woocommerce">
                                            <h3 className="border-bottom-1px">Alışveriş Sepeti</h3>
                                            <div className="cart-wrapper">
                                                <CartList />
                                                <CartTotals />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Cart