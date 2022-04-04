import React, {useCallback, useEffect, useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

const INITIAL_CATEGORIES = [
    { id: 0, title: 'Mağaza', url: '/urunler' },
    { id: 1, title: 'Süper Teklifler', url: '/super-teklifler' },
    { id: 2, title: 'Telefonlar', url: '/urunler/telefonlar/2'},
    { id: 3, title: 'Tabletler', url: '/urunler/tabletler/3' },
    { id: 4, title: 'Aksesuarlar', url: '/urunler/aksesuarlar/4' },
];

let timer = null;
const Search = (props) => {
    const {
        searchKeyword,
        setSearchKeyword,
    } = props;
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [deg, setDeg] = useState(searchParams.get('q') ?? searchKeyword);

    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        timer = setTimeout(() => {
            if (setSearchKeyword) {
                setSearchKeyword(deg);
                if (
                    deg
                    && deg !== searchParams.get('q')
                ) setSearchParams({ q: deg })
                if (
                    !deg
                    && searchParams.get('q')
                ) setSearchParams({})
            }
        }, [250]);
    }, [deg, setSearchKeyword, setSearchParams, searchParams]);

    const goSearch = useCallback((e) => {
        let enable = deg && !setSearchKeyword && location.pathname !== '/urunler';
        
        if (e && e?.preventDefault) e.preventDefault();
        if(enable) navigate({ pathname: '/urunler', search: `?q=${deg}`});
    }, [location, navigate, setSearchKeyword, deg])

    return (
        <form className="navbar-search" method="get" action="#" onSubmit={goSearch}>
            <label className="sr-only screen-reader-text" htmlFor="search">Arama</label>
            <div className="input-group">
                <input
                    defaultValue={searchKeyword}
                    onChange={(e) => {
                        setDeg(e.target.value);
                    }}
                    type="text"
                    id="search"
                    className="form-control search-field product-search-field"
                    dir="ltr"
                    name="q"
                    placeholder="Ürün, marka veya model ara"
                />
                {/*
                <div className="input-group-addon search-categories popover-header">
                    <select name='product_cat' id='product_cat' className='postform resizeselect' defaultValue="0">
                        <option value='-1'>Tüm Kategoriler</option>
                        {INITIAL_CATEGORIES.map((category) => (
                            <option
                                className="level-0"
                                value={category.id}
                                key={`cat_${category.id}`}
                            >
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>
                */}
                <div className="input-group-btn input-group-append">
                    <input type="hidden" id="search-param" name="post_type" defaultValue="product" />
                    <button type="submit" className="btn btn-primary">
                        <i className="fa fa-search" />
                        <span className="search-btn">ARA</span>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Search;