import React, {Component, useState} from 'react';
import useBasket from "../../../../store/hooks/useBasket";
import {getItemPrice} from "../../../../store/selectors/basket";
import useProductTools from "../../../../hooks/useProductTools";

const ProductItem = (props) => {
    const item = props.product;
    const [added, setAdded] = useState(false);
    const basket = useBasket();
    const { goProductEvent } = useProductTools();

    return (
        <div className="product">
            <a
                className="woocommerce-LoopProduct-link"
                href={item.url || '#'}
                onClick={goProductEvent(item)}
            >
                <img src={item.imageUrl} width="224" height="197" className="wp-post-image" alt="" />
                <span className="price">
                    <ins>
                        <span className="amount"> </span>
                    </ins>
                    <span className="amount">{getItemPrice(item)}₺</span>
                </span>
                <h2 className="woocommerce-loop-product__title">{item.title}</h2>
            </a>
            <div className="hover-area">
                <a
                    className="button add_to_cart_button"
                    href="#"
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
        </div>
    )
}

class NewArrivals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            products: {
                title: 'Son Eklenenler',
                headers: [
                    { id: 1, title: "Telefonlar", tabUrl: "#weeklydeals" },
                    { id: 2, title: "Tabletler", tabUrl: "#topsales" },
                    { id: 3, title: "Aksesuarlar", tabUrl: "#newproducts" }
                ],
                tabs: [
                    {
                        id: 1, tabId: "weeklydeals", products: [
                            { id: 8, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                            { id: 9, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                            { id: 10, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                            { id: 11, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                            { id: 12, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                            { id: 13, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                            { id: 14, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                            { id: 15, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                            { id: 16, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                            { id: 17, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                            { id: 18, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                            { id: 19, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                            { id: 20, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                        ]
                    }
                ]
            },
        };
    }
    componentDidMount() {
        // fetch("https://buyback.garantiliteknoloji.com/api/products/new-arrivals", {
        //     headers: {
        //         'x-api-key': '5c35640a3da4f1e3970bacbbf7b20e6c'
        //     }
        // })
        //     .then((res) => res.json())
        //     .then(
        //         (result) => {
        //
        //             this.setState({ isLoaded: true, products: result });
        //         },
        //         (error) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 error,
        //             });
        //         }
        //     );
    }

    render() {
        const { onAddToBasket } = this.props
        return (
            <section className="section-hot-new-arrivals section-products-carousel-tabs techmarket-tabs">
                <header className="section-header">
                    <h2 className="section-title arrival-title" >{this.state.products.title}</h2>
                    <ul role="tablist" className="nav justify-content-end">
                        {this.state.products.headers.map((item, i) => {
                            let classes = i === 0 ? "nav-link active" : "nav-link"
                            return (<li className="nav-item" key={i}><a className={classes} href="#tab-59f89f0940f740" data-toggle="tab">{item.title}</a></li>)
                        })}
                    </ul>
                </header>
                <div className="tab-content">
                    {this.state.products.tabs.map((item, i) => {
                        let classes = i === 0 ? "tab-pane active" : "tab-pane"
                        return (<div className={classes} role="tabpanel" key={i}>
                            <div className="products-carousel" data-ride="tm-slick-carousel" data-wrap=".products"
                                data-slick="{&quot;infinite&quot;:false,&quot;slidesToShow&quot;:7,&quot;slidesToScroll&quot;:7,&quot;dots&quot;:true,&quot;arrows&quot;:false,&quot;responsive&quot;:[{&quot;breakpoint&quot;:700,&quot;settings&quot;:{&quot;slidesToShow&quot;:2,&quot;slidesToScroll&quot;:2}},{&quot;breakpoint&quot;:780,&quot;settings&quot;:{&quot;slidesToShow&quot;:3,&quot;slidesToScroll&quot;:3}},{&quot;breakpoint&quot;:1200,&quot;settings&quot;:{&quot;slidesToShow&quot;:4,&quot;slidesToScroll&quot;:4}},{&quot;breakpoint&quot;:1400,&quot;settings&quot;:{&quot;slidesToShow&quot;:5,&quot;slidesToScroll&quot;:5}}]}">
                                <div className="container-fluid">
                                    <div className="woocommerce">
                                        <div className="products">
                                            {item.products.map((_, j) => {
                                                return <ProductItem product={_} onAddToBasket={onAddToBasket} key={j} />
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