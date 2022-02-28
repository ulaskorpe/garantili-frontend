import { useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import Topbar from "../layout/Topbar";

export default function HRPage(props) {


    const { basket, onAddToBasket, removeFromBasket } = props




    const [manuals, setManuals] = useState([
        { imageUrl: '/assets/images/brands/1.png', title: 'Apple', url: 'https://support.apple.com/tr-tr/guide/iphone/iphe3fa5df43/14.0/ios/14.0' },
        { imageUrl: '/assets/images/brands/2.png', title: 'Samsung', url: 'https://www.samsung.com/tr/support/mobile-devices/how-do-i-get-the-user-guide-of-the-phone/' },
        { imageUrl: '/assets/images/brands/4.png', title: 'Huawei', url: 'https://consumer.huawei.com/tr/support/product/?tag=smart-phone&u=u/' },
        { imageUrl: '/assets/images/brands/5.png', title: 'Oppo', url: 'https://support.oppo.com/tr/user-guide/?series=Reno%20SER%C4%B0' },
    ])

    const [crumbs, setCrumb] = useState([{ url: '#', title: 'İnsan Kaynakları' }])
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
                        <BreadCrumb crumbs={crumbs} />
                        <div id="primary" className="content-area">
                            <main id="main" className="site-main">
                                <div class="type-page hentry">
                                    <header class="entry-header">
                                        <div class="page-header-caption text-center">
                                            <h1 class="entry-title">İnsan Kaynakları</h1>
                                        </div>
                                    </header>
                                    <div class="entry-content">
                                        <div class="row contact-info">
                                            <div class="col-md-12 left-col">
                                                <div class="text-block">
                                                    <h2 class="contact-page-title">Bizimle çalışmak ister misiniz?</h2>

                                                </div>
                                                <div class="contact-form">
                                                    <div role="form" class="wpcf7" id="wpcf7-f425-o1" lang="en-US" dir="ltr">
                                                        <div class="screen-reader-response"></div>
                                                        <form class="wpcf7-form" novalidate="novalidate">
                                                            <div className="d-none">
                                                                <input type="hidden" name="_wpcf7" value="425" />
                                                                <input type="hidden" name="_wpcf7_version" value="4.5.1" />
                                                                <input type="hidden" name="_wpcf7_locale" value="en_US" />
                                                                <input type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f425-o1" />
                                                                <input type="hidden" name="_wpnonce" value="e6363d91dd" />
                                                            </div>
                                                            <div class="form-group row">
                                                                <div class="col-xs-12 col-md-4">
                                                                    <label>Adınız
                                                                        <abbr title="required" class="required">*</abbr>
                                                                    </label>
                                                                    <br />
                                                                    <span class="wpcf7-form-control-wrap first-name">
                                                                        <input type="text" aria-invalid="false" aria-required="true"
                                                                            class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                            size="40" value="" name="first-name" />
                                                                    </span>
                                                                </div>
                                                                <div class="col-xs-12 col-md-4">
                                                                    <label>Soyadınız
                                                                        <abbr title="required" class="required">*</abbr>
                                                                    </label>
                                                                    <br />
                                                                    <span class="wpcf7-form-control-wrap last-name">
                                                                        <input type="text" aria-invalid="false" aria-required="true"
                                                                            class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                            size="40" value="" name="last-name" />
                                                                    </span>
                                                                </div>

                                                                <div class="col-xs-12 col-md-4">
                                                                    <label>Net ücret beklentisi (₺)
                                                                        <abbr title="required" class="required">*</abbr>
                                                                    </label>
                                                                    <br />
                                                                    <span class="wpcf7-form-control-wrap first-name">
                                                                        <input type="text" aria-invalid="false" aria-required="true"
                                                                            class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                            size="40" value="" name="salary" />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="form-group row">
                                                                <div class="col-xs-12 col-md-4">
                                                                    <label>Departman
                                                                        <abbr title="required" class="required">*</abbr>
                                                                    </label>
                                                                    <br />
                                                                    <span class="wpcf7-form-control-wrap last-name">
                                                                        <input type="text" aria-invalid="false" aria-required="true"
                                                                            class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                            size="40" value="" name="depeartment" />
                                                                    </span>
                                                                </div>

                                                                <div class="col-xs-12 col-md-4">
                                                                    <label>CV</label>
                                                                    <br />
                                                                    <span class="wpcf7-form-control-wrap subject">
                                                                        <input type="file" aria-invalid="false"
                                                                            class="wpcf7-form-control wpcf7-text input-text" size="40" value=""
                                                                            name="cv-file" />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="form-group clearfix">
                                                                <p>
                                                                    <input type="submit" value="Başvur" class="wpcf7-form-control wpcf7-submit" />
                                                                </p>
                                                            </div>

                                                            <div class="wpcf7-response-output wpcf7-display-none"></div>
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