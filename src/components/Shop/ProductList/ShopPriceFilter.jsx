import React, {useCallback, useRef} from 'react';

const ShopPriceFilter = (props) => {
    const inputRef = useRef();
    const {
        priceLimit,
        filterByPrice
    } = props;

    const valueToInt = (value) => parseInt(value.replace(/[^0-9.]+/g, '')) || 0;
    const handleSubmit = useCallback(() => {
        const inputValue = inputRef?.current?.value || '0-0';
        const [
            minString = '0',
            maxString = '0',
        ] = inputValue.split('-');

        filterByPrice(
            valueToInt(minString),
            valueToInt(maxString),
        )
    }, [inputRef, filterByPrice]);

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
                    ref={inputRef}
                    readOnly
                />
                <div
                    id="slider-range"
                    className="price_slider"
                />
                <button
                    className="button"
                    type="submit"
                    // onClick={() => filterByPrice(priceLimit.minPriceValue, priceLimit.maxPriceValue)}
                    onClick={handleSubmit}
                >
                    Fiyat uygula
                </button>
            </div>
        </>
    );
}

export default ShopPriceFilter;