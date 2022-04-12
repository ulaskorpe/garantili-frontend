import React  from 'react';
import {useSelector} from "react-redux";
import {getBasketCount} from "../../../../store/selectors/basket";
import useRouterDOM from "../../../../hooks/useRouterDOM";

const INITIAL_MOBILE_NAV_ITEMS = [
    { id: 1, title: "Süper Teklif", url: "/super-teklifler" },
    { id: 2, title: "Telefonlar", url: "/urunler/telefonlar/2" },
    { id: 3, title: "Tabletler", url: "/urunler/tabletler/3" },
    { id: 4, title: "Aksesuarlar", url: "/urunler/aksesuarlar/4" },
    { id: 5, title: "Telefon Sat", url: "/telefon-sat" },
    { id: 6, title: "Telefon Onar / Yenile", url: "/telefon-onar" },
    {
        id: 7, title: "Kurumsal", url: "#",
        subs: [
            { id: 71, title: 'Hakkımızda', url: '/sayfa/hakkimizda/10' },
            { id: 72, title: 'Hizmetlerimiz', url: '/sayfa/hizmetlerimiz/11' },
            { id: 73, title: 'Bizden Haberler', url: '/bizden-haberler' },
            { id: 74, title: 'İnsan Kaynakları', url: '/insan-kaynaklari' },
        ]
    },
    { id: 9, title: "IMEI Sorgula", url: "/imei-sorgula" },
    { id: 10, title: "İade Formu", url: "/iade-formu" },
    { id: 11, title: "S.S.S.", url: "/sss" },
    { id: 11, title: "Bize Ulaşın", url: "/iletisim" },
]
const INITIAL_LOGO_STYLE = {
    height: 39
}

const MobileNav = () => {
    const basketCount = useSelector(getBasketCount);
    const { goEvent } = useRouterDOM();

    return (
        <div className="col-full handheld-only">
            <div className="handheld-header">
                <div className="row">
                    <div className="site-branding">
                        <a
                            className="custom-logo-link"
                            rel="home"
                            href="/"
                            onClick={goEvent('/')}
                        >
                            <img
                                alt=""
                                src="/assets/images/LOGO.svg"
                                style={INITIAL_LOGO_STYLE}
                            />
                        </a>
                    </div>
                    <div className="handheld-header-links">
                        <ul className="columns-3">
                            <li className="my-account">
                                <a href="/login" className="has-icon">
                                    <i className="tm tm-login-register" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="garantili-sticky-wrap">
                    <div className="row">
                        <nav id="handheld-navigation" className="handheld-navigation" aria-label="Handheld Navigation">
                            <button className="btn navbar-toggler" type="button">
                                <i className="tm tm-departments-thin" />
                                <span>Menu</span>
                            </button>
                            <div className="handheld-navigation-menu">
                                <span className="tmhm-close">Kapat</span>
                                <ul id="menu-departments-menu-1" className="nav">
                                    {
                                        INITIAL_MOBILE_NAV_ITEMS.map((item, i) => {
                                            if (!item.subs) return (
                                                <li key={i} className="highlight menu-item animate-dropdown"><a title={item.title} href={item.url}>{item.title}</a></li>)

                                            const subItems = []
                                            subItems.push(<li key={i} className="nav-title">{item.title}</li>)
                                            item.subs.map((subItem, j) => { subItems.push(<li key={j}><a href={subItem.url}>{subItem.title}</a></li>) })
                                        })
                                    }
                                </ul>
                            </div>

                        </nav>
                        <div className="site-search">
                            <div className="widget woocommerce widget_product_search">
                                <form role="search" method="get" className="woocommerce-product-search" action="#">
                                    <label className="screen-reader-text" htmlFor="woocommerce-product-search-field-0">Ürün,
                                        marka veya model ara</label>
                                    <input
                                        type="search"
                                        id="woocommerce-product-search-field-0"
                                        className="search-field"
                                        placeholder="Ürün, marka veya model ara"
                                        defaultValue=""
                                        name="s"
                                    />
                                    <input
                                        type="submit"
                                        defaultValue="ARA"
                                    />
                                    <input
                                        type="hidden"
                                        name="post_type"
                                        defaultValue="product"
                                    />
                                </form>
                            </div>
                        </div>
                        <a className="handheld-header-cart-link has-icon" href="#" title="Sepetim">
                            <i className="tm tm-shopping-bag" />
                            <span className="count">{basketCount}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileNav;