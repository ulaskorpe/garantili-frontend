import React from 'react';
import { useState } from "react"
import OrderReview from "../cart/OrderReview"
import BreadCrumb from "../layout/BreadCrumb"
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"

function Payment() {
    const [crumb] = useState([
        { url: '#', title: 'Ödeme' }
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

                            <main className="site-main" id="main">
                                <div className="type-page hentry">
                                    <div className="entry-content">
                                        <div className="woocommerce">
                                            <div className="collapse" id="checkoutCouponForm">
                                                <form method="post" className="checkout_coupon">
                                                    <p className="form-row form-row-first">
                                                        <input type="text" defaultValue="" id="coupon_code" placeholder="Coupon code" className="input-text"
                                                            name="coupon_code" />
                                                    </p>
                                                    <p className="form-row form-row-last">
                                                        <input type="submit" defaultValue="Apply coupon" name="apply_coupon" className="button" />
                                                    </p>
                                                    <div className="clear" />
                                                </form>
                                            </div>
                                            <form action="#" className="checkout woocommerce-checkout" method="post" name="checkout">
                                                <div id="customer_details" className="col2-set">
                                                    <div className="col-1">
                                                        <div className="woocommerce-billing-fields">
                                                            <h3>Fatura Bilgileri</h3>
                                                            <div className="woocommerce-billing-fields__field-wrapper-outer">
                                                                <div className="woocommerce-billing-fields__field-wrapper">
                                                                    <p id="billing_first_name_field"
                                                                        className="form-row form-row-first validate-required woocommerce-invalid woocommerce-invalid-required-field">
                                                                        <label className="" htmlFor="billing_first_name">Ad
                                                                            <abbr title="required" className="required">*</abbr>
                                                                        </label>
                                                                        <input type="text" defaultValue="" placeholder="" id="billing_first_name"
                                                                            name="billing_first_name" className="input-text " />
                                                                    </p>
                                                                    <p id="billing_last_name_field"
                                                                        className="form-row form-row-last validate-required">
                                                                        <label className="" htmlFor="billing_last_name">Soyad
                                                                            <abbr title="required" className="required">*</abbr>
                                                                        </label>
                                                                        <input type="text" defaultValue="" placeholder="" id="billing_last_name"
                                                                            name="billing_last_name" className="input-text " />
                                                                    </p>
                                                                    <div className="clear" />
                                                                    <p id="billing_address_1_field"
                                                                        className="form-row form-row-wide address-field validate-required">
                                                                        <label className="" htmlFor="billing_address_1">Sokak adresi, cadde
                                                                            <abbr title="required" className="required">*</abbr>
                                                                        </label>
                                                                        <input type="text" defaultValue="" placeholder="Sokak adresi, cadde"
                                                                            id="billing_address_1" name="billing_address_1" className="input-text " />
                                                                    </p>
                                                                    <p id="billing_address_2_field" className="form-row form-row-wide address-field">
                                                                        <input type="text" defaultValue=""
                                                                            placeholder="Apartman, daire"
                                                                            id="billing_address_2" name="billing_address_2" className="input-text " />
                                                                    </p>
                                                                    <p id="billing_city_field"
                                                                        className="form-row form-row-wide address-field validate-required"
                                                                        data-o_className="form-row form-row form-row-wide address-field validate-required">
                                                                        <label className="" htmlFor="billing_city">İl
                                                                            <abbr title="required" className="required">*</abbr>
                                                                        </label>
                                                                        <input type="text" defaultValue="" placeholder="" id="billing_city"
                                                                            name="billing_city" className="input-text " />
                                                                    </p>
                                                                    <p id="billing_postcode_field"
                                                                        className="form-row form-row-wide address-field validate-postcode validate-required"
                                                                        data-o_className="form-row form-row form-row-last address-field validate-required validate-postcode">
                                                                        <label className="" htmlFor="billing_postcode">Posta Kodu
                                                                            <abbr title="required" className="required">*</abbr>
                                                                        </label>
                                                                        <input type="text" defaultValue="" placeholder="" id="billing_postcode"
                                                                            name="billing_postcode" className="input-text " />
                                                                    </p>
                                                                    <p id="billing_phone_field"
                                                                        className="form-row form-row-last validate-required validate-phone">
                                                                        <label className="" htmlFor="billing_phone">Phone
                                                                            <abbr title="required" className="required">*</abbr>
                                                                        </label>
                                                                        <input type="tel" defaultValue="" placeholder="" id="billing_phone"
                                                                            name="billing_phone" className="input-text " />
                                                                    </p>
                                                                    <p id="billing_email_field"
                                                                        className="form-row form-row-first validate-required validate-email">
                                                                        <label className="" htmlFor="billing_email">Email Address
                                                                            <abbr title="required" className="required">*</abbr>
                                                                        </label>
                                                                        <input type="email" defaultValue="" placeholder="" id="billing_email"
                                                                            name="billing_email" className="input-text " />
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <div className="woocommerce-shipping-fields">
                                                            <h3 id="ship-to-different-address">
                                                                <label
                                                                    className="collapsed woocommerce-form__label woocommerce-form__label-for-checkbox checkbox"
                                                                    data-toggle="collapse" data-target="#shipping-address"
                                                                    aria-controls="shipping-address">
                                                                    <input id="ship-to-different-address-checkbox"
                                                                        className="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"
                                                                        type="checkbox" defaultValue="1" name="ship_to_different_address" />
                                                                    <span>Farklı adrese kargola?</span>
                                                                </label>
                                                            </h3>
                                                            <div className="shipping_address collapse" id="shipping-address">
                                                                <div className="woocommerce-shipping-fields__field-wrapper">
                                                                    <p id="shipping_first_name_field"
                                                                        className="form-row form-row-first validate-required">
                                                                        <label className="" htmlFor="shipping_first_name">Ad
                                                                            <abbr title="required" className="required">*</abbr>
                                                                        </label>
                                                                        <input type="text" autoFocus="autofocus" autoComplete="given-name" defaultValue=""
                                                                            placeholder="" id="shipping_first_name" name="shipping_first_name"
                                                                            className="input-text " />
                                                                    </p>
                                                                    <p id="shipping_last_name_field"
                                                                        className="form-row form-row-last validate-required">
                                                                        <label className="" htmlFor="shipping_last_name">Soyad
                                                                            <abbr title="required" className="required">*</abbr>
                                                                        </label>
                                                                        <input type="text" autoComplete="family-name" defaultValue="" placeholder=""
                                                                            id="shipping_last_name" name="shipping_last_name" className="input-text " />
                                                                    </p>
                                                                    <p id="shipping_address_1_field"
                                                                        className="form-row form-row-wide address-field validate-required">
                                                                        <label className="" htmlFor="shipping_address_1">Sokak adresi, cadde
                                                                            <abbr title="required" className="required">*</abbr>
                                                                        </label>
                                                                        <input type="text" autoComplete="address-line1" defaultValue=""
                                                                            placeholder="Sokak adresi, cadde" id="shipping_address_1"
                                                                            name="shipping_address_1" className="input-text " />
                                                                    </p>
                                                                    <p id="shipping_address_2_field" className="form-row form-row-wide address-field">
                                                                        <input type="text" autoComplete="address-line2" defaultValue=""
                                                                            placeholder="A"
                                                                            id="shipping_address_2" name="shipping_address_2" className="input-text " />
                                                                    </p>
                                                                    <p id="shipping_city_field"
                                                                        className="form-row form-row-wide address-field validate-required"
                                                                        data-o_className="form-row form-row-wide address-field validate-required">
                                                                        <label className="" htmlFor="shipping_city">İl
                                                                            <abbr title="required" className="required">*</abbr>
                                                                        </label>
                                                                        <input type="text" autoComplete="address-level2" defaultValue="" placeholder=""
                                                                            id="shipping_city" name="shipping_city" className="input-text " />
                                                                    </p>

                                                                    <p data-priority="90" id="shipping_postcode_field"
                                                                        className="form-row form-row-wide address-field validate-postcode validate-required"
                                                                        data-o_className="form-row form-row-wide address-field validate-required validate-postcode">
                                                                        <label className="" htmlFor="shipping_postcode">Posta Kodu
                                                                            <abbr title="required" className="required">*</abbr>
                                                                        </label>
                                                                        <input type="text" autoComplete="postal-code" defaultValue="" placeholder=""
                                                                            id="shipping_postcode" name="shipping_postcode" className="input-text " />
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="woocommerce-additional-fields">
                                                            <div className="woocommerce-additional-fields__field-wrapper">
                                                                <p id="order_comments_field" className="form-row notes">
                                                                    <label className="" htmlFor="order_comments">Sipariş Notu</label>
                                                                    <textarea cols="5" rows="2"
                                                                        placeholder="Sipariş notunuz..."
                                                                        id="order_comments" className="input-text " name="order_comments" />
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