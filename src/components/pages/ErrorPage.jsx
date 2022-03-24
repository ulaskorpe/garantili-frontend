import React from 'react';
import TopBar from "../layout/TopBar";
import HeaderMain from "../layout/Header/Header";
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";

const errorMessages = {
    404: 'Aradığınız sayfa bulunamadı!',
    unknown: 'Bilinmeyen bir hata ile karşılaşıldı!',
}

const ErrorPage = (props) => {
    const {
        code = 500,
    } = props;

    const crumbs = [
        { url: '#', title: code }
    ]

    return (
        <div className="woocommerce-active single-product full-width normal">
            <div id="page" className="hfeed site">
                <TopBar/>
                <HeaderMain/>
            </div>
            <div id="content" className="site-content" tabIndex="-1">
                <div className="col-full">
                    <div className="row">
                        <BreadCrumb crumbs={crumbs}/>
                        <div id="primary" className="content-area">
                            <main id="main" className="site-main">
                                <div className="type-page hentry">
                                    <header className="entry-header border-no">
                                        <div className="page-header-caption border-no text-center">
                                            <h1 className="entry-title border-no">{code}</h1>
                                        </div>
                                    </header>
                                    <div className="entry-content">
                                        <div className="track-order w-100 text-center">
                                            <p className="w-80 text-center ml-auto">
                                                {errorMessages[code] || errorMessages.unknown}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ErrorPage;
