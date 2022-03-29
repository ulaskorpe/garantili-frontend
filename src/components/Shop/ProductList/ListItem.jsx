import React from "react";
import {ayir, getItemPrice} from "../../../store/selectors/basket";
import useProductTools from "../../../hooks/useProductTools";

const Placeholder = ({ className }) => (
    <div className={`is-placeholder ${className}`}>
        <div className="media">
            <div
                className="attachment-shop_catalog size-shop_catalog wp-post-image"
                style={{ width: 190, height: 220, backgroundColor: '#eaeaea', margin: '0 auto 6px', borderRadius: 5, }}
            />

            <div className="media-body">
                <div className="product-info">
                    <div
                        className="woocommerce-LoopProduct-link woocommerce-loop-product__link"
                        style={{ paddingLeft: 20, boxSizing: 'border-box' }}
                    >
                        <div
                            style={{ display: 'block', width: 270, height: 12, backgroundColor: '#eaeaea', borderRadius: 4, }}
                        />

                        <div className="techmarket-product-rating" style={{ marginTop: 20, }}>
                            <div className="star-rating">
                                <span className="w-100">
                                    <strong className="rating">5.00</strong> out of 5
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="product-actions">
                    <div className="availability">
                        <div
                            style={{ display: 'block', width: 150, height: 12, backgroundColor: '#eaeaea', borderRadius: 4, }}
                        />
                    </div>
                    <div
                        style={{ display: 'block', width: 150, height: 18, backgroundColor: '#eaeaea', borderRadius: 4, }}
                    />
                </div>
            </div>
        </div>
    </div>
);

const ListItem = (props) => {
    const { item, isPlaceholder = false, openModalEvent, } = props;
    const className = "product list-view-large first";

    const { goProductEvent } = useProductTools();

    if (isPlaceholder) return <Placeholder className={className} />;
    return (
        <div className="product list-view ">
            <div className="media">
                <img width="224" height="197" alt=""
                     className="attachment-shop_catalog size-shop_catalog wp-post-image"
                     src={item.imageUrl} />
                <div className="media-body">
                    <div className="product-info">
                        <a className="woocommerce-LoopProduct-link woocommerce-loop-product__link"
                           href={item.url}
                           onClick={goProductEvent(item)}
                        >
                            <h2 className="woocommerce-loop-product__title">{item.title}</h2>
                            <div className="techmarket-product-rating">
                                <div title="Rated 5.00 out of 5"
                                     className="star-rating">
                                    <span className="w-100">5 üzerinden <strong className="rating">{item.rating}</strong></span>
                                </div>
                                <span className="review-count">{item.reviewCount}</span>
                            </div>
                        </a>
                        <div className="brand">
                            <a href="#">
                                <img alt={item.brandName} src={item.brandImage} />
                            </a>
                        </div>
                        <div className="woocommerce-product-details__short-description">
                            <ul>
                                {item.details.map((detail, i) => {
                                    return (<li key={i}>{detail}</li>)
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="product-actions">
                        <div className="availability">
                            Stok:
                            <p className="stock in-stock">{item.stockCount}</p>
                        </div>
                        <span className="price">
                                <span className="woocommerce-Price-amount amount">
                                    <span className="woocommerce-Price-currencySymbol">₺</span>
                                    {ayir(getItemPrice(item))}
                                </span>
                            </span>
                        <a
                            className="button add_to_cart_button"
                            href="#"
                            onClick={openModalEvent(item)}
                        >
                            Sepete ekle
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListItem