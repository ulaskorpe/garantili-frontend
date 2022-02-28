import { useState } from "react"
import OrderReview from "../cart/OrderReview"
import BreadCrumb from "../layout/BreadCrumb"
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import Topbar from "../layout/Topbar"

function OrderFollow(props) {
    const { basket, onAddToBasket, removeFromBasket } = props

    const [crumb, setCrumb] = useState([
        { url: '#', title: 'Sipariş Takibi' }
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
                        <div id="primary" class="content-area">
                            <main id="main" class="site-main">
                                <div class="type-page hentry">
                                    <div class="entry-content">
                                        <br />
                                        <br />
                                        <div class="woocommerce">
                                            <div class="customer-login-form">
                                                <div id="customer_login" class="u-columns col2-set">
                                                    <div class="col-md-4 col-sm-12 plr-6 right-seperator">
                                                        <h2>Sipariş Takip</h2>
                                                        <form method="post" class="woocomerce-form woocommerce-form-login login">
                                                            <p class="before-login-text form-text-cb">
                                                                Siparşinizi kargo takibinizi yapabilirsiniz.
                                                            </p>
                                                            <p class="form-row form-row-wide">
                                                                <label for="username">Sipariş Takip Numarası
                                                                    <span class="required">*</span>
                                                                </label>
                                                                <input type="text" class="input-text" name="username" id="username" value="" />
                                                            </p>
                                                            <p class="form-row">
                                                                <input class="woocommerce-Button button btn-navy" type="submit" value="Ara"
                                                                    name="login" />
                                                            </p>
                                                        </form>
                                                    </div>
                                                    <div class="col-md-4 col-sm-12 plr-6 right-seperator">
                                                        <h2>Onarım Takip</h2>
                                                        <form class="woocommerce-form woocommerce-form-login register" method="post">
                                                            <p class="before-register-text form-text-cb mb-4">
                                                                Cihaz Onarım Takibinizi Yapabilirsiniz
                                                            </p>

                                                            <p class="form-row form-row-wide">
                                                                <label for="reg_email">Onarım Takip Numarası
                                                                    <span class="required">*</span>
                                                                </label>
                                                                <input type="email" value="" id="reg_email" name="email"
                                                                    class="woocommerce-Input woocommerce-Input--text input-text" />
                                                            </p>
                                                            <p class="form-row">
                                                                <input type="submit" class="woocommerce-Button button btn-navy" name="register"
                                                                    value="Ara" />
                                                            </p>
                                                        </form>
                                                    </div>
                                                    <div class="col-md-4 col-sm-12 plr-6">
                                                        <h2>Telefon Sat Takip</h2>
                                                        <form class="woocommerce-form woocommerce-form-login register" method="post">
                                                            <p class="before-register-text form-text-cb mb-4">Telefon Sat Kargo Takibinizi Yapabilirsiniz</p>

                                                            <p class="form-row form-row-wide">
                                                                <label for="reg_email">Telefon Satış Takip Numarası
                                                                    <span class="required">*</span>
                                                                </label>
                                                                <input type="email" value="" id="reg_email" name="email"
                                                                    class="woocommerce-Input woocommerce-Input--text input-text" />
                                                            </p>
                                                           
                                                            <p class="form-row">
                                                                <input type="submit" class="woocommerce-Button button btn-navy" name="register"
                                                                    value="Ara" />
                                                            </p>
                                                        </form>
                                                    </div>
                                                </div>
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

export default OrderFollow