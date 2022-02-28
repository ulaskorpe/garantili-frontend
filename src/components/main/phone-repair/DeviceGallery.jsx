import $ from "jquery";
import React, { Component } from "react";
import slick from "slick-carousel";
import ProductGalleryItem from "../../Shop/ProductDetail/ProductGalleryItem";
import ProductGalleryThub from "../../Shop/ProductDetail/ProductGalleryThumb";

class DeviceGallery extends Component {

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
        const { content } = this.props
        return (
            <div className="product-images-wrapper thumb-count-4">
                <div id="garantili-single-product-gallery"
                    className="garantili-single-product-gallery garantili-single-product-gallery--with-images garantili-single-product-gallery--columns-4 images"
                    data-columns="4">
                    <div className="garantili-single-product-gallery-images" data-ride="tm-slick-carousel"
                        data-wrap=".woocommerce-product-gallery__wrapper"
                        data-slick="{&quot;infinite&quot;:false,&quot;slidesToShow&quot;:1,&quot;slidesToScroll&quot;:1,&quot;dots&quot;:false,&quot;arrows&quot;:false,&quot;asNavFor&quot;:&quot;#garantili-single-product-gallery .garantili-single-product-gallery-thumbnails__wrapper&quot;}">
                        <div className="woocommerce-product-gallery woocommerce-product-gallery--with-images woocommerce-product-gallery--columns-4 images"
                            data-columns="4">
                            <a href="#" className="woocommerce-product-gallery__trigger">🔍</a>
                            <figure className="woocommerce-product-gallery__wrapper ">
                                {
                                    content.map((image, i) => <ProductGalleryItem galleryItem={image} key={i} />)
                                }
                            </figure>
                        </div>
                    </div>
                    <div className="garantili-single-product-gallery-thumbnails" data-ride="tm-slick-carousel"
                        data-wrap=".garantili-single-product-gallery-thumbnails__wrapper"
                        data-slick="{&quot;infinite&quot;:false,&quot;slidesToShow&quot;:4,&quot;slidesToScroll&quot;:1,&quot;dots&quot;:false,&quot;arrows&quot;:true,&quot;vertical&quot;:true,&quot;verticalSwiping&quot;:true,&quot;focusOnSelect&quot;:true,&quot;touchMove&quot;:true,&quot;prevArrow&quot;:&quot;&lt;a href=\&quot;#\&quot;&gt;&lt;i class=\&quot;tm tm-arrow-up\&quot;&gt;&lt;\/i&gt;&lt;\/a&gt;&quot;,&quot;nextArrow&quot;:&quot;&lt;a href=\&quot;#\&quot;&gt;&lt;i class=\&quot;tm tm-arrow-down\&quot;&gt;&lt;\/i&gt;&lt;\/a&gt;&quot;,&quot;asNavFor&quot;:&quot;#garantili-single-product-gallery .woocommerce-product-gallery__wrapper&quot;,&quot;responsive&quot;:[{&quot;breakpoint&quot;:765,&quot;settings&quot;:{&quot;vertical&quot;:false,&quot;horizontal&quot;:true,&quot;verticalSwiping&quot;:false,&quot;slidesToShow&quot;:4}}]}">
                        <figure className="garantili-single-product-gallery-thumbnails__wrapper">
                            {
                                content.map((image, i) => <ProductGalleryThub image={image} key={i} />)
                            }
                        </figure>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeviceGallery