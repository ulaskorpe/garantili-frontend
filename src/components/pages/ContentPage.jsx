import React from 'react';
import { useParams } from "react-router-dom";
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import TopBar from "../layout/TopBar";
import {useQuery} from "react-query";
import {DEFAULT_API_KEY, fetchThis, GET_ARTICLES, retry} from "../../api";

export default function ContentPage(props) {
    const { basket, onAddToBasket, removeFromBasket } = props
    const { id } = useParams();
    const pages = useQuery(
        ['getPageInfos', id],
        () => (
            fetchThis(
                GET_ARTICLES,
                [],
                DEFAULT_API_KEY,
                {},
            )
        ),
        { retry, refetchOnWindowFocus: false },
    )

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
                        {pages.isLoading && (
                            <div>
                                <span>Yükleniyor...</span>
                            </div>
                        )}
                        {pages.isSuccess && (
                            <>
                                <BreadCrumb crumbs={pages.data.data.find(l => l.id == id)?.crumbs} />
                                <div id="primary" className="content-area">
                                    <main id="main" className="site-main text-center">
                                        <div id="primary" className="content-area">
                                            <main id="main" className="site-main" dangerouslySetInnerHTML={{ __html: pages.data.data.find(l => l.id == id)?.body }}>
                                            </main>
                                        </div>
                                    </main>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}