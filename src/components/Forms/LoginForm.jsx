import React from 'react';
import {Formik} from "formik";

const initialValues = {
    email: 'emintayfur@icloud.com',
    password: '123456',
};
const LoginForm = (props) => {
    const {
        handleSubmit,
        isDisabled,
        validateForm,
    } = props;

    return (
        <div className="u-column1 col-1">
            <h2>Giriş Yap</h2>
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
                            Siparşinizi takip etmek, ve daha önceki siparişleriniz oylamak için giriş yapın.
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
                        <div className="form-row form-row-wide mt-2">
                            <label htmlFor="password">
                                Şifre
                                <span className="required">*</span>
                            </label>
                            <input
                                disabled={isDisabled(isSubmitting)}
                                id="login_password"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className="woocommerce-Input woocommerce-Input--text input-text"
                            />
                            {errors.password && touched.password && errors.password}
                        </div>
                        <div className="form-row">
                            <input
                                disabled={isDisabled(isSubmitting)}
                                readOnly
                                className="woocommerce-Button button btn-navy"
                                type="submit"
                                value="Giriş Yap"
                                name="login"
                            />
                            <label
                                htmlFor="rememberme"
                                className="woocommerce-form__label woocommerce-form__label-for-checkbox inline"
                            >
                                {/* todo */}
                                <input
                                    disabled={isDisabled(isSubmitting)}
                                    className="woocommerce-form__input woocommerce-form__input-checkbox"
                                    name="rememberme"
                                    type="checkbox"
                                    id="rememberme"
                                    value="forever"
                                />
                                Beni hatırla &nbsp;&nbsp;
                            </label>
                            <p className="woocommerce-LostPassword lost_password">
                                <a href="#">|&nbsp;&nbsp;Parolanı unuttun mu?</a>
                            </p>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default LoginForm;
