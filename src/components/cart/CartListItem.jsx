import React, {Component, useCallback} from 'react';
import useBasket from "../../store/hooks/useBasket";
import {useSelector} from "react-redux";
import {ayir, getBasketObject, getItemPrice} from "../../store/selectors/basket";

const CartListItem = (props) => {
    const {item} = props;

    const basket = useBasket();
    const basketObject = useSelector(getBasketObject)


    const handleInputBlur = useCallback((e) => {
        const quantity = parseInt(e.target.value);
        if (
            !quantity
            && typeof quantity !== 'number'
            || quantity === 0
        ) return false;

        const basketDeg = basketObject[item.id];
        if (
            !basketDeg
            || basketDeg.quantity === quantity
        ) return false;

        basket.setItemQuantity(
            item.id,
            quantity,
        )(e);
    }, [item, basketObject]);
    const handleInputKeyUp = useCallback((e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            handleInputBlur(e);
        }
    }, [handleInputBlur]);

    return (
      <tr>
          <td className="product-remove">
              <a className="remove" href="#">×</a>
          </td>
          <td className="product-thumbnail">
              <a href={item.url}>
                  <img width="180" height="180" alt="" className="wp-post-image" src={`${item.thumb}`} />
              </a>
          </td>
          <td data-title="Product" className="product-name">
              <div className="media cart-item-product-detail">
                  <a href={item.url}>
                      <img width="180" height="180" alt="" className="wp-post-image" src={`${item.imageUrl}`} />
                  </a>
                  <div className="media-body align-self-center">
                      <a href={item.url}>
                          {item.title}
                      </a>
                  </div>
              </div>
          </td>
          <td data-title="Price" className="product-price">
                    <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol">₺</span>{ayir(getItemPrice(item))}</span>
          </td>
          <td className="product-quantity" data-title="Quantity">
              <div className="quantity">
                  <label htmlFor="quantity-input-1">Adet</label>
                  <input
                      type="number"
                      defaultValue={item.quantity}
                      title="Adet"
                      className="input-text qty text"
                      size="40"
                      min="1"
                      onBlur={handleInputBlur}
                      onKeyUp={handleInputKeyUp}
                  />
              </div>
          </td>
          <td data-title="Total" className="product-subtotal">
                    <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol">₺</span>{ayir(getItemPrice(item) * item.quantity)}</span>
              <a
                  title="Remove this item"
                  className="remove"
                  href="#"
                  onClick={basket.remove(item.id)}
              >
                  ×
              </a>
          </td>
      </tr>
  );
};

export default CartListItem;