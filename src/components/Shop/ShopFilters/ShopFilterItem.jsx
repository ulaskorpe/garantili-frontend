import React, {useCallback} from "react";

const ShopFilterItem = (props) => {
    const {
        filter,
        queries,
        setFilter
    } = props;

    /* Memos */
    const isSelected = useCallback((parentName, filterID) => {
        if (!queries) return false;
        return queries.includes(filterID);
    }, [queries])

    /* Handlers */
    const handleClick = useCallback((filterItem) => () => {
        setFilter(filterItem);
    }, [setFilter]);

    /* Utils */
    const getClasses = (isChosen) => {
        let className = 'wc-layerd-nav-term '
        if (isChosen) className += 'chosen'
        return className
    };

    return (
        <div className="widget woocommerce widget_layered_nav maxlist-more"
             id = "woocommerce_layered_nav-2" >
            <span className="gamma widget-title">{filter.title}</span>
            <ul>
                {
                    filter.items.map((f, i) => {
                        return (
                            <li
                                key={i}
                                className={getClasses(isSelected(filter.filterName, f.id))}
                            >
                                <a
                                    onClick={handleClick(f)}
                                >
                                    {f.title}
                                </a>
                                <span className="count">(2)</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div >
    );
}

export default ShopFilterItem