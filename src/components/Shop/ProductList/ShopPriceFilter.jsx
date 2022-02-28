import React  from 'react';

const ShopPriceFilter = (props) => {
    const {
        priceLimit,
        filterByPrice
    } = props;

    return (
        <>
            <p>
                <span
                    className="gamma widget-title"
                >
                    Fiyat Aralığı
                </span>
            </p>
            <div className="price_slider_amount">
                <input
                    id="amount"
                    type="text"
                    placeholder="Min price"
                    data-min={priceLimit.minPriceValue}
                    defaultValue={priceLimit.maxPriceValue}
                    name="min_price"
                    className="hidden"
                />
                <div
                    id="slider-range"
                    className="price_slider"
                />
                <button
                    className="button"
                    type="submit"
                    onClick={() => filterByPrice(priceLimit.minPriceValue, priceLimit.maxPriceValue)}
                >
                    Fiyat uygula
                </button>
            </div>
        </>
    );
}

export default ShopPriceFilter;