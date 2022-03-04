import { useState } from "react";
import OrderReview from "../cart/OrderReview";
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import TopBar from "../layout/TopBar";
import DeviceForm from "../main/phone-repair/DeviceForm";
import DeviceGallery from "../main/phone-repair/DeviceGallery";

export default function DeviceRepairDetail(props) {

    const crumbs = [
        { url: '/telefon-onar-yenile', title: 'Telefon Onar Yenile' },
        { url: '/telefon-onar-yenile/apple-1', title: 'Apple' },
        { url: '#', title: 'iPhone 12' },
    ]
    const { basket, onAddToBasket, removeFromBasket } = props

    const [deviceDetail, setDeviceDetail] = useState({
        title: 'Cihaz Bilgileri',
        imageGallery: [
            { id: 1, imageUrl: '/assets/images/products/a8.jpg' },
            { id: 1, imageUrl: '/assets/images/products/a6.jpg' },
            { id: 1, imageUrl: '/assets/images/products/a7.jpg' },
            { id: 1, imageUrl: '/assets/images/products/a1.jpg' },
            { id: 1, imageUrl: '/assets/images/products/a2.jpg' },
            { id: 1, imageUrl: '/assets/images/products/a3.jpg' },
            { id: 1, imageUrl: '/assets/images/products/a4.jpg' },
            { id: 1, imageUrl: '/assets/images/products/a5.jpg' }
        ],

        brokenPieces: [
            { name: "Ekran" },
            { name: "Arka Kapak" },
            { name: "Batarya" },
            { name: "Speaker" },
            { name: "Ön Kamera" },
            { name: "Anakart Genel" },
            { name: "Şarj Soketi" },
            { name: "Receiver" },
            { name: "Titreşim Motoru" },
            { name: "On / Off Tuşu" },
            { name: "Sim Tray" },
            { name: "Sensör" },
            { name: "Polarize" },
            { name: "Face ID Flex" },
            { name: "Anten" },
            { name: "Anakart" },
            { name: "Backlight" },
            { name: "Face ID" },
            { name: "Ara Film" },
            { name: "Buzzer" },
            { name: "Parmak İzi Tuş" },
            { name: "Anakart WIFI" },
            { name: "Demir Kafes" },
            { name: "NFC" },
        ]
    })

    const imgStyle = {
        width: '600px'
    }


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
                        <BreadCrumb crumbs={crumbs} />
                        <div id="primary" className="content-area">
                            <main id="main" className="site-main">
                                <div className="product product-type-simple">
                                    <div className="single-product-wrapper">
                                        <DeviceGallery content={deviceDetail.imageGallery} key="productgallery" />
                                        <div className="summary entry-summary">
                                            <div className="single-product-header">
                                                <h1 className="product_title entry-title">{deviceDetail.title}</h1>
                                            </div>
                                            <DeviceForm brokenPieces={deviceDetail.brokenPieces} key="deviceForm" />
                                        </div>
                                    </div>
                                </div>
                                <div className="woocommerce-tabs wc-tabs-wrapper">
                                    <form action="#" class="checkout woocommerce-checkout" method="post" name="checkout">
                                        <div id="customer_details" class="col2-set">
                                            <div class="col-1">
                                                <div class="woocommerce-billing-fields">
                                                    <h3>İletişim Bilgileri</h3>
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
                                                            <p id="billing_phone_field"
                                                                class="form-row form-row-last validate-required validate-phone">
                                                                <label class="" for="billing_phone">Telefon
                                                                    <abbr title="required" class="required">*</abbr>
                                                                </label>
                                                                <input type="tel" value="" placeholder="" id="billing_phone"
                                                                    name="billing_phone" class="input-text " />
                                                            </p>
                                                            <p id="billing_email_field"
                                                                class="form-row form-row-first validate-required validate-email">
                                                                <label class="" for="billing_email">E-Posta
                                                                    <abbr title="required" class="required">*</abbr>
                                                                </label>
                                                                <input type="email" value="" placeholder="" id="billing_email"
                                                                    name="billing_email" class="input-text " />
                                                            </p>
                                                            <p id="billing_email_field"
                                                                class="form-row validate-required validate-email">
                                                                <label class="" for="billing_email">Adres
                                                                    <abbr title="required" class="required">*</abbr>
                                                                </label>
                                                                <textarea type="email" value="" placeholder="" id="billing_email"
                                                                    name="billing_email" class="input-text " ></textarea>
                                                            </p>
                                                            <p id="billing_bank"
                                                                class="form-row form-row-last validate-required validate-phone">
                                                                <label class="" for="billing_phone">IBAN
                                                                    <abbr title="required" class="required">*</abbr>
                                                                </label>
                                                                <input type="tel" value="" placeholder="" id="billing_phone"
                                                                    name="billing_phone" class="input-text " />
                                                            </p>
                                                            <p id="billing_email_field"
                                                                class="form-row form-row-first validate-required validate-email">
                                                                <label class="" for="billing_email">Teklif
                                                                    <abbr title="required" class="required">*</abbr>
                                                                </label>
                                                                <input type="email" value="" placeholder="" id="billing_email"
                                                                    name="billing_email" class="input-text " />
                                                            </p>




                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="woocommerce-checkout-review-order" id="order_review">
                                            <div class="order-review-wrapper">
                                                <h3 class="order_review_heading">İşlemi Tamamla</h3>
                                                <table class="shop_table woocommerce-checkout-review-order-table border-no" b>
                                                    <tbody>
                                                        <tr class="cart_item border-no">
                                                            <td class="product-name border-no">
                                                            Lütfen işlemi tamamlamadan önce cihaz bilgileriniz ve iletişim bilgilerinizi eksiksiz olarak girdiğinizden emin olun.
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div class="post-readmore">
                                                    <a class="btn btn-primary" href='#'>İşlemi Tamamla</a>
                                                </div>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </div >
    )
} 