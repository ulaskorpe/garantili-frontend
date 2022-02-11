import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import ProductPage from './components/pages/ProductPage';
import ShopPage from './components/pages/ShopPage';

function App() {
    const [basket, setBasket] = useState({ totalPrice: 0, basketItems: [] })
 
    // const [allProduct, setProducts] = useState(
    //     [
    //         { id: 1, title: "Samsung Galaxy M52 5G 128 GB (Samsung Türkiye Garantili) ", listPrice: "5799.00", price: "5299.00", url: "/urun-detay/samsung-m2-1", imageUrl: "/assets/images/products/L1.jpg", discount: "300.000", details: ['128 GB Depolama', '8 GB RAM', '6.7" Retina Ekran', '5000mAh'] },
    //         { id: 2, title: "iPhone 11 64 GB", listPrice: "10.525,00", price: "9837,77", url: "/urun-detay/iphone-11-64-gb-2", imageUrl: "/assets/images/products/L2.jpg", discount: "150", details: ['64 GB Depolama', '4 GB RAM', '6.1 Ekran Boyutu" pil', '12 MP Ön Kamera'] },
    //         { id: 3, title: "iPhone 12 Mini 64 GB", listPrice: "13.300,00", price: "12.480,00", url: "/urun-detay/iphone-12-mini-64-gb-3", imageUrl: "/assets/images/products/L3.jpg", discount: "150", details: ['64 GB Depolama', '4 GB RAM', '5.4 Ekran Boyutu" ', '12 MP Ön Kamera'] },
    //         { id: 4, title: "Oppo Reno 5 Lite 128 GB (Oppo Türkiye Garantili)", listPrice: "4.699,00", price: "4.523,30", url: "/urun-detay/oppo-reno-5-1", imageUrl: "/assets/images/products/L4.jpg", discount: "150", details: ['128 GB Depolama', '8 GB RAM', '6.4" Ekran Boyutu', '32 MP Ön Kamera'] },
    //         { id: 5, title: "Poco X3 Pro 8 GB Ram 256 GB (Poco Türkiye Garantili) ", listPrice: "6.499,00", price: "5.719,00", url: "/urun-detay/poco-x3-pro-8-ram-5", imageUrl: "/assets/images/products/L5.jpg", discount: "150", details: ['256 GB Depolama', '8 GB RAM', '6.67" Ekran Boyutu', '20MP Ön Kamera'] },
    //         { id: 6, title: "Samsung Galaxy M12 128 GB (Samsung Türkiye Garantili)", price: "2.999.00", url: "/urun-detay/samsung-galaxy-m12-6", imageUrl: "/assets/images/products/L6.jpg", details: ['128 GB Depolama', '4 GB RAM', '6.5" Ekran Boyutu', '8MP Ön Kamera'] },
    //         { id: 7, title: "Honor 50 128 GB 8 GB Ram 5G (Honor Türkiye Garantili)", price: "9.999,00", url: "/urun-detay/honor-50-128GB-7", imageUrl: "/assets/images/products/L7.jpg", details: ['128 GB Dahili Hafıza', '8 GB RAM', '4300mAh', '32MP Ön Kamera'] },
    //         { id: 8, title: "iPhone SE 64 GB", listPrice: "6.985,00", price: "6.705,60", url: "/urun-detay/iphone-se-64-gb-8", imageUrl: "/assets/images/products/L8.jpg", discount: "150", details: ['256 GB Depolama', '8 GB RAM', '6.67" Ekran Boyutu', '20MP Ön Kamera'] },
    //         { id: 9, title: "Xiaomi Redmi 9c 64 GB (Xiaomi Türkiye Garantili) ", listPrice: "3.099,00", price: "2.578,75", url: "/urun-detay/xiaomi-red-mi-9c-64-gb-9", imageUrl: "/assets/images/products/L9.jpg", discount: "150", details: ['256 GB Depolama', '8 GB RAM', '6.67" Ekran Boyutu', '20MP Ön Kamera'] },
    //         { id: 10, title: "iPhone 13 Pro 128 GB", price: "21.499.00", url: "/urun-detay/iphone-13-pro-128-10", imageUrl: "/assets/images/products/L10.jpg", details: ['128 GB Depolama', '4 GB RAM', '6.5" Ekran Boyutu', '8MP Ön Kamera'] }
    //     ]
    // )
 
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
            <Routes>
                <Route path='/' element={<HomePage basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} />} />
                <Route path='/urunler' element={<ShopPage basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} />} />
                <Route path='/urunler/:category-:categoryId' element={<ShopPage basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} />} />
                <Route path='/urun-detay/:category-/:productId' element={<ProductPage basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;