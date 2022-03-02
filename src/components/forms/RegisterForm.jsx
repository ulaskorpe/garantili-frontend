import React from 'react';
import {Formik} from "formik";

let initialValues = {
    name: 'Emin',
    surname: 'T',
    email: 'emintayfur@icloud.com',
    password: '123456',
};

const RegisterForm = (props) => {
    const {
        handleSubmit,
        isDisabled,
        validateForm
    } = props;

    return (
        <div className="u-column2 col-2">
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
                        <div className="form-row form-row-wide">
                            <label htmlFor="reg_email">
                                Ad
                                <span className="required">*</span>
                            </label>
                            <input
                                disabled={isDisabled(isSubmitting)}
                                type="text"
                                id="reg_name"
                                name="name"
                                className="woocommerce-Input woocommerce-Input--text input-text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            {errors.name && touched.name && errors.name}
                        </div>

                        {/* Soyad */}
                        <div className="form-row form-row-wide">
                            <label htmlFor="reg_email">
                                Soyad
                                <span className="required">*</span>
                            </label>
                            <input
                                disabled={isDisabled(isSubmitting)}
                                type="text"
                                id="reg_name"
                                name="surname"
                                className="woocommerce-Input woocommerce-Input--text input-text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.surname}
                            />
                            {errors.surname && touched.surname && errors.surname}
                        </div>

                        {/* E-posta */}
                        <div className="form-row form-row-wide">
                            <label htmlFor="reg_email">
                                E-Posta
                                <span className="required">*</span>
                            </label>
                            <input
                                disabled={isDisabled(isSubmitting)}
                                type="email"
                                id="reg_email"
                                name="email"
                                className="woocommerce-Input woocommerce-Input--text input-text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {errors.email && touched.email && errors.email}
                        </div>

                        {/* Şifre */}
                        <div className="form-row form-row-wide mt-2">
                            <label htmlFor="reg_password">
                                Şifre
                                <span className="required">*</span>
                            </label>
                            <input
                                disabled={isDisabled(isSubmitting)}
                                id="reg_password"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className="woocommerce-Input woocommerce-Input--text input-text"
                            />
                            {errors.password && touched.password && errors.password}
                        </div>

                        {/* Submit */}
                        <div className="form-row">
                            <input
                                disabled={isDisabled(isSubmitting)}
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
