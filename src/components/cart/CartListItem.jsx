import React, {useCallback} from 'react';
import useBasket from "../../store/hooks/useBasket";
import {ayir, getItemPrice} from "../../store/selectors/basket";


let timer = null;
const CartListItem = (props) => {
    const {item} = props;

    const basket = useBasket();

    const changer = useCallback((quantity) => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            basket.setItemQuantity(
                item.item_code,
                quantity,
            )();
        }, 510);
    }, [item.item_code, basket]);
    const handleChange = useCallback((e) => {
        if (
            basket.quantityStats.isLoading
            || basket.quantityStats.isError
        ) return;
        const value = parseInt(e.target.value);
        if (Number.isInteger(value)) {
            changer(value);
        }
    }, [changer, basket.quantityStats])

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
                      disabled={basket.quantityStats.isError || basket.quantityStats.isError}
                      type="number"
                      defaultValue={item.quantity}
                      title="Adet"
                      className="input-text qty text"
                      size="40"
                      min="1"
                      onChange={handleChange}
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
                  onClick={basket.remove(item.item_code)}
              >
                  ×
              </a>
          </td>
      </tr>
  );
};

export default CartListItem;