import React, { Component } from "react";

class Search extends Component {
    render() {
        return (
            <form className="navbar-search" method="get" action="#">
                <label className="sr-only screen-reader-text" htmlFor="search">Arama</label>
                <div className="input-group">
                    <input type="text" id="search" className="form-control search-field product-search-field" dir="ltr" name="s" placeholder="Ürün, marka veya model ara" />
                    <div className="input-group-addon search-categories popover-header">
                        <select name='product_cat' id='product_cat' className='postform resizeselect' defaultValue="0">
                            <option defaultValue='0'>Tüm Kategoriler</option>
                            <option className="level-0" defaultValue="cells-tablets">Telefonlar</option>
                            <option className="level-0" defaultValue="smartwatches">Tabletler</option>
                            <option className="level-0" defaultValue="games-consoles">Aksesuarlar</option>
                            <option className="level-0" defaultValue="home-entertainment">Süper Teklif / Fiyat</option>
                            <option className="level-0" defaultValue="tv-video">Haftanın Fırsatları</option>
                            <option className="level-0" defaultValue="printer">Çok Satanlar</option>
                            <option className="level-0" defaultValue="tvs">Yeni Ürünler</option>
                            <option className="level-0" defaultValue="tvs">En Yüksek Puanlı</option>
                            <option className="level-0" defaultValue="television">Apple</option>
                            <option className="level-0" defaultValue="home-theater-audio">Samsung</option>
                            <option className="level-0" defaultValue="headphones">Xiaomi</option>
                            <option className="level-0" defaultValue="digital-cameras">Huawei</option>
                        </select>
                    </div>
                    <div className="input-group-btn input-group-append">
                        <input type="hidden" id="search-param" name="post_type" defaultValue="product" />
                        <button type="submit" className="btn btn-primary">
                            <i className="fa fa-search"></i>
                            <span className="search-btn">ARA</span>
                        </button>
                    </div>
                </div>
            </form>)
    }
}

export default Search;