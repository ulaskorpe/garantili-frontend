import React, {useCallback, useState} from 'react';
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import TopBar from "../layout/TopBar";
import {useMutation, useQuery} from "react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {CONTACT_POST, DEFAULT_API_KEY, fetchThis, GET_CONTACT_INFO, retry} from "../../api";
import useAuth from "../../store/hooks/useAuth";
import sweetalert from "sweetalert";

const initialFormValues = {
    name: '',
    surname: '',
    email: '',
    phone_number: '',
    subject: '',
    message: '',
};

export default function Contact() {
    const crumbs = [
        { url: '#', title: 'İletişim' }
    ];
    const [loading, setLoading] = useState(false);
    const {
        userId,
        isGuest,
        isUser,
    } = useAuth();

    const getContactDetail = useQuery(
        [
            'contact-information'
        ],
        () => (
            fetchThis(
                GET_CONTACT_INFO,
                {},
                DEFAULT_API_KEY,
                {},
            )
        ),
        {
            retry,
            refetchOnWindowFocus: false,
        }
    );

    const send = useMutation({
        mutationFn: (data) => (
            fetchThis(
                CONTACT_POST,
                {
                    customer_id: isUser ? userId : '0',
                    guid: isGuest ? userId : '',
                    ...data,
                },
                DEFAULT_API_KEY,
                {}
            )
        ),
        retry,
    });

    const handleSubmit = useCallback((iValues, {
        setSubmitting,
        resetForm,
    }) => {
        const values = JSON.parse(JSON.stringify(iValues));

        setSubmitting(true);
        setLoading(true);
        send?.mutate(values, {
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
                        text: 'Mesajınız gönderildi.',
                        button: {
                            text: 'Tamam',
                        },
                    }).then(() => {
                        resetForm();
                        send.reset();
                    });
                }
                setSubmitting(false);
                setLoading(false);
            },
            onError: (error) => {
                sweetalert({
                    icon: 'error',
                    title: 'Hata',
                    text: error?.message || error || 'Bilinmeyen bir hata ile karşılaşıldı!',
                    button: {
                        text: 'Tamam',
                    },
                }).then();
                setSubmitting(false);
                setLoading(false);
            },
        });
    }, [send]);

    const validateForm = useCallback((values) => {
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
        if (!values.email) {
            errors.email = errorMessages.required;
        }
        if (!values.phone_number) {
            errors.phone_number = errorMessages.required;
        }
        if (!values.subject) {
            errors.subject = errorMessages.required;
        }
        if (!values.message) {
            errors.message = errorMessages.required;
        }
        return errors;
    }, []);

    const isLoading = useCallback((isSubmitting = false) => (
        loading || isSubmitting || send?.isLoading
    ), [loading, send]);
    const submitIsDisabled = useCallback((isSubmitting, errors = {}, values) => (
        isLoading(isSubmitting) || Boolean(Object.keys(errors).length) || Boolean(Object.keys(validateForm(values)).length)
    ), [isLoading, validateForm]);

    return (
        <div className="woocommerce-active single-product full-width normal">
            <div id="page" className="hfeed site">
                <TopBar />
                <HeaderMain />
            </div>
            <div id="content" className="site-content" tabIndex="-1">
                <div className="col-full">
                    <div className="row">
                        <BreadCrumb crumbs={crumbs} />
                        <div id="primary" className="content-area">
                            <main id="main" className="site-main">
                                <div className="type-page hentry">
                                    <header className="entry-header border-no">
                                        <div className="page-header-caption border-no text-center">
                                            <h1 className="entry-title border-no">
                                                {getContactDetail.isSuccess && (
                                                    getContactDetail?.data?.data?.title
                                                )}
                                            </h1>
                                        </div>
                                    </header>
                                    <div className="entry-content">
                                        <br />
                                        <div className="track-order w-100 text-center">
                                        <p className="w-80 text-center ml-auto">
                                            {getContactDetail.isSuccess && (
                                                getContactDetail?.data?.data?.description
                                            )}
                                        </p>
                                        <br />
                                        <br />
                                        </div>
                                        <div className="stretch-full-width-map">
                                            {getContactDetail.isSuccess && (
                                                <iframe
                                                    title="Map"
                                                    src={getContactDetail?.data?.data?.mapUrl}
                                                    width="600"
                                                    height="450"
                                                    loading="lazy"
                                                    allowFullScreen
                                                />
                                            )}

                                        </div>
                                        <div className="row contact-info">
                                            <div className="col-md-9 left-col">
                                                <div className="text-block">
                                                    <h2 className="contact-page-title">Bize mesaj bırakın</h2>
                                                </div>
                                                <div className="contact-form">
                                                    <div role="form" className="wpcf7" id="wpcf7-f425-o1" lang="en-US" dir="ltr">
                                                        <div className="screen-reader-response" />
                                                        <Formik
                                                            initialValues={initialFormValues}
                                                            onSubmit={handleSubmit}
                                                            validate={validateForm}
                                                        >
                                                            {({
                                                                handleSubmit,
                                                                isSubmitting,
                                                                errors,
                                                                values,
                                                                handleChange,
                                                                handleBlur,
                                                              }) => (
                                                                <Form
                                                                    className="wpcf7-form"
                                                                    noValidate="novalidate"
                                                                    onSubmit={handleSubmit}
                                                                >
                                                                    <div className="form-group row">
                                                                        <div className="col-xs-12 col-md-6">
                                                                            <label>Adınız
                                                                                <abbr title="required" className="required">*</abbr>
                                                                            </label>
                                                                            <br />
                                                                            <span className="wpcf7-form-control-wrap first-name">
                                                                        <Field
                                                                            type="text"
                                                                            aria-invalid="false"
                                                                            aria-required="true"
                                                                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                            size="40"
                                                                            name="name"
                                                                            disabled={isLoading(isSubmitting)}
                                                                        />
                                                                                <ErrorMessage name="name" />
                                                                    </span>
                                                                        </div>
                                                                        <div className="col-xs-12 col-md-6">
                                                                            <label>Soyadınız
                                                                                <abbr title="required" className="required">*</abbr>
                                                                            </label>
                                                                            <br />
                                                                            <span className="wpcf7-form-control-wrap last-name">
                                                                        <Field type="text" aria-invalid="false" aria-required="true"
                                                                               className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                               size="40" name="surname"
                                                                               disabled={isLoading(isSubmitting)}
                                                                        />
                                                                                <ErrorMessage name="surname" />
                                                                    </span>
                                                                        </div>

                                                                    </div>
                                                                    <div className="form-group row">
                                                                        <div className="col-xs-12 col-md-6">
                                                                            <label>E-posta
                                                                                <abbr title="required" className="required">*</abbr>
                                                                            </label>
                                                                            <br />
                                                                            <span className="wpcf7-form-control-wrap first-name">
                                                                        <Field
                                                                            type="email"
                                                                            aria-invalid="false"
                                                                            aria-required="true"
                                                                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                            size="40"
                                                                            name="email"
                                                                            disabled={isLoading(isSubmitting)}
                                                                        />
                                                                                <ErrorMessage name="email" />
                                                                    </span>
                                                                        </div>
                                                                        <div className="col-xs-12 col-md-6">
                                                                            <label>Telefon Numarası
                                                                                <abbr title="required" className="required">*</abbr>
                                                                            </label>
                                                                            <br />
                                                                            <span className="wpcf7-form-control-wrap last-name">
                                                                        <Field type="phone" aria-invalid="false" aria-required="true"
                                                                               className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                               size="40" name="phone_number"
                                                                               disabled={isLoading(isSubmitting)}
                                                                        />
                                                                                <ErrorMessage name="phone_number" />
                                                                    </span>
                                                                        </div>

                                                                    </div>

                                                                    <div className="form-group">
                                                                        <label>Konu</label>
                                                                        <br />
                                                                        <span className="wpcf7-form-control-wrap subject">
                                                                    <Field type="text" aria-invalid="false"
                                                                           className="wpcf7-form-control wpcf7-text input-text" size="40"
                                                                           disabled={isLoading(isSubmitting)}
                                                                           name="subject" />
                                                                            <ErrorMessage name="subject" />
                                                                </span>
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <label>Mesajınız</label>
                                                                        <br />
                                                                        <span className="wpcf7-form-control-wrap your-message">
                                                                    <textarea
                                                                        aria-invalid="false"
                                                                        className="wpcf7-form-control wpcf7-textarea"
                                                                        rows="10"
                                                                        cols="40"
                                                                        name="message"
                                                                        disabled={isLoading(isSubmitting)}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.message}
                                                                    />
                                                                            <ErrorMessage name="message" />
                                                                </span>
                                                                    </div>

                                                                    <div className="form-group clearfix">
                                                                        <p>
                                                                            <input
                                                                                type="submit"
                                                                                value="Mesaj Gönder"
                                                                                className="wpcf7-form-control wpcf7-submit"
                                                                                disabled={submitIsDisabled(isSubmitting, errors, values)}
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

                                            <div className="col-md-3 store-info">
                                                <div className="text-block">
                                                    <h2 className="contact-page-title">Merkez</h2>
                                                    {getContactDetail.isSuccess && (
                                                        <address
                                                            dangerouslySetInnerHTML={{ __html: getContactDetail?.data?.data?.corp?.address }}
                                                        />
                                                    )}
                                                    <h3>Çalışma Saatleri</h3>
                                                    <ul className="list-unstyled operation-hours inner-right-md">
                                                        {getContactDetail.isSuccess && (
                                                            getContactDetail?.data?.data?.workHours?.map((workHour, workHourIDX) => (
                                                                <li className="clearfix" key={`work_hour_${workHourIDX}`}>
                                                                    <span className="day">{workHour.day}:</span>
                                                                    <span className="pull-right flip hours">{workHour.str}</span>
                                                                </li>
                                                            ))
                                                        )}
                                                    </ul>
                                                    <h3>İletişim</h3>
                                                    {Boolean(getContactDetail.isSuccess && getContactDetail?.data?.data?.corp?.contact?.email) && (
                                                        <p className="inner-right-md">
                                                            E-Posta:
                                                            <a href={`mailto:${getContactDetail?.data?.data?.corp?.contact?.email}`}>
                                                                {getContactDetail?.data?.data?.corp?.contact?.email}
                                                            </a>
                                                        </p>
                                                    )}
                                                    {Boolean(getContactDetail.isSuccess && getContactDetail?.data?.data?.corp?.contact?.tel) && (
                                                        <p className="inner-right-md">
                                                            Telefon Numarası:
                                                            <a href={`tel:${getContactDetail?.data?.data?.corp?.contact?.tel}`}>
                                                                {getContactDetail?.data?.data?.corp?.contact?.tel}
                                                            </a>
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </div >
    )
}