import React  from "react";
import GridExtended from "./GridExtended";
import GridItem from "./GridItem";
import ListItem from "./ListItem";
import ListLarge from "./ListLarge";
import SmallListItem from "./SmallListItem";

const ProductList = (props) => {
    const {
        products,
        openModalEvent,
        listType,
    } = props;

    return products?.map((product, i) => {
        const isPlaceholder = Boolean(product.isPlaceholder);

        const defaultItemProps = {
            isPlaceholder,
            item: product,
            key: i,
            listCount: i + 1,
            openModalEvent,
        }

        switch (listType) {
            case 'grid':
                return <GridItem {...defaultItemProps} />
            case 'grid-extended':
                return <GridExtended {...defaultItemProps} />
            case 'large-list':
                return <ListLarge {...defaultItemProps} />
            case 'list':
                return <ListItem {...defaultItemProps} />
            case 'list-small':
                return <SmallListItem {...defaultItemProps} />
            default:
                return <></>;
        }
    })
};

export default ProductList