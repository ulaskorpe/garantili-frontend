import React, { Component, useState, useEffect } from "react";
import { useLocation, useParams, } from "react-router-dom";
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import Topbar from "../layout/Topbar";
import DetailTabs from "../Shop/ProductDetail/DetailTabs";
import Product from "../Shop/ProductDetail/Product";
import ProductGallery from "../Shop/ProductDetail/ProductGallery";
import RelatedProductList from "../Shop/ProductDetail/RelatedProductList";

function ProductPage(props) {

    const { basket, onAddToBasket, removeFromBasket } = props
    const { productId } = useParams()
    const [product, setProduct] = useState(
        {
            id: 1,
            title: 'iPhone 13 Pro 128 GB',
            brand: {
                id: 1,
                imageUrl: '/assets/images/brands/1.png',
                title: 'Apple'
            },
            category: {
                id: 1,
                title: 'Akıllı Telefon'
            },
            features: '<ul><li>128 GB Depolama</li><li>& GB Ram</li><li>6.1" Ekran</li><li>3095mAH Batarya</li></ul>',
            listPrice: '23.000,00',
            price: '21.499,00',
            discount: '2499,00',
            stockCode: 'HBCV00000ODIGK',
            rating: 1,
            imageGallery: [
                { id: 1, imageUrl: '/assets/images/products/a1.jpg' },
                { id: 1, imageUrl: '/assets/images/products/a2.jpg' },
                { id: 1, imageUrl: '/assets/images/products/a3.jpg' },
                { id: 1, imageUrl: '/assets/images/products/a4.jpg' },
                { id: 1, imageUrl: '/assets/images/products/a5.jpg' },
                { id: 1, imageUrl: '/assets/images/products/a6.jpg' },
                { id: 1, imageUrl: '/assets/images/products/a7.jpg' },
                { id: 1, imageUrl: '/assets/images/products/a8.jpg' },
            ],
           
            tabs: [

                {
                    id: 2, title: 'Ürün Bilgisi', name: 'tab-description', type: 'html', content: `
             <h5>12 Garantili Yenilenmiş Cihazlar</h5>
            <p><strong>Cihazla Birlikte Verilen Aksesuarlar: </strong>Data ve Şarj Kablosu</p>
            <p><strong>Garanti Dahili Durumlar: </strong>Kullanıcı hatası dışındaki tüm durumlar</p>
            <p><strong>Garanti Harici Durumlar: </strong>Ekran Kırıkları, Fiziksel Hasarlar, Sıvı Teması, Yetkisiz Müdahale, Afet Sonucu Oluşan Zararlar</p>
            <h6>(Aksesuarlar garanti kapsamında değildir)</h6>
            <img src='/assets/images/products/iPhone_13_Pro_Marketing_Page_Avail_M__TR.jpg' />
            ` },
                {
                    id: 3, title: 'Teknik Özellikler', name: 'tab-specification', type: 'html', content: `
            <div class="tm-shop-attributes-detail like-column columns-3">
            <h3 class="tm-attributes-title">Genel</h3>
            <table class="shop_attributes">
                <tbody>
                    <tr>
                        <th>Marka</th>
                        <td>
                            <p><a href="#" rel="tag">Apple</a></p>
                        </td>
                    </tr>
                    <tr>
                        <th>Model</th>
                        <td>
                            <p><a href="#" rel="tag">iPhone 13 Pro 128 GB</a></p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- /.shop_attributes -->
            <h3 class="tm-attributes-title">Teknik Özellikler</h3>
            <table class="shop_attributes">
                <tbody>
                    <tr>
                        <th>Ekran Boyutu</th>
                        <td>6.1″</td>
                    </tr>
                    <tr>
                        <th>Ekran Oranı</th>
                        <td>16:9</td>
                    </tr>
                    <tr>
                        <th>Ekran Boy Aralığı</th>
                        <td>6" ve üzeri</td>
                    </tr>
                    <tr>
                        <th>Ekran Çözünürlüğü</th>
                        <td>1440p</td>
                    </tr>
                    <tr>
                        <th>Panel</th>
                        <td>Crystal Liquid Retina</td>
                    </tr>
                    <tr>
                        <th>Depolama</th>
                        <td>128GB</td>
                    </tr>
                    <tr>
                        <th>Bellek</th>
                        <td>6 GB</td>
                    </tr>
                    <tr>
                        <th>CPU</th>
                        <td>A17 Bionic Chip</td>
                    </tr>
                </tbody>
            </table>
            <h3 class="tm-attributes-title">Kamera</h3>
            <table class="shop_attributes">
                <tbody>
                    <tr>
                        <th>Ön Kamera Çözünürlük Aralığı</th>
                        <td>8MP - 13,9MP<td>
                    </tr>
                    <tr>
                        <th>Ön Kamera</th>
                        <td>12MP</td>
                    </tr>
                    <tr>
                        <th>Arka Kamera Çözünürlük Aralığı</th>
                        <td>8MP - 12,9MP<td>
                    </tr>
                    <tr>
                        <th>Batarya</th>
                        <td>3950mAH</td>
                    </tr>
                    <tr>
                        <th>Yüz Tanıma</th>
                        <td>Var</td>
                    </tr>
                </tbody>
            </table>
        </div>
            ` },
                {
                    id: 4, title: 'Yorumlar', type: 'review', name: 'tab-reviews', content: [
                        { name: 'Ad Soyad', comment: 'Woawww, süper ürünler', date: '22/02/2022', rating: 3 }
                    ]
                },
                {
                    id: 1, title: 'Aksesuarlar', type: 'accessory', name: 'tab-accessories', content: [
                        { id: 1, title: 'Apple USB-C - Lightning Kablosu (1 m) - MQGJ2ZM/A', imageUrl: '/assets/images/products/k1.jpg', listPrice: '299,00', price: '219,99' },
                        { id: 2, title: 'Apple iPhone 13 Pro Max Clear Case With Magsafe MM313ZM/A ', imageUrl: '/assets/images/products/k2.jpg', listPrice: '699,99', price: '619.99' },
                        { id: 3, title: 'Apple Airpods Pro Bluetooth Kulaklık (Magsafe Şarj Kutusu) MLWK3TU/A (Apple Türkiye Garantili) ', imageUrl: '/assets/images/products/k3.jpg', listPrice: '3599.99', price: '2999.99' },
                        { id: 4, title: 'Apple Lightning Konnektörlü EarPods - MMTN2TU/A', imageUrl: '/assets/images/products/k4.jpg', listPrice: '249.99', price: '209.99' }
                    ]
                },
            ],
            crumbs: [
                { url: '/cat/phones', title: 'Telefonlar' },
                { url: '#', title: 'iPhone 13 Pro 128 GB' }
            ]
        })

    useEffect(() => {
        console.log('effected')
        setProduct(
            {
                id: 1,
                title: 'iPhone 13 Pro 128 GB',
                brand: {
                    id: 1,
                    imageUrl: '/assets/images/brands/1.png',
                    title: 'Apple'
                },
                category: {
                    id: 1,
                    title: 'Akıllı Telefon'
                },
                features: '<ul><li>128 GB Depolama</li><li>& GB Ram</li><li>6.1" Ekran</li><li>3095mAH Batarya</li></ul>',
                listPrice: '23.000,00',
                price: '21.499,00',
                discount: '2499,00',
                stockCode: 'HBCV00000ODIGK',
                rating: 1,
                imageGallery: [
                    { id: 1, imageUrl: '/assets/images/products/a8.jpg' },
                    { id: 1, imageUrl: '/assets/images/products/a6.jpg' },
                    { id: 1, imageUrl: '/assets/images/products/a7.jpg' },
                    { id: 1, imageUrl: '/assets/images/products/a1.jpg' },
                    { id: 1, imageUrl: '/assets/images/products/a2.jpg' },
                    { id: 1, imageUrl: '/assets/images/products/a3.jpg' },
                    { id: 1, imageUrl: '/assets/images/products/a4.jpg' },
                    { id: 1, imageUrl: '/assets/images/products/a5.jpg' },
                ],
               
                tabs: [

                    {
                        id: 2, title: 'Ürün Bilgisi', name: 'tab-description', type: 'html', content: `
             <h5>12 Garantili Yenilenmiş Cihazlar</h5>
            <p><strong>Cihazla Birlikte Verilen Aksesuarlar: </strong>Data ve Şarj Kablosu</p>
            <p><strong>Garanti Dahili Durumlar: </strong>Kullanıcı hatası dışındaki tüm durumlar</p>
            <p><strong>Garanti Harici Durumlar: </strong>Ekran Kırıkları, Fiziksel Hasarlar, Sıvı Teması, Yetkisiz Müdahale, Afet Sonucu Oluşan Zararlar</p>
            <h6>(Aksesuarlar garanti kapsamında değildir)</h6>
            <img src='/assets/images/products/iPhone_13_Pro_Marketing_Page_Avail_M__TR.jpg' />
            ` },
                    {
                        id: 3, title: 'Teknik Özellikler', name: 'tab-specification', type: 'html', content: `
            <div class="tm-shop-attributes-detail like-column columns-3">
            <h3 class="tm-attributes-title">Genel</h3>
            <table class="shop_attributes">
                <tbody>
                    <tr>
                        <th>Marka</th>
                        <td>
                            <p><a href="#" rel="tag">Apple</a></p>
                        </td>
                    </tr>
                    <tr>
                        <th>Model</th>
                        <td>
                            <p><a href="#" rel="tag">iPhone 13 Pro 128 GB</a></p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- /.shop_attributes -->
            <h3 class="tm-attributes-title">Teknik Özellikler</h3>
            <table class="shop_attributes">
                <tbody>
                    <tr>
                        <th>Ekran Boyutu</th>
                        <td>6.1″</td>
                    </tr>
                    <tr>
                        <th>Ekran Oranı</th>
                        <td>16:9</td>
                    </tr>
                    <tr>
                        <th>Ekran Boy Aralığı</th>
                        <td>6" ve üzeri</td>
                    </tr>
                    <tr>
                        <th>Ekran Çözünürlüğü</th>
                        <td>1440p</td>
                    </tr>
                    <tr>
                        <th>Panel</th>
                        <td>Crystal Liquid Retina</td>
                    </tr>
                    <tr>
                        <th>Depolama</th>
                        <td>128GB</td>
                    </tr>
                    <tr>
                        <th>Bellek</th>
                        <td>6 GB</td>
                    </tr>
                    <tr>
                        <th>CPU</th>
                        <td>A17 Bionic Chip</td>
                    </tr>
                </tbody>
            </table>
            <h3 class="tm-attributes-title">Kamera</h3>
            <table class="shop_attributes">
                <tbody>
                    <tr>
                        <th>Ön Kamera Çözünürlük Aralığı</th>
                        <td>8MP - 13,9MP<td>
                    </tr>
                    <tr>
                        <th>Ön Kamera</th>
                        <td>12MP</td>
                    </tr>
                    <tr>
                        <th>Arka Kamera Çözünürlük Aralığı</th>
                        <td>8MP - 12,9MP<td>
                    </tr>
                    <tr>
                        <th>Batarya</th>
                        <td>3950mAH</td>
                    </tr>
                    <tr>
                        <th>Yüz Tanıma</th>
                        <td>Var</td>
                    </tr>
                </tbody>
            </table>
        </div>
            ` },
                    {
                        id: 4, title: 'Yorumlar', type: 'review', name: 'tab-reviews', content: [
                            { name: 'Ad Soyad', comment: 'Woawww, süper ürünler', date: '22/02/2022', rating: 3 }
                        ]
                    },
                    {
                        id: 1, title: 'Birlikte Al', type: 'accessory', name: 'tab-accessories', content: [
                            { id: 1, title: 'Apple USB-C - Lightning Kablosu (1 m) - MQGJ2ZM/A', imageUrl: '/assets/images/products/k1.jpg', listPrice: '299,00', price: '219,99' },
                            { id: 2, title: 'Apple iPhone 13 Pro Max Clear Case With Magsafe MM313ZM/A ', imageUrl: '/assets/images/products/k2.jpg', listPrice: '699,99', price: '619.99' },
                            { id: 3, title: 'Apple Airpods Pro Bluetooth Kulaklık (Magsafe Şarj Kutusu) MLWK3TU/A (Apple Türkiye Garantili) ', imageUrl: '/assets/images/products/k3.jpg', listPrice: '3599.99', price: '2999.99' },
                            { id: 4, title: 'Apple Lightning Konnektörlü EarPods - MMTN2TU/A', imageUrl: '/assets/images/products/k4.jpg', listPrice: '249.99', price: '209.99' }
                        ]
                    },
                ],
                crumbs: [
                    { url: '/cat/phones', title: 'Telefonlar' },
                    { url: '#', title: 'iPhone 13 Pro 128 GB' }
                ]
            }
        )
    }, [])

    return (
        <div className="woocommerce-active single-product full-width normal">
            <div id="page" className="hfeed site">
                <Topbar />
                <HeaderMain basket={basket}
                    onRemoveBasket={removeFromBasket}
                />
            </div>
            <div id="content" className="site-content" tabIndex="-1">
                <div className="col-full">
                    <div className="row">
                        <BreadCrumb crumbs={product.crumbs} />
                        <div id="primary" className="content-area">
                            <main id="main" className="site-main">
                                <div className="product product-type-simple">
                                    <div className="single-product-wrapper">
                                        <ProductGallery content={product} key="productgallery" />
                                        <div className="summary entry-summary">
                                            <div className="single-product-header">
                                                <h1 className="product_title entry-title">{product.title}</h1>
                                            </div>
                                            <div className="single-product-meta">
                                                <div className="brand">
                                                    <a href="#">
                                                        <img alt={product.brand.title} src={product.brand.imageUrl} />
                                                    </a>
                                                </div>
                                                <div className="cat-and-sku">
                                                    <span className="posted_in categories">
                                                        <a rel="tag" href="product-category.html">{product.category.title}</a>
                                                    </span>
                                                    <span className="sku_wrapper">SKU:
                                                        <span className="sku">{product.stockCode}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="rating-and-sharing-wrapper">
                                                <div className="woocommerce-product-rating">
                                                    <div className="star-rating">
                                                        <span className="w-100">5 üzerinden
                                                            <strong className="rating"> {product.rating}</strong>
                                                            <span className="rating">1</span>yorum</span>
                                                    </div>
                                                    <a rel="nofollow" className="woocommerce-review-link" href="#reviews">(<span className="count">1</span> yorum)</a>
                                                </div>
                                            </div>
                                            <div className="woocommerce-product-details__short-description" dangerouslySetInnerHTML={{ __html: product.features }}></div>
                                            <div className="product-actions-wrapper">
                                                <div className="product-actions">
                                                    <p className="price">
                                                        <del>
                                                            <span className="woocommerce-Price-amount amount">
                                                                <span className="woocommerce-Price-currencySymbol">₺</span>{product.listPrice}</span>
                                                        </del>
                                                        <ins>
                                                            <span className="woocommerce-Price-amount amount">
                                                                <span className="woocommerce-Price-currencySymbol">₺</span>{product.price}</span>
                                                        </ins>
                                                    </p>
                                                    <form encType="multipart/form-data" method="post" className="cart">
                                                        <div className="quantity">
                                                            <label htmlFor="quantity-input">Adet</label>
                                                            <input type="number" size="4" className="input-text qty text" title="Qty" defaultValue="1" name="quantity"
                                                                id="quantity-input" />
                                                        </div>
                                                        <button className="single_add_to_cart_button button alt" value="185" name="add-to-cart"
                                                            onClick={() => onAddToBasket(product.id)}>Sepete Ekle</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <RelatedProductList onAddToBasket={onAddToBasket} />
                                </div>
                                <DetailTabs tabs={product.tabs} />
                            </main>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductPage;