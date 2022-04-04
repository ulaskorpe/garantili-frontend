import React, {useState, useCallback, useMemo, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumb from '../layout/BreadCrumb';
import Footer from '../layout/Footer/Footer';
import HeaderMain from '../layout/Header/Header';
import TopBar from '../layout/TopBar';
import PaginationBar from '../Shop/ProductList/PaginationBar';
import ProductList from '../Shop/ProductList/ProductList';
import ShopPriceFilter from '../Shop/ProductList/ShopPriceFilter';
import ShopCategoryList from '../Shop/ShopFilters/ShopCategoryList';
import ShopFilterItem from '../Shop/ShopFilters/ShopFilterItem';
import ShopHeader from '../Shop/ShopHeader';
import {useQuery} from "react-query";
import {GET_PRODUCT_FILTERS, fetchThis, retry, GET_ALL_PRODUCTS, DEFAULT_API_KEY} from "../../api";
import BasketFilterModal from "../BasketFilterModal";

/* Initial Values */
const INITIAL_PRICE_LIMIT = { minPriceValue: 0, maxPriceValue: 100000 };
const INITIAL_CRUMBS = [{ url: '/', title: 'Ürünler' }];
const INITIAL_HEADER = {
    title: 'Sanal Gerçeklik Gözlükleri',
    content: 'Nullam dignissim elit ut urna rutrum, a fermentum<a href="#">İncele <i class="tm tm-long-arrow-right"></i></a>',
    imageUrl: '/assets/images/products/jumbo.jpg'
};
const INITIAL_CATEGORIES = [
    { id: 0, title: 'Mağaza', url: '/urunler' },
    { id: 1, title: 'Süper Teklifler', url: '/super-teklifler' },
    { id: 2, title: 'Telefonlar', url: '/urunler/telefonlar/2'},
    { id: 3, title: 'Tabletler', url: '/urunler/tabletler/3' },
    { id: 4, title: 'Aksesuarlar', url: '/urunler/aksesuarlar/4' },
];

// constants
const perPages = [
    {
        key: 'per_page_5',
        value: 5,
    },
    {
        key: 'per_page_10',
        value: 10,
    },
    {
        key: 'per_page_20',
        value: 20,
    },
    {
        key: 'per_page_50',
        value: 50,
    },
];

function ShopPage() {
    /* States */
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filterQuery, setFilterQuery] = useState({});
    const [priceLimit] = useState(INITIAL_PRICE_LIMIT);
    const [crumbs] = useState(INITIAL_CRUMBS);
    const [header] = useState(INITIAL_HEADER);
    const [selectedCategory, setSelectedCategory] = useState(INITIAL_CATEGORIES[0]);
    const [totalCount, setTotalCount] = useState(0);
    const [pagination, setPagination] = useState({
        page: { value: 1 },
        perPage: perPages[0],
    });
    const { Modal, openModalEvent } = BasketFilterModal();

    /* React Router DOM hooks */
    const { categoryId } = useParams();

    /* */
    const filtersToString = useCallback(() => {
        const filterList = {};
        Object.keys(filterQuery).forEach((filterKey) => {
            const values = filterQuery[filterKey];
            if (typeof values === 'undefined') return;
            let value;
            if (Array.isArray(values)) value = values.join(',');
            else value = values;
            filterList[filterKey] = value;
        });
        return filterList;
    }, [filterQuery])

    const getFilters = useQuery(
        ['filters'],
        () => (
            fetchThis(
                GET_PRODUCT_FILTERS,
                {},
                DEFAULT_API_KEY,
            )
        ),
        { retry, refetchOnWindowFocus: false  },
    );

    /**/
    const generateFakeResponse = useMemo(() => {
        const data = (new Array(
            pagination?.perPage?.value || 5
        ))
            .fill(null)
            .map((_, placeholderIDX) => ({
                id: `placeholder_data_${placeholderIDX}`,
                isPlaceholder: true,
            }));
        const item_count = totalCount;
        return ({ status: true, data, item_count, });
    }, [pagination.perPage, totalCount]);
    const products = useQuery(
        [
            'products',
            pagination.page, pagination.perPage,
            filterQuery, filtersToString,
            selectedCategory, searchKeyword,
        ],
        () => (
            fetchThis(
                GET_ALL_PRODUCTS,
                {
                    page: pagination.page.value,
                    page_count: pagination.perPage.value,
                    category_id: selectedCategory.id.toString(),
                    keyword: searchKeyword,
                    ...(filtersToString() || {}),
                },
                DEFAULT_API_KEY,
            )
        ),
        { retry, refetchOnWindowFocus: false, placeholderData: generateFakeResponse, },
    );

    /* Memos */
    const perPagesObject = useMemo(() => {
        const obj = {};
        perPages.forEach((_perPage) => {
            obj[_perPage.value] = _perPage;
        });
        return obj;
    }, []);

    const calcPageCount = (total = 0, perPage = 0) => (
        Math.ceil(
            total / (perPage)
        )
    );
    const totalPageCount = useMemo(() => (
        calcPageCount(
            products?.data?.item_count || 0,
            pagination.perPage.value
        )
    ), [products.data, pagination.perPage]);

    /* Handlers */
    const handlePerPageChange = useCallback((event) => {
        const perPage = perPagesObject[event.target.value];

        const newPagination = {
            ...pagination,
            perPage,
        }

        const maxPageCount = calcPageCount(totalCount, perPage.value);
        if (maxPageCount < pagination.page.value) newPagination.page = { value: maxPageCount };

        setPagination(newPagination);
    }, [totalCount, pagination, perPagesObject]);
    const handlePageChange = useCallback((page) => {
        setPagination({
            ...pagination,
            page,
        })
    }, [pagination]);

    const handleFilterClick = useCallback((
        parentName,
    ) => (item) => {
        const parent = (filterQuery[parentName] || []);
        const isAlreadySelected = parent.includes(item.id);
        const _filters = parent.filter((itemId) => itemId !== item.id);
        if (!isAlreadySelected) _filters.push(item.id);

        setFilterQuery({
            ...(filterQuery || {}),
            [parentName]: _filters,
        });
    }, [filterQuery]);


    /* Utils */
    function sortProductsBy(event) {
        console.log(event.target.value);
    }
    const filterByPrice = useCallback((min, max) => {
        if (
            filterQuery?.min_price !== min
            || filterQuery?.max_price !== max
        ) setFilterQuery({
            ...filterQuery,
            min_price: min,
            max_price: max,
        });
    }, [filterQuery])

    /* Setters */
    useEffect(() => {
        let category = INITIAL_CATEGORIES.find(categoryElem => categoryElem.id.toString() === categoryId); // todo: burayı backendden al
        if (category === undefined) category = INITIAL_CATEGORIES[0];
        if (JSON.stringify(selectedCategory) !== JSON.stringify(category)) setSelectedCategory(category);
    }, [selectedCategory, categoryId])



    useEffect(() => {
        if (
            products?.data?.item_count
            && products.data.item_count !== totalCount
        ) setTotalCount(products.data.item_count);
    }, [products.data, totalCount]);

    const defaultProductListProps = useMemo(() => ({
        products: products?.data?.data || [],
        openModalEvent,
    }), [products, openModalEvent]);

    const Show = ({ text }) => (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            padding: '40px 20px',
        }}>
            <span>{text}</span>
        </div>
    )

    return (
        <div className="woocommerce-active left-sidebar" >
            <Modal />
            <div id="page" className="hfeed site">
                <TopBar />
                <HeaderMain
                    searchKeyword={searchKeyword}
                    setSearchKeyword={setSearchKeyword}
                />
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
                                        <h1 className="woocommerce-products-header__title page-title">{selectedCategory.title}</h1>
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
                                        <form
                                            className="form-techmarket-wc-ppp"
                                            method="POST"
                                            onSubmit={(e) => e.preventDefault()}
                                        >
                                            <select
                                                className="techmarket-wc-wppp-select c-select"
                                                name="per_page"
                                                value={pagination.perPage.value}
                                                onChange={handlePerPageChange}
                                            >
                                                {perPages.map((_perPage) => (
                                                    <option
                                                        key={_perPage.key}
                                                        value={_perPage.value}
                                                    >
                                                        {_perPage.value}
                                                    </option>
                                                ))}
                                            </select>
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
                                                    {products.isLoading && (
                                                        <Show
                                                            text="Veriler alınıyor, lütfen bekleyiniz..."
                                                        />
                                                    )}
                                                    {products.isError && (
                                                        <Show
                                                            text="Veriler alınırken bir sorun ile karşılaşıldı. Belirttiğiniz filtrede ürün yok veya başka bir sorun var."
                                                        />
                                                    )}
                                                    {products.isSuccess && (
                                                        <ProductList
                                                            {...defaultProductListProps}
                                                            listType="grid"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div id="grid-extended" className="tab-pane" role="tabpanel">
                                            <div className="woocommerce columns-4">
                                                <div className="products">
                                                    {products.isLoading && (
                                                        <Show
                                                            text="Veriler alınıyor, lütfen bekleyiniz..."
                                                        />
                                                    )}
                                                    {products.isError && (
                                                        <Show
                                                            text="Veriler alınırken bir sorun ile karşılaşıldı. Belirttiğiniz filtrede ürün yok veya başka bir sorun var."
                                                        />
                                                    )}
                                                    {products.isSuccess && (
                                                        <ProductList
                                                            {...defaultProductListProps}
                                                            listType="grid-extended"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div id="list-view-large" className="tab-pane" role="tabpanel">
                                            <div className="woocommerce columns-1">
                                                <div className="products">
                                                    {products.isLoading && (
                                                        <Show
                                                            text="Veriler alınıyor, lütfen bekleyiniz..."
                                                        />
                                                    )}
                                                    {products.isError && (
                                                        <Show
                                                            text="Veriler alınırken bir sorun ile karşılaşıldı. Belirttiğiniz filtrede ürün yok veya başka bir sorun var."
                                                        />
                                                    )}
                                                    {products.isSuccess && (
                                                        <ProductList
                                                            {...defaultProductListProps}
                                                            listType="large-list"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div id="list-view" className="tab-pane" role="tabpanel">
                                            <div className="woocommerce columns-1">
                                                <div className="products">
                                                    {products.isLoading && (
                                                        <Show
                                                            text="Veriler alınıyor, lütfen bekleyiniz..."
                                                        />
                                                    )}
                                                    {products.isError && (
                                                        <Show
                                                            text="Veriler alınırken bir sorun ile karşılaşıldı. Belirttiğiniz filtrede ürün yok veya başka bir sorun var."
                                                        />
                                                    )}
                                                    {products.isSuccess && (
                                                        <ProductList
                                                            {...defaultProductListProps}
                                                            listType="list"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div id="list-view-small" className="tab-pane" role="tabpanel">
                                            <div className="woocommerce columns-1">
                                                <div className="products">
                                                    {products.isLoading && (
                                                        <Show
                                                            text="Veriler alınıyor, lütfen bekleyiniz..."
                                                        />
                                                    )}
                                                    {products.isError && (
                                                        <Show
                                                            text="Veriler alınırken bir sorun ile karşılaşıldı. Belirttiğiniz filtrede ürün yok veya başka bir sorun var."
                                                        />
                                                    )}
                                                    {products.isSuccess && (
                                                        <ProductList
                                                            {...defaultProductListProps}
                                                            listType="list-small"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* todo */}
                                    <PaginationBar
                                        totalPageCount={totalPageCount}
                                        perPage={pagination.perPage}
                                        page={pagination.page}
                                        perPages={perPages}
                                        onPerPageChange={handlePerPageChange}
                                        onPageChange={handlePageChange}
                                    />
                                </main>
                            </div>
                            <div id="secondary" className="widget-area shop-sidebar" role="complementary">
                                <div className="widget woocommerce widget_product_categories techmarket_widget_product_categories" id="techmarket_product_categories_widget-2">
                                    <ul className="product-categories ">
                                        <li className="product_cat">
                                            <span>Kategorilere Göz Atın</span>
                                            <ul>
                                                {/* burayı da dinamik yap */}
                                                <ShopCategoryList
                                                    categoryList={INITIAL_CATEGORIES}
                                                    selectedCategory={selectedCategory}
                                                />
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="widget widget_techmarket_products_filter">
                                    <span className="gamma widget-title">Filtre</span>
                                    <div className="widget woocommerce widget_price_filter">
                                        <ShopPriceFilter
                                            priceLimit={priceLimit}
                                            filterByPrice={filterByPrice}
                                        />
                                        {(getFilters.isLoading || getFilters.isError) && (
                                            <div>
                                                {getFilters.isLoading && (
                                                    <span>Filtreler yükleniyor...</span>
                                                )}
                                                {getFilters.isError && (
                                                    <span>Bilinmeyen bir hata ile karşılaşıldı.</span>
                                                )}
                                            </div>
                                        )}
                                        {getFilters.isSuccess && Object.entries(getFilters.data.data || {}).map(([filterIDX, filter]) => (
                                            <ShopFilterItem
                                                filter={filter}
                                                key={`filterItem_${filterIDX}_id_${filter.id}`}
                                                queries={filterQuery[filter?.filterName] || []}
                                                setFilter={handleFilterClick(filter.filterName)}
                                            />
                                        ))}
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