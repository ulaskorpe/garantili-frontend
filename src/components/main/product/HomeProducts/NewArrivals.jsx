import React, { Component } from 'react';

const ProductItem = (props) => {
    const product = props.product
    return (
        <div className="product">
            <a href="#" className="woocommerce-LoopProduct-link">
                <img src={product.imageUrl} width="224" height="197" className="wp-post-image" alt="" />
                <span className="price">
                    <ins>
                        <span className="amount"> </span>
                    </ins>
                    <span className="amount">{product.price}</span>
                </span>
                <h2 className="woocommerce-loop-product__title">{product.title}</h2>
            </a>
            <div className="hover-area">
                <a className="button add_to_cart_button" href="#" onClick={props.onAddToBasket} rel="nofollow">Sepete ekle</a>
            </div>
        </div>
    )
}

class NewArrivals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            products: null,
        };
    }
    componentDidMount() {
        fetch(`${process.env.REACT_APP_BASE}/api/products/new-arrivals`, {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY
            }
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({ isLoaded:true, products: result });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    }

    render() {
        const { onAddToBasket } = this.props
        const { isLoaded , products} = this.state
        return (
            <section className="section-hot-new-arrivals section-products-carousel-tabs techmarket-tabs">
                <header className="section-header">
                  {/* <h2 className="section-title arrival-title" >{this.state.products.title}</h2> */}
                    <ul role="tablist" className="nav justify-content-end">
                        {isLoaded && products !== null && products.products.headers.map((item, i) => {
                            let classes = i === 0 ? "nav-link active" : "nav-link"
                            return (<li className="nav-item" key={i}><a className={classes} href={item.tabUrl} data-toggle="tab">{item.title}</a></li>)
                        })}
                    </ul>
                </header>
                <div className="tab-content">
                    {isLoaded && products !== null && products.products.tabs.map((item, i) => {
                        let classes = i === 0 ? "tab-pane active" : "tab-pane"
                        return (<div className={classes} id={item.tabId} role="tabpanel" key={i}>
                            <div className="products-carousel" data-ride="tm-slick-carousel" data-wrap=".products"
                                data-slick="{&quot;infinite&quot;:false,&quot;slidesToShow&quot;:7,&quot;slidesToScroll&quot;:7,&quot;dots&quot;:true,&quot;arrows&quot;:false,&quot;responsive&quot;:[{&quot;breakpoint&quot;:700,&quot;settings&quot;:{&quot;slidesToShow&quot;:2,&quot;slidesToScroll&quot;:2}},{&quot;breakpoint&quot;:780,&quot;settings&quot;:{&quot;slidesToShow&quot;:3,&quot;slidesToScroll&quot;:3}},{&quot;breakpoint&quot;:1200,&quot;settings&quot;:{&quot;slidesToShow&quot;:4,&quot;slidesToScroll&quot;:4}},{&quot;breakpoint&quot;:1400,&quot;settings&quot;:{&quot;slidesToShow&quot;:5,&quot;slidesToScroll&quot;:5}}]}">
                                <div className="container-fluid">
                                    <div className="woocommerce">
                                        <div className="products">
                                            {item.products.map((_, j) => {
                                                return <ProductItem product={_} onAddToBasket={onAddToBasket} key={_.title} />
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    })}
                </div>
            </section>
        );
    }
}

export default NewArrivals;