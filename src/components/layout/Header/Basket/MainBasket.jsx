import React, { Component } from "react";

const BasketListItem = (props) => {
    console.log('basket item', props)
    const data = props.data
    return (
        <li className="woocommerce-mini-cart-item mini_cart_item">
            <a href="#" className="remove" aria-label="Remove this item" onClick={() => props.onRemoveBasket(data.id)} >×</a>
            <a href="#">
                <img src={data.imageUrl}
                    className="attachment-shop_thumbnail size-shop_thumbnail wp-post-image" alt={data.title} />{data.title}
            </a>
            <span className="quantity">{data.quantity} ×
                <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">₺</span>{data.price}</span>
            </span>
        </li>
    )
}

const BasketItem = (props) => {
    const items = props.basketItems.map((item, index) => {
        return <BasketListItem data={item} onRemoveBasket={props.onRemoveBasket} key={index} />
    })
    return items
}

const Basket = (props) => {
    return (
        <ul id="site-header-cart" className="site-header-cart menu pr-0">
            <li className="animate-dropdown dropdown ">
                <a className="cart-contents" href="#" data-toggle="dropdown" title="Alışveriş sepetinize göz atın.">
                    <i className="tm tm-shopping-bag fs-16"></i>
                    <span className="count">{props.basket.basketItems.length}</span>
                    <span className="amount">
                        <span className="price-label">Sepetim</span>₺{props.basket.totalPrice}
                    </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-mini-cart">
                    <li>
                        <div className="widget woocommerce widget_shopping_cart">
                            <div className="widget_shopping_cart_content">
                                <ul className="woocommerce-mini-cart cart_list product_list_widget ">
                                    <BasketItem basketItems={props.basket.basketItems} onRemoveBasket={props.onRemoveBasket} />
                                </ul>
                                <p className="woocommerce-mini-cart__total total">
                                    <strong>Toplam:</strong>
                                    <span className="woocommerce-Price-amount amount">
                                        <span className="woocommerce-Price-currencySymbol">₺</span>{props.basket.totalPrice}
                                    </span>
                                </p>
                                <p className="woocommerce-mini-cart__buttons buttons">
                                    <a href="#" className="button wc-forward">Alışverişe Devam Et</a>
                                    <a href="#" className="button checkout wc-forward">Sepete Git</a>
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
        const { basket, onRemoveBasket } = this.props
        return (
            <Basket basket={basket} onRemoveBasket={onRemoveBasket} />
        )
    }
}

export default MainBasket