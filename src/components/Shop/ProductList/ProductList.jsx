import React, { Component } from "react";
import GridExtended from "./GridExtended";
import GridItem from "./GridItem";
import ListItem from "./ListItem";
import ListLarge from "./ListLarge";
import SmallListItem from "./SmallListItem";

class ProductList extends Component {
    render() {
        const {
            products,
            onAddToBasket,
            listType,
        } = this.props

        return products.map((product, i) => {
            const isPlaceholder = Boolean(product.isPlaceholder);
            switch (listType) {
                case 'grid':
                    return <GridItem isPlaceholder={isPlaceholder} item={product} addToBasket={onAddToBasket} key={i} listCount={i + 1} />
                case 'grid-extended':
                    return <GridExtended isPlaceholder={isPlaceholder} item={product} addToBasket={onAddToBasket} key={i} listCount={i + 1} />
                case 'large-list':
                    return <ListLarge isPlaceholder={isPlaceholder} item={product} addToBasket={onAddToBasket} key={i} listCount={i + 1} />
                case 'list':
                    return <ListItem isPlaceholder={isPlaceholder} item={product} addToBasket={onAddToBasket} key={i} listCount={i + 1} />
                case 'list-small':
                    return <SmallListItem isPlaceholder={isPlaceholder} item={product} addToBasket={onAddToBasket} key={i} listCount={i + 1} />
                default:
                    break;
            }
        })
    }
}

export default ProductList