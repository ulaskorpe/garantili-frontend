import React, { Component } from "react";
import {useAuth} from "../../context/auth";

const TopBar = () => {
    const { isLogged, state } = useAuth();

    return (
        <div className="top-bar garantili-top-bar">
            <div className="col-full">
                <ul id="menu-top-bar-left" className="nav menu-top-bar-left d-flex justify-content-start" data-nav="flex-menu">
                    <li className="menu-item animate-dropdown">
                        <a title="Hakkımızda" href="#">Hakkımızda</a>
                    </li>
                    <li className="menu-item animate-dropdown">
                        <a title="Bizden Haberler" href="#">Bizden Haberler</a>
                    </li>
                    <li className="menu-item animate-dropdown">
                        <a title="SSS" href="#">S.S.S.</a>
                    </li>
                    <li className="menu-item animate-dropdown">
                        <a title="Hizmetlerimiz" href="#">Hizmetlerimiz</a>
                    </li>
                    <li className="menu-item animate-dropdown">
                        <a title="İade Formu" href="#">İade Formu</a>
                    </li>
                    <li className="menu-item animate-dropdown">
                        <a title="İnsan Kaynakları" href="#">İnsan Kaynakları</a>
                    </li>
                    <li className="menu-item animate-dropdown">
                        <a title="IMEI Sorgulama" href="#">IMEI Sorgulama</a>
                    </li>
                    <li className="menu-item animate-dropdown">
                        <a title="Kullanım Kılavuzu" href="#">Kullanım Kılavuzu</a>
                    </li>
                    <li className="garantili-flex-more-menu-item dropdown">
                        <a title="..." href="#" data-toggle="dropdown" className="dropdown-toggle">...</a>
                        <ul className="overflow-items dropdown-menu" />
                    </li>
                </ul>
                <ul id="menu-top-bar-right" className="nav menu-top-bar-right">
                    <li className="hidden-sm-down menu-item animate-dropdown">
                        <a title="Sipariş Takibi" href="#">
                            <i className="tm tm-order-tracking" />
                            Sipariş Takibi
                        </a>
                    </li>
                    {isLogged && (
                        <li className="menu-item">
                            <a title="Hesabım" href="/log-out">
                                <i className="tm tm-login-register" />
                                Çıkış yap ({state.name})
                            </a>
                        </li>
                    )}
                    {!isLogged && (
                        <li className="menu-item">
                            <a title="Hesabım" href="/login">
                                <i className="tm tm-login-register" />
                                Üye Ol / Üye Girişi
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default TopBar;