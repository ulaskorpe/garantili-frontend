import React, { useState } from 'react';
import {QueryClient, QueryClientProvider} from "react-query";
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Cart from './components/pages/Cart';
import Contact from './components/pages/Contact';
import ContentPage from './components/pages/ContentPage';
import Faq from './components/pages/Faq';
import GivingBackForm from './components/pages/GivingBackForm';
import HomePage from './components/pages/HomePage';
import HRPage from './components/pages/HRPage';
import ImeiCheck from './components/pages/ImeiPage';
import Login from './components/pages/Login';
import News from './components/pages/News';
import NewsDetails from './components/pages/NewsDetails';
import OrderSummary from './components/pages/OrderSummary';
import Payment from './components/pages/Payment';
import PhoneSell from './components/pages/PhoneSell';
import PhoneSellDevice from './components/pages/PhoneSellDevice';
import ProductPage from './components/pages/ProductPage';
import ShopPage from './components/pages/ShopPage';
import UserManual from './components/pages/UserManual';
import OrderFollow from './components/pages/OrderFollow';
import FollowDetails from './components/pages/FollowDetails';
import DeviceRepair from './components/pages/DeviceRepair';
import DeviceRepairDetail from './components/pages/DeviceRepairDetail';
import {AuthProvider} from "./context/auth";
import {AuthController} from "./components/auth/AuthRequired";
import ErrorPage from "./components/pages/ErrorPage";
import ForgetPassword from "./components/pages/ForgetPassword";
import VerifyAccount from "./components/pages/VerifyAccount";
import LogOut from "./components/pages/LogOut";

const queryClient = new QueryClient();

