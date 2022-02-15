import { useState } from "react"
import OrderReview from "../cart/OrderReview"
import BreadCrumb from "../layout/BreadCrumb"
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import Topbar from "../layout/Topbar"

function Login(props) {
    const { basket, onAddToBasket, removeFromBasket } = props

    const [crumb, setCrumb] = useState([
        { url: '#', title: 'Ödeme' }
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
                                        <div class="woocommerce">
                                            <div class="customer-login-form">
                                                <span class="or-text">veya</span>
                                                <div id="customer_login" class="u-columns col2-set">
                                                    <div class="u-column1 col-1">
                                                        <h2>Giriş Yap</h2>
                                                        <form method="post" class="woocomerce-form woocommerce-form-login login">
                                                            <p class="before-login-text">
                                                                Siparşinizi takip etmek, ve daha önceki siparişleriniz oylamak için giriş yapın.
                                                            </p>
                                                            <p class="form-row form-row-wide">
                                                                <label for="username">E-Posta
                                                                    <span class="required">*</span>
                                                                </label>
                                                                <input type="text" class="input-text" name="username" id="username" value="" />
                                                            </p>
                                                            <p class="form-row form-row-wide">
                                                                <label for="password">Parola
                                                                    <span class="required">*</span>
                                                                </label>
                                                                <input class="input-text" type="password" name="password" id="password" />
                                                            </p>
                                                            <p class="form-row">
                                                                <input class="woocommerce-Button button" type="submit" value="Giriş Yap"
                                                                    name="login" />
                                                                    <label for="rememberme"
                                                                        class="woocommerce-form__label woocommerce-form__label-for-checkbox inline">
                                                                        <input class="woocommerce-form__input woocommerce-form__input-checkbox"
                                                                            name="rememberme" type="checkbox" id="rememberme" value="forever" />
                                                                        Beni hatırla
                                                                    </label>
                                                            </p>
                                                            <p class="woocommerce-LostPassword lost_password">
                                                                <a href="#">Parolanı unuttun mu?</a>
                                                            </p>
                                                        </form>
                                                    </div>
                                                    <div class="u-column2 col-2">
                                                        <h2>Kayıt Ol</h2>
                                                        <form class="register" method="post">
                                                            <p class="before-register-text">
                                                            Kişiselleştirilmiş bir alışverişin avantajlarından yararlanmak için bugün yeni bir hesap oluşturun.
                                                            </p>
                                                            <p class="form-row form-row-wide">
                                                                <label for="reg_email">E-Posta
                                                                    <span class="required">*</span>
                                                                </label>
                                                                <input type="email" value="" id="reg_email" name="email"
                                                                    class="woocommerce-Input woocommerce-Input--text input-text" />
                                                            </p>
                                                            <p class="form-row form-row-wide">
                                                                <label for="reg_password">Parola
                                                                    <span class="required">*</span>
                                                                </label>
                                                                <input type="password" id="reg_password" name="password"
                                                                    class="woocommerce-Input woocommerce-Input--text input-text" />
                                                            </p>
                                                            <p class="form-row">
                                                                <input type="submit" class="woocommerce-Button button" name="register"
                                                                    value="Kayıt Ol" />
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

export default Login