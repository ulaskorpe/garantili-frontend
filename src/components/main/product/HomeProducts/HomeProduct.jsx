import React, { Component } from "react";


const Headers = (props) => {
    const item = props.header.map((_, index) => {
        if (index == 0) {
            return (<li className="nav-item" key={index}>
                <a className="nav-link active" href={_.tabUrl} data-toggle="tab">{_.title}</a>
            </li>
            )
        }
        else {
            return (<li className="nav-item" key={index}>
                <a className="nav-link" href={_.tabUrl} data-toggle="tab">{_.title}</a>
            </li>
            )
        }
    })
    return item
}

const ProductList = (props) => {
    const products = props.products.map((_, index) => {
        return (<div className="product" key={index}>
            <a href="#" className="woocommerce-LoopProduct-link">
                <span className="onsale">
                    <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol"></span>{_.discount}
                    </span>
                </span>
                <img src={_.imageUrl} width="224" height="197" className="wp-post-image" alt="" />
                <span className="price">
                    <ins><span className="woocommerce-Price-currencySymbol">₺</span><span className="amount">{_.listPrice}</span></ins>
                    <del><span className="woocommerce-Price-currencySymbol">₺</span><span className="amount">{_.price}</span></del>
                </span>
                <h2 className="woocommerce-loop-product__title">{_.title}</h2>
            </a>
            <div className="hover-area">
                <a className="button add_to_cart_button" onClick={() => props.onAddToBasket(_.id)} rel="nofollow">Sepete ekle</a>
            </div>
        </div>)
    })

    return products
}

const ProductTab = (props) => {
    const tabs = props.tabs.map((_, index) => {
        const tabStyle = index === 0 ? "tab-pane active" : "tab-pane";
        return (<div id={_.tabId} className={tabStyle} role="tabpanel" key={index}>
            <div className="products-carousel" data-ride="tm-slick-carousel"
                data-wrap=".products"
                data-slick="{&quot;infinite&quot;:false,&quot;rows&quot;:2,&quot;slidesPerRow&quot;:5,&quot;slidesToShow&quot;:1,&quot;slidesToScroll&quot;:1,&quot;dots&quot;:true,&quot;arrows&quot;:false,&quot;responsive&quot;:[{&quot;breakpoint&quot;:1023,&quot;settings&quot;:{&quot;slidesPerRow&quot;:2}},{&quot;breakpoint&quot;:1169,&quot;settings&quot;:{&quot;slidesPerRow&quot;:4}},{&quot;breakpoint&quot;:1400,&quot;settings&quot;:{&quot;slidesPerRow&quot;:3}}]}">
                <div className="container-fluid">
                    <div className="woocommerce">
                        <div className="products">
                            <ProductList products={_.products} onAddToBasket={props.onAddToBasket} />
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    })

    return tabs
}

class HomeProducts extends Component {

    render() {
        const { products, onAddToBasket } = this.props
        return (
            <section className="column-2 section-products-carousel-tabs tab-carousel-1">
                <div className="section-products-carousel-tabs-wrap">
                    <header className="section-header">
                        <ul role="tablist" className="nav justify-content-end">
                            <Headers header={products.headers} />
                        </ul>
                    </header>
                    <div className="tab-content">
                        <ProductTab tabs={products.tabs} onAddToBasket={onAddToBasket} />
                    </div>
                </div>
            </section>
        )
    }
}

export default HomeProducts