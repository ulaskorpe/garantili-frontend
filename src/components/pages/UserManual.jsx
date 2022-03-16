import React from 'react';
import { useState } from "react";
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import TopBar from "../layout/TopBar";

export default function UserManual() {
    const [manuals] = useState([
        { imageUrl: '/assets/images/brands/1.png', title: 'Apple', url: 'https://support.apple.com/tr-tr/guide/iphone/iphe3fa5df43/14.0/ios/14.0' },
        { imageUrl: '/assets/images/brands/2.png', title: 'Samsung', url: 'https://www.samsung.com/tr/support/mobile-devices/how-do-i-get-the-user-guide-of-the-phone/' },
        { imageUrl: '/assets/images/brands/4.png', title: 'Huawei', url: 'https://consumer.huawei.com/tr/support/product/?tag=smart-phone&u=u/' },
        { imageUrl: '/assets/images/brands/6.png', title: 'Sony', url: 'https://support.oppo.com/tr/user-guide/?series=Reno%20SER%C4%B0' },
        { imageUrl: '/assets/images/brands/6.png', title: 'Philips', url: 'https://support.oppo.com/tr/user-guide/?series=Reno%20SER%C4%B0' },
        { imageUrl: '/assets/images/brands/3.png', title: 'Xiaomi', url: 'https://support.oppo.com/tr/user-guide/?series=Reno%20SER%C4%B0' },
    ])


    const [crumbs] = useState([{ url: '#', title: 'Kullanma Kılavuzu' }])

    return (
        <div className="woocommerce-active single-product full-width normal">
            <div id="page" className="hfeed site">
                <TopBar />
                <HeaderMain />
            </div>
            <div id="content" className="site-content" tabIndex="-1">
                <div className="col-full">
                    <div className="row">
                        <BreadCrumb crumbs={crumbs} />
                        <div id="primary" className="content-area">
                            <main id="main" className="site-main text-center">
                                <div id="primary" className="content-area">
                                    <main id="main" className="site-main">
                                        <div className="type-page hentry">
                                            <header className="entry-header border-no">
                                                <div className="page-header-caption border-no">
                                                    <h1 className="entry-title border-no">Kullanım Kılavuzları</h1>
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
                                                            manuals.map((item) => {
                                                                return (
                                                                    <div className="product-brand-list">
                                                                        <a className="woocommerce-LoopProduct-link" target="_blank" href={item.url} rel="noreferrer">
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