import React, { Component } from 'react';

class DeviceForm extends Component {
    render() {
        const { questions } = this.props
        return (
            <form>
                <div className="woocommerce-product-details__short-description">
                    <h5>Cihaz Bilgileri</h5>
                    <div class="form-group row">
                        {
                            questions.map((item, i) => {
                                return (
                                    <div class="col-xs-12 col-md-12">
                                        <label>{item.title}</label>
                                        <br />
                                        <span class="wpcf7-form-control-wrap">
                                            {
                                                item.options.map((qitem, i) => {
                                                    return (<React.Fragment>
                                                        <input type='radio' name={item.name} /> {qitem.title} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    </React.Fragment>)
                                                })
                                            }
                                        </span>
                                        <br />
                                        <br />
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </form>
        );
    }
}

export default DeviceForm;