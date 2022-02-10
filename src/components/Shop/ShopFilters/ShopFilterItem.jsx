import React, { Component } from "react";

class ShopFilterItem extends Component {
    onClick(filterValue){
            let filterValues = this.props.filter.items.map(i =>
               i.filterName === filterValue ? {...i,isChosen:!i.isChosen} : i
            )
            this.props.setFilter(this.props.filter.filterName,filterValues);
    }
    render() {
        const { filter , setFilter} = this.props;
        return (
            <div className="widget woocommerce widget_layered_nav maxlist-more"
                id = "woocommerce_layered_nav-2" >
                <span className="gamma widget-title">{filter.title}</span>
                <ul>
                    {
                        filter.items.map((f, i) => {
                            return (
                                <li key={i} className={this.getClasses(f.isChosen)}><a onClick={() => this.onClick(f.filterName)}>{f.title}</a>
                                    <span className="count">(2)</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div >
        )
    }

    getClasses(isChosen) {
        let className = 'wc-layerd-nav-term '
        if (isChosen) className += 'chosen'
        return className
    }
}

export default ShopFilterItem