import React from 'react';
import useBasket from "../../store/hooks/useBasket";
import {ayir, getItemPrice} from "../../store/selectors/basket";


const CartListItem = (props) => {
    const {item} = props;

    const basket = useBasket();

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
          <td data-title="Total" className="product-subtotal">
                    <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol">₺</span>{ayir(getItemPrice(item))}</span>
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