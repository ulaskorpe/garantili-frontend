import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import BreadCrumb from '../layout/BreadCrumb';
import Footer from '../layout/Footer/Footer';
import HeaderMain from '../layout/Header/Header';
import Topbar from '../layout/Topbar';
import PaginationBar from '../Shop/ProductList/PaginationBar';
import ProductList from '../Shop/ProductList/ProductList';
import ShopPriceFilter from '../Shop/ProductList/ShopPriceFilter';
import ShopCategoryList from '../Shop/ShopFilters/ShopCategoryList';
import ShopFilterItem from '../Shop/ShopFilters/ShopFilterItem';
import ShopHeader from '../Shop/ShopHeader';
import {useQuery} from "react-query";
import {GET_ALL_PRODUCTS} from "../../api";
import {fetchThis} from "../../api/utils/fetchTools";

/* Initial Values */
const INITIAL_PRICE_LIMIT = { minPriceValue: 0, maxPriceValue: 100000 };
const INITIAL_CRUMBS = [{ url: '/', title: 'Ürünler' }];
const INITIAL_HEADER = {
    title: 'Sanal Gerçeklik Gözlükleri',
    content: 'Nullam dignissim elit ut urna rutrum, a fermentum<a href="#">İncele <i class="tm tm-long-arrow-right"></i></a>',
    imageUrl: '/assets/images/products/jumbo.jpg'
};
const INITIAL_CATEGORIES = [
    { id: 0, title: 'Mağaza' },
    { id: 1, title: 'Süper Teklif' },
    { id: 2, title: 'Telefonlar' },
    { id: 3, title: 'Tabletler' },
    { id: 4, title: 'Aksesuarlar' },
];


