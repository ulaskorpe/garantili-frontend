import React from 'react';
import {Formik} from "formik";

const initialValues = {
    email: '',
};
const initialErrors = {
    email: '',
}
const ForgetForm = (props) => {
    const {
        handleSubmit,
        isLoading,
        submitIsDisabled,
        validateForm,
    } = props;

    return (
        <div className="col-12">
            <h2>Şifremi Unuttum</h2>
            <Formik
                initialValues={initialValues}
                initialErrors={initialErrors}
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
                        <div className="form-row form-row-wide" style={{ color: errors.email && touched.email && errors.email ? '#F44336' : 'inherit' }}>
                            <label htmlFor="f_email">E-Posta
                                <span className="required">*</span>
                            </label>
                            <input
                                disabled={isLoading(isSubmitting)}
                                type="text"
                                className="input-text"
                                name="email"
                                id="f_email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                style={{ borderColor: errors.email && touched.email && errors.email ? '#F44336' : '#ebebeb' }}
                            />
                            {errors.email && touched.email && errors.email}
                        </div>
                        <div className="form-row">
                            <input
                                disabled={submitIsDisabled(isSubmitting, errors, values, validateForm)}
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
