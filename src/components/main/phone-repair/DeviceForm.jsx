import React, { Component } from 'react';

class DeviceForm extends Component {
    render() {
        const { brokenPieces } = this.props
        return (
            <form>
                <div className="woocommerce-product-details__short-description">
                    <h5>Hasarlı Parçalar</h5>
                    <div class="form-group row">
                        {
                            brokenPieces.map((item, i) => {
                                return (
                                    <div class="col-xs-12 col-md-3 m-tb">
                                        {
                                            <span class="wpcf7-form-control-wrap">
                                                <input type='checkbox' name={item.name} /> {item.name} &nbsp;
                                            </span>
                                        }
                                    </div>
                                )
                            })
                        }
                        <br />

                    </div>
                    <br />
                    <div className="form-group row pb-0">
                        <p id="billing_first_name_field"
                            class="form-row form-row-first validate-required woocommerce-invalid woocommerce-invalid-required-field pb-0 mb-4">
                            <label class="">IMEI Numarası
                                <abbr title="required" class="required">*</abbr>
                            </label>
                            <input type="text" value="" placeholder="" id="billing_first_name"
                                name="billing_first_name" class="input-text " />
                        </p></div><div className="form-group row">
                        <p id="billing_last_name_field"
                            class="form-row form-row-last validate-required">
                            <label class="" for="billing_last_name">Arıza Hakkında Detaylı Bilgi
                                <abbr title="required" class="required">*</abbr>
                            </label>
                            <textarea type="text" value="" placeholder="" id="billing_last_name"
                                name="billing_last_name" class="input-text " />
                        </p>
                    </div>
                </div>
            </form>
        );
    }
}

export default DeviceForm;