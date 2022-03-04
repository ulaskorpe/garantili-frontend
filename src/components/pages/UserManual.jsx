import { useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import TopBar from "../layout/TopBar";

export default function UserManual(props) {


    const { basket, onAddToBasket, removeFromBasket } = props




    const [manuals, setManuals] = useState([
        { imageUrl: '/assets/images/brands/1.png', title: 'Apple', url: 'https://support.apple.com/tr-tr/guide/iphone/iphe3fa5df43/14.0/ios/14.0' },
        { imageUrl: '/assets/images/brands/2.png', title: 'Samsung', url: 'https://www.samsung.com/tr/support/mobile-devices/how-do-i-get-the-user-guide-of-the-phone/' },
        { imageUrl: '/assets/images/brands/4.png', title: 'Huawei', url: 'https://consumer.huawei.com/tr/support/product/?tag=smart-phone&u=u/' },
        { imageUrl: '/assets/images/brands/6.png', title: 'Sony', url: 'https://support.oppo.com/tr/user-guide/?series=Reno%20SER%C4%B0' },
        { imageUrl: '/assets/images/brands/6.png', title: 'Philips', url: 'https://support.oppo.com/tr/user-guide/?series=Reno%20SER%C4%B0' },
        { imageUrl: '/assets/images/brands/3.png', title: 'Xiaomi', url: 'https://support.oppo.com/tr/user-guide/?series=Reno%20SER%C4%B0' },
    ])


    const [crumbs, setCrumb] = useState([{ url: '#', title: 'Kullanma Kılavuzu' }])

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
                            <main id="main" class="site-main text-center">
                                <div id="primary" className="content-area">
                                    <main id="main" className="site-main">
                                        <div class="type-page hentry">
                                            <header class="entry-header border-no">
                                                <div class="page-header-caption border-no">
                                                    <h1 class="entry-title border-no">Kullanım Kılavuzları</h1>
                                                </div>
                                            </header>
                                        </div>
                                        <div className="entry-content">
                                            <div className="track-order w-100 text-center">
                                                <p className="w-80 text-center ml-auto">Nunc ac porta est. Aenean eget elit vitae arcu commodo consectetur. Etiam id aliquam neque, ullamcorper dapibus diam. Ut congue, arcu non aliquam interdum, risus libero ultricies felis, quis blandit mauris sem in felis. </p>
                                                <br />
                                                <br />
                                            </div>
                                            <div id="grid" className="tab-pane active mb-200" role="tabpanel">
                                                <div className="woocommerce columns-6">
                                                    <div className="products">
                                                        {
                                                            manuals.map((item, i) => {
                                                                return (
                                                                    <div className="product-brand-list">
                                                                        <a className="woocommerce-LoopProduct-link" target="_blank" href={item.url}>
                                                                            <img width="224" height="197" alt="" className="attachment-shop_catalog size-shop_catalog wp-post-image" src={item.imageUrl} />
                                                                            <h2 className="woocommerce-loop-product__title">{item.title}</h2>
                                                                        </a>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </main>
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