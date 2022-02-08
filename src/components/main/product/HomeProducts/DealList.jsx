import React, { Component } from "react";
import $ from 'jquery'

const DealItem = (props) => {
    const _ = props.dealItem

    let item = (
        <div className="sale-product-with-timer product">
            <a className="woocommerce-LoopProduct-link" href="#">
                <div className="sale-product-with-timer-header">
                    <div className="price-and-title">
                        <span className="price">
                            <ins><span className="woocommerce-Price-currencySymbol">₺</span>
                                <span className="woocommerce-Price-amount amount">{_.listPrice}</span>
                            </ins>
                            <del><span className="woocommerce-Price-currencySymbol">₺</span>
                                <span className="woocommerce-Price-amount amount">{_.price}</span>
                            </del>
                        </span>
                        <h2 className="woocommerce-loop-product__title">{_.title}</h2>
                    </div>
                    <div className="sale-label-outer">
                        <div className="sale-saved-label">
                            <span
                                className="saved-label-text">Kazanç</span>
                            <span className="saved-label-amount"><span className="woocommerce-Price-currencySymbol">₺</span>
                                <span className="woocommerce-Price-amount amount">{_.win}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <img width="224" height="197" alt="" className="wp-post-image" src={_.imageUrl} />
                <div className="deal-progress">
                    <div className="deal-stock">
                        <div className="stock-sold">Satılan Ürün:
                            <strong>{_.soldItem}</strong>
                        </div>
                        <div className="stock-available">Stokta:
                            <strong>{_.stockItem}</strong>
                        </div>
                    </div>
                    <div className="progress">
                        <span className="w-0 progress-bar">0</span>
                    </div>
                </div>
                <div className="deal-countdown-timer">
                    <div className="marketing-text">
                        <span className="line-1">Acele Edin!</span>
                        <span className="line-2">İndirim Süresi:</span>
                    </div>
                    <span className="deal-time-diff d-none" >{_.seconds}</span>
                    <div className="deal-countdown countdown"></div>
                </div>
            </a>
        </div>
    )

    return item
}

const Deals = (props) => {
    return props.items.map((_, index) => {
        return <DealItem dealItem={_} key={index} />
    })
}

class DealList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            dealItem: [],
        };
    }

    componentDidMount() {
        //fetch("http://buyback.test/api/site/super-offer")
        fetch("https://buyback.garantiliteknoloji.com/api/site/super-offer")
            .then((res) => res.json())
            .then(
                (result) => {

                    this.setState({ isLoaded: true, dealItem: result });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    }

    componentDidUpdate() {
        $('#deal-slick').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            autoplay: true,
            pauseOnHover: false,
            arrows: false,
            autoplaySpeed: 3000,
            fade: true,
            lazyLoad: 'progressive',
            cssEase: 'linear'


        });
    }

    render() {
        return (
            <section className="column-1 deals-carousel" id="sale-with-timer-carousel">
                <div className="deals-carousel-inner-block">
                    <header className="section-header">
                        <h2 className="section-title">
                            <strong>Süper</strong> Teklif</h2>
                        <nav className="custom-slick-nav"></nav>
                    </header>

                    <div className="sale-products-with-timer-carousel deals-carousel-v1">
                        <div className="products-carousel">
                            <div className="container-fluid">
                                <div className="woocommerce columns-1">
                                    <div className="products" id='deal-slick'
                                        data-wrap=".products"
                                        data-slick="{&quot;infinite&quot;:false,&quot;slidesToShow&quot;:1,&quot;slidesToScroll&quot;:1,&quot;dots&quot;:false,&quot;arrows&quot;:true,&quot;prevArrow&quot;:&quot;&lt;a href=\&quot;#\&quot;&gt;&lt;i className=\&quot;tm tm-arrow-left\&quot;&gt;&lt;\/i&gt;&lt;\/a&gt;&quot;,&quot;nextArrow&quot;:&quot;&lt;a href=\&quot;#\&quot;&gt;&lt;i className=\&quot;tm tm-arrow-right\&quot;&gt;&lt;\/i&gt;&lt;\/a&gt;&quot;,&quot;appendArrows&quot;:&quot;#sale-with-timer-carousel .custom-slick-nav&quot;,&quot;responsive&quot;:[{&quot;breakpoint&quot;:767,&quot;settings&quot;:{&quot;slidesToShow&quot;:1,&quot;slidesToScroll&quot;:1}},{&quot;breakpoint&quot;:1023,&quot;settings&quot;:{&quot;slidesToShow&quot;:2,&quot;slidesToScroll&quot;:2}}]}">
                                        <Deals items={this.state.dealItem} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="section-footer">
                        <nav className="custom-slick-pagination">
                            <a className="slider-prev left" href="#">
                                <i className="tm tm-arrow-left"></i>Önceki ürün
                            </a>
                            <a className="slider-next right" href="#" >
                                Sonraki ürün<i className="tm tm-arrow-right"></i>
                            </a>
                        </nav>
                    </footer>
                </div>
            </section>
        )
    }
}

export default DealList