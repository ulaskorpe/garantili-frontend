import React, {
    useCallback,
    useMemo,
} from 'react';


const maxPageLength = 6;
const PaginationBar = (props) => {
    const {
        totalPageCount,
        perPage,
        page,
        perPages = [],
        onPerPageChange,
        onPageChange,
    } = props;

    /* Memos */
    const bars = useMemo(() => {
        return (
            (new Array(totalPageCount))
                .fill(null)
                .map((_, pageIDX) => {
                        const _page = pageIDX+1;
                        return ({
                            key: `bar_item_${_page}`,
                            value: _page,
                        });
                    }
                )
        );
    }, [totalPageCount]);
    const renderedBars = useMemo(() => {
        let newArray = JSON.parse(JSON.stringify(bars));

        if (bars.length > maxPageLength) {
            const pageValue = page.value;
            const center = Math.floor(maxPageLength / 2);
            const left = (bars.length / 2) > pageValue;
            let firstStart,
                firstEnd,
                lastStart,
                lastEnd;

            if (left) {
                firstStart = pageValue - 2;
                firstEnd = pageValue + 1;

                //
                lastStart = -3;
            } else {
                //
                firstStart = 0;
                firstEnd = center;

                lastStart = (
                    pageValue === bars.length
                        ? bars.length - center
                        : pageValue - 2
                );
                lastEnd = (
                    (pageValue + 1) >= bars.length
                        ? undefined
                        : pageValue +1
                );
            }

            const first = newArray.slice(
                firstStart < 0 ? 0 : firstStart,
                firstStart < 0 ? 3 : firstEnd
            );
            const last = newArray.slice(lastStart, lastEnd)

            if (
                first.length
                && last.length
            ) {
                newArray = [
                    ...first,
                    {
                        key: 'bar_item_more',
                        value: '...',
                        disabled: true,
                    },
                    ...last
                ]
            } else {
                newArray = [];
            }
        }

        return (newArray);
    }, [bars, page]);

    //
    if (!totalPageCount || !page || !page?.value) return <></>;

    return (
        <div className="shop-control-bar-bottom">
            <form
                className="form-techmarket-wc-ppp"
                method="POST"
                onSubmit={(e) => e.preventDefault()}
            >
                <select
                    className="techmarket-wc-wppp-select c-select"
                    name="per_page"
                    value={perPage.value}
                    onChange={onPerPageChange}
                >
                    {perPages.map((_perPage) => (
                        <option
                            key={_perPage.key}
                            value={_perPage.value}
                        >
                            {_perPage.value}
                        </option>
                    ))}
                </select>
            </form>
            <p className="woocommerce-result-count">
                Toplam {totalPageCount} sayfa. {page.value}. sayfadasınız.
            </p>
            <nav className="woocommerce-pagination">
                <ul className="page-numbers">
                    {renderedBars.map((bar) => {
                        const isDisabled = Boolean(bar?.disabled);
                        const isSelected = bar.value === page.value;

                        return (
                            <li key={bar.key}>
                                {isSelected && (
                                    <span className="page-numbers current">
                                    {bar.value}
                                </span>
                                )}
                                {!isSelected && (
                                    <button
                                        className="page-numbers"
                                        disabled={isDisabled}
                                        style={{ cursor: isDisabled ? 'default' : 'pointer'}}
                                        onClick={() => onPageChange(bar)}
                                    >
                                        {bar.value}
                                    </button>
                                )}
                            </li>
                        );
                    })}
                    {/*<li><a href="#" className="next page-numbers">→</a></li>*/}
                </ul>
            </nav>
        </div >
    );
};

export default PaginationBar;