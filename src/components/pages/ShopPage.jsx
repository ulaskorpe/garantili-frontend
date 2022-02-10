import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import BreadCrumb from '../layout/BreadCrumb';
import Footer from '../layout/Footer/Footer';
import HeaderMain from '../layout/Header/Header';
import Topbar from '../layout/Topbar';
import LatestProductList from '../Shop/ProductList/LatestProductList';
import PaginationBar from '../Shop/ProductList/PaginationBar';
import ProductList from '../Shop/ProductList/ProductList';
import ShopPriceFilter from '../Shop/ProductList/ShopPriceFilter';
import ShopCategoryList from '../Shop/ShopFilters/ShopCategoryList';
import ShopFilterItem from '../Shop/ShopFilters/ShopFilterItem';
import ShopHeader from '../Shop/ShopHeader';


function ShopPage(props) {

    const data = [
        { id: 1, filterData: [{ filterType: 'brand', value: 'samsung' }, { filterType: 'color', value: 'black' }], title: "Samsttung Galaxy M52 5G 128 GB (Samsung Türkiye Garantili) ", listPrice: "5799.00", price: "5299.00", url: "/urun-detay/samsung-m2-1", imageUrl: "/assets/images/products/L1.jpg", discount: "300.000", details: ['128 GB Depolama', '8 GB RAM', '6.7" Retina Ekran', '5000mAh'] },
        { id: 2, filterData: [{ filterType: 'brand', value: 'apple' }, { filterType: 'color', value: 'red' }], title: "iPhone 11 64 GB", listPrice: "10.525,00", price: "9837,77", url: "/urun-detay/iphone-11-64-gb-2", imageUrl: "/assets/images/products/L2.jpg", discount: "150", details: ['64 GB Depolama', '4 GB RAM', '6.1 Ekran Boyutu" pil', '12 MP Ön Kamera'] },
        { id: 3, filterData: [{ filterType: 'brand', value: 'apple' }, { filterType: 'color', value: 'teal' }], title: "iPhone 12 Mini 64 GB", listPrice: "13.300,00", price: "12.480,00", url: "/urun-detay/iphone-12-mini-64-gb-3", imageUrl: "/assets/images/products/L3.jpg", discount: "150", details: ['64 GB Depolama', '4 GB RAM', '5.4 Ekran Boyutu" ', '12 MP Ön Kamera'] },
        { id: 4, filterData: [{ filterType: 'brand', value: 'oppo' }, { filterType: 'color', value: 'green' }], title: "Oppo Reno 5 Lite 128 GB (Oppo Türkiye Garantili)", listPrice: "4.699,00", price: "4.523,30", url: "/urun-detay/oppo-reno-5-1", imageUrl: "/assets/images/products/L4.jpg", discount: "150", details: ['128 GB Depolama', '8 GB RAM', '6.4" Ekran Boyutu', '32 MP Ön Kamera'] },
        { id: 5, filterData: [{ filterType: 'brand', value: 'poco' }, { filterType: 'color', value: 'black' }], title: "Poco X3 Pro 8 GB Ram 256 GB (Poco Türkiye Garantili) ", listPrice: "6.499,00", price: "5.719,00", url: "/urun-detay/poco-x3-pro-8-ram-5", imageUrl: "/assets/images/products/L5.jpg", discount: "150", details: ['256 GB Depolama', '8 GB RAM', '6.67" Ekran Boyutu', '20MP Ön Kamera'] },
        { id: 6, filterData: [{ filterType: 'brand', value: 'samsung' }, { filterType: 'color', value: 'black' }], title: "Samsung Galaxy M12 128 GB (Samsung Türkiye Garantili)", price: "2.999.00", url: "/urun-detay/samsung-galaxy-m12-6", imageUrl: "/assets/images/products/L6.jpg", details: ['128 GB Depolama', '4 GB RAM', '6.5" Ekran Boyutu', '8MP Ön Kamera'] },
        { id: 7, filterData: [{ filterType: 'brand', value: 'honor' }, { filterType: 'color', value: 'green' }], title: "Honor 50 128 GB 8 GB Ram 5G (Honor Türkiye Garantili)", price: "9.999,00", url: "/urun-detay/honor-50-128GB-7", imageUrl: "/assets/images/products/L7.jpg", details: ['128 GB Dahili Hafıza', '8 GB RAM', '4300mAh', '32MP Ön Kamera'] },
        { id: 8, filterData: [{ filterType: 'brand', value: 'apple' }, { filterType: 'color', value: 'black' }], title: "iPhone SE 64 GB", listPrice: "6.985,00", price: "6.705,60", url: "/urun-detay/iphone-se-64-gb-8", imageUrl: "/assets/images/products/L8.jpg", discount: "150", details: ['256 GB Depolama', '8 GB RAM', '6.67" Ekran Boyutu', '20MP Ön Kamera'] },
        { id: 9, filterData: [{ filterType: 'brand', value: 'xiaomi' }, { filterType: 'color', value: 'blue' }], title: "Xiaomi Redmi 9c 64 GB (Xiaomi Türkiye Garantili) ", listPrice: "3.099,00", price: "2.578,75", url: "/urun-detay/xiaomi-red-mi-9c-64-gb-9", imageUrl: "/assets/images/products/L9.jpg", discount: "150", details: ['256 GB Depolama', '8 GB RAM', '6.67" Ekran Boyutu', '20MP Ön Kamera'] },
        { id: 10, filterData: [{ filterType: 'brand', value: 'apple' }, { filterType: 'color', value: 'spacegray' }], title: "iPhone 13 Pro 128 GB", price: "21.499.00", url: "/urun-detay/iphone-13-pro-128-10", imageUrl: "/assets/images/products/L10.jpg", details: ['128 GB Depolama', '4 GB RAM', '6.5" Ekran Boyutu', '8MP Ön Kamera'] },
        { id: 11, filterData: [{ filterType: 'brand', value: 'apple' }, { filterType: 'color', value: 'spacegray' }], title: "iPhone 13 Pro 128 GB", price: "21.499.00", url: "/urun-detay/iphone-13-pro-128-10", imageUrl: "/assets/images/products/L10.jpg", details: ['128 GB Depolama', '4 GB RAM', '6.5" Ekran Boyutu', '8MP Ön Kamera'] },
        { id: 12, filterData: [{ filterType: 'brand', value: 'apple' }, { filterType: 'color', value: 'spacegray' }], title: "iPhone 13 Pro 128 GB", price: "21.499.00", url: "/urun-detay/iphone-13-pro-128-10", imageUrl: "/assets/images/products/L10.jpg", details: ['128 GB Depolama', '4 GB RAM', '6.5" Ekran Boyutu', '8MP Ön Kamera'] },
        { id: 13, filterData: [{ filterType: 'brand', value: 'apple' }, { filterType: 'color', value: 'spacegray' }], title: "iPhone 13 Pro 128 GB", price: "21.499.00", url: "/urun-detay/iphone-13-pro-128-10", imageUrl: "/assets/images/products/L10.jpg", details: ['128 GB Depolama', '4 GB RAM', '6.5" Ekran Boyutu', '8MP Ön Kamera'] },
        { id: 14, filterData: [{ filterType: 'brand', value: 'apple' }, { filterType: 'color', value: 'spacegray' }], title: "iPhone 13 Pro 128 GB", price: "21.499.00", url: "/urun-detay/iphone-13-pro-128-10", imageUrl: "/assets/images/products/L10.jpg", details: ['128 GB Depolama', '4 GB RAM', '6.5" Ekran Boyutu', '8MP Ön Kamera'] }
    
    ]
    const [filters, setFilters] = useState(
        [
            {
                id: 1, title: "Markalar", filterName: 'brand', items: [
                    { id: 1, filterName: 'apple', title: "Apple", isChosen: false },
                    { id: 2, filterName: 'samsung', title: "Samsung", isChosen: false },
                    { id: 3, filterName: 'xiaomi', title: "Xiaomi", isChosen: false },
                    { id: 4, filterName: 'oppo', title: "Oppo", isChosen: false },
                    { id: 5, filterName: 'poco', title: "Poco", isChosen: false },
                    { id: 6, filterName: 'honor', title: "Honor", isChosen: false },
                ]
            },
            {
                id: 2, title: "Renkler", filterName: 'color', items: [
                    { id: 5, title: "Siyah", filterName: 'black', isChosen: false },
                    { id: 6, title: "Mavi", filterName: 'blue', isChosen: false },
                    { id: 7, title: "Kırmızı", filterName: 'red', isChosen: false },
                    { id: 8, title: "Yeşil", filterName: 'green', isChosen: false },
                    { id: 9, title: "Uzay Grisi", filterName: 'spacegray', isChosen: false },
                    { id: 9, title: "Gece Mavisi", filterName: 'teal', isChosen: false },
                ]
            }
        ]
    )

    const [products, setProducts] = useState(data)

    const [bar, setBar] = useState({
        totalResult: data.length,
        result: 10,
        pages: [
            { page: 1, selected: true },
            { page: 2, selected: false },
            { page: 3, selected: false },
            { page: 4, selected: false }
        ]
    })

    function handlePage(pageNumber) {
        const pages = {
            totalResult: bar.totalResult,
            pages: [],
            result: bar.result
        }
        pages.pages = bar.pages.map((_) => {
            _.selected = (pageNumber === _.page) ? true : false
            return _
        })
        setBar(pages)
    }

    function alertOnClick() {
        console.log('hi')
    }

    const searchParams = new URLSearchParams(useLocation().search)
    const filterNames = filters.map(_ => _.filterName)

    filterNames.map((_, index) => {
        const filterData = filters
        const filteredProducts = []
        console.log(filters)
        const filterValues = searchParams.getAll(_).forEach(fValue => {
            filterData.filter(f => f.filterName === _).forEach(f => {
                f.items.filter(fv => fv.filterName === fValue).forEach(fi => {
                    fi.isChosen = true

                    filteredProducts.push(products.filter(f => f.filterData.find(i => i.filterType === _ && i.filterValue === fi.filterName) === null))
                })
            })
        })
        if (index === filterNames.lastIndex)
            setProducts(filteredProducts)
    })

    const onAddToBasket = props.addToBasket
    const [header, setHeader] = useState(
        {
            title: 'Sanal Gerçeklik Gözlükleri',
            content: 'Nullam dignissim elit ut urna rutrum, a fermentum<a href="#">İncele <i className="tm tm-long-arrow-right"></i></a>',
            imageUrl: '/assets/images/products/jumbo.jpg'
        }
    )

    function handleFilters(filterType, filterValue) {
        filters.forEach(_ => {
            if (_.filterName != filterType) return
            _.items.forEach(pf => {
                if (pf.filterName != filterValue) return
                pf.isChosen = pf.isChosen == true ? false : true
            })
        })

        console.log('status', filters)
       

        const filterdProducts = []
        filters.forEach(_ => {
            const filterItems = _.items.filter(l => l.isChosen == true)

            filterItems.forEach(fi => {
                const ppp = data.filter(l => l.filterData.some(f => f.filterType == _.filterName && f.value == fi.filterName))
                ppp.forEach(p => filterdProducts.push(p))
            })

        })
        setProducts(filterdProducts)
        setFilters(filters)
    }

    function changeProductCount(event) {
        if (event.target.value === 'Hepsi') {
            setProducts(data)
            return
        }
        setProducts(products.slice(0, event.target.value))
    }

    function sortProductsBy(event) {
        console.log(event.target.value)
    }

    const [categories, setCategories] = useState(
        [
            { id: 0, title: 'Mağaza' },
            { id: 1, title: 'Süper Teklif' },
            { id: 2, title: 'Telefonlar' },
            { id: 3, title: 'Tabletler' },
            { id: 4, title: 'Aksesuarlar' },
        ]
    )

    function filterByPrice(min, max) {
        setProducts(data.filter(l => l.price >= min && l.price <= max))
    }


    const [priceLimit, setLimits] = useState({ minPriceValue: 0, maxPriceValue: 100000 })
    const [crumbs, setCrumb] = useState([{ url: '/', title: 'Ürünler' }])
    const { categoryId } = useParams()

    let category = categories.find(_ => _.id == categoryId)
    if (category === undefined) category = categories[0]
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
                                                <i className="fa fa-sliders"></i>
                                                <span>Filtre</span>
                                            </button>
                                        </div>
                                        <h1 className="woocommerce-products-header__title page-title">{category.title}</h1>
                                        <ul role="tablist" className="shop-view-switcher nav nav-tabs">
                                            <li className="nav-item">
                                                <a href="#grid" title="Grid View" data-toggle="tab" className="nav-link active">
                                                    <i className="tm tm-grid-small"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#grid-extended" title="Grid Extended View" data-toggle="tab"
                                                    className="nav-link">
                                                    <i className="tm tm-grid"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#list-view-large" title="List View Large" data-toggle="tab" className="nav-link ">
                                                    <i className="tm tm-listing-large"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#list-view" title="List View" data-toggle="tab" className="nav-link ">
                                                    <i className="tm tm-listing"></i>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#list-view-small" title="List View Small" data-toggle="tab"
                                                    className="nav-link ">
                                                    <i className="tm tm-listing-small"></i>
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
                                                    <ProductList products={products.slice(0,bar.result)} onAddToBasket={onAddToBasket} listType="grid" />
                                                </div>
                                            </div>
                                        </div>
                                        <div id="grid-extended" className="tab-pane" role="tabpanel">
                                            <div className="woocommerce columns-4">
                                                <div className="products">
                                                    <ProductList products={products} onAddToBasket={onAddToBasket} listType="grid-extended" />
                                                </div>
                                            </div>
                                        </div>
                                        <div id="list-view-large" className="tab-pane" role="tabpanel">
                                            <div className="woocommerce columns-1">
                                                <div className="products">
                                                    <ProductList products={products} onAddToBasket={onAddToBasket} listType="large-list" />
                                                </div>
                                            </div>
                                        </div>
                                        <div id="list-view" className="tab-pane" role="tabpanel">
                                            <div className="woocommerce columns-1">
                                                <div className="products">
                                                    <ProductList products={products} onAddToBasket={onAddToBasket} listType="list" />
                                                </div>
                                            </div>
                                        </div>
                                        <div id="list-view-small" className="tab-pane" role="tabpanel">
                                            <div className="woocommerce columns-1">
                                                <div className="products">
                                                    <ProductList products={products} onAddToBasket={onAddToBasket} listType="list-small" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <PaginationBar bar={bar} changePage={handlePage} onChangeProductCount={changeProductCount} onAlert={alertOnClick} />
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
                                            filters.map((filter, i) => {
                                                return <ShopFilterItem filter={filter} key={i} applyFilter={handleFilters} />
                                            })
                                        }
                                    </div>
                                </div>
                                <LatestProductList products={data} />
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