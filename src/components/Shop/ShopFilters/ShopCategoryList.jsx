import React from "react";
import useRouterDOM from "../../../hooks/useRouterDOM";

const ShopCategoryList = (props) => {
    const { categoryList, selectedCategory } = props;
    const { goEvent } = useRouterDOM();

    return categoryList.map((category, i) => {
        const url = category.url || `/urunler/${category.id}`;
        const style = selectedCategory.id === category.id ? { fontWeight: '500' } : undefined;

        return (
            <li className="cat-item" key={i}>
                <a href={url} onClick={goEvent(url)} style={style}>
                    <span className="no-child" />
                    {category.title}
                </a>
            </li>
        )
    })
};

export default ShopCategoryList