import React, {useState} from "react";
import {basketAdd} from "../../../store/actions/basket";
import useBasket from "../../../store/hooks/useBasket";
import {getItemPrice} from "../../../store/selectors/basket";

const Placeholder = ({ className }) => (
    <div className={`is-placeholder ${className}`}>
        <a className="woocommerce-LoopProduct-link woocommerce-loop-product__link" >
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: 224, height: 197, backgroundColor: '#eaeaea', margin: '0 auto 6px', borderRadius: 5, }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4, marginBottom: 8, }}>
                <div style={{ display: 'block', width: 90, height: 8, backgroundColor: '#eaeaea', borderRadius: 2, }} />
            </div>

            <div className="woocommerce-loop-product__title" style={{ display: 'flex', justifyContent: 'center'}}>
                <div style={{ display: 'block', width: 150, height: 12, backgroundColor: '#eaeaea', borderRadius: 4, }} />
            </div>
        </a>
    </div>
);

const getClasses = (i) => {
    if ((i % 4) === 1) return 'product first'
    if ((i % 4) === 0) return 'product last'
    return 'product'
}
const GridItem = (props) => {
    const { item, listCount, isPlaceholder = false } = props;
    const [added, setAdded] = useState(false);
    const basket = useBasket();

    const className = getClasses(listCount);
    if (isPlaceholder) return <Placeholder className={className} />;

    return (
        <div className={className}>
            <a className="woocommerce-LoopProduct-link woocommerce-loop-product__link" href={item.url} >
                <img width="224" height="197" alt="" className="attachment-shop_catalog size-shop_catalog wp-post-image" src={item.imageUrl} />
                <br />
                <div className="price">
                        <span className="woocommerce-Price-amount amount">
                            {getItemPrice(item.price)}
                            <span className="woocommerce-Price-currencySymbol">₺</span>
                        </span>
                </div>
                <h2 className="woocommerce-loop-product__title">
                    {item.title}
                </h2>
            </a>
            <div className="hover-area">
                <a
                    className="button"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        basket.add(item)(e);
                        setAdded(true);
                        setTimeout(() => {
                            setAdded(false);
                        }, 1250)
                    }}
                    style={added ? { backgroundColor: '#e86708', color: '#fff' } : {}}
                >
                    {!added && 'Sepete ekle'}
                    {added && 'Sepete eklendi'}
                </a>
            </div>
        </div>
    )
}

export default GridItem