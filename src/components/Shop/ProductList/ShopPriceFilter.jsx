import React, { Component } from 'react';
class ShopPriceFilter extends Component {

    render() {
        const { priceLimit, filterByPrice } = this.props
        return (
            < React.Fragment >
                <p>
                    <span className="gamma widget-title">Fiyat Aralığı</span>
                </p>
                <div className="price_slider_amount">
                    <input id="amount" type="text" placeholder="Min price" data-min={priceLimit.minPriceValue} defaultValue={priceLimit.maxPriceValue} name="min_price" className="hidden" />
                    <div id="slider-range" className="price_slider"></div>
                    <button className="button" type="submit" onClick={() => filterByPrice(priceLimit.minPriceValue, priceLimit.maxPriceValue)}>Fiyat uygula</button>
                </div>
            </React.Fragment >
        );
    }
}

export default ShopPriceFilter;