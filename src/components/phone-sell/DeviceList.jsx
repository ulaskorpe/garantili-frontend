import React, { Component } from 'react';
import DeviceListItem from './DeviceListItem';

class DeviceList extends Component {
    render() {
        const { products, onAddToBasket, listType } = this.props

        return products.map((product, i) => {
            return <DeviceListItem item={product} addToBasket={onAddToBasket} key={i} listCount={i + 1} />
        })
    }
}

export default DeviceList;