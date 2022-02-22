import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import ProductPage from './components/pages/ProductPage';
import ShopPage from './components/pages/ShopPage';
import Cart from "./components/pages/Cart";
import Payment from "./components/pages/Payment";
import OrderSummary from "./components/pages/OrderSummary";
import Login from "./components/pages/Login";
import Faq from "./components/pages/Faq";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

function App() {
    const [basket, setBasket] = useState({ totalPrice: 0, basketItems: [] });

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
                <Routes>
                    <Route path='/' element={<HomePage basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} />} />
                    <Route path='/urunler' element={<ShopPage basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} />} />
                    <Route path='/urunler/:category-:categoryId' element={<ShopPage basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} />} />
                    <Route path='/urun-detay/:category-:productId' element={<ProductPage basket={basket} addToBasket={addToBasket} removeFromBasket={removeFromBasket} />} />

                    <Route path='/sepet' element={<Cart basket={basket} removeFromBasket={removeFromBasket} />} />
                    <Route path='/odeme' element={<Payment basket={basket} removeFromBasket={removeFromBasket}  />} />
                    <Route path='/siparis-ozeti' element={<OrderSummary basket={basket} removeFromBasket={removeFromBasket}  />} />
                    <Route path='/login' element={<Login basket={basket} removeFromBasket={removeFromBasket}  />} />
                    <Route path='/login' element={<Faq basket={basket} removeFromBasket={removeFromBasket}  />} />
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;