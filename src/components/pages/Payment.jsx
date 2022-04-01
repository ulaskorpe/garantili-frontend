import React, {useCallback, useMemo} from 'react';
import { useState } from "react"
import OrderReview from "../cart/OrderReview"
import BreadCrumb from "../layout/BreadCrumb"
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"
import {Formik, Form, Field, ErrorMessage} from "formik";
import useAuth from "../../store/hooks/useAuth";
import Select from "react-select";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {
    DEFAULT_API_KEY,
    fetchThis,
    GET_BANK_ACCOUNTS,
    GET_CARGO_COMPANIES, GET_INSTALLMENTS,
    PLACE_ORDER,
    retry,
    SHOW_ADDRESSES
} from "../../api";
import useBasket from "../../store/hooks/useBasket";
import sweetalert from "sweetalert";
import useRouterDOM from "../../hooks/useRouterDOM";

const initialInputValues = {
    customer_address_id: null,
    billing_address_id: null,
    empty_billing_address: true,
    payment_method: 0,
    name_surname: '',
    cc_no: '',
    expires_at: '',
    cvc: '',
    cargo_company_id: null,
    receipt: null,
    installments: null,
};

const SelectField = ({options, disabled, loading, field, form, onChange = () => null}) => {
    return (
        <Select
            options={options}
            name={field.name}
            value={options ? options.find(option => option.value === field.value) : ''}
            onChange={(option) => {
                form.setFieldValue(field.name, option.value)
                if (onChange && onChange?.call) onChange(option);
            }}
            onBlur={field.onBlur}
            isDisabled={disabled}
            isLoading={loading}
        />
    );
};

