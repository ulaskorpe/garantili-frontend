import React, { Component } from 'react';

class PaymentMethodList extends Component {
    state = [
        { id: 1, title: "Havale/EFT", value:"bank" },
        { id: 2, title: "Kredi Kartı", value:"creditcart" },
    ]
    render() {
        return (
            <ul className="wc_payment_methods payment_methods methods">
                {this.state.map((_, index) => {
                    return (
                        <li className="wc_payment_method payment_method_bacs" key={index}>
                            <input type="radio" data-order_button_text="" checked={index === 0 ? '': 'checked'} value={_.value} name="payment_method"
                                className="input-radio" />
                            <label htmlFor="payment_method_bacs">{_.title}</label>
                        </li>
                    )
                })}
            </ul>
        );
    }
}

export default PaymentMethodList;