import React, {useMemo} from "react";
import { useParams, } from "react-router-dom";
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import TopBar from "../layout/TopBar";
import DetailTabs from "../Shop/ProductDetail/DetailTabs";
import ProductGallery from "../Shop/ProductDetail/ProductGallery";
import RelatedProductList from "../Shop/ProductDetail/RelatedProductList";
import {useQuery} from "react-query";
import {DEFAULT_API_KEY, fetchThis, GET_PRODUCT_DETAIL, retry} from "../../api";
import BasketFilterModal from "../BasketFilterModal";
import {ayir} from "../../store/selectors/basket";

function ProductPage() {
    const { productId } = useParams();
    const { Modal, openModalEvent } = BasketFilterModal();

    const getProduct = useQuery(
        ['product', productId],
        () => (
            fetchThis(
                GET_PRODUCT_DETAIL,
                {},
                DEFAULT_API_KEY,
                {
                    id: productId,
                },
            )
        ),
        { retry, refetchOnWindowFocus: false },
    );

    const product = useMemo(() => {
        let returnData = false;
        if (Boolean(
            getProduct?.data?.status
            && getProduct?.data?.data
        )) returnData = getProduct?.data?.data;

        return returnData;
    }, [getProduct?.data])

    if (!product) {
        return <></>;
    }
    return (
        <>
            <Modal />
            <div className="woocommerce-active single-product full-width normal">
                <div id="page" className="hfeed site">
                    <TopBar />
                    <HeaderMain />
                </div>
                <div id="content" className="site-content" tabIndex="-1">
                    <div className="col-full">
                        <div className="row">
                            {/*
                            // todo: burası da yok
                            crumbs: [
                                { url: '/cat/phones', title: 'Telefonlar' },
                                { url: '#', title: 'iPhone 13 Pro 128 GB' }
                            ]
                        */}
                            <BreadCrumb crumbs={product.crumbs} />
                            <div id="primary" className="content-area">
                                <main id="main" className="site-main">
                                    <div className="product product-type-simple">
                                        <div className="single-product-wrapper">
                                            <ProductGallery content={product} key="productgallery" />
                                            <div className="summary entry-summary">
                                                <div className="single-product-header">
                                                    <h1 className="product_title entry-title">{product.title}</h1>
                                                </div>
                                                <div className="single-product-meta">
                                                    <div className="brand">
                                                        <a href="#">
                                                            <img alt={product.brand.title} src={product.brand.imageUrl} />
                                                        </a>
                                                    </div>
                                                    <div className="cat-and-sku">
                                                    <span className="posted_in categories">
                                                        <a rel="tag" href="product-category.html">{product.category.title}</a>
                                                    </span>
                                                        <span className="sku_wrapper">SKU:
                                                        <span className="sku">{product.stockCode}</span>
                                                    </span>
                                                    </div>
                                                </div>
                                                <div className="rating-and-sharing-wrapper">
                                                    <div className="woocommerce-product-rating">
                                                        <div className="star-rating">
                                                        <span className="w-100">5 üzerinden
                                                            <strong className="rating"> {product.rating}</strong>
                                                            <span className="rating">1</span>yorum</span>
                                                        </div>
                                                        <a rel="nofollow" className="woocommerce-review-link" href="#reviews">(<span className="count">1</span> yorum)</a>
                                                    </div>
                                                </div>
                                                <div className="woocommerce-product-details__short-description" dangerouslySetInnerHTML={{ __html: product.features }} />
                                                <div className="product-actions-wrapper">
                                                    <div className="product-actions">
                                                        <p className="price">
                                                            <del>
                                                            <span className="woocommerce-Price-amount amount">
                                                                {ayir(product.listPrice)}
                                                                <span className="woocommerce-Price-currencySymbol">₺</span>
                                                            </span>
                                                            </del>
                                                            <ins>
                                                            <span className="woocommerce-Price-amount amount">
                                                                {ayir(product.price)}
                                                                <span className="woocommerce-Price-currencySymbol">₺</span>
                                                            </span>
                                                            </ins>
                                                        </p>
                                                        <form encType="multipart/form-data" method="post" className="cart">
                                                            <button
                                                                className="single_add_to_cart_button button alt" value="185" name="add-to-cart"
                                                                onClick={openModalEvent(product)}
                                                                style={{ marginLeft: 0, marginRight: 0 }}
                                                            >
                                                                Sepete ekle
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <RelatedProductList openModalEvent={openModalEvent} />
                                    </div>
                                    <DetailTabs tabs={product.tabs} />
                                </main>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default ProductPage;