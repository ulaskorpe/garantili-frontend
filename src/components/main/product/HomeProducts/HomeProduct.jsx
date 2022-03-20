import React, {Component, useCallback, useMemo, useState} from "react";
import DSlick from "react-slick";
import useBasket from "../../../../store/hooks/useBasket";
import useProductTools from "../../../../hooks/useProductTools";
import {useQuery} from "react-query";
import {
    DEFAULT_API_KEY,
    fetchThis,
    GET_BEST_SELLERS,
    GET_HIGHEST_RATED,
    GET_NEW_PRODUCTS,
    GET_WEEKLY_DEALS,
    retry
} from "../../../../api";


const Headers = (props) => {
    // tabId
    return (props.header.map((item, index) => {
        if (index == 0) {
            return (
                <li className="nav-item" key={index}>
                    <a className="nav-link active" href={`#${item.tabId}`} data-toggle="tab">{item.title}</a>
                </li>
            )
        }
        else {
            return (
                <li className="nav-item" key={index}>
                    <a className="nav-link" href={`#${item.tabId}`} data-toggle="tab">{item.title}</a>
                </li>
            )
        }
    }));
}

const productTabSlickSettings = {
    "infinite": false,
    "rows": 2,
    "slidesPerRow": 5,
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": true,
    "arrows": false,
    "responsive": [
        {
            "breakpoint": 1023,
            "settings": {
                "slidesPerRow": 2
            }
        },
        {
            "breakpoint": 1169,
            "settings": {
                "slidesPerRow": 4
            }
        },
        {
            "breakpoint": 1400,
            "settings": {
                "slidesPerRow": 3
            }
        }
    ]
};

const AddButton = (props) => {
    const {
        item
    } = props;
    const basket = useBasket();
    const [added, setAdded] = useState(false);

    const handleAddBasketClick = useCallback((item) => (e) => {
        e.preventDefault();
        basket.add(item)(e);

        setAdded(true);
        setTimeout(() => {
            setAdded(false);
        }, 1250)
    }, [basket, added])

    return (
      <a
          className="button add_to_cart_button"
          rel="nofollow"
          onClick={handleAddBasketClick(item)}
          style={added ? { backgroundColor: '#e86708', color: '#fff' } : {}}
      >
          {!added && 'Sepete ekle'}
          {added && 'Sepete eklendi'}
      </a>
  );
};

const ProductList = (props) => {
    const { goProductEvent } = useProductTools();
    return (
        <DSlick
            className="products"
            {...productTabSlickSettings}
        >
            {props.products.map((item, index) => (
                <div className="product" key={index}>
                    <a
                        className="woocommerce-LoopProduct-link"
                        href={item.url || '#'}
                        onClick={goProductEvent(item)}
                    >
                <span className="onsale">
                    <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol" />{item.discount}
                    </span>
                </span>
                        <img src={`https://buyback.garantiliteknoloji.com/${item.imageUrl}`} width="224" height="197" className="wp-post-image" alt="" />
                        <span className="price">
                    <ins><span className="woocommerce-Price-currencySymbol">₺</span><span className="amount">{item.listPrice}</span></ins>
                    <del><span className="woocommerce-Price-currencySymbol">₺</span><span className="amount">{item.price}</span></del>
                </span>
                        <h2 className="woocommerce-loop-product__title">{item.title}</h2>
                    </a>
                    <div className="hover-area">
                        <AddButton item={item} />
                    </div>
                </div>
            ))}
        </DSlick>
    );
}

const ProductTab = (props) => {
    const {
        id,
        isActive = false,
        loading = false,
        error = false,
        success = false,
        products,
    } = props;

    const tabStyle = isActive ? "tab-pane active" : "tab-pane";

    if (!products) return <></>;
    return (
        <div id={id} className={tabStyle} role="tabpanel">
            {!success && (
                <div>
                    {error && (
                        <span>Hata!</span>
                    )}
                    {loading && (
                        <span>Yükleniyor...</span>
                    )}
                </div>
            )}
            {success && (
                <div
                    className="products-carousel"
                >
                    <div className="container-fluid">
                        <div className="woocommerce">
                            <ProductList
                                products={products}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const homeProductHeaders = [
    { id: 1, title: "Haftanın Fırsatları", tabId: "weeklydeals" },
    { id: 2, title: "Çok Satanlar", tabId: "topsales" },
    { id: 3, title: "Yeni Ürünler", tabId: "newproducts" },
    { id: 4, title: "En Yüksek Puanlı", tabId: "highrated" }
];

const HomeProducts = (props) => {

    const defaultUQOptions = {
        retry,
        refetchOnWindowFocus: false
    }
    const weeklyDeals = useQuery(
        [
            'get-weekly-deals',
        ],
        () => (
            fetchThis(
                GET_WEEKLY_DEALS,
                { count: 0, page_count: 15, page: 1, },
                DEFAULT_API_KEY,
                {},
            )
        ),
        defaultUQOptions,
    );
    const bestSellers = useQuery(
        [
            'get-best-sellers',
        ],
        () => (
            fetchThis(
                GET_BEST_SELLERS,
                { count: 0, page_count: 15, page: 1, },
                DEFAULT_API_KEY,
                {},
            )
        ),
        defaultUQOptions,
    );
    const newProducts = useQuery(
        [
            'get-new-products',
        ],
        () => (
            fetchThis(
                GET_NEW_PRODUCTS,
                { count: 0, page_count: 15, page: 1, },
                DEFAULT_API_KEY,
                {},
            )
        ),
        defaultUQOptions,
    );
    const highestRated = useQuery(
        [
            'get-highest-rated',
        ],
        () => (
            fetchThis(
                GET_HIGHEST_RATED,
                { count: 0, page_count: 15, page: 1, },
                DEFAULT_API_KEY,
                {},
            )
        ),
        defaultUQOptions,
    );

    return (
      <section className="column-2 section-products-carousel-tabs tab-carousel-1">
          <div className="section-products-carousel-tabs-wrap">
              <header className="section-header">
                  <ul role="tablist" className="nav justify-content-end">
                      <Headers header={homeProductHeaders} />
                  </ul>
              </header>
              <div className="tab-content">
                  <ProductTab
                      id="weeklydeals"
                      products={weeklyDeals.isSuccess ? weeklyDeals?.data?.data?.products : []}
                      error={weeklyDeals.isError}
                      loading={weeklyDeals.isLoading}
                      success={weeklyDeals.isSuccess}
                      isActive
                  />
                  <ProductTab
                      id="topsales"
                      products={bestSellers.isSuccess ? bestSellers?.data?.data?.products : []}
                      error={bestSellers.isError}
                      loading={bestSellers.isLoading}
                      success={bestSellers.isSuccess}
                  />
                  <ProductTab
                      id="newproducts"
                      products={newProducts.isSuccess ? newProducts?.data?.data?.items : []}
                      error={newProducts.isError}
                      loading={newProducts.isLoading}
                      success={newProducts.isSuccess}
                  />
                  <ProductTab
                      id="highrated"
                      products={highestRated.isSuccess ? highestRated?.data?.data?.products : []}
                      error={highestRated.isError}
                      loading={highestRated.isLoading}
                      success={highestRated.isSuccess}
                  />
              </div>
          </div>
      </section>
  );
};

export default HomeProducts