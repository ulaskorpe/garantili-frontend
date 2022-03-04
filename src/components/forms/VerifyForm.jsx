import React from 'react';
import {Formik} from "formik";

const initialValues = {
    activation_key: '',
};
const VerifyForm = (props) => {
    const {
        handleSubmit,
        handleClickResendLink,
        isLoading,
        disableResendButton,
        submitIsDisabled,
        validateForm,
        email,
    } = props;

    return (
        <div className="col-12">
            <h2>Hesap Doğrulama</h2>
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
                      resetForm,
                  }) => (
                    <form
                        className="woocomerce-form woocommerce-form-login login"
                        onSubmit={handleSubmit}
                    >
                        <p className="before-login-text form-text-cb">
                            Hesabınızı doğrulamadan giriş yapmanıza izin veremeyiz.
                            Lütfen
                            &nbsp;
                            {email ? <b>{email}</b> : 'kayıtlı olan mail'}
                            &nbsp;
                            adresin{!Boolean(email) && 'iz'}e
                            gönderdiğimiz doğrulama kodunu aşağıdaki alana girip hesabınızı doğrulayın.
                        </p>
                        <p className="before-login-text form-text-cb">
                            Doğrulama mailini alamadınız mı?
                            &nbsp;
                            <button
                                disabled={disableResendButton(isSubmitting)}
                                type="button"
                                style={{
                                    color: '#e86708',
                                    fontWeight: 400,
                                    padding: 0,
                                    backgroundColor: 'transparent',
                                    outline: 'none',
                                }}
                                onClick={handleClickResendLink(resetForm)}
                            >
                                Yeni bir doğrulama kodu isteyin
                            </button>
                            .
                        </p>
                        <div className="form-row form-row-wide" style={{ color: errors.activation_key && touched.activation_key && errors.activation_key ? '#F44336' : 'inherit' }}>
                            <label htmlFor="activation_key">
                                Doğrulama kodu
                                <span className="required">*</span>
                            </label>
                            <input
                                disabled={isLoading(isSubmitting)}
                                type="text"
                                className="input-text"
                                name="activation_key"
                                id="activation_key"
                                maxLength={6}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.activation_key}
                                style={{ borderColor: errors.activation_key && touched.activation_key && errors.activation_key ? '#F44336' : '#ebebeb' }}
                            />
                            {errors.activation_key && touched.activation_key && errors.activation_key}
                        </div>
                        <div className="form-row">
                            <input
                                disabled={submitIsDisabled(isSubmitting, errors, values, validateForm)}
                                readOnly
                                className="woocommerce-Button button btn-navy"
                                type="submit"
                                value="Doğrula"
                                name="register"
                            />
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default VerifyForm;
