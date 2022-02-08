import React from 'react';



class MobileNav extends React.Component {
  state = {
      mobileNav : [],
      isLoaded:false
  }
  componentDidMount(){
    fetch(`${process.env.REACT_APP_BASE}/api/site/mobile-menu`,{
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
        }
    })
        .then((res) => res.json())
        .then(
            (result) => {

                this.setState({ isLoaded: true, mobileNav: result });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error,
                });
            }
        );
  }

    logoStyle = {
        height: 39
    }
    render() {
        const { basket } = this.props
        console.log(this.state.mobileNav);
        return (
            <div className="col-full handheld-only">
                <div className="handheld-header">
                    <div className="row">
                        <div className="site-branding">
                            <a href="#" className="custom-logo-link" rel="home">
                                <img src="assets/images/LOGO.svg" style={this.logoStyle} />
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
                                            this.state.mobileNav.map((item, i) => {
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