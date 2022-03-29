import React, {useCallback, useState} from 'react';
import {getItemPrice} from "../../../../store/selectors/basket";
import useProductTools from "../../../../hooks/useProductTools";
import {useQuery} from "react-query";
import {DEFAULT_API_KEY, fetchThis, GET_NEW_PRODUCTS, retry} from "../../../../api";
import DSlick from "react-slick";

const ProductItem = (props) => {
    const {
        openModalEvent,
        product,
    } = props;
    const item = product;
    const { goProductEvent } = useProductTools();

    return (
        <div className="product">
            <a
                className="woocommerce-LoopProduct-link"
                href={item.url || '#'}
                onClick={goProductEvent(item)}
            >
                <img src={item.imageUrl} width="224" height="197" className="wp-post-image" alt="" />
                <span className="price">
                    <ins>
                        <span className="amount"> </span>
                    </ins>
                    <span className="amount">{getItemPrice(item)}₺</span>
                </span>
                <h2 className="woocommerce-loop-product__title">{item.title}</h2>
            </a>
            <div className="hover-area">
                <a
                    className="button add_to_cart_button"
                    href="#"
                    rel="nofollow"
                    onClick={openModalEvent(item)}
                >
                    Sepete ekle
                </a>
            </div>
        </div>
    )
}

const slickSettings = {
    "infinite": false,
    "slidesToShow": 7,
    "slidesToScroll": 7,
    "dots": true,
    "arrows": false,
    "responsive": [
        {
            "breakpoint": 700,
            "settings": {
                "slidesToShow": 2,
                "slidesToScroll": 2
            }
        },
        {
            "breakpoint": 780,
            "settings": {
                "slidesToShow": 3,
                "slidesToScroll": 3
            }
        },
        {
            "breakpoint": 1200,
            "settings": {
                "slidesToShow": 4,
                "slidesToScroll": 4
            }
        },
        {
            "breakpoint": 1400,
            "settings": {
                "slidesToShow": 5,
                "slidesToScroll": 5
            }
        }
    ]
};

const CATEGORY_ALL = {
    id: 0,
    title: 'Tümü',
    value: 0,
}

let timer = null;
let lastCategories = [];
const NewArrivals = (props) => {
    const {
        openModalEvent,
    } = props;
    const [selectedCategory, setSelectedCategory] = useState(0);

    const newArrivals = useQuery(
        [
            'get-new-arrivals',
            selectedCategory,
        ],
        () => (
            fetchThis(
                GET_NEW_PRODUCTS,
                {
                    count: 0,
                    category_id: selectedCategory.toString(),
                },
                DEFAULT_API_KEY,
                {},
            )
        ),
        {
            retry,
            refetchOnWindowFocus: false
        },
    );
    const handleCategoryClick = useCallback((item) => (e) => {
        if (newArrivals.isLoading) return;
        e.preventDefault();
        if (timer) {
            clearTimeout(timer);
            timer =  null;
        }
        setSelectedCategory(item.id);
    }, [newArrivals]);

    return (
        <section className="section-hot-new-arrivals section-products-carousel-tabs techmarket-tabs">
            <header className="section-header">
                <h2 className="section-title arrival-title">Son Eklenenler</h2>
                <ul role="tablist" className="nav justify-content-end">
                    {[
                        CATEGORY_ALL,
                        ...(
                            (newArrivals.isSuccess
                                ? (lastCategories = newArrivals?.data?.data.categories)
                                : lastCategories
                            )
                            || []
                        ),
                    ].map((item, i) => {
                        let classes = selectedCategory === item.id ? "nav-link active" : "nav-link"
                        return (
                            <li className="nav-item" key={i}>
                                <a
                                    className={classes}
                                    onClick={handleCategoryClick(item)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </header>
            <div className="tab-content">
                <div className="tab-pane active" role="tabpanel">
                    <div
                        className="products-carousel"
                    >
                        <div className="container-fluid">
                            <div className="woocommerce">
                                {newArrivals.isLoading && (
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        padding: '50px 20px',
                                    }}>
                                        <span>Veriler alınıyor, lütfen bekleyiniz...</span>
                                    </div>
                                )}
                                {newArrivals.isError && (
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        padding: '50px 20px',
                                    }}>
                                        <span>Veriler alınırken bir sorun ile karşılaşıldı!</span>
                                    </div>
                                )}
                                {newArrivals.isSuccess && (
                                    !newArrivals?.data?.data?.products?.length ? (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '100%',
                                            padding: '50px 20px',
                                        }}>
                                            <span>Veri yok.</span>
                                        </div>
                                    ) : (
                                        <DSlick
                                            className="products no-slick-pb"
                                            {...slickSettings}
                                        >
                                            {newArrivals?.data?.data?.products?.map((item, i) => (
                                                <ProductItem
                                                    product={item}
                                                    key={i}
                                                    openModalEvent={openModalEvent}
                                                />
                                            ))}
                                        </DSlick>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewArrivals;