import React, { Component } from 'react';
import $ from 'jquery'
import slick from 'slick-carousel'
class LatestProductList extends Component {
    componentDidMount() {
        $('[data-ride="tm-slick-carousel"]').each(function () {
            var $slick_target = false;

            if ($(this).data('slick') !== 'undefined' && $(this).find($(this).data('wrap')).length > 0) {
                $slick_target = $(this).find($(this).data('wrap'));
                $slick_target.data('slick', $(this).data('slick'));
            } else if ($(this).data('slick') !== 'undefined' && $(this).is($(this).data('wrap'))) {
                $slick_target = $(this);
            }

            if ($slick_target) {
                $slick_target.slick();
            }
        });
    }
    render() {
        const { products } = this.props
        return (
            <div className="widget widget_techmarket_products_carousel_widget">
                <section id="single-sidebar-carousel" className="section-products-carousel">
                    <header className="section-header">
                        <h2 className="section-title">Yeni Eklenler</h2>
                        <nav className="custom-slick-nav"></nav>
                    </header>
                    <div className="products-carousel" data-ride="tm-slick-carousel" id="latest-product-c" data-wrap=".products"
                        data-slick="{&quot;infinite&quot;:false,&quot;slidesToShow&quot;:1,&quot;slidesToScroll&quot;:1,&quot;rows&quot;:2,&quot;slidesPerRow&quot;:1,&quot;dots&quot;:false,&quot;arrows&quot;:true,&quot;prevArrow&quot;:&quot;&lt;a href=\&quot;#\&quot;&gt;&lt;i className=\&quot;tm tm-arrow-left\&quot;&gt;&lt;\/i&gt;&lt;\/a&gt;&quot;,&quot;nextArrow&quot;:&quot;&lt;a href=\&quot;#\&quot;&gt;&lt;i className=\&quot;tm tm-arrow-right\&quot;&gt;&lt;\/i&gt;&lt;\/a&gt;&quot;,&quot;appendArrows&quot;:&quot;#single-sidebar-carousel .custom-slick-nav&quot;}">
                        <div className="container-fluid">
                            <div className="woocommerce columns-1">
                                <div className="products">
                                    {
                                        products.map((item, index) => {return (
                                            <div className="landscape-product-widget product" key={index}>
                                                <a className="woocommerce-LoopProduct-link" href={item.url}>
                                                    <div className="media">
                                                        <img className="wp-post-image" src={item.imageUrl} alt="" />
                                                        <div className="media-body">
                                                            <span className="price">
                                                                <ins>
                                                                    <span className="amount">{item.listPrice}</span>
                                                                </ins>
                                                                <del>
                                                                    <span className="amount">{item.price}</span>
                                                                </del>
                                                            </span>
                                                            <h2 className="woocommerce-loop-product__title">{item.title}</h2>
                                                            <div className="techmarket-product-rating">
                                                                <div title="Rated 0 out of 5" className="star-rating">
                                                                    <span className="w-0">
                                                                        <strong className="rating">{item.rating}</strong></span>
                                                                </div>
                                                                <span className="review-count">{item.reviewCount}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>)
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default LatestProductList;