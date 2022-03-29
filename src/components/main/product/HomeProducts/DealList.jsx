import React, {useCallback, useRef} from "react";
import DSlick from 'react-slick';
import {useQuery} from "react-query";
import {DEFAULT_API_KEY, fetchThis, GET_SUPER_OFFER, retry} from "../../../../api";
import useProductTools from "../../../../hooks/useProductTools";

const DealItem = (props) => {
    const {dealItem} = props;
    const { goProductEvent } = useProductTools();

    return (
        <div className="sale-product-with-timer product">
            <a
                className="woocommerce-LoopProduct-link"
                href={dealItem.url || '#'}
                onClick={goProductEvent(dealItem)}
            >
                <div className="sale-product-with-timer-header">
                    <div className="price-and-title">
                        <span className="price">
                            <ins><span className="woocommerce-Price-currencySymbol">₺</span>
                                <span className="woocommerce-Price-amount amount">{dealItem.listPrice}</span>
                            </ins>
                            <del><span className="woocommerce-Price-currencySymbol">₺</span>
                                <span className="woocommerce-Price-amount amount">{dealItem.price}</span>
                            </del>
                        </span>
                        <h2 className="woocommerce-loop-product__title">{dealItem.title}</h2>
                    </div>
                    <div className="sale-label-outer">
                        <div className="sale-saved-label">
                            <span
                                className="saved-label-text">Kazanç</span>
                            <span className="saved-label-amount"><span className="woocommerce-Price-currencySymbol">₺</span>
                                <span className="woocommerce-Price-amount amount">{dealItem.win}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <img width="224" height="197" alt="" className="wp-post-image" src={dealItem.imageUrl} />
                <div className="deal-progress">
                    <div className="deal-stock">
                        <div className="stock-sold">Satılan Ürün:
                            <strong>{dealItem.soldItem}</strong>
                        </div>
                        <div className="stock-available">Stokta:
                            <strong>{dealItem.stockItem}</strong>
                        </div>
                    </div>
                    <div className="progress">
                        <span className="w-0 progress-bar">0</span>
                    </div>
                </div>
                <div className="deal-countdown-timer">
                    <div className="marketing-text">
                        <span className="line-1">Acele Edin!</span>
                        <span className="line-2">İndirim Süresi:</span>
                    </div>
                    <span className="deal-time-diff d-none" >{dealItem.seconds}</span>
                    <div className="deal-countdown countdown" />
                </div>
            </a>
        </div>
    );
}

const slickSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    autoplay: true,
    pauseOnHover: false,
    arrows: false,
    autoplaySpeed: 3000,
    fade: true,
    lazyLoad: 'progressive',
    cssEase: 'linear',
    slidesToScroll: 1,
};

const DealList = () => {
    const slickRef = useRef(null);
    const list = useQuery(
        ['get-super-offer'],
        () => (
            fetchThis(
                GET_SUPER_OFFER,
                {},
                DEFAULT_API_KEY,
                {}
            )
        ), {
            retry,
            refetchOnWindowFocus: false,
            placeholderData: [{"id":1,"title":"Consectetur temporibus commodi sed omnis molestiae voluptatem dolores.","listPrice":500,"price":560,"imageUrl":"https:\/\/buyback.garantiliteknoloji.com\/images\/products\/3.jpg","win":60,"stockItem":620,"soldItem":948,"seconds":28800},{"id":2,"title":"Quam voluptatibus maiores eius qui.","listPrice":200,"price":290,"imageUrl":"https:\/\/buyback.garantiliteknoloji.com\/images\/products\/7.jpg","win":90,"stockItem":185,"soldItem":276,"seconds":28800}],
    });

    const handleNext = useCallback((e) => {
        e.preventDefault();
        if (
            slickRef
            && slickRef.current
            && slickRef.current.slickNext
        ) {
            slickRef.current.slickNext()
        }
    }, [slickRef]);

    const handlePrev = useCallback((e) => {
        e.preventDefault();
        if (
            slickRef
            && slickRef.current
            && slickRef.current.slickPrev
        ) {
            slickRef.current.slickPrev()
        }
    }, [slickRef]);

    return (
        <section className="column-1 deals-carousel" id="sale-with-timer-carousel">
            <div className="deals-carousel-inner-block">
                <header className="section-header">
                    <h2 className="section-title">
                        <strong>Süper</strong> Teklif
                    </h2>
                    <nav className="custom-slick-nav" />
                </header>

                <div className="sale-products-with-timer-carousel deals-carousel-v1">
                    <div className="products-carousel">
                        <div className="container-fluid">
                            <div className="woocommerce columns-1">
                                <DSlick
                                    className="products"
                                    {...slickSettings}
                                    ref={slickRef}
                                >
                                    {list?.data?.map((item, itemIDX) => (
                                        <DealItem
                                            dealItem={item}
                                            key={itemIDX}
                                        />
                                    ))}
                                </DSlick>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="section-footer">
                    <nav className="slick-pagination">
                        <a
                            className="slider-prev left"
                            href="#"
                            onClick={handlePrev}
                        >
                            <i className="tm tm-arrow-left" />
                            Önceki ürün
                        </a>
                        <a
                            className="slider-next right"
                            href="#"
                            onClick={handleNext}
                        >
                            Sonraki ürün
                            <i className="tm tm-arrow-right"/>
                        </a>
                    </nav>
                </footer>
            </div>
        </section>
    );
};

export default DealList