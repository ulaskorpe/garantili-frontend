import React, {Component, useCallback, useMemo} from "react";
import {useSelector} from "react-redux";
import {
    ayir,
    getBasketArrayList,
    getBasketCount,
    getBasketObject, getBasketTotalPrice, getItemPrice,
    getSplitBasketTotalPrice
} from "../../../../store/selectors/basket";
import {useLocation, useNavigate} from "react-router-dom";
import useBasket from "../../../../store/hooks/useBasket";

const BasketListItem = (props) => {
    const item = props.data;
    const basketItem = useBasket();

    return (
        <li className="woocommerce-mini-cart-item mini_cart_item">
            <a href="#"
               className="remove"
               aria-label="Sil"
               onClick={basketItem.remove(item.id)}>
                ×
            </a>
            <a href="#">
                <img
                    src={item.thumb || item.imageUrl}
                    className="attachment-shop_thumbnail size-shop_thumbnail wp-post-image"
                    alt={item.product}
                />
                {item.product}
            </a>
            <span className="quantity">
                {item.quantity} ×&nbsp;
                <span className="woocommerce-Price-amount amount">
                    {ayir(getItemPrice(item))}
                    <span className="woocommerce-Price-currencySymbol">₺</span>
                </span>
            </span>
        </li>
    )
}

const BasketItem = () => {
    const basketArray = useSelector(getBasketArrayList);

    return (
        basketArray.map((item, index) => {
            return <BasketListItem data={item} key={index}/>
        })
    )
}

const Basket = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const basketTotalPrice = useSelector(getSplitBasketTotalPrice);

    const basketCount = useSelector(getBasketCount);

    const go = useCallback((path) => (e) => {
        e.preventDefault();
        navigate(path, {
            fromTo: location,
            redirect: false,
        })
    }, [navigate, location]);

    return (
        <ul id="site-header-cart" className="site-header-cart menu pr-0">
            <li className="animate-dropdown dropdown ">
                <a className="cart-contents" href="#" data-toggle="dropdown" title="Alışveriş sepetinize göz atın.">
                    <i className="tm tm-shopping-bag fs-16" />
                    <span className="count">
                        {basketCount}
                    </span>
                    <span className="amount">
                        <span className="price-label">
                            Sepetim</span>
                        {basketTotalPrice}₺
                    </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-mini-cart">
                    <li>
                        <div className="widget woocommerce widget_shopping_cart">
                            <div className="widget_shopping_cart_content">
                                <ul className="woocommerce-mini-cart cart_list product_list_widget ">
                                    <BasketItem />
                                </ul>
                                <p className="woocommerce-mini-cart__total total">
                                    <strong>Toplam: </strong>
                                    <span className="woocommerce-Price-amount amount">
                                        {basketTotalPrice}
                                        <span className="woocommerce-Price-currencySymbol">₺</span>
                                    </span>
                                </p>
                                <p className="woocommerce-mini-cart__buttons buttons">
                                    <a
                                        href="/urunler"
                                        className="button wc-forward"
                                        onClick={go('/urunler')}
                                    >
                                        Alışverişe Devam Et
                                    </a>
                                    <a
                                        href="/sepet"
                                        className="button checkout wc-forward"
                                        onClick={go('/sepet')}
                                    >
                                        Sepete Git
                                    </a>
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    )
}

class MainBasket extends Component {
    render() {
        return (
            <Basket />
        )
    }
}

export default MainBasket