function App() {
    const [basket, setBasket] = useState({ totalPrice: 0, basketItems: [] })
    const [allProduct, setProducts] = useState(
        [
            { id: 1, title: "Samsung Galaxy M52 5G 128 GB (Samsung Türkiye Garantili) ", listPrice: "5799.00", price: "5299.00", url: "/urun-detay/samsung-m2-1", imageUrl: "/assets/images/products/L1.jpg", discount: "300.000", details: ['128 GB Depolama', '8 GB RAM', '6.7" Retina Ekran', '5000mAh'] },
            { id: 2, title: "iPhone 11 64 GB", listPrice: "10.525,00", price: "9837,77", url: "/urun-detay/iphone-11-64-gb-2", imageUrl: "/assets/images/products/L2.jpg", discount: "150", details: ['64 GB Depolama', '4 GB RAM', '6.1 Ekran Boyutu" pil', '12 MP Ön Kamera'] },
            { id: 3, title: "iPhone 12 Mini 64 GB", listPrice: "13.300,00", price: "12.480,00", url: "/urun-detay/iphone-12-mini-64-gb-3", imageUrl: "/assets/images/products/L3.jpg", discount: "150", details: ['64 GB Depolama', '4 GB RAM', '5.4 Ekran Boyutu" ', '12 MP Ön Kamera'] },
            { id: 4, title: "Oppo Reno 5 Lite 128 GB (Oppo Türkiye Garantili)", listPrice: "4.699,00", price: "4.523,30", url: "/urun-detay/oppo-reno-5-1", imageUrl: "/assets/images/products/L4.jpg", discount: "150", details: ['128 GB Depolama', '8 GB RAM', '6.4" Ekran Boyutu', '32 MP Ön Kamera'] },
            { id: 5, title: "Poco X3 Pro 8 GB Ram 256 GB (Poco Türkiye Garantili) ", listPrice: "6.499,00", price: "5.719,00", url: "/urun-detay/poco-x3-pro-8-ram-5", imageUrl: "/assets/images/products/L5.jpg", discount: "150", details: ['256 GB Depolama', '8 GB RAM', '6.67" Ekran Boyutu', '20MP Ön Kamera'] },
            { id: 6, title: "Samsung Galaxy M12 128 GB (Samsung Türkiye Garantili)", price: "2.999.00", url: "/urun-detay/samsung-galaxy-m12-6", imageUrl: "/assets/images/products/L6.jpg", details: ['128 GB Depolama', '4 GB RAM', '6.5" Ekran Boyutu', '8MP Ön Kamera'] },
            { id: 7, title: "Honor 50 128 GB 8 GB Ram 5G (Honor Türkiye Garantili)", price: "9.999,00", url: "/urun-detay/honor-50-128GB-7", imageUrl: "/assets/images/products/L7.jpg", details: ['128 GB Dahili Hafıza', '8 GB RAM', '4300mAh', '32MP Ön Kamera'] },
            { id: 8, title: "iPhone SE 64 GB", listPrice: "6.985,00", price: "6.705,60", url: "/urun-detay/iphone-se-64-gb-8", imageUrl: "/assets/images/products/L8.jpg", discount: "150", details: ['256 GB Depolama', '8 GB RAM', '6.67" Ekran Boyutu', '20MP Ön Kamera'] },
            { id: 9, title: "Xiaomi Redmi 9c 64 GB (Xiaomi Türkiye Garantili) ", listPrice: "3.099,00", price: "2.578,75", url: "/urun-detay/xiaomi-red-mi-9c-64-gb-9", imageUrl: "/assets/images/products/L9.jpg", discount: "150", details: ['256 GB Depolama', '8 GB RAM', '6.67" Ekran Boyutu', '20MP Ön Kamera'] },
            { id: 10, title: "iPhone 13 Pro 128 GB", price: "21.499.00", url: "/urun-detay/iphone-13-pro-128-10", imageUrl: "/assets/images/products/L10.jpg", details: ['128 GB Depolama', '4 GB RAM', '6.5" Ekran Boyutu', '8MP Ön Kamera'] }
        ]
    )

    const [homeContent, setHomeContent] = useState({
        newProducts: {
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
        products: {
            headers: [
                { id: 1, title: "Haftanın Fırsatları", tabUrl: "#weeklydeals" },
                { id: 2, title: "Çok Satanlar", tabUrl: "#topsales" },
                { id: 3, title: "Yeni Ürünler", tabUrl: "#newproducts" },
                { id: 4, title: "En Yüksek Puanlı", tabUrl: "#highrated" }
            ],
            tabs: [
                {
                    id: 1, tabId: "weeklydeals", products: [
                        { id: 21, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                        { id: 22, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                        { id: 23, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                        { id: 24, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                        { id: 25, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                        { id: 26, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                        { id: 27, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                        { id: 28, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                        { id: 29, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                        { id: 30, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                        { id: 31, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                        { id: 22, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                        { id: 33, title: "Bluetooth on-ear PureBass Headphones", listPrice: "300.00", price: "500.00", url: "", imageUrl: "assets/images/products/7.jpg", discount: "150" },
                    ]
                }
            ]
        }
    }
    )

    const removeFromBasket = (productId) => {
        const basketItem = basket.basketItems.find(_ => _.id === productId)
        basket.basketItems = basket.basketItems.filter(p => p.id !== productId)
        basket.totalPrice -= basketItem.price * basketItem.quantity
        setBasket(basket.totalPrice, basket.basketItems)
    }
    const addToBasket = (productId) => {
        if (basket.basketItems.find(p => p.id === productId)) {

            basket.basketItems.find(p => p.id === productId).quantity++
            const exbasketItem = basket.basketItems.find(p => p.id === productId)
            basket.totalPrice += exbasketItem.price

            setBasket(basket.totalPrice, basket.basketItems)
            return
        }

        const product = this.state.allProducts.find(p => p.id === productId)
        const basketItem = {
            id: productId,
            title: product.title,
            quantity: 1,
            price: Number.parseFloat(product.price.replace('', '')),
            imageUrl: product.imageUrl
        }
        basket.totalPrice += basketItem.price
        basket.basketItems.push(basketItem)

        setBasket(basket.totalPrice, basket.basketItems)
    }

    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Routes>
                        {/* 404 */}
                        <Route path="*" element={<ErrorPage code={404} />} />

                        <Route index element={<HomePage basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} homeContent={homeContent} />} />
                        <Route path='/urunler' element={<ShopPage basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} />} />
                        <Route path='/urunler/:category-:categoryId' element={<ShopPage basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} allProducts={allProduct} />} />
                        <Route path='/urun-detay/:slug/:productId' element={<ProductPage basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} allProducts={allProduct} />} />
                        <Route path='/telefon-sat/' element={<PhoneSell basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} allProducts={allProduct} />} />
                        <Route path='/telefon-sat/:id' element={<PhoneSellDevice basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} allProducts={allProduct} />} />
                        <Route path='/telefon-onar-yenile/' element={<DeviceRepair basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} allProducts={allProduct} />} />
                        <Route path='/telefon-onar-yenile/:id' element={<DeviceRepairDetail basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} allProducts={allProduct} />} />
                        <Route path='/iletisim' element={<Contact basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} allProducts={allProduct} />} />
                        <Route path='/sayfa/:pagetitle/:id' element={<ContentPage basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} allProducts={allProduct} />} />
                        <Route path='/faq' element={<Faq basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} allProducts={allProduct} />} />
                        <Route path='/kilavuz' element={<UserManual basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} allProducts={allProduct} />} />
                        <Route path='/bizden-haberler' element={<News basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} allProducts={allProduct} />} />
                        <Route path='/bizden-haberler/:id' element={<NewsDetails basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} allProducts={allProduct} />} />
                        <Route path='/insan-kaynaklari' element={<HRPage basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} allProducts={allProduct} />} />
                        <Route path='/imei-sorgula' element={<ImeiCheck basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} allProducts={allProduct} />} />
                        <Route path='/iade-formu' element={<GivingBackForm basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} allProducts={allProduct} />} />
                        <Route path='/sepet' element={<Cart basket={basket} removeFromBasket={removeFromBasket} />} />
                        <Route path='/odeme' element={<Payment basket={basket} removeFromBasket={removeFromBasket} />} />
                        <Route path='/siparis-ozeti' element={<OrderSummary basket={basket} removeFromBasket={removeFromBasket} />} />
                        {/* /login => Login page */}
                        <Route path='/login' element={(
                            <AuthController
                                mustNotBeLoggedIn
                                redirectTo="/"
                            >
                                <Login basket={basket} removeFromBasket={removeFromBasket} />
                            </AuthController>
                        )} />

                        {/* /log-out => Log-out page */}
                        <Route
                            path='/log-out'
                            element={<LogOut />}
                        />

                        {/* /forget-password => Forget password page */}
                        <Route path='/forget-password' element={(
                            <AuthController
                                mustNotBeLoggedIn
                                redirectTo="/"
                            >
                                <ForgetPassword
                                    basket={basket}
                                    removeFromBasket={removeFromBasket}
                                />
                            </AuthController>
                        )} />

                        {/* /verify-account => Verify account page */}
                        <Route path='/verify-account' element={(
                            <AuthController
                                mustNotBeLoggedIn
                                redirectTo="/"
                            >
                                <VerifyAccount
                                    basket={basket}
                                    removeFromBasket={removeFromBasket}
                                />
                            </AuthController>
                        )} />
                        <Route path='/takip' element={<OrderFollow basket={basket} removeFromBasket={removeFromBasket} />} />
                        <Route path='/takip-detaylar' element={<FollowDetails basket={basket} removeFromBasket={removeFromBasket} />} />
                    </Routes>
                </AuthProvider>
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;