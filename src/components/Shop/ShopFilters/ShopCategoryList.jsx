import React, { Component } from "react";

class ShopCategoryList extends Component {
    render() {
        const { categoryList } = this.props
        return categoryList.map((category, i) => {
            return (
                <li className="cat-item" key={i}><a href={category.url}> <span className="no-child"></span>{category.title}</a></li>
            )
        })
    }
}

export default ShopCategoryList