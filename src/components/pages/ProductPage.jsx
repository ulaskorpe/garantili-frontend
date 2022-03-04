import React, {Component, useState, useEffect, useMemo} from "react";
import { useLocation, useParams, } from "react-router-dom";
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import TopBar from "../layout/TopBar";
import DetailTabs from "../Shop/ProductDetail/DetailTabs";
import Product from "../Shop/ProductDetail/Product";
import ProductGallery from "../Shop/ProductDetail/ProductGallery";
import RelatedProductList from "../Shop/ProductDetail/RelatedProductList";
import {useQuery} from "react-query";
import {DEFAULT_API_KEY, fetchThis, GET_PRODUCT_DETAIL, retry} from "../../api";

function ProductPage(props) {
    const { basket, onAddToBasket, removeFromBasket } = props
    const { productId } = useParams()

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
        { retry: false, refetchOnWindowFocus: false },
    );

    const product = useMemo(() => {
        let returnData = false;
        if (Boolean(
            getProduct?.data?.status
            && getProduct?.data?.data
        )) returnData = getProduct?.data?.data;

        console.log(returnData);

        return returnData;
    }, [getProduct?.data])


    if (!product) {
        return <></>;
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
                                                                <span className="woocommerce-Price-currencySymbol">₺</span>{product.listPrice}</span>
                                                        </del>
                                                        <ins>
                                                            <span className="woocommerce-Price-amount amount">
                                                                <span className="woocommerce-Price-currencySymbol">₺</span>{product.price}</span>
                                                        </ins>
                                                    </p>
                                                    <form encType="multipart/form-data" method="post" className="cart">
                                                        <div className="quantity">
                                                            <label htmlFor="quantity-input">Adet</label>
                                                            <input type="number" size="4" className="input-text qty text" title="Qty" defaultValue="1" name="quantity"
                                                                id="quantity-input" />
                                                        </div>
                                                        <button className="single_add_to_cart_button button alt" value="185" name="add-to-cart"
                                                            onClick={() => onAddToBasket(product.id)}>Sepete Ekle</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <RelatedProductList onAddToBasket={onAddToBasket} />
                                </div>
                                <DetailTabs tabs={product.tabs} />
                            </main>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductPage;