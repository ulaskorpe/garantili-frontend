import "react-datepicker/dist/react-datepicker.css";
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"
import BreadCrumb from "../layout/BreadCrumb"
import {Formik, Form, Field, ErrorMessage} from "formik";
import DatePickerField from "../fields/DatePickerField";
import PhoneInputField from "../fields/PhoneInputField";
import sweetalert from "sweetalert";
import {useAuth} from "../../context";
import {useMutation} from "react-query";
import {CUSTOMER_UPDATE, DEFAULT_API_KEY, fetchThis} from "../../api";
import {useLocation, useNavigate} from "react-router-dom";
import moment from "moment";

const initialFormValues = {
    name: '',
    surname: '',
    gender: '',
    birthdate: '',
    email: '',
    phone: '+90',
};
const dateFormatMoment = 'dd/MM/yyyy';
const dateFormatComp = 'dd/MM/yyyy';
function MemberInformations(props) {
    const { basket, removeFromBasket } = props;

    const formikRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const { state: account, isLogged = false, update } = useAuth();
    const [loading, setLoading] = useState(false);
    const [crumb] = useState([
        { url: '#', title: 'Üyelik Bilgilerim' }
    ]);

    const updateCustomerMutation = useMutation((data) => (
        fetchThis(
            CUSTOMER_UPDATE,
            data,
            DEFAULT_API_KEY,
            {},
        )
    ));

    const isLoading = useCallback((isSubmitting = false) => (
        loading || isSubmitting || updateCustomerMutation?.isLoading
    ), [loading, updateCustomerMutation]);
    const submitIsDisabled = useCallback((isSubmitting, errors = {}, values, validator) => (
        isLoading(isSubmitting) || Boolean(Object.keys(errors).length) || Boolean(Object.keys(validator(values)).length)
    ), [isLoading]);

    const handleSubmit = useCallback((iValues, {
        setSubmitting,
        resetForm
    }) => {
        if (!isLogged) return;
        const values = JSON.parse(JSON.stringify(iValues));

        values.customer_id = parseInt(account.customer_id);
        values.gender = !values.gender || values.gender === '' ? null : values.gender;

        setSubmitting(true);
        setLoading(true);
        updateCustomerMutation?.mutate(values, {
            onSuccess: ({ status = false, errors = { msg: '' }, data = {}}) => {
                if (!status) {
                    sweetalert({
                        icon: 'error',
                        title: 'Hata',
                        text: errors?.msg || 'Bilinmeyen bir hata ile karşılaşıldı!',
                        button: null,
                    }).then();
                } else {
                    sweetalert({
                        icon: 'success',
                        title: 'Başarılı',
                        text: 'Bilgilerin başarıyla güncellendi.',
                        button: null,
                    }).then(() => {
                        update(values);
                    });
                }
                setSubmitting(false);
                setLoading(false);
            },
            onError: (error, data) => {
                sweetalert({
                    icon: 'error',
                    title: 'Hata',
                    text: error?.message || error || 'Bilinmeyen bir hata ile karşılaşıldı!',
                    button: null,
                }).then();
                setSubmitting(false);
                setLoading(false);
            },
        });
    }, [account, isLogged]);

    const validateForm = (values) => {
        const errors = {};
        const errorMessages = {
            required: 'Bu alan zorunlu!',
        }

        if (!values.name) {
            errors.name = errorMessages.required;
        }
        if (!values.surname) {
            errors.surname = errorMessages.required;
        }
        if (!values.birthdate) {
            errors.birthdate = errorMessages.required;
        }
        if (!values.email) {
            errors.email = errorMessages.required;
        }
        if (!values.phone) {
            errors.phone = errorMessages.required;
        } else if (values.phone.length !== 13) {
            errors.phone = 'Hatalı telefon numarası!';
        }

        return errors;
    }

    useEffect(() => {
        if (
            isLogged
            && formikRef
            && formikRef.current
            && formikRef.current.setFieldValue
        ) {
            formikRef.current.setFieldValue(
                'name',
                account?.name || initialFormValues.name,
            );
            formikRef.current.setFieldValue(
                'surname',
                account?.surname || initialFormValues.surname,
            );
            formikRef.current.setFieldValue(
                'gender',
                account?.gender || initialFormValues.gender,
            );
            let birthDate = initialFormValues.birthdate;
            if (account?.birthdate) {
                const dm = moment(account.birthdate);
                if (dm.isValid()) {
                    birthDate = new Date(dm.toDate());
                }
            }
            formikRef.current.setFieldValue(
                'birthdate',
                birthDate,
            );
            formikRef.current.setFieldValue(
                'email',
                account?.email || initialFormValues.email,
            );
            formikRef.current.setFieldValue(
                'phone',
                account?.phone || initialFormValues.phone,
            );
        }
    }, [isLogged, account, formikRef])

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

    }, [isLogged]);

    return (
        <div className="woocommerce-active left-sidebar">
            <div id="page" className="hfeed site">
                <TopBar />
                <HeaderMain basket={basket}
                    onRemoveBasket={removeFromBasket}
                />
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
                                                    <h2 className="contact-page-title">Üyelik Bilgilerim</h2>
                                                </div>
                                                <div className="contact-form">
                                                    <div role="form" className="wpcf7" id="wpcf7-f425-o1" lang="en-US" dir="ltr">
                                                        <div className="screen-reader-response" />
                                                        <Formik
                                                            innerRef={formikRef}
                                                            initialValues={initialFormValues}
                                                            onSubmit={handleSubmit}
                                                            validate={validateForm}
                                                        >
                                                            {({
                                                                  isSubmitting,
                                                                  errors,
                                                                  handleBlur,
                                                                  setFieldValue,
                                                                  touched,
                                                                  values,
                                                                  setTouched,
                                                              }) => (
                                                                <Form className="wpcf7-form">
                                                                    <div className="form-group row">
                                                                        <div className="col-xs-12 col-md-6">
                                                                            <label>
                                                                                Adınız
                                                                                <abbr title="required" className="required">*</abbr>
                                                                            </label>
                                                                            <br />
                                                                            <div className="wpcf7-form-control-wrap first-name">
                                                                                <Field
                                                                                    disabled={isLoading(isSubmitting)}
                                                                                    aria-invalid="false"
                                                                                    aria-required="true"
                                                                                    type="text"
                                                                                    name="name"
                                                                                    size="40"
                                                                                    className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                />
                                                                                <ErrorMessage name="name" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xs-12 col-md-6">
                                                                            <label>
                                                                                Soyadınız
                                                                                <abbr title="required" className="required">*</abbr>
                                                                            </label>
                                                                            <br />
                                                                            <div className="wpcf7-form-control-wrap last-name">
                                                                                <Field
                                                                                    disabled={isLoading(isSubmitting)}
                                                                                    aria-invalid="false"
                                                                                    aria-required="true"
                                                                                    type="text"
                                                                                    name="surname"
                                                                                    size="40"
                                                                                    className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                />
                                                                                <ErrorMessage name="surname" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-group row">
                                                                        <div className="col-xs-12 col-md-6">
                                                                            <label>
                                                                                Doğum Tarihi
                                                                                <abbr title="required" className="required">*</abbr>
                                                                            </label>
                                                                            <div className="wpcf7-form-control-wrap last-name">
                                                                                <DatePickerField
                                                                                    disabled={isLoading(isSubmitting)}
                                                                                    dateFormat={dateFormatComp}
                                                                                    name="birthdate"
                                                                                    aria-invalid="false"
                                                                                    aria-required="true"
                                                                                    size="40"
                                                                                    className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                />
                                                                                <ErrorMessage name="birthdate" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xs-12 col-md-6">
                                                                            <label>
                                                                                Cinsiyet
                                                                            </label>
                                                                            <div className="wpcf7-form-control-wrap first-name">
                                                                                <Field
                                                                                    disabled={isLoading(isSubmitting)}
                                                                                    as="select"
                                                                                    name="gender"
                                                                                    className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                >
                                                                                    <option value="">Belirtilmedi</option>
                                                                                    <option value="1">Erkek</option>
                                                                                    <option value="2">Kadın</option>
                                                                                </Field>
                                                                                <ErrorMessage name="gender" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-group row">
                                                                        <div className="col-xs-12 col-md-6">
                                                                            <label>E-Posta
                                                                                <abbr title="required" className="required">*</abbr>
                                                                            </label>
                                                                            <br />
                                                                            <div className="wpcf7-form-control-wrap first-name">
                                                                                <Field
                                                                                    disabled={isLoading(isSubmitting)}
                                                                                    name="email"
                                                                                    type="email"
                                                                                    aria-invalid="false"
                                                                                    aria-required="true"
                                                                                    size="40"
                                                                                    className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                />
                                                                                <ErrorMessage name="email" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xs-12 col-md-6">
                                                                            <label>Telefon
                                                                                <abbr title="required" className="required">*</abbr>
                                                                            </label>
                                                                            <br />
                                                                            <div className="wpcf7-form-control-wrap last-name">
                                                                                <PhoneInputField
                                                                                    disabled={isLoading(isSubmitting)}
                                                                                    form={{ errors, handleBlur, setFieldValue, touched, setTouched, }}
                                                                                    field={{ name: 'phone', value: values.phone }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-group clearfix">
                                                                        <p>
                                                                            <input
                                                                                disabled={submitIsDisabled(isSubmitting, errors, values, validateForm)}
                                                                                type="submit"
                                                                                value="Kaydet"
                                                                                className="wpcf7-form-control wpcf7-submit btn-navy"
                                                                            />
                                                                        </p>
                                                                    </div>
                                                                    <div className="wpcf7-response-output wpcf7-display-none" />
                                                                </Form>
                                                            )}
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
                                                    <span className="no-child"></span><strong>Üyelik Bilgilerim</strong></a>
                                            </li>
                                            <li className="cat-item">
                                                <a href="/sifre-guncelleme">
                                                    <span className="no-child"></span>Şifre Güncelleme</a>
                                            </li>
                                            <li className="cat-item  current-cat">
                                                <a href="/adreslerim">
                                                    <span className="no-child"></span>Adres Bilgilerim</a>
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

export default MemberInformations