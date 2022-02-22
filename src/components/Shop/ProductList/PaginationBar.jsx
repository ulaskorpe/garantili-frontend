import React, { Component } from 'react';

class PaginationBar extends Component {

    render() {
        const { bar, changePage, onChangeProductCount, onAlert } = this.props
        return (
            <div className="shop-control-bar-bottom">
                <form className="form-techmarket-wc-ppp" method="POST">
                    <select className="techmarket-wc-wppp-select c-select" onChange={onChangeProductCount} name="ppp">
                        <option value="2">4</option>
                        <option value="4">8</option>
                        <option value="-1">Hepsi</option>
                    </select>
                    <input type="hidden" value="5" name="shop_columns" />
                    <input type="hidden" value="15" name="shop_per_page" />
                    <input type="hidden" value="right-sidebar" name="shop_layout" />
                </form>
                <p className="woocommerce-result-count">
                    {bar.totalResult} sonuçtan, {bar.result} tane listeleniyor.
                </p>
                <nav className="woocommerce-pagination">
                    <ul className="page-numbers">
                        {
                            bar.pages.map((p, index) => {
                                if (p.selected) {
                                    return (<li key={p.page}><span className="page-numbers current">{p.page}</span></li>)
                                }
                                // console.log(p.page);
                                return (<li key={p.page}><button className="page-numbers" onClick={() => changePage(p.page)}>{p.page}</button></li>)
                            })
                        }
                        {/* <li><a href="#" className="next page-numbers">→</a></li> */}
                    </ul>
                </nav>
            </div >
        );
    }
}

export default PaginationBar;