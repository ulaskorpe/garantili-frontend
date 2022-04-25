import React from 'react';
import {Formik} from "formik";
import chance from 'chance';


const q = (s) => window.atob(s);
let initialValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
};
if (process.env.NODE_ENV === 'development') {
    initialValues = {
        name: 'Emin',
        surname: 'T',
        email: chance().email({ length: 8, [q('ZG9tYWlu')]: q('dGF5ZnVyLmNvbQ==') }),
        password: '123456',
    };
}

const RegisterForm = (props) => {
    const {
        handleSubmit,
        isLoading,
        submitIsDisabled,
        validateForm,
    } = props;

    return (
        <div className="u-column2 col-2 login-form-in">
            <h2>Kayıt Ol</h2>
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
                        className="woocommerce-form woocommerce-form-login register"
                        onSubmit={handleSubmit}
                    >
                        <p className="before-register-text form-text-cb mb-4">
                            Kişiselleştirilmiş bir alışverişin avantajlarından
                            yararlanmak için bugün yeni bir hesap oluşturun.
                        </p>
                        {/* Ad */}
                        <div className="form-row form-row-wide" style={{ color: errors.name && touched.name && errors.name ? '#F44336' : 'inherit' }}>
                            <label htmlFor="reg_name">
                                Ad
                                <span className="required">*</span>
                            </label>
                            <input
                                disabled={isLoading(isSubmitting)}
                                type="text"
                                id="reg_name"
                                name="name"
                                className="woocommerce-Input woocommerce-Input--text input-text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                style={{ borderColor: errors.name && touched.name && errors.name ? '#F44336' : '#ebebeb' }}
                            />
                            {errors.name && touched.name && errors.name}
                        </div>

                        {/* Soyad */}
                        <div className="form-row form-row-wide" style={{ color: errors.surname && touched.surname && errors.surname ? '#F44336' : 'inherit' }}>
                            <label htmlFor="reg_surname">
                                Soyad
                                <span className="required">*</span>
                            </label>
                            <input
                                disabled={isLoading(isSubmitting)}
                                type="text"
                                id="reg_surname"
                                name="surname"
                                className="woocommerce-Input woocommerce-Input--text input-text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.surname}
                                style={{ borderColor: errors.surname && touched.surname && errors.surname ? '#F44336' : '#ebebeb' }}
                            />
                            {errors.surname && touched.surname && errors.surname}
                        </div>

                        {/* E-posta */}
                        <div className="form-row form-row-wide" style={{ color: errors.email && touched.email && errors.email ? '#F44336' : 'inherit' }}>
                            <label htmlFor="reg_email">
                                E-Posta
                                <span className="required">*</span>
                            </label>
                            <input
                                disabled={isLoading(isSubmitting)}
                                type="email"
                                id="reg_email"
                                name="email"
                                className="woocommerce-Input woocommerce-Input--text input-text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                style={{ borderColor: errors.email && touched.email && errors.email ? '#F44336' : '#ebebeb' }}
                            />
                            {errors.email && touched.email && errors.email}
                        </div>

                        {/* Şifre */}
                        <div className="form-row form-row-wide mt-2" style={{ color: errors.password && touched.password && errors.password ? '#F44336' : 'inherit' }}>
                            <label htmlFor="reg_password">
                                Şifre
                                <span className="required">*</span>
                            </label>
                            <input
                                disabled={isLoading(isSubmitting)}
                                id="reg_password"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className="woocommerce-Input woocommerce-Input--text input-text"
                                style={{ borderColor: errors.password && touched.password && errors.password ? '#F44336' : '#ebebeb' }}
                            />
                            {errors.password && touched.password && errors.password}
                        </div>

                        {/* Submit */}
                        <div className="form-row">
                            <input
                                disabled={submitIsDisabled(isSubmitting, errors, values, validateForm)}
                                type="submit"
                                className="woocommerce-Button button"
                                value="Kayıt Ol"
                                readOnly
                            />
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default RegisterForm;
