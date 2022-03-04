import { useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import TopBar from "../layout/TopBar";

export default function ImeiCheck(props) {


    const { basket, onAddToBasket, removeFromBasket } = props




    const [manuals, setManuals] = useState([
        { imageUrl: '/assets/images/brands/1.png', title: 'Apple', url: 'https://support.apple.com/tr-tr/guide/iphone/iphe3fa5df43/14.0/ios/14.0' },
        { imageUrl: '/assets/images/brands/2.png', title: 'Samsung', url: 'https://www.samsung.com/tr/support/mobile-devices/how-do-i-get-the-user-guide-of-the-phone/' },
        { imageUrl: '/assets/images/brands/4.png', title: 'Huawei', url: 'https://consumer.huawei.com/tr/support/product/?tag=smart-phone&u=u/' },
        { imageUrl: '/assets/images/brands/5.png', title: 'Oppo', url: 'https://support.oppo.com/tr/user-guide/?series=Reno%20SER%C4%B0' },
    ])

    const [crumbs, setCrumb] = useState([{ url: '#', title: 'IMEI Sorgulama' }])


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
                        <div id="primary" class="content-area">
                            <main id="main" class="site-main">
                                <div class="type-page hentry">
                                    <header class="entry-header border-no">
                                        <div class="page-header-caption text-center">
                                            <h1 class="entry-title">IMEI Sorgulama</h1>
                                            <br />
                                        </div>
                                    </header>
                                    <div class="entry-content">
                                        <div class="woocommerce w-100 ">
                                            <form class="track_order ml-auto" method="post" action="#">
                                                <p>To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
                                                <p class="form-row">
                                                    <span className="col-md-3"></span>
                                                    <p className="col-md-5" >
                                                        <label for="orderid">IMEI Kodu</label>
                                                        <input type="text" placeholder="IMEI kodu gir" id="orderid" name="orderid" class="input-text" />
                                                    </p>
                                                    <p className="col-md-1 imei-btn">
                                                        <input type="submit" name="track" value="Gönder" className="border-button" /></p>
                                                </p>
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