import React, { Component } from "react";

const Accessory = (props) => {
    const product = props.product
    return (
        <div className="product">
            <a className="woocommerce-LoopProduct-link woocommerce-loop-product__link"
                href="#">
                <img width="224" height="197" alt="" className="attachment-shop_catalog size-shop_catalog wp-post-image" src={product.imageUrl} />
                <span className="price">
                    <del>
                        <span className="woocommerce-Price-amount amount">
                            <span className="woocommerce-Price-currencySymbol">₺</span>{product.listPrice}</span>
                    </del>
                    <ins>
                        <span className="woocommerce-Price-amount amount">
                            <span className="woocommerce-Price-currencySymbol">₺</span>{product.price}</span>
                    </ins>
                </span>
                <h2 className="woocommerce-loop-product__title">{product.title}</h2>
            </a>
            <div className="checkbox accessory-checkbox">
                <label>
                    <input type="checkbox" data-product-type="simple" data-product-id={product.id} data-price={product.price} className="product-check" checked readOnly /> Ekle
                </label>
            </div>
        </div>
    )
}

class AccessoriesTab extends Component {
    render() {
        const { tab, classes, tabName } = this.props
        let totalPrice = 0.00
        return (
            <div className={classes} id={tab.name} role="tabpanel">
                <div className="accessories">
                    <div className="accessories-wrapper">
                        <div className="accessories-product columns-4">
                            <div className="products">
                                {
                                    tab.content.map((acc, i) => {
                                        totalPrice += parseFloat(acc.price)
                                        return <Accessory product={acc} key={i} />
                                    })
                                }
                            </div>
                        </div>
                        <div className="accessories-product-total-price">
                            <div className="total-price">
                                <span className="total-price-html price">
                                    <span className="woocommerce-Price-amount amount">
                                        <span className="woocommerce-Price-currencySymbol">₺</span>{totalPrice.toFixed(2)}
                                    </span>
                                </span>
                                <span>Ürününüz için kit fiyatı</span>
                            </div>
                            <div className="accessories-add-all-to-cart">
                                <button className="button btn btn-primary add-all-to-cart" type="button">Ürünleri sepete ekleyin</button>
                            </div>
                        </div>
                    </div>
                </div></div >
        )
    }
}

export default AccessoriesTab