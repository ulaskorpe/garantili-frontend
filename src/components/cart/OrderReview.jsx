import React, { Component } from 'react';
import OrderReviewItemList from './OrderReviewItemList';
import PaymentMethodList from './PaymentMethodList';

class OrderReview extends Component {
    state = {}
    render() {
        return (
            <div class="woocommerce-checkout-review-order" id="order_review">
                <div class="order-review-wrapper">
                    <h3 class="order_review_heading">Siparişiniz</h3>
                   <OrderReviewItemList />
                    <div class="woocommerce-checkout-payment" id="payment">
                        <PaymentMethodList />
                        <div class="form-row place-order">
                            
                            <a href="/siparis-ozeti" class="button wc-forward text-center">Sipariş Ver</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderReview;