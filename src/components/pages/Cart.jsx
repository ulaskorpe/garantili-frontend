import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import Topbar from "../layout/Topbar"
import BreadCrumb from "../layout/BreadCrumb"
import { useState } from "react"
import CartList from "../cart/CartList"
import CartTotals from "../cart/CartTotals"
function Cart(props) {

    const { basket, onAddToBasket, removeFromBasket } = props

    const [crumb, setCrumb] = useState([
        { url: '#', title: 'Alışveriş Sepeti' }
    ])

    return (
        <div className="woocommerce-active single-product full-width normal">
            <div id="page" className="hfeed site">
                <Topbar />
                <HeaderMain basket={basket}
                    onRemoveBasket={removeFromBasket}
                />
            </div>
            <div id="content" className="site-content" tabIndex="-1">
                <div className="col-full">
                    <div className="row">
                        <BreadCrumb crumbs={crumb} />
                        <div id="primary" className="content-area">
                            <main id="main" className="site-main">
                                <div class="type-page hentry">
                                    <div class="entry-content">
                                        <div class="woocommerce">
                                            <div class="cart-wrapper">
                                                <CartList removeFromBasket={removeFromBasket} />
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