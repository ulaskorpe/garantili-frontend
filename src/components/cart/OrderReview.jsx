import React, { Component } from 'react';
import OrderReviewItemList from './OrderReviewItemList';

class OrderReview extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="woocommerce-checkout-review-order" id="order_review">
                <div className="order-review-wrapper">
                    <h3 className="order_review_heading">Siparişiniz</h3>
                   <OrderReviewItemList installmentFee={this?.props?.installmentFee || 0} />
                    <div className="woocommerce-checkout-payment" id="payment">
                        <div className="form-row place-order">
                            <button
                                className="button wc-forward text-center"
                                type="submit"
                                disabled={Boolean(this?.props?.disabled)}
                            >
                                Sipariş Ver
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderReview;