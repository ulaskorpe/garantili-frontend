import React, {useEffect, useRef} from 'react';
import {Formik} from "formik";
import {useLocation} from "react-router-dom";

const initialValues = {
    email: '',
    password: '',
};
const LoginForm = (props) => {
    const {
        handleSubmit,
        isDisabled,
        validateForm,
    } = props;
    const formikRef = useRef();
    const location = useLocation();

    useEffect(() => {
        if (location?.state?.email) {
            formikRef.current.setFieldValue(
                'email',
                location.state.email,
            );
        }
    }, [location, formikRef])

    return (
        <div className="u-column1 col-1">
            <h2>Giriş Yap</h2>
            <Formik
                initialValues={initialValues}
                innerRef={formikRef}
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
                            <p className="woocommerce-LostPassword lost_password">
                                <a href="/forget-password">
                                    Parolanı mı unuttun?
                                </a>
                            </p>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default LoginForm;
