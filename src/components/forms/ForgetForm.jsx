import React from 'react';
import {Formik} from "formik";

const initialValues = {
    email: 'emintayfur@icloud.com',
};
const ForgetForm = (props) => {
    const {
        handleSubmit,
        isDisabled,
        validateForm,
    } = props;

    return (
        <div className="col-12">
            <h2>Şifremi Unuttum</h2>
            <Formik
                initialValues={initialValues}
                validate={validateForm}
                onSubmit={handleSubmit}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                  }) => (
                    <form
                        className="woocomerce-form woocommerce-form-login login"
                        onSubmit={handleSubmit}
                    >
                        <p className="before-login-text form-text-cb">
                            Lütfen şifrenizi sıfırlamak için e-posta adresinizi girin.
                        </p>
                        <div className="form-row form-row-wide">
                            <label htmlFor="username">E-Posta
                                <span className="required">*</span>
                            </label>
                            <input
                                disabled={isDisabled(isSubmitting)}
                                type="text"
                                className="input-text"
                                name="email"
                                id="login_email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {errors.email && touched.email && errors.email}
                        </div>
                        <div className="form-row">
                            <input
                                disabled={isDisabled(isSubmitting)}
                                readOnly
                                className="woocommerce-Button button btn-navy"
                                type="submit"
                                value="Sıfırla"
                                name="reset"
                            />
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default ForgetForm;
