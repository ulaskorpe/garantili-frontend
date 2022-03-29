import React, {useCallback, useEffect, useState} from "react";


const MAX = 3;
const ShopFilterItem = (props) => {
    const {
        filter,
        queries,
        setFilter
    } = props;
    const [showMore, setShowMore] = useState(false);

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

    const items = showMore ? filter.items : filter.items.slice(0, MAX);

    useEffect(() => {
        if (
            filter?.items?.length <= MAX
            && showMore === false
        )  setShowMore(true);
    }, [filter.items, showMore]);

    const toggleShowMore = useCallback((e) => {
        e.preventDefault();
        setShowMore(!showMore)
    }, [showMore]);

    return (
        <div className="widget woocommerce widget_layered_nav maxlist-more"
             id = "woocommerce_layered_nav-2" >
            <span className="gamma widget-title">{filter.title}</span>
            <ul>
                {
                    items.map((f, i) => {
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
            <p className="maxlist-more">
                <a
                    href="#"
                    onClick={toggleShowMore}
                >
                    {!showMore && '+ Tümünü göster'}
                    {showMore && '- Daralt'}
                </a>
            </p>
        </div >
    );
}

export default ShopFilterItem