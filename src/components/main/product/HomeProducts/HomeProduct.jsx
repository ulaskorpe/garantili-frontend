import React, {Component, useState} from "react";
import useBasket from "../../../../store/hooks/useBasket";
import useProductTools from "../../../../hooks/useProductTools";


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
    const [added, setAdded] = useState(false);

    const { goProductEvent } = useProductTools();
    const basket = useBasket();

    return props.products.map((item, index) => {

        return (<div className="product" key={index}>
            <a
                className="woocommerce-LoopProduct-link"
                href={item.url || '#'}
                onClick={goProductEvent(item)}
            >
                <span className="onsale">
                    <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol" />{item.discount}
                    </span>
                </span>
                <img src={item.imageUrl} width="224" height="197" className="wp-post-image" alt="" />
                <span className="price">
                    <ins><span className="woocommerce-Price-currencySymbol">₺</span><span className="amount">{item.listPrice}</span></ins>
                    <del><span className="woocommerce-Price-currencySymbol">₺</span><span className="amount">{item.price}</span></del>
                </span>
                <h2 className="woocommerce-loop-product__title">{item.title}</h2>
            </a>
            <div className="hover-area">
                <a
                    className="button add_to_cart_button"
                    rel="nofollow"
                    onClick={(e) => {
                        e.preventDefault();
                        basket.add(item)(e);
                        setAdded(true);
                        setTimeout(() => {
                            setAdded(false);
                        }, 1250)
                    }}
                    style={added ? { backgroundColor: '#e86708', color: '#fff' } : {}}
                >
                    {!added && 'Sepete ekle'}
                    {added && 'Sepete eklendi'}
                </a>
            </div>
        </div>)
    });
}

const ProductTab = (props) => {
    return (
        props.tabs.map((_, index) => {
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
    );
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