const INITIAL_INSTALLMENT_ELEM = {
    id: 0,
    title: 'Tek çekim',
    interestRate: 0,
}
let timer = null;
function Payment() {
    const [crumb] = useState([
        { url: '#', title: 'Ödeme' }
    ]);
    const queryClient = useQueryClient();
    const { go, goWithState } = useRouterDOM();
    const { account, isLogged = false } = useAuth();
    const [loading, setLoading] = useState(false);
    const { basketArray, clearLocalBasket } = useBasket();
    const [interestRate, setInterestRate] = useState(0);
    const [lastCCNo, setLastCCNo] = useState('');

    const itemCodes = useMemo(() => (
        basketArray.map((item) => item.item_code)
    ), [basketArray]);

    const addressesList = useQuery(
        [
            'adresses',
            account,
            isLogged,
        ],
        () => (
            fetchThis(
                SHOW_ADDRESSES,
                {
                    customer_id: account.customer_id.toString(),
                    page: 1,
                    page_count: 99999999,
                },
                DEFAULT_API_KEY,
                {}
            )
        ),
        {
            retry,
            refetchOnWindowFocus: false,
            enabled: isLogged,
        }
    );
    const getInstallments = useMutation({
        mutationFn: (data) => (
            fetchThis(
                GET_INSTALLMENTS,
                {
                    cc_no: data.cc_no,
                },
                DEFAULT_API_KEY,
                {}
            )
        ),
        retry: false,
        mutationKey: 'get-installments',
    })
    const cargoCompanies = useQuery(
        [
            'cargo_companies',
            account,
            isLogged,
        ],
        () => (
            fetchThis(
                GET_CARGO_COMPANIES,
                {
                    customer_id: account.customer_id.toString(),
                    page: 1,
                    page_count: 99999999,
                },
                DEFAULT_API_KEY,
                {}
            )
        ),
        {
            retry,
            refetchOnWindowFocus: false,
            enabled: isLogged,
        }
    );

    const setCCNo = useCallback((val) => {
        if (
            val.length === 16
            && val !== lastCCNo
        ) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

             timer = setTimeout(() => {
                 queryClient
                     .cancelQueries('get-installments')
                     .then(() => {
                         getInstallments.mutate({
                             cc_no: lastCCNo,
                         }, {
                             onSuccess: () => {
                                 setLastCCNo(val);
                             },
                         })
                     });
            }, 285);
        }
    }, [lastCCNo, getInstallments, queryClient]);
    const placeOrder = useMutation((data) => (
        fetchThis(
            PLACE_ORDER,
            {
                customer_id: data?.customer_id?.toString(),
                item_array: data?.item_array?.toString(),
                customer_address_id: data?.customer_address_id?.toString(),
                cargo_company_id: data?.cargo_company_id?.toString(),
                payment_method: data?.payment_method?.toString(),
                name_surname: data?.name_surname?.toString(),
                cc_no: data?.cc_no?.toString(),
                expires_at: data?.expires_at?.toString(),
                cvc: data?.cvc?.toString(),
                receipt: data?.receipt,
                installments: data?.installments,
            },
            DEFAULT_API_KEY,
            {}
        )
    ));
    const bankAccountList = useQuery(
        [
            'bank-accounts',
            isLogged,
        ],
        () => (
            fetchThis(
                GET_BANK_ACCOUNTS,
                {},
                DEFAULT_API_KEY,
                {}
            )
        ),
        {
            retry,
            refetchOnWindowFocus: false,
            enabled: isLogged,
        }
    );

    const addressesOption = useMemo(() => {
        if (!addressesList.isSuccess) return [];
        if (!addressesList?.data?.status) return [];

        return addressesList?.data?.data?.addresses.map((address) => ({
            label: `${address?.address_name ? `${address?.address_name} - ` : ''}${address?.combined_address}`,
            value: address?.id || -1,
            isDisabled: !Boolean(address?.id),
        }))
    }, [addressesList]);
    const cargoCompaniesOption = useMemo(() => {
        if (!cargoCompanies.isSuccess) return [];
        if (!cargoCompanies?.data?.status) return [];

        return cargoCompanies?.data?.data?.cargo_companies?.map((cargoCompany) => ({
            label: cargoCompany?.name,
            value: cargoCompany?.id || -1,
            isDisabled: !Boolean(cargoCompany?.id),
        }))
    }, [cargoCompanies]);
    const installmentOptions = useMemo(() => {
        const formatInstallments = (installments = []) => installments.map((installment) => ({
            label: `${installment?.title} ${installment?.interestRate ? `(+%${installment.interestRate})` : ''}`,
            value: (typeof installment?.id === 'undefined') ? -1 : installment.id,
            isDisabled: Boolean(typeof installment?.id === 'undefined'),
        }));
        const initialInstallments = [INITIAL_INSTALLMENT_ELEM];
        if (!getInstallments.isSuccess) return formatInstallments(initialInstallments);

        return [
            INITIAL_INSTALLMENT_ELEM,
            ...(
                Array.isArray(getInstallments?.data?.data)
                    ? getInstallments.data.data
                    : []
            ),
        ].map((installment) => ({
            label: `${installment?.title} ${installment?.interestRate ? `(+%${installment.interestRate})` : ''}`,
            value: (typeof installment?.id === 'undefined') || -1,
            isDisabled: Boolean(typeof installment?.id === 'undefined'),
        }))
    }, [getInstallments]);
    const inputsDisabled = useMemo(() => Boolean(
        loading
    ), [loading]);
    const addressesSelectBoxDisabled = useMemo(() => Boolean(
        !addressesList.isSuccess || inputsDisabled
    ), [addressesList, inputsDisabled]);
    const cargoCompaniesSelectBoxDisabled = useMemo(() => Boolean(
        !cargoCompanies.isSuccess || inputsDisabled
    ), [cargoCompanies, inputsDisabled]);
    const billingAddressDisabled = useCallback((billingAddressBlank = true) => Boolean(
        addressesSelectBoxDisabled || billingAddressBlank
    ), [addressesSelectBoxDisabled]);

    const bankAccounts = useMemo(() => {
        if (!bankAccountList.isSuccess) return [];
        if (!bankAccountList?.data?.status) return [];

        return ([
            { value: 0, label: 'Kredi kartı' },
            {
                label: 'Havale / EFT',
                options: (
                    bankAccountList?.data?.data?.bank_accounts.map((bank) => ({
                        label: bank.bank_name,
                        value: bank?.id || -1,
                        isDisabled: !Boolean(bank?.id),
                    })) || []
                )
            }
        ])
    }, [bankAccountList]);
    const banksSelectBoxDisabled = useMemo(() => Boolean(
        !bankAccountList.isSuccess || inputsDisabled
    ), [bankAccountList, inputsDisabled]);

    const getBankAccountItem = useCallback((id) => {
        if (!id) return {};
        if (!bankAccountList.isSuccess) return {};
        if (!bankAccountList?.data?.status) return {};

        return (
            bankAccountList?.data?.data?.bank_accounts.find((bank) => (bank.id === id)) || {}
        );
    }, [bankAccountList]);
    const validateForm = useCallback((values) => {
        const errors = {};
        const errorMessages = {
            required: 'Bu alan zorunlu!',
        }

        if (!values.cargo_company_id || !values?.cargo_company_id?.toString()?.length) {
            errors.cargo_company_id = errorMessages.required;
        }
        if (!values.customer_address_id || !values?.customer_address_id?.toString()?.length) {
            errors.customer_address_id = errorMessages.required;
        }
        if (!values.empty_billing_address) {
            if (!values.billing_address_id) {
                errors.billing_address_id = errorMessages.required;
            }
        }

        if (Number.isNaN(parseInt(values.payment_method))) {
            errors.payment_method = errorMessages.required;
        }

        if (values.payment_method.toString() === '0') {
            if (!values.name_surname || !values.name_surname?.toString()?.length) {
                errors.name_surname = errorMessages.required;
            }
            if (!values.cc_no || !values.cc_no?.toString()?.length) {
                errors.cc_no = errorMessages.required;
            }
            if (!values.expires_at || !values.expires_at?.toString()?.length) {
                errors.expires_at = errorMessages.required;
            }
            if (!values.cvc || !values.cvc?.toString()?.length) {
                errors.cvc = errorMessages.required;
            }
            if (!values.cargo_company_id || !values.cargo_company_id?.toString()?.length) {
                errors.cargo_company_id = errorMessages.required;
            }
        }
        else {
            if (
                values?.receipt
                && values?.receipt?.type
            ) {
                const imageRegexp = new RegExp(/^((image)\/)[\w]+$/, 'g');
                if (!(
                    values.receipt.type === 'application/pdf'
                    || imageRegexp.test(values.receipt.type)
                )) {
                    errors.receipt = 'Dosya tipi hatalı!';
                }
            } else {
                errors.receipt = errorMessages.required;
            }
        }

        return errors;
    }, []);
    const handleSubmit = useCallback((iValues, {
        setSubmitting,
    }) => {
        if (!isLogged) return;
        const values = JSON.parse(JSON.stringify(iValues));

        values.customer_id = account.customer_id?.toString();
        values.item_array = (itemCodes || []).join(',');
        values.customer_address_id = values.customer_address_id?.toString();
        values.delivery_address_id = values.delivery_address_id?.toString();
        values.cargo_company_id = values.cargo_company_id?.toString();
        values.payment_method = values.payment_method?.toString();
        values.name_surname = values.name_surname?.toString();
        values.cc_no = values.cc_no?.toString();
        values.expires_at = values.expires_at?.toString();
        values.cvc = values.cvc?.toString();
        values.receipt = iValues.receipt;
        values.installments = values?.installments?.toString();

        setSubmitting(true);
        setLoading(true);
        placeOrder?.mutate(values, {
            onSuccess: ({ status = false, order_id, errors = { msg: '' }}) => {
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
                    clearLocalBasket();
                    if (order_id) {
                        goWithState(
                            `/siparis-ozeti`,
                            { order_id },
                            false,
                        );
                    } else {
                        go(`/siparislerim`);
                    }
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
    }, [account, isLogged, itemCodes, placeOrder, clearLocalBasket, go,  goWithState]);

    const isLoading = useCallback((isSubmitting = false) => (
        loading || isSubmitting || placeOrder?.isLoading || !itemCodes?.length
    ), [loading, placeOrder, itemCodes]);
    const submitIsDisabled = useCallback((isSubmitting, errors = {}, values) => (
        isLoading(isSubmitting) || Boolean(Object.keys(errors).length) || Boolean(Object.keys(validateForm(values)).length) || !itemCodes?.length
    ), [isLoading, validateForm, itemCodes]);

    return (
        <div className="woocommerce-active single-product full-width normal">
            <div id="page" className="hfeed site">
                <TopBar />
                <HeaderMain />
            </div>
            <div id="content" className="site-content" tabIndex="-1">
                <div className="col-full">
                    <div className="row">
                        <BreadCrumb crumbs={crumb} />
                        <div id="primary" className="content-area">

                            <main className="site-main" id="main">
                                <div className="type-page hentry">
                                    <div className="entry-content">
                                        <div className="woocommerce">
                                            <Formik
                                                onSubmit={handleSubmit}
                                                initialValues={initialInputValues}
                                                validate={validateForm}
                                            >
                                                {({
                                                      setFieldValue,
                                                      isSubmitting,
                                                      errors,
                                                      values,
                                                      handleBlur,
                                                      touched,
                                                      setTouched,
                                                  }) => (
                                                    <Form className="checkout woocommerce-checkout" name="checkout">
                                                        <div id="customer_details" className="col2-set">
                                                            <div className="col-1">
                                                                <div className="woocommerce-billing-fields">
                                                                    <h3>Ödeme Yöntemi</h3>
                                                                    <div className="woocommerce-billing-fields__field-wrapper-outer">
                                                                        <div className="woocommerce-billing-fields__field-wrapper">
                                                                            <div className="form-group row col-md-12">
                                                                                <div className="col-xs-12 col-md-12">
                                                                                    <label>Ödeme yöntemi
                                                                                        <abbr title="required" className="required">*</abbr>
                                                                                    </label>
                                                                                    <br />
                                                                                    <span className="wpcf7-form-control-wrap first-name">
                                                                                    <Field
                                                                                        name={'payment_method'}
                                                                                        component={SelectField}
                                                                                        options={bankAccounts}
                                                                                        disabled={banksSelectBoxDisabled || isLoading(isSubmitting)}
                                                                                        loading={bankAccountList.isLoading}
                                                                                        onChange={() => {
                                                                                            if (values.receipt) {
                                                                                                setTouched({...touched, receipt: false});
                                                                                                setFieldValue("receipt", null);
                                                                                            }

                                                                                            setFieldValue('installments', null);
                                                                                            setTouched({...touched, installments: false});
                                                                                            setInterestRate(0)
                                                                                        }}
                                                                                    />
                                                                                        <ErrorMessage name="payment_method" />
                                                                                </span>
                                                                                </div>
                                                                            </div>
                                                                            {Boolean(
                                                                                typeof values.payment_method !== 'undefined'
                                                                                && values.payment_method === 0
                                                                            ) && (
                                                                                <>
                                                                                    <div className="form-group row col-md-12">
                                                                                        <div className="col-xs-12 col-md-6 mb-0">
                                                                                            <p className="mb-0 bold">
                                                                                                Lütfen kredi kartı bilgilerini giriniz.
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="form-group row col-md-12">
                                                                                        <div className="col-xs-12 col-md-6">
                                                                                            <label>
                                                                                                Kart Üstündeki İsim
                                                                                                <abbr title="required" className="required">*</abbr>
                                                                                            </label>
                                                                                            <br />
                                                                                            <Field
                                                                                                required
                                                                                                type="text"
                                                                                                aria-invalid="false"
                                                                                                aria-required="true"
                                                                                                className="input-text w-100"
                                                                                                size="40"
                                                                                                name="name_surname"
                                                                                                autoComplete="cc-name"
                                                                                                disabled={isLoading(isSubmitting)}
                                                                                            />
                                                                                            <br/>
                                                                                            <ErrorMessage name="name_surname" />
                                                                                        </div>
                                                                                        <div className="col-xs-12 col-md-6">
                                                                                            <label>
                                                                                                Kart Numarası
                                                                                                <abbr title="required" className="required">*</abbr>
                                                                                            </label>
                                                                                            <br />
                                                                                            <Field
                                                                                                required
                                                                                                type="text"
                                                                                                aria-invalid="false"
                                                                                                aria-required="true"
                                                                                                className="input-text w-100"
                                                                                                size="40"
                                                                                                maxLength="16"
                                                                                                name="cc_no"
                                                                                                autoComplete="cc-number"
                                                                                                disabled={isLoading(isSubmitting)}
                                                                                                onChange={(e) => {
                                                                                                    setFieldValue('cc_no', e.target.value);
                                                                                                    setCCNo(e.target.value)
                                                                                                }}
                                                                                            />
                                                                                            <br/>
                                                                                            <ErrorMessage name="cc_no" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="form-group row col-md-12">
                                                                                        <div className="col-xs-12 col-md-6">
                                                                                            <label>
                                                                                                Son Kullanım Tarihi
                                                                                                <abbr title="required" className="required">*</abbr>
                                                                                            </label>
                                                                                            <br />
                                                                                            <Field
                                                                                                required
                                                                                                type="text"
                                                                                                aria-invalid="false"
                                                                                                aria-required="true"
                                                                                                className="input-text w-100"
                                                                                                size="40"
                                                                                                name="expires_at"
                                                                                                autoComplete="cc-exp"
                                                                                                placeholder="MMYY"
                                                                                                maxLength="4"
                                                                                                disabled={isLoading(isSubmitting)}
                                                                                            />
                                                                                            <br/>
                                                                                            <ErrorMessage name="expires_at" />
                                                                                        </div>
                                                                                        <div className="col-xs-12 col-md-6">
                                                                                            <label>
                                                                                                CVC
                                                                                                <abbr title="required" className="required">*</abbr>
                                                                                            </label>
                                                                                            <br />
                                                                                            <Field
                                                                                                required
                                                                                                type="text"
                                                                                                aria-invalid="false"
                                                                                                aria-required="true"
                                                                                                className="input-text w-100"
                                                                                                size="40"
                                                                                                maxLength="3"
                                                                                                name="cvc"
                                                                                                autoComplete="cc-csc"
                                                                                                disabled={isLoading(isSubmitting)}
                                                                                            />
                                                                                            <br/>
                                                                                            <ErrorMessage name="cvc" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="form-group row col-md-12">
                                                                                        <div className="col-xs-12 col-md-12">
                                                                                            <label>Taksit sayısı
                                                                                                <abbr title="required" className="required">*</abbr>
                                                                                            </label>
                                                                                            <br />
                                                                                            <span className="wpcf7-form-control-wrap first-name">
                                                                                    <Field
                                                                                        name={'installments'}
                                                                                        component={SelectField}
                                                                                        options={installmentOptions}
                                                                                        disabled={Boolean(
                                                                                            banksSelectBoxDisabled
                                                                                            || isLoading(isSubmitting)
                                                                                            || !values.cc_no
                                                                                            || !(values.cc_no.length === 16)
                                                                                        )}
                                                                                        loading={getInstallments.isLoading}
                                                                                        onChange={(installment) => {
                                                                                            const newVal = installment.interestRate || 0;
                                                                                            if (interestRate !== newVal) setInterestRate(newVal);
                                                                                        }}
                                                                                    />
                                                                                        <ErrorMessage name="installments" />
                                                                                </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            )}
                                                                            {Boolean(
                                                                                typeof values.payment_method !== 'undefined'
                                                                                && values.payment_method > 0
                                                                            ) && (
                                                                                <>
                                                                                    <div className="form-group row col-md-12">
                                                                                        <div className="col-xs-12 col-md-12">
                                                                                            <div className="woocommerce-order">
                                                                                                <p className="woocommerce-notice woocommerce-notice--warning woocommerce-thankyou-order-received">
                                                                                                    Lütfen ödemeyi aşağıdaki hesaba yapın, ödemenin de dekontunu belirtilen alana yükleyin.
                                                                                                </p>
                                                                                            </div>
                                                                                            <ul className="woocommerce-order-overview woocommerce-thankyou-order-details order_details">
                                                                                                <li className="woocommerce-order-overview__order order">
                                                                                                    Banka adı
                                                                                                    <strong>{getBankAccountItem(values?.payment_method)?.bank_name}</strong>
                                                                                                </li>
                                                                                                <li className="woocommerce-order-overview__date date">
                                                                                                    Şube:
                                                                                                    <strong>{getBankAccountItem(values?.payment_method)?.branch}</strong>
                                                                                                </li>
                                                                                                <li className="woocommerce-order-overview__order order">
                                                                                                    IBAN
                                                                                                    <strong>{getBankAccountItem(values?.payment_method)?.iban}</strong>
                                                                                                </li>
                                                                                                <li className="woocommerce-order-overview__date date">
                                                                                                    Hesap Numarası:
                                                                                                    <strong>{getBankAccountItem(values?.payment_method)?.account_number}</strong>
                                                                                                </li>
                                                                                                <li className="woocommerce-order-overview__date date">
                                                                                                    Hesap Adı:
                                                                                                    <strong>{getBankAccountItem(values?.payment_method)?.name_surname}</strong>
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div className="col-xs-12 col-md-12">
                                                                                            <label>
                                                                                                Dekont
                                                                                                <abbr title="required" className="required">*</abbr>
                                                                                            </label>
                                                                                            <br />
                                                                                            <input
                                                                                                required
                                                                                                type="file"
                                                                                                accept="image/*,.pdf"
                                                                                                aria-invalid="false"
                                                                                                aria-required="true"
                                                                                                className="input-text w-100"
                                                                                                size="40"
                                                                                                name="receipt"
                                                                                                placeholder="item"
                                                                                                onBlur={handleBlur}
                                                                                                onChange={(event) => {
                                                                                                    setFieldValue("receipt", event.currentTarget.files[0]);
                                                                                                }}
                                                                                            />
                                                                                            <br/>
                                                                                            <div style={{ display: 'block', padding: '10px 0', width: '100%', boxSizing: 'border-box' }}>
                                                                                                <ErrorMessage name="receipt" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-1">
                                                                <div className="woocommerce-billing-fields">
                                                                    <h3>Adres</h3>
                                                                    <div className="woocommerce-billing-fields__field-wrapper-outer">
                                                                        <div className="woocommerce-billing-fields__field-wrapper">
                                                                            <div className="form-group row col-md-12">
                                                                                <div className="col-xs-12 col-md-12">
                                                                                    <label>Teslimat adresi
                                                                                        <abbr title="required" className="required">*</abbr>
                                                                                    </label>
                                                                                    <br />
                                                                                    <span className="wpcf7-form-control-wrap first-name">
                                                                                    <Field
                                                                                        name="customer_address_id"
                                                                                        component={SelectField}
                                                                                        options={addressesOption}
                                                                                        disabled={addressesSelectBoxDisabled || isLoading(isSubmitting)}
                                                                                        loading={addressesList.isLoading}
                                                                                    />
                                                                                            <ErrorMessage name="customer_address_id" />
                                                                                </span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group row col-md-12">
                                                                                <div className="col-xs-12 col-md-12">
                                                                                    <label>Fatura adresi
                                                                                        <abbr title="required" className="required">*</abbr>
                                                                                    </label>
                                                                                    <br />
                                                                                    <span className="wpcf7-form-control-wrap first-name">
                                                                                    <Field
                                                                                        name="billing_address_id"
                                                                                        component={SelectField}
                                                                                        options={addressesOption}
                                                                                        disabled={billingAddressDisabled(values.empty_billing_address) || isLoading(isSubmitting)}
                                                                                        loading={!values.empty_billing_address && addressesList.isLoading}
                                                                                    />
                                                                                        <ErrorMessage name="billing_address_id" />
                                                                                </span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group row col-md-12">
                                                                                <div className="col-xs-12 col-md-12">
                                                                                    <label
                                                                                        htmlFor="empty_billing_address"
                                                                                        className="woocommerce-form__label woocommerce-form__label-for-checkbox inline"
                                                                                    >
                                                                                        <Field
                                                                                            id="empty_billing_address"
                                                                                            name="empty_billing_address"
                                                                                            className="woocommerce-form__input woocommerce-form__input-checkbox"
                                                                                            type="checkbox"
                                                                                            disabled={isLoading(isSubmitting)}
                                                                                        />
                                                                                        Fatura, teslimat adresine kesilsin.
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group row col-md-12">
                                                                                <div className="col-xs-12 col-md-12">
                                                                                    <label>Kargo Şirketi
                                                                                        <abbr title="required" className="required">*</abbr>
                                                                                    </label>
                                                                                    <br />
                                                                                    <span className="wpcf7-form-control-wrap first-name">
                                                                                    <Field
                                                                                        name="cargo_company_id"
                                                                                        component={SelectField}
                                                                                        options={cargoCompaniesOption}
                                                                                        disabled={cargoCompaniesSelectBoxDisabled || isLoading(isSubmitting)}
                                                                                        loading={cargoCompanies.isLoading}
                                                                                    />
                                                                                        <ErrorMessage name="cargo_company_id" />
                                                                                </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <OrderReview
                                                            disabled={submitIsDisabled(isSubmitting, errors, values)}
                                                            interestRate={interestRate}
                                                        />
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                            </main>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Payment