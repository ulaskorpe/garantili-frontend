import React, { Component } from "react";
import GridExtended from "./GridExtended";
import GridItem from "./GridItem";
import ListItem from "./ListItem";
import ListLarge from "./ListLarge";
import SmallListItem from "./SmallListItem";

class ProductList extends Component {
    render() {
        const { products, onAddToBasket, listType } = this.props

        return products.map((product, i) => {
            switch (listType) {
                case 'grid':
                    return <GridItem item={product} addToBasket={onAddToBasket} key={i} listCount={i + 1} />
                case 'grid-extended':
                    return <GridExtended item={product} addToBasket={onAddToBasket} key={i} listCount={i + 1} />
                case 'large-list':
                    return <ListLarge item={product} addToBasket={onAddToBasket} key={i} listCount={i + 1} />
                case 'list':
                    return <ListItem item={product} addToBasket={onAddToBasket} key={i} listCount={i + 1} />
                case 'list-small':
                    return <SmallListItem item={product} addToBasket={onAddToBasket} key={i} listCount={i + 1} />
                default:
                    break;
            }
        })
    }
}

export default ProductList