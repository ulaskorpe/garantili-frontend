import React, {useCallback} from "react";
import {useAuth} from "../../context/auth";
import {useLocation, useNavigate} from "react-router-dom";

const TopBar = () => {
    const { isLogged, state } = useAuth();

    const MenuItem = (props) => {
        const location = useLocation();
        const navigate = useNavigate();

        const {
            className = "menu-item animate-dropdown",
            title,
            icon,
            path,
        } = props;

        const go = useCallback((e) => {
            e.preventDefault();
            if (path && location.pathname !== path) {
                navigate(path, { fromTo: location });
            }
        }, [location, navigate, path]);

        return (
            <li className={className}>
                <a title={title} href={path} onClick={go} style={{ cursor: path ? 'pointer' : 'default' }}>
                    {icon}
                    <span>{title}</span>
                </a>
            </li>
        );
    }

    return (
        <div className="top-bar garantili-top-bar">
            <div className="col-full">
                <ul id="menu-top-bar-left" className="nav menu-top-bar-left d-flex justify-content-start" data-nav="flex-menu">
                   <MenuItem
                       title="Hakkımızda"
                       path="/sayfa/hakkimizda/10"
                   />
                    <MenuItem
                        title="Bizden Haberler"
                        path="/bizden-haberler"
                    />
                    <MenuItem
                        title="S.S.S."
                        path="/sss"
                    />
                    <MenuItem
                        title="Hizmetlerimiz"
                        path="/sayfa/hizmetlerimiz/11"
                    />
                    <MenuItem
                        title="İade Formu"
                        path={null}
                    />
                    <MenuItem
                        title="İnsan Kaynakları"
                        path={null}
                    />
                    <MenuItem
                        title="IMEI Sorgulama"
                        path={null}
                    />
                    <MenuItem
                        title="Kullanım Kılavuzu"
                        path={null}
                    />
                    {/*<li className="garantili-flex-more-menu-item dropdown">*/}
                    {/*    <a title="..." href="#" data-toggle="dropdown" className="dropdown-toggle">...</a>*/}
                    {/*    <ul className="overflow-items dropdown-menu" />*/}
                    {/*</li>*/}
                </ul>
                <ul id="menu-top-bar-right" className="nav menu-top-bar-right">
                    <MenuItem
                        title="Sipariş Takibi"
                        className="hidden-sm-down menu-item animate-dropdown"
                        icon={<i className="tm tm-order-tracking" />}
                        path={null}
                    />
                    {isLogged && (
                        <MenuItem
                            title={`Çıkış yap (${state.name})`}
                            className="menu-item"
                            icon={<i className="tm tm-login-register" />}
                            path="/log-out"
                        />
                    )}
                    {!isLogged && (
                        <MenuItem
                            title="Üye Ol / Üye Girişi"
                            className="menu-item"
                            icon={<i className="tm tm-login-register" />}
                            path="/login"
                        />
                    )}
                </ul>
            </div>
        </div>
    );
}

export default TopBar;