function ShopPage(props) {
    /* Props */
    const {
        addToBasket
    } = props;

    /* States */
    const [filters, setFilters] = useState(null);
    const [products, setProducts] = useState(null);
    const [bar, setBar] = useState(null);
    const [priceLimit, setPriceLimit] = useState(INITIAL_PRICE_LIMIT);
    const [crumbs, setCrumb] = useState(INITIAL_CRUMBS);
    const [header, setHeader] = useState(INITIAL_HEADER);
    const [categories, setCategories] = useState(INITIAL_CATEGORIES)

    /* React Router DOM hooks */
    const { categoryId } = useParams();
    const getFilters = useQuery(
        'getFilters',
        () => (
            fetchThis(
                GET_ALL_PRODUCTS,
                {},
                '5c35640a3da4f1e3970bacbbf7b20e6c',
            )
        ),
    );

    /* Handlers */
    function handlePage(pageNumber) {
        const pages = {
            totalResult: bar.totalResult,
            pages: [],
            result: bar.result
        }
        pages.pages = bar.pages.map((_) => {
            _.selected = pageNumber === _.page
            return _
        })
        setBar(pages)
    }

    /* Utils */
    function alertOnClick() {
        console.log('hi')
    }
    function sortProductsBy(event) {
        console.log(event.target.value)
    }
    function filterByPrice(min, max) {
        setProducts(products.filter(l => l.price >= min && l.price <= max))
    }

    /* Fetches */
    const fetchFilters = async () => {
        await fetch(`${process.env.REACT_APP_BASE}/api/products/product-filters`, {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY
            }
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setFilters(Object.values(result));
                },
                (error) => {
                    console.error(error);
                }
            );
    }
    const fetchProducts = async () => {
        const formData = new URLSearchParams();
        formData.append('min_price', '0');
        formData.append('max_price', '0');
        formData.append('brand', '');
        formData.append('colors','');
        formData.append('memories','0');
        formData.append('page','0');
        await fetch(`${process.env.REACT_APP_BASE}/api/products/all-products`, {
            method:'POST',
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
                'Content-Type':'application/form-data'
            },
            body:formData.toString()
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setProducts(result);
                },
                (error) => {
                    console.error(error);
                }
            );
    }

    /* Setters */
    function changeProductCount(event) {
        if (event.target.value === 'Hepsi') {
            setProducts(products)
            return
        }
        setProducts(products.slice(0, event.target.value))
    }
    const setFilterValues = (filterType,filterArray) =>{
        let index = filters.findIndex((x)=> x.filterName === filterType);
        if (index !== -1){
            let temporaryArray = filters.slice();
            temporaryArray[index].items = filterArray;
            setFilters(temporaryArray);
        }
        else {
            console.log('no match');
        }
    }
    let category = categories.find(_ => _.id === categoryId);
    if (category === undefined) category = categories[0];

    /* Effects */
    useEffect(async () => {
        await fetchProducts();
        await fetchFilters();
    },[]);
    useEffect(()=>{
        if(products !== null){
            setBar({
                totalResult: products.length,
                result: 10,
                pages: [
                    { page: 1, selected: true },
                    { page: 2, selected: false },
                    { page: 3, selected: false },
                    { page: 4, selected: false }
                ]
            })
        }
    },[products]);

    return (
        <div className="woocommerce-active left-sidebar" >
            <div id="page" className="hfeed site">
                <Topbar />
                <HeaderMain basket={props.basket} onRemoveBasket={props.removeFromBasket} />
                <div id="content" className="site-content" tabIndex="-1">
                    <div className="col-full">
                        <div className="row">
                            <BreadCrumb crumbs={crumbs} />
                            <div id="primary" className="content-area">
                                <main id="main" className="site-main">
                                    <ShopHeader header={header} />
                                    <div className="shop-control-bar">
                                        <div className="handheld-sidebar-toggle">
                                            <button type="button" className="btn sidebar-toggler">
                                                <i className="fa fa-sliders" />
                                                <span>Filtre</span>
                                            </button>
                                        </div>
                                        <h1 className="woocommerce-products-header__title page-title">{category.title}</h1>
                                        <ul role="tablist" className="shop-view-switcher nav nav-tabs">
                                            <li className="nav-item">
                                                <a href="#grid" title="Grid View" data-toggle="tab" className="nav-link active">
                                                    <i className="tm tm-grid-small" />
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#grid-extended" title="Grid Extended View" data-toggle="tab"
                                                   className="nav-link">
                                                    <i className="tm tm-grid" />
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#list-view-large" title="List View Large" data-toggle="tab" className="nav-link ">
                                                    <i className="tm tm-listing-large" />
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#list-view" title="List View" data-toggle="tab" className="nav-link ">
                                                    <i className="tm tm-listing" />
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#list-view-small" title="List View Small" data-toggle="tab"
                                                   className="nav-link ">
                                                    <i className="tm tm-listing-small" />
                                                </a>
                                            </li>
                                        </ul>
                                        <form className="form-techmarket-wc-ppp" method="GET" >
                                            <select className="techmarket-wc-wppp-select c-select" name="ppp" onChange={changeProductCount}>
                                                <option defaultValue="4">4</option>
                                                <option defaultValue="8">8</option>
                                                <option defaultValue="-1">Hepsi</option>
                                            </select>
                                            <input type="hidden" defaultValue="5" name="shop_columns" />
                                            <input type="hidden" defaultValue="15" name="shop_per_page" />
                                            <input type="hidden" defaultValue="right-sidebar" name="shop_layout" />
                                        </form>
                                        <form method="get" className="woocommerce-ordering">
                                            <select className="orderby" name="orderby" defaultValue="date" onChange={sortProductsBy}>
                                                <option defaultValue="popularity">Popüler ürünler</option>
                                                <option defaultValue="rating">Puana göre</option>
                                                <option defaultValue="date">Yeni ürünler</option>
                                                <option defaultValue="price">Fiyata göre: artan</option>
                                                <option defaultValue="price-desc">Fiyata göre: azalan</option>
                                            </select>
                                            <input type="hidden" defaultValue="5" name="shop_columns" />
                                            <input type="hidden" defaultValue="15" name="shop_per_page" />
                                            <input type="hidden" defaultValue="right-sidebar" name="shop_layout" />
                                        </form>
                                    </div>
                                    <div className="tab-content">
                                        <div id="grid" className="tab-pane active" role="tabpanel">
                                            <div className="woocommerce columns-4">
                                                <div className="products">
                                                    {products !== null && bar !== null && <ProductList products={products.slice(0,bar.result)} onAddToBasket={addToBasket} listType="grid" />}
                                                </div>
                                            </div>
                                        </div>
                                        <div id="grid-extended" className="tab-pane" role="tabpanel">
                                            <div className="woocommerce columns-4">
                                                <div className="products">
                                                    {products !==null && <ProductList products={products} onAddToBasket={addToBasket} listType="grid-extended" />}
                                                </div>
                                            </div>
                                        </div>
                                        <div id="list-view-large" className="tab-pane" role="tabpanel">
                                            <div className="woocommerce columns-1">
                                                <div className="products">
                                                    {products !==null && <ProductList products={products} onAddToBasket={addToBasket} listType="large-list" />}
                                                </div>
                                            </div>
                                        </div>
                                        <div id="list-view" className="tab-pane" role="tabpanel">
                                            <div className="woocommerce columns-1">
                                                <div className="products">
                                                    {products !==null && <ProductList products={products} onAddToBasket={addToBasket} listType="list" />}
                                                </div>
                                            </div>
                                        </div>
                                        <div id="list-view-small" className="tab-pane" role="tabpanel">
                                            <div className="woocommerce columns-1">
                                                <div className="products">
                                                    {products !==null && <ProductList products={products} onAddToBasket={addToBasket} listType="list-small" />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {bar !==null &&<PaginationBar bar={bar} changePage={handlePage} onChangeProductCount={changeProductCount} onAlert={alertOnClick} />}
                                </main>
                            </div>
                            <div id="secondary" className="widget-area shop-sidebar" role="complementary">
                                <div className="widget woocommerce widget_product_categories techmarket_widget_product_categories" id="techmarket_product_categories_widget-2">
                                    <ul className="product-categories ">
                                        <li className="product_cat">
                                            <span>Kategorilere Göz Atın</span>
                                            <ul>
                                                <ShopCategoryList categoryList={categories} />
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div id="techmarket_products_filter-3" className="widget widget_techmarket_products_filter">
                                    <span className="gamma widget-title">Filtre</span>
                                    <div className="widget woocommerce widget_price_filter" id="woocommerce_price_filter-2">
                                        <ShopPriceFilter priceLimit={priceLimit} filterByPrice={filterByPrice} />
                                        {
                                            filters !== null && filters.map((filter, i) => {
                                                return <ShopFilterItem filter={filter} key={i} setFilter={setFilterValues} />
                                            })
                                        }
                                        <button className="button" type="submit" onClick={() => console.log("aaa")}>Filtrele</button>
                                    </div>
                                </div>
                                {/* {products !== null && <LatestProductList products={products} />} */}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default ShopPage