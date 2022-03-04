import { useState } from "react"
import OrderReview from "../cart/OrderReview"
import BreadCrumb from "../layout/BreadCrumb"
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"

function Payment(props) {
    const { basket, onAddToBasket, removeFromBasket } = props

    const [crumb, setCrumb] = useState([
        { url: '#', title: 'Ödeme' }
    ])

    return (
        <div className="woocommerce-active single-product full-width normal">
            <div id="page" className="hfeed site">
                <TopBar />
                <HeaderMain basket={basket}
                    onRemoveBasket={removeFromBasket}
                />
            </div>
            <div id="content" className="site-content" tabIndex="-1">
                <div className="col-full">
                    <div className="row">
                        <BreadCrumb crumbs={crumb} />
                        <div id="primary" className="content-area">

                            <main class="site-main" id="main">
                                <div class="type-page hentry">
                                    <div class="entry-content">
                                        <div class="woocommerce">
                                            <div class="collapse" id="checkoutCouponForm">
                                                <form method="post" class="checkout_coupon">
                                                    <p class="form-row form-row-first">
                                                        <input type="text" value="" id="coupon_code" placeholder="Coupon code" class="input-text"
                                                            name="coupon_code" />
                                                    </p>
                                                    <p class="form-row form-row-last">
                                                        <input type="submit" value="Apply coupon" name="apply_coupon" class="button" />
                                                    </p>
                                                    <div class="clear"></div>
                                                </form>
                                            </div>
                                            <form action="#" class="checkout woocommerce-checkout" method="post" name="checkout">
                                                <div id="customer_details" class="col2-set">
                                                    <div class="col-1">
                                                        <div class="woocommerce-billing-fields">
                                                            <h3>Fatura Bilgileri</h3>
                                                            <div class="woocommerce-billing-fields__field-wrapper-outer">
                                                                <div class="woocommerce-billing-fields__field-wrapper">
                                                                    <p id="billing_first_name_field"
                                                                        class="form-row form-row-first validate-required woocommerce-invalid woocommerce-invalid-required-field">
                                                                        <label class="" for="billing_first_name">Ad
                                                                            <abbr title="required" class="required">*</abbr>
                                                                        </label>
                                                                        <input type="text" value="" placeholder="" id="billing_first_name"
                                                                            name="billing_first_name" class="input-text " />
                                                                    </p>
                                                                    <p id="billing_last_name_field"
                                                                        class="form-row form-row-last validate-required">
                                                                        <label class="" for="billing_last_name">Soyad
                                                                            <abbr title="required" class="required">*</abbr>
                                                                        </label>
                                                                        <input type="text" value="" placeholder="" id="billing_last_name"
                                                                            name="billing_last_name" class="input-text " />
                                                                    </p>
                                                                    <div class="clear"></div>
                                                                    <p id="billing_address_1_field"
                                                                        class="form-row form-row-wide address-field validate-required">
                                                                        <label class="" for="billing_address_1">Sokak adresi, cadde
                                                                            <abbr title="required" class="required">*</abbr>
                                                                        </label>
                                                                        <input type="text" value="" placeholder="Sokak adresi, cadde"
                                                                            id="billing_address_1" name="billing_address_1" class="input-text " />
                                                                    </p>
                                                                    <p id="billing_address_2_field" class="form-row form-row-wide address-field">
                                                                        <input type="text" value=""
                                                                            placeholder="Apartman, daire"
                                                                            id="billing_address_2" name="billing_address_2" class="input-text " />
                                                                    </p>
                                                                    <p id="billing_city_field"
                                                                        class="form-row form-row-wide address-field validate-required"
                                                                        data-o_class="form-row form-row form-row-wide address-field validate-required">
                                                                        <label class="" for="billing_city">İl
                                                                            <abbr title="required" class="required">*</abbr>
                                                                        </label>
                                                                        <input type="text" value="" placeholder="" id="billing_city"
                                                                            name="billing_city" class="input-text " />
                                                                    </p>
                                                                    <p id="billing_postcode_field"
                                                                        class="form-row form-row-wide address-field validate-postcode validate-required"
                                                                        data-o_class="form-row form-row form-row-last address-field validate-required validate-postcode">
                                                                        <label class="" for="billing_postcode">Posta Kodu
                                                                            <abbr title="required" class="required">*</abbr>
                                                                        </label>
                                                                        <input type="text" value="" placeholder="" id="billing_postcode"
                                                                            name="billing_postcode" class="input-text " />
                                                                    </p>
                                                                    <p id="billing_phone_field"
                                                                        class="form-row form-row-last validate-required validate-phone">
                                                                        <label class="" for="billing_phone">Phone
                                                                            <abbr title="required" class="required">*</abbr>
                                                                        </label>
                                                                        <input type="tel" value="" placeholder="" id="billing_phone"
                                                                            name="billing_phone" class="input-text " />
                                                                    </p>
                                                                    <p id="billing_email_field"
                                                                        class="form-row form-row-first validate-required validate-email">
                                                                        <label class="" for="billing_email">Email Address
                                                                            <abbr title="required" class="required">*</abbr>
                                                                        </label>
                                                                        <input type="email" value="" placeholder="" id="billing_email"
                                                                            name="billing_email" class="input-text " />
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-2">
                                                        <div class="woocommerce-shipping-fields">
                                                            <h3 id="ship-to-different-address">
                                                                <label
                                                                    class="collapsed woocommerce-form__label woocommerce-form__label-for-checkbox checkbox"
                                                                    data-toggle="collapse" data-target="#shipping-address"
                                                                    aria-controls="shipping-address">
                                                                    <input id="ship-to-different-address-checkbox"
                                                                        class="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"
                                                                        type="checkbox" value="1" name="ship_to_different_address" />
                                                                    <span>Farklı adrese kargola?</span>
                                                                </label>
                                                            </h3>
                                                            <div class="shipping_address collapse" id="shipping-address">
                                                                <div class="woocommerce-shipping-fields__field-wrapper">
                                                                    <p id="shipping_first_name_field"
                                                                        class="form-row form-row-first validate-required">
                                                                        <label class="" for="shipping_first_name">Ad
                                                                            <abbr title="required" class="required">*</abbr>
                                                                        </label>
                                                                        <input type="text" autofocus="autofocus" autocomplete="given-name" value=""
                                                                            placeholder="" id="shipping_first_name" name="shipping_first_name"
                                                                            class="input-text " />
                                                                    </p>
                                                                    <p id="shipping_last_name_field"
                                                                        class="form-row form-row-last validate-required">
                                                                        <label class="" for="shipping_last_name">Soyad
                                                                            <abbr title="required" class="required">*</abbr>
                                                                        </label>
                                                                        <input type="text" autocomplete="family-name" value="" placeholder=""
                                                                            id="shipping_last_name" name="shipping_last_name" class="input-text " />
                                                                    </p>
                                                                    <p id="shipping_address_1_field"
                                                                        class="form-row form-row-wide address-field validate-required">
                                                                        <label class="" for="shipping_address_1">Sokak adresi, cadde
                                                                            <abbr title="required" class="required">*</abbr>
                                                                        </label>
                                                                        <input type="text" autocomplete="address-line1" value=""
                                                                            placeholder="Sokak adresi, cadde" id="shipping_address_1"
                                                                            name="shipping_address_1" class="input-text " />
                                                                    </p>
                                                                    <p id="shipping_address_2_field" class="form-row form-row-wide address-field">
                                                                        <input type="text" autocomplete="address-line2" value=""
                                                                            placeholder="A"
                                                                            id="shipping_address_2" name="shipping_address_2" class="input-text " />
                                                                    </p>
                                                                    <p id="shipping_city_field"
                                                                        class="form-row form-row-wide address-field validate-required"
                                                                        data-o_class="form-row form-row-wide address-field validate-required">
                                                                        <label class="" for="shipping_city">İl
                                                                            <abbr title="required" class="required">*</abbr>
                                                                        </label>
                                                                        <input type="text" autocomplete="address-level2" value="" placeholder=""
                                                                            id="shipping_city" name="shipping_city" class="input-text " />
                                                                    </p>

                                                                    <p data-priority="90" id="shipping_postcode_field"
                                                                        class="form-row form-row-wide address-field validate-postcode validate-required"
                                                                        data-o_class="form-row form-row-wide address-field validate-required validate-postcode">
                                                                        <label class="" for="shipping_postcode">Posta Kodu
                                                                            <abbr title="required" class="required">*</abbr>
                                                                        </label>
                                                                        <input type="text" autocomplete="postal-code" value="" placeholder=""
                                                                            id="shipping_postcode" name="shipping_postcode" class="input-text " />
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="woocommerce-additional-fields">
                                                            <div class="woocommerce-additional-fields__field-wrapper">
                                                                <p id="order_comments_field" class="form-row notes">
                                                                    <label class="" for="order_comments">Sipariş Notu</label>
                                                                    <textarea cols="5" rows="2"
                                                                        placeholder="Sipariş notunuz..."
                                                                        id="order_comments" class="input-text " name="order_comments"></textarea>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <OrderReview />
                                            </form>
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

export default Payment