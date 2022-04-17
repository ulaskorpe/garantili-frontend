import React, {useCallback, useEffect} from 'react';
import {Formik} from 'formik';
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"
import BreadCrumb from "../layout/BreadCrumb"
import { useState } from "react"
import {useMutation} from "react-query";
import {CUSTOMER_UPDATE_PASSWORD, DEFAULT_API_KEY, fetchThis} from "../../api";
import sweetalert from "sweetalert";
import useAuth from "../../store/hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";

const initialValues = {
    current_password: '',
    new_password: '',
    new_password_again: '',
};
function PasswordUpdate() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const { account, isLogged = false } = useAuth();
    const [crumb] = useState([
        { url: '#', title: 'Şifre Güncelleme' }
    ]);

    const updatePasswordMutation = useMutation((data) => (
        fetchThis(
            CUSTOMER_UPDATE_PASSWORD,
            data,
            DEFAULT_API_KEY,
            {},
        )
    ));

    const handleSubmit = useCallback((iValues, { setSubmitting, resetForm }) => {
        if (!isLogged) return;
        const values = JSON.parse(JSON.stringify(iValues));

        delete values.new_password_again;
        values.password = values.new_password;
        delete values.new_password;
        values.customer_id = parseInt(account.customer_id);

        setSubmitting(true);
        setLoading(true);
        updatePasswordMutation?.mutate(values, {
            onSuccess: ({ status = false, errors = { msg: '' }}) => {
                if (!status) {
                    sweetalert({
                        icon: 'error',
                        title: 'Hata',
                        text: errors?.msg || 'Bilinmeyen bir hata ile karşılaşıldı!',
                        button: {
                            text: 'Tamam',
                        },
                    }).then();
                } else {
                    sweetalert({
                        icon: 'success',
                        title: 'Başarılı',
                        text: 'Şifren başarıyla sıfırlandı.',
                        button: {
                            text: 'Tamam',
                        },
                    }).then(() => {
                        resetForm();
                    });
                }
                setSubmitting(false);
                setLoading(false);
            },
            onError: (error) => {
                if (!(error?.code === 'not_verified')) {
                    sweetalert({
                        icon: 'error',
                        title: 'Hata',
                        text: error?.message || error || 'Bilinmeyen bir hata ile karşılaşıldı!',
                        button: {
                            text: 'Tamam',
                        },
                    }).then();
                }
                setSubmitting(false);
                setLoading(false);
            },
        });
    }, [account, isLogged, updatePasswordMutation]);

    const validateForm = (values) => {
        const errors = {};
        const errorMessages = {
            required: 'Bu alan zorunlu!',
        }

        if (!values.current_password) {
            errors.current_password = errorMessages.required;
        }
        if (!values.new_password) {
            errors.new_password = errorMessages.required;
        }
        if (!values.new_password_again) {
            errors.new_password_again = errorMessages.required;
        }
        if (
            values.new_password
            && values.new_password_again
            && values.new_password !== values.new_password_again
        ) {
            errors.new_password = 'Şifreler uyuşmuyor!';
            errors.new_password_again = 'Şifreler uyuşmuyor!';
        }

        return errors;
    }

    const isLoading = useCallback((isSubmitting = false) => (
        loading || isSubmitting || updatePasswordMutation?.isLoading
    ), [loading, updatePasswordMutation]);
    const submitIsDisabled = useCallback((isSubmitting, errors = {}, values, validator) => (
        isLoading(isSubmitting) || Boolean(Object.keys(errors).length) || Boolean(Object.keys(validator(values)).length)
    ), [isLoading]);

    useEffect(() => {
        if (
            !loading
            && updatePasswordMutation?.isLoading
        ) {
            setLoading(true);
        }
    }, [loading, setLoading, updatePasswordMutation?.isLoading]);

    useEffect(() => {
        if (!isLogged) {
            navigate(
                '/login',
                {
                    fromTo: location,
                    replace: false,
                }
            );
        }
    }, [isLogged, navigate, location]);

    return (
        <div className="woocommerce-active left-sidebar">
            <div id="page" className="hfeed site">
                <TopBar />
                <HeaderMain />
            </div>
            <div id="content" className="site-content" tabIndex="-1">
                <div className="col-full">
                    <div className="row">
                        <BreadCrumb crumbs={crumb} />
                        <div id="primary" className="content-area">
                            <main id="main" className="site-main">
                                <div className="type-page hentry">
                                    <div className="entry-content">
                                        <div className="row contact-info">
                                            <div className="col-md-12 left-col">
                                                <div className="text-block">
                                                    <h2 className="contact-page-title">Şifre Güncelleme</h2>
                                                </div>
                                                <div className="contact-form">
                                                    <div role="form" className="wpcf7" id="wpcf7-f425-o1" lang="en-US" dir="ltr">
                                                        <div className="screen-reader-response" />
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
                                                                    className="wpcf7-form"
                                                                    noValidate="novalidate"
                                                                    onSubmit={handleSubmit}
                                                                >
                                                                    <div className="form-group row">
                                                                        <div
                                                                            className="col-xs-12 col-md-6"
                                                                            style={{ color: errors.current_password && touched.current_password && errors.current_password ? '#F44336' : 'inherit' }}
                                                                        >
                                                                            <label style={{ color: 'inherit' }}>
                                                                                Mevcut Şifre
                                                                                <abbr title="required"
                                                                                      className="required">*</abbr>
                                                                            </label>
                                                                            <br/>
                                                                            <div
                                                                                className="wpcf7-form-control-wrap first-name"
                                                                            >
                                                                                <input
                                                                                    autoComplete="on"
                                                                                    disabled={isLoading(isSubmitting)}
                                                                                    name="current_password"
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.current_password}
                                                                                    type="password"
                                                                                    aria-invalid="false"
                                                                                    aria-required="true"
                                                                                    className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                    size="40"
                                                                                    style={{ borderColor: errors.current_password && touched.current_password && errors.current_password ? '#F44336' : '#ebebeb' }}
                                                                                />
                                                                                {errors.current_password && touched.current_password && errors.current_password}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="form-group row"
                                                                    >
                                                                        <div
                                                                            className="col-xs-12 col-md-6"
                                                                            style={{ color: errors.new_password && touched.new_password && errors.new_password ? '#F44336' : 'inherit' }}
                                                                        >
                                                                            <label style={{ color: 'inherit' }}>
                                                                                Yeni Şifre
                                                                                <abbr title="required"
                                                                                      className="required">*</abbr>
                                                                            </label>
                                                                            <div
                                                                                className="wpcf7-form-control-wrap last-name">
                                                                                <input
                                                                                    autoComplete="off"
                                                                                    disabled={isLoading(isSubmitting)}
                                                                                    name="new_password"
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.new_password}
                                                                                    type="password"
                                                                                    aria-invalid="false"
                                                                                    aria-required="true"
                                                                                    className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                    size="40"
                                                                                    style={{ borderColor: errors.new_password && touched.new_password && errors.new_password ? '#F44336' : '#ebebeb' }}
                                                                                />
                                                                                {errors.new_password && touched.new_password && errors.new_password}
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="col-xs-12 col-md-6"
                                                                            style={{ color: errors.new_password_again && touched.new_password_again && errors.new_password_again ? '#F44336' : 'inherit' }}
                                                                        >
                                                                            <label style={{ color: 'inherit' }}>
                                                                                Yeni Şifre
                                                                                <abbr title="required"
                                                                                      className="required">*</abbr>
                                                                            </label>
                                                                            <div
                                                                                className="wpcf7-form-control-wrap last-name">
                                                                                <input
                                                                                    autoComplete="off"
                                                                                    disabled={isLoading(isSubmitting)}
                                                                                    name="new_password_again"
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    value={values.new_password_again}
                                                                                    type="password"
                                                                                    aria-invalid="false"
                                                                                    aria-required="true"
                                                                                    className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                    size="40"
                                                                                    style={{ borderColor: errors.new_password_again && touched.new_password_again && errors.new_password_again ? '#F44336' : '#ebebeb' }}
                                                                                />
                                                                                {errors.new_password_again && touched.new_password_again && errors.new_password_again}
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-group clearfix">
                                                                        <p>
                                                                            <input
                                                                                type="submit"
                                                                                value="Kaydet"
                                                                                className="wpcf7-form-control wpcf7-submit btn-navy"
                                                                                disabled={submitIsDisabled(isSubmitting, errors, values, validateForm)}
                                                                            />
                                                                        </p>
                                                                    </div>
                                                                    <div
                                                                        className="wpcf7-response-output wpcf7-display-none" />
                                                                </form>
                                                            )
                                                            }
                                                        </Formik>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                        <div id="secondary" className="widget-area shop-sidebar" role="complementary">
                            <div id="garantili_product_categories_widget-2"
                                className="widget woocommerce widget_product_categories garantili_widget_product_categories">
                                <ul className="product-categories ">
                                    <li className="product_cat">
                                        <span>Kullanıcı Bilgilerim</span>
                                        <ul>
                                            <li className="cat-item">
                                                <a href="/uyelik-bilgilerim">
                                                    <span className="no-child" />Üyelik Bilgilerim</a>
                                            </li>
                                            <li className="cat-item">
                                                <a href="/sifre-guncelleme">
                                                    <span className="no-child" /><strong>Şifre Güncelleme</strong></a>
                                            </li>
                                            <li className="cat-item  current-cat">
                                                <a href="/adreslerim">
                                                    <span className="no-child" />Adreslerim</a>
                                            </li>
                                            <li className="cat-item  current-cat">
                                                <a href="/log-out">
                                                    <span className="no-child" />
                                                    Çıkış yap
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="product_cat">
                                        <ul>
                                            <li className="cat-item">
                                                <a href="/siparislerim">
                                                    Siparişlerim</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PasswordUpdate