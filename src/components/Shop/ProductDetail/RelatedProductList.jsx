import React, { Component } from 'react';
import Product from './Product';

class RelatedProductList extends Component {
    state = { products: [], compStatus: false }
    componentDidMount() {
        const products = [
            { id: 111, title: "iPhone 13 Mini 256 GB ", price: '16199.00', url: '#', imageUrl: '/assets/images/products/b1.jpg' },
            { id: 6, filterData: [{ filterType: 'brand', value: 'samsung' }, { filterType: 'color', value: 'black' }], title: "Samsung Galaxy M12 128 GB (Samsung Türkiye Garantili)", price: "2.999.00", url: "/urun-detay/samsung-galaxy-m12-6", imageUrl: "/assets/images/products/L6.jpg", details: ['128 GB Depolama', '4 GB RAM', '6.5" Ekran Boyutu', '8MP Ön Kamera'] },
            { id: 7, filterData: [{ filterType: 'brand', value: 'honor' }, { filterType: 'color', value: 'green' }], title: "Honor 50 128 GB 8 GB Ram 5G (Honor Türkiye Garantili)", price: "9.999,00", url: "/urun-detay/honor-50-128GB-7", imageUrl: "/assets/images/products/L7.jpg", details: ['128 GB Dahili Hafıza', '8 GB RAM', '4300mAh', '32MP Ön Kamera'] },
            { id: 3, filterData: [{ filterType: 'brand', value: 'apple' }, { filterType: 'color', value: 'teal' }], title: "iPhone 12 Mini 64 GB", listPrice: "13.300,00", price: "12.480,00", url: "/urun-detay/iphone-12-mini-64-gb-3", imageUrl: "/assets/images/products/L3.jpg", discount: "150", details: ['64 GB Depolama', '4 GB RAM', '5.4 Ekran Boyutu" ', '12 MP Ön Kamera'] },
            { id: 10, filterData: [{ filterType: 'brand', value: 'apple' }, { filterType: 'color', value: 'spacegray' }], title: "iPhone 13 Pro 128 GB", price: "21.499.00", url: "/urun-detay/iphone-13-pro-128-10", imageUrl: "/assets/images/products/L10.jpg", details: ['128 GB Depolama', '4 GB RAM', '6.5" Ekran Boyutu', '8MP Ön Kamera'] }
        ]
        const compStatus = true
        this.setState({ products, compStatus })
    }



    render() {
        const { onAddToBasket } = this.props
        return (<div className="tm-related-products-carousel section-products-carousel" id="tm-related-products-carousel"
            data-ride="tm-related-slick-carousel" data-wrap=".products"
            data-slick="{&quot;slidesToShow&quot;:7,&quot;slidesToScroll&quot;:7,&quot;dots&quot;:true,&quot;arrows&quot;:true,&quot;prevArrow&quot;:&quot;&lt;a href=\&quot;#\&quot;&gt;&lt;i className=\&quot;tm tm-arrow-left\&quot;&gt;&lt;\/i&gt;&lt;\/a&gt;&quot;,&quot;nextArrow&quot;:&quot;&lt;a href=\&quot;#\&quot;&gt;&lt;i className=\&quot;tm tm-arrow-right\&quot;&gt;&lt;\/i&gt;&lt;\/a&gt;&quot;,&quot;appendArrows&quot;:&quot;#tm-related-products-carousel .custom-slick-nav&quot;,&quot;responsive&quot;:[{&quot;breakpoint&quot;:767,&quot;settings&quot;:{&quot;slidesToShow&quot;:1,&quot;slidesToScroll&quot;:1}},{&quot;breakpoint&quot;:780,&quot;settings&quot;:{&quot;slidesToShow&quot;:3,&quot;slidesToScroll&quot;:3}},{&quot;breakpoint&quot;:1200,&quot;settings&quot;:{&quot;slidesToShow&quot;:4,&quot;slidesToScroll&quot;:4}},{&quot;breakpoint&quot;:1400,&quot;settings&quot;:{&quot;slidesToShow&quot;:5,&quot;slidesToScroll&quot;:5}}]}">
            <section className="related">
                <header className="section-header">
                    <h2 className="section-title">Benzer Ürünler</h2>
                    <nav className="custom-slick-nav"></nav>
                </header>
                <div className="products">
                    {this.state.products.map((product, i) => {
                        return <Product product={product} onAddToBasket={onAddToBasket} key={i} />
                    })}
                </div>
            </section>
        </div>);
    }
}

export default RelatedProductList;