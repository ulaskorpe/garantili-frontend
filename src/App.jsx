import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {QueryClient, QueryClientProvider} from "react-query";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import Orders from "./components/pages/Orders";
import OrderDetail from "./components/pages/OrderDetail";
import MemberInformations from "./components/pages/MemberInformations";
import PasswordUpdate from "./components/pages/PasswordUpdate";
import {Provider} from "react-redux";
import store from "./store";
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";
import moment from 'moment';
import 'moment/locale/tr';
import Addresses from "./components/pages/AddressList";
import EditAddress from "./components/pages/EditAddress";
import AddAddress from "./components/pages/AddAddress";

const queryClient = new QueryClient();
const persistor = persistStore(store);

moment().locale('tr');
function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Provider store={store}>
                        <PersistGate persistor={persistor}>
                            <Routes>
                                {/* 404 */}
                                <Route path="*" element={<ErrorPage code={404} />} />

                                <Route
                                    index
                                    element={<HomePage />}
                                />
                                <Route
                                    path='/urunler'
                                    element={<ShopPage />}
                                />
                                <Route
                                    path='/urunler/:category-:categoryId'
                                    element={<ShopPage />}
                                />
                                <Route
                                    path='/urun-detay/:slug/:productId'
                                    element={<ProductPage />}
                                />
                                <Route
                                    path='/telefon-sat/'
                                    element={<PhoneSell />}
                                />
                                <Route
                                    path='/telefon-sat/:id'
                                    element={<PhoneSellDevice />}
                                />
                                <Route
                                    path='/telefon-onar-yenile/'
                                    element={<DeviceRepair />}
                                />
                                <Route
                                    path='/telefon-onar-yenile/:id'
                                    element={<DeviceRepairDetail />}
                                />
                                <Route
                                    path='/iletisim'
                                    element={<Contact />}
                                />
                                <Route
                                    path='/sayfa/:pagetitle/:id'
                                    element={<ContentPage />}
                                />
                                <Route
                                    path='/sss'
                                    element={<Faq />}
                                />
                                <Route
                                    path='/kilavuz'
                                    element={<UserManual />}
                                />
                                <Route
                                    path='/bizden-haberler'
                                    element={<News />}
                                />
                                <Route
                                    path='/bizden-haberler/:id'
                                    element={<NewsDetails />}
                                />
                                <Route
                                    path='/insan-kaynaklari'
                                    element={<HRPage  />}
                                />
                                <Route
                                    path='/imei-sorgula'
                                    element={<ImeiCheck />}
                                />
                                <Route
                                    path='/iade-formu'
                                    element={<GivingBackForm />}
                                />
                                <Route
                                    path='/sepet'
                                    element={<Cart />}
                                />
                                <Route
                                    path='/odeme'
                                    element={<Payment />}
                                />
                                <Route
                                    path='/siparis-ozeti'
                                    element={<OrderSummary />}
                                />

                                {/* /login => Login page */}
                                <Route path='/login' element={(
                                    <AuthController
                                        mustNotBeLoggedIn
                                        redirectTo="/"
                                    >
                                        <Login />
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
                                        <ForgetPassword />
                                    </AuthController>
                                )} />

                                {/* /verify-account => Verify account page */}
                                <Route path='/verify-account' element={(
                                    <AuthController
                                        mustNotBeLoggedIn
                                        redirectTo="/"
                                    >
                                        <VerifyAccount />
                                    </AuthController>
                                )} />
                                <Route
                                    path='/takip'
                                    element={<OrderFollow />}
                                />
                                <Route
                                    path='/takip-detaylar'
                                    element={<FollowDetails />}
                                />
                                <Route
                                    path='/siparislerim'
                                    element={<Orders />}
                                />
                                <Route
                                    path='/siparis/:id'
                                    element={<OrderDetail />}
                                />
                                <Route
                                    path='/uyelik-bilgilerim'
                                    element={<MemberInformations />}
                                />
                                <Route
                                    path='/adreslerim'
                                    element={<Addresses />}
                                />
                                <Route
                                    path='/adreslerim/duzenle/:id'
                                    element={<EditAddress />}
                                />
                                <Route
                                    path='/adreslerim/ekle'
                                    element={<AddAddress />}
                                />
                                <Route
                                    path='/sifre-guncelleme'
                                    element={<PasswordUpdate />}
                                />
                            </Routes>

                            {/* Toast */}
                            <ToastContainer
                                position="top-right"
                                theme="colored"
                                autoClose={1200}
                                hideProgressBar={false}
                                newestOnTop={true}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                            />
                        </PersistGate>
                    </Provider>
                </AuthProvider>
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
