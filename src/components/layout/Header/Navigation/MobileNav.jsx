import React, { Component } from 'react';



class MobileNav extends React.Component {
    mobileNav = [
        { id: 1, title: "Süper Teklif", url: "#" },
        { id: 2, title: "Telefonlar", url: "#" },
        { id: 3, title: "Tabletler", url: "#" },
        { id: 4, title: "Aksesuarlar", url: "#" },
        { id: 5, title: "Telefon Sat", url: "#" },
        { id: 6, title: "Telefon Onar / Yenile", url: "#" },
        {
            id: 7, title: "Kurumsal", url: "#",
            subs: [
                { id: 71, title: 'Hakkımızda', url: '/sayfa/hakkimizda/1' },
                { id: 72, title: 'Hizmetlerimiz', url: '/sayfa/hizmetlerimiz/2' },
                { id: 73, title: 'Bizden Haberler', url: '/bizden-haberler' },
                { id: 74, title: 'İnsan Kaynakları', url: '#' },
            ]
        },
        { id: 8, title: "Garantili Sorgula", url: "#" },
        { id: 9, title: "IMEI Sorgula", url: "#" },
        { id: 10, title: "İade Formu", url: "#" },
        { id: 11, title: "S.S.S.", url: "/sss" },
        { id: 11, title: "Bize Ulaşın", url: "#" },
    ]

    logoStyle = {
        height: 39
    }
    render() {
        const { basket } = this.props
        return (
            <div className="col-full handheld-only">
                <div className="handheld-header">
                    <div className="row">
                        <div className="site-branding">
                            <a href="#" className="custom-logo-link" rel="home">
                                <img src="/assets/images/LOGO.svg" style={this.logoStyle} />
                            </a>
                        </div>
                        <div className="handheld-header-links">
                            <ul className="columns-3">
                                <li className="my-account">
                                    <a href="#" className="has-icon">
                                        <i className="tm tm-login-register"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="garantili-sticky-wrap">
                        <div className="row">
                            <nav id="handheld-navigation" className="handheld-navigation" aria-label="Handheld Navigation">
                                <button className="btn navbar-toggler" type="button">
                                    <i className="tm tm-departments-thin"></i>
                                    <span>Menu</span>
                                </button>
                                <div className="handheld-navigation-menu">
                                    <span className="tmhm-close">Kapat</span>
                                    <ul id="menu-departments-menu-1" className="nav">
                                        {
                                            this.mobileNav.map((item, i) => {
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
                                        <input type="search" id="woocommerce-product-search-field-0" className="search-field"
                                            placeholder="Ürün, marka veya model ara"defaultValue="" name="s" />
                                        <input type="submit"defaultValue="ARA" />
                                        <input type="hidden" name="post_type"defaultValue="product" />
                                    </form>
                                </div>
                            </div>
                            <a className="handheld-header-cart-link has-icon" href="#" title="Sepetim">
                                <i className="tm tm-shopping-bag"></i>
                                <span className="count">{basket.basketItems.length}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MobileNav;