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
    CALC_INSTALLMENT_FEE,
    DEFAULT_API_KEY,
    fetchThis,
    GET_BANK_ACCOUNTS, GET_BANK_LIST,
    GET_CARGO_COMPANIES, GET_CITIES, GET_INSTALLMENTS, GET_ORDER_CODE,
    PLACE_ORDER,
    retry,
    SHOW_ADDRESSES
} from "../../api";
import useBasket from "../../store/hooks/useBasket";
import sweetalert from "sweetalert";
import useRouterDOM from "../../hooks/useRouterDOM";

const initialInputValues = {
    customer_address_id: null,
    invoice_address_id: null,
    installment_fee: null,
    empty_billing_address: true,
    payment_method: 0,
    bank_id: null,
    name_surname: '',
    cc_no: '',
    expires_at: '',
    cvc: '',
    cargo_company_id: null,
    receipt: null,
    installments: null,
    // delivery
    delivery_full_name: '',
    delivery_city_id: '',
    delivery_phone: '',
    delivery_address: '',
    // invoice
    invoice_full_name: '',
    invoice_city_id: '',
    invoice_phone: '',
    invoice_address: '',
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
    value: 1,
    title: 'Tek çekim',
}
let timer = null;
let timer2 = null;
function Payment() {
    const [crumb] = useState([
        { url: '#', title: 'Ödeme' }
    ]);
    const queryClient = useQueryClient();
    const { go, goEvent, goWithState } = useRouterDOM();
    const { account, isLogged = false, isUser = false, isGuest } = useAuth();
    const [loading, setLoading] = useState(false);
    const { clearLocalBasket, totalPrice } = useBasket();
    const [installmentFee, setInstallmentFee] = useState(0);
    const [lastBank, setLastBank] = useState('');

    const getOrderCode = useQuery(
        [
            'get-order-code',
            isGuest,
            isUser,
            account,
        ],
        () => {
            return fetchThis(
                GET_ORDER_CODE,
                {
                    customer_id: isUser ? account?.customer_id?.toString() : '',
                    guid: isGuest ? account?.customer_id?.toString() : '',
                },
                DEFAULT_API_KEY,
                {},
            );
        },
        {
            refetchOnWindowFocus: false,
        }
    );
    const getCities =  useQuery(
        ['get-cities'],
        () => {
            return fetchThis(
                GET_CITIES,
                {},
                DEFAULT_API_KEY,
                {},
            );
        },
        {
            refetchOnWindowFocus: false,
        }
    );

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
                {},
                DEFAULT_API_KEY,
                { bank_id: data.bank_id.toString() }
            )
        ),
        retry: false,
        mutationKey: 'get-installments',
    });
    const calcInstallmentFee = useMutation({
        mutationFn: (data) => {
            return fetchThis(
                CALC_INSTALLMENT_FEE,
                {
                    banka_id: data?.bank_id?.toString(),
                    taksit: data?.installment?.toString(),
                    tutar: data?.total?.toString(),
                },
                DEFAULT_API_KEY,
                {}
            );
        },
        retry: false,
        mutationKey: 'calc-installment-fee',
    });
    const cargoCompanies = useQuery(
        [
            'cargo_companies',
        ],
        () => (
            fetchThis(
                GET_CARGO_COMPANIES,
                {
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
        }
    );
    const banks = useQuery(
        [
            'banks',
        ],
        () => (
            fetchThis(
                GET_BANK_LIST,
                {},
                DEFAULT_API_KEY,
                {}
            )
        ),
        {
            retry,
            refetchOnWindowFocus: false,
        }
    );

    const handleChangeBank = useCallback((val) => {
        if (
            val.value
            && JSON.stringify(val) !== JSON.stringify(lastBank)
        ) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

             timer = setTimeout(() => {
                 queryClient
                     .cancelQueries('banks')
                     .then(() => {
                         getInstallments.mutate({
                             bank_id: val.value,
                         }, {
                             onSuccess: () => {
                                 setLastBank(val);
                             },
                         })
                     });
            }, 285);
        }
    }, [lastBank, getInstallments, queryClient]);
    const handleChangeInstallment = useCallback((
        installment,
        bank_id,
        total,
    ) => {
        if (
            installment
            && ((installmentFee && installmentFee.installment) ? installment?.toString() !== installmentFee.installment?.toString() : true)
        ) {
            if (timer2) {
                clearTimeout(timer2);
                timer2 = null;
            }

            timer2 = setTimeout(() => {
                queryClient
                    .cancelQueries('calc-installment-fee')
                    .then(() => {
                        calcInstallmentFee.mutate({
                            bank_id,
                            total,
                            installment,
                        }, {
                            onSuccess: ({data}) => {
                                if (data?.tutar) setInstallmentFee({
                                    installment,
                                    fee: data?.tutar,
                                    ...data,
                                });
                            },
                        })
                    });
            }, 285);
        }
    }, [calcInstallmentFee, queryClient, installmentFee]);
    const placeOrder = useMutation((data) => (
        fetchThis(
            PLACE_ORDER,
            {
                order_code: data?.order_code?.toString(),
                customer_id: data?.customer_id?.toString(),
                guid: data?.guid?.toString(),
                customer_address_id: data?.customer_address_id?.toString(),
                invoice_address_id: data?.invoice_address_id?.toString(),
                cargo_company_id: data?.cargo_company_id?.toString(),

                amount: data?.amount?.toString(),
                payment_method: data?.payment_method?.toString(),
                receipt: data?.receipt,

                delivery_full_name: data?.delivery_full_name,
                delivery_city_id: data?.delivery_city_id,
                delivery_phone: data?.delivery_phone,
                delivery_address: data?.delivery_address,

                invoice_full_name: data?.invoice_full_name,
                invoice_address: data?.invoice_address,
                invoice_phone: data?.invoice_phone,
                invoice_city_id: data?.invoice_city_id,
            },
            DEFAULT_API_KEY,
            {}
        )
    ));
    const bankAccountList = useQuery(
        [
            'bank-accounts',
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
        }
    );

    const banksOption = useMemo(() => {
        if (!banks.isSuccess) return [];
        if (!banks?.data?.status) return [];

        return banks?.data?.data?.bankalar.map(({ bank_name, bank_id }) => ({
            label: bank_name,
            value: bank_id,
        }))
    }, [banks]);

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

        let val = (
            Array.isArray(getInstallments?.data?.data?.purchases)
                ? getInstallments?.data?.data?.purchases
                : []
        ).filter((value)=> value.toString() !== "1")
            .map((value) => ({value}));

        return [
            INITIAL_INSTALLMENT_ELEM,
            ...val,
        ].map((installment) => ({
            label: installment?.title || installment.value,
            value: installment.value,
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

    const cities = useMemo(() => {
        if (!getCities.isSuccess) return [];

        return (getCities?.data?.map((city) => ({
            label: city.name,
            value: city.id,
        })) || []);
    }, [getCities]);
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
    const citiesSelectBoxDisabled = useCallback((billingAddressBlank = true) => Boolean(
        !getCities.isSuccess || billingAddressBlank || inputsDisabled
    ), [getCities, inputsDisabled]);

    const bankListSelectBoxDisabled = useMemo(() => Boolean(
        !banks.isSuccess || inputsDisabled
    ), [banks, inputsDisabled]);

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
        if (isLogged && (!values.customer_address_id || !values?.customer_address_id?.toString()?.length)) {
            errors.customer_address_id = errorMessages.required;
        }
        if (!values.empty_billing_address) {
            if (isLogged && !values.invoice_address_id) {
                errors.invoice_address_id = errorMessages.required;
            }
        }

        if (!isLogged) {
            if (!values.delivery_full_name || !values?.delivery_full_name?.toString()?.length) {
                errors.delivery_full_name = errorMessages.required;
            }
            if (!values.delivery_city_id || !values?.delivery_city_id?.toString()?.length) {
                errors.delivery_city_id = errorMessages.required;
            }
            if (!values.delivery_phone || !values?.delivery_phone?.toString()?.length) {
                errors.delivery_phone = errorMessages.required;
            }
            if (!values.delivery_address || !values?.delivery_address?.toString()?.length) {
                errors.delivery_address = errorMessages.required;
            }
        }

        if (!isLogged && !values.empty_billing_address) {
            if (!values.invoice_full_name || !values?.invoice_full_name?.toString()?.length) {
                errors.invoice_full_name = errorMessages.required;
            }
            if (!values.invoice_city_id || !values?.invoice_city_id?.toString()?.length) {
                errors.invoice_city_id = errorMessages.required;
            }
            if (!values.invoice_phone || !values?.invoice_phone?.toString()?.length) {
                errors.invoice_phone = errorMessages.required;
            }
            if (!values.invoice_address || !values?.invoice_address?.toString()?.length) {
                errors.invoice_address = errorMessages.required;
            }
        }

        if (Number.isNaN(parseInt(values.payment_method))) {
            errors.payment_method = errorMessages.required;
        }

        if (values.payment_method.toString() === '0') {
            if (!values.name_surname || !values.name_surname?.toString()?.length) {
                errors.name_surname = errorMessages.required;
            }
            if (!values.bank_id) {
                errors.bank_id = errorMessages.required;
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
    }, [isLogged]);
    const handleSubmit = useCallback((iValues, {
        setSubmitting,
    }) => {
        if (getOrderCode.isSuccess && !getOrderCode?.data?.data?.order_code) return;
        if (!isUser && !isGuest) return;
        const values = JSON.parse(JSON.stringify(iValues));

        values.order_code = getOrderCode?.data?.data?.order_code?.toString();
        values.customer_id = '';
        if (isUser) values.customer_id = account?.customer_id?.toString();

        values.guid = '';
        if (isGuest) values.guid = account?.customer_id?.toString();

        values.customer_address_id = values.customer_address_id?.toString();
        values.invoice_address_id = values.invoice_address_id?.toString();
        values.cargo_company_id = values.cargo_company_id?.toString();

        values.amount = 0;
        if (installmentFee?.tutar) values.amount = installmentFee?.tutar?.toString();
        values.payment_method = values.payment_method?.toString();
        values.receipt = iValues.receipt;

        values.delivery_full_name = values?.delivery_full_name?.toString();
        values.delivery_city_id = values?.delivery_city_id?.toString();
        values.delivery_phone = values?.delivery_phone?.toString();
        values.delivery_address = values?.delivery_address?.toString();

        values.invoice_full_name = values?.invoice_full_name?.toString();
        values.invoice_address = values?.invoice_address?.toString();
        values.invoice_phone = values?.invoice_phone?.toString();
        values.invoice_city_id = values?.invoice_city_id?.toString();

        setSubmitting(true);
        setLoading(true);
        placeOrder?.mutate(values, {
            onSuccess: ({ status = false, order_code, errors = { msg: '' }}) => {
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
                    if (order_code) {
                        go(
                            `/siparis-ozeti/${order_code}`,
                            false
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
    }, [account, isUser, isGuest, placeOrder, clearLocalBasket, go, installmentFee, getOrderCode]);

    const isLoading = useCallback((isSubmitting = false) => (
        loading || isSubmitting || placeOrder?.isLoading
    ), [loading, placeOrder]);
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
                        <BreadCrumb crumbs={crumb} />
                        <div id="primary" className="content-area">
                            <main className="site-main" id="main">
                                <div className="type-page hentry">
                                    <div className="entry-content">
                                        {Boolean(
                                            isLogged
                                            && addressesList.isSuccess
                                            && !addressesOption.length
                                        ) && (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'flex-start',
                                                    width: '100%',
                                                    padding: '20px 20px',
                                                    backgroundColor: '#FFE0B2',
                                                    color: '#FB8C00',
                                                    marginBottom: 20,
                                                    borderRadius: 6,
                                                }}
                                            >
                                                <h4
                                                    style={{
                                                        color: 'inherit',
                                                        margin: 0,
                                                        padding: 0,
                                                        paddingBottom: 4,
                                                    }}
                                                >
                                                    UYARI
                                                </h4>
                                                <p
                                                    style={{
                                                        color: 'inherit',
                                                        margin: 0,
                                                        padding: 0,
                                                    }}
                                                >
                                                    Sisteme kayıtlı kayıtlı adresiniz <b>bulunmamakta</b>. Adres eklemeden işlem sipariş <b>veremezsiniz</b>.
                                                    <br />
                                                    <b>Adres eklemek için </b>
                                                    <a
                                                        href="/adreslerim/ekle"
                                                        style={{
                                                            color: 'inherit',
                                                            margin: 0,
                                                            padding: 0,
                                                            fontWeight: 500,
                                                            textDecoration: 'underline',
                                                        }}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            goWithState('/adreslerim/ekle', { redirect: '/odeme' });
                                                        }}
                                                    >lütfen buraya tıklayın.</a>
                                                    .
                                                </p>
                                            </div>
                                        )}
                                        {!isLogged && (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'flex-start',
                                                    width: '100%',
                                                    padding: '20px 20px',
                                                    backgroundColor: '#FFE0B2',
                                                    color: '#FB8C00',
                                                    marginBottom: 20,
                                                    borderRadius: 6,
                                                }}
                                            >
                                                <h4
                                                    style={{
                                                        color: 'inherit',
                                                        margin: 0,
                                                        padding: 0,
                                                        paddingBottom: 4,
                                                    }}
                                                >
                                                    UYARI
                                                </h4>
                                                <p
                                                    style={{
                                                        color: 'inherit',
                                                        margin: 0,
                                                        padding: 0,
                                                    }}
                                                >
                                                    Şu anda misafir olarak (üye girişi yapılmadan) işlem yapıyorsunuz.
                                                    Garantili Teknoloji üzerinden&nbsp;
                                                    <b>üye girişi yapmadan da sipariş verebilirsiniz.</b>
                                                    <br/>
                                                    Yine de&nbsp;
                                                    <b>üye girişi yapmak veya kayıt olmak istiyorsanız &nbsp;</b>
                                                    <a
                                                        href="/login"
                                                        style={{
                                                            color: 'inherit',
                                                            margin: 0,
                                                            padding: 0,
                                                            fontWeight: 500,
                                                            textDecoration: 'underline',
                                                        }}
                                                        onClick={goEvent('/login')}
                                                    >buraya tıklayabilirsiniz</a>
                                                    .
                                                </p>
                                            </div>
                                        )}
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

                                                                                            setTouched({...touched, installments: false});

                                                                                            setFieldValue('bank_id', null);
                                                                                            setFieldValue('installments', null);

                                                                                            setLastBank('')
                                                                                            setInstallmentFee(0)
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
                                                                                        <div className="col-xs-12 col-md-12">
                                                                                            <label>Banka
                                                                                                <abbr title="required" className="required">*</abbr>
                                                                                            </label>
                                                                                            <br />
                                                                                            <span className="wpcf7-form-control-wrap first-name">
                                                                                    <Field
                                                                                        name="bank_id"
                                                                                        component={SelectField}
                                                                                        options={banksOption}
                                                                                        disabled={bankListSelectBoxDisabled || isLoading(isSubmitting)}
                                                                                        loading={banks.isLoading}
                                                                                        onChange={(val) => {
                                                                                            setFieldValue("bank_id", val);
                                                                                            handleChangeBank(val);
                                                                                        }}
                                                                                    />
                                                                                        <ErrorMessage name="bank_id" />
                                                                                </span>
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
                                                                                            || !values.bank_id
                                                                                        )}
                                                                                        loading={getInstallments.isLoading}
                                                                                        onChange={(installment) => {
                                                                                            handleChangeInstallment(
                                                                                                installment.value,
                                                                                                values.bank_id.value,
                                                                                                totalPrice,
                                                                                            )
                                                                                        }}
                                                                                    />
                                                                                        <ErrorMessage name="installments" />
                                                                                </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="form-group row col-md-12 mt-4">
                                                                                        <div className="col-xs-12 col-md-6 mb-0">
                                                                                            <p className="mb-0 bold">
                                                                                                Lütfen kredi kartı bilgilerini girin.
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
                                                            {!isLogged && (
                                                                <>
                                                                    <div className="col-1 mt-4">
                                                                        <div className="woocommerce-billing-fields">
                                                                            <h3>Teslimat adresi</h3>
                                                                            <div className="woocommerce-billing-fields__field-wrapper-outer">
                                                                                <div className="woocommerce-billing-fields__field-wrapper">
                                                                                    <div className="form-group row col-md-12">
                                                                                        <div className="col-xs-12 col-md-6">
                                                                                            <label>
                                                                                                Ad soyad
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
                                                                                                name="delivery_full_name"
                                                                                                autoComplete="cc-name"
                                                                                                disabled={isLoading(isSubmitting)}
                                                                                            />
                                                                                            <br/>
                                                                                            <ErrorMessage name="delivery_full_name" />
                                                                                        </div>
                                                                                        <div className="col-xs-12 col-md-6">
                                                                                            <label>
                                                                                                Telefon
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
                                                                                                name="delivery_phone"
                                                                                                autoComplete="cc-name"
                                                                                                disabled={isLoading(isSubmitting)}
                                                                                            />
                                                                                            <br/>
                                                                                            <ErrorMessage name="delivery_phone" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="form-group row col-md-12">
                                                                                        <div className="col-xs-12 col-md-12">
                                                                                            <label>Şehir
                                                                                                <abbr title="required" className="required">*</abbr>
                                                                                            </label>
                                                                                            <br />
                                                                                            <span className="wpcf7-form-control-wrap first-name">
                                                                                    <Field
                                                                                        name={'delivery_city_id'}
                                                                                        component={SelectField}
                                                                                        options={cities}
                                                                                        disabled={citiesSelectBoxDisabled(false) || isLoading(isSubmitting)}
                                                                                        loading={getCities.isLoading}
                                                                                    />
                                                                                        <ErrorMessage name="delivery_city_id" />
                                                                                </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="form-group row col-md-12">
                                                                                        <div className="col-xs-12 col-md-12">
                                                                                            <label>Açık Adres
                                                                                                <abbr title="required" className="required">*</abbr>
                                                                                            </label>
                                                                                            <br />
                                                                                            <span className="wpcf7-form-control-wrap first-name">
                                                                                    <Field
                                                                                        className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                        name="delivery_address"
                                                                                        component="textarea"
                                                                                        disabled={isLoading(isSubmitting)}
                                                                                    />
                                                                                            <ErrorMessage name="delivery_address" />
                                                                                </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-1 mt-4">
                                                                        <div className="woocommerce-billing-fields">
                                                                            <h3>Fatura adresi</h3>
                                                                            <div className="woocommerce-billing-fields__field-wrapper-outer">
                                                                                <div className="woocommerce-billing-fields__field-wrapper">
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
                                                                                    {!Boolean(values.empty_billing_address) && (
                                                                                        <>
                                                                                            <div className="form-group row col-md-12">
                                                                                                <div className="col-xs-12 col-md-6">
                                                                                                    <label>
                                                                                                        Ad soyad
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
                                                                                                        name="invoice_full_name"
                                                                                                        autoComplete="cc-name"
                                                                                                        disabled={isLoading(isSubmitting) || values.empty_billing_address}
                                                                                                    />
                                                                                                    <br/>
                                                                                                    <ErrorMessage name="invoice_full_name" />
                                                                                                </div>
                                                                                                <div className="col-xs-12 col-md-6">
                                                                                                    <label>
                                                                                                        Telefon
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
                                                                                                        name="invoice_phone"
                                                                                                        autoComplete="cc-name"
                                                                                                        disabled={isLoading(isSubmitting) || values.empty_billing_address}
                                                                                                    />
                                                                                                    <br/>
                                                                                                    <ErrorMessage name="invoice_phone" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="form-group row col-md-12">
                                                                                                <div className="col-xs-12 col-md-12">
                                                                                                    <label>Şehir
                                                                                                        <abbr title="required" className="required">*</abbr>
                                                                                                    </label>
                                                                                                    <br />
                                                                                                    <span className="wpcf7-form-control-wrap first-name">
                                                                                    <Field
                                                                                        name={'invoice_city_id'}
                                                                                        component={SelectField}
                                                                                        options={cities}
                                                                                        disabled={citiesSelectBoxDisabled(values.empty_billing_address) || isLoading(isSubmitting)}
                                                                                        loading={getCities.isLoading}
                                                                                    />
                                                                                        <ErrorMessage name="invoice_city_id" />
                                                                                </span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="form-group row col-md-12">
                                                                                                <div className="col-xs-12 col-md-12">
                                                                                                    <label>Açık Adres
                                                                                                        <abbr title="required" className="required">*</abbr>
                                                                                                    </label>
                                                                                                    <br />
                                                                                                    <span className="wpcf7-form-control-wrap first-name">
                                                                                    <Field
                                                                                        className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                        name="invoice_address"
                                                                                        component="textarea"
                                                                                        disabled={isLoading(isSubmitting) || values.empty_billing_address}
                                                                                    />
                                                                                            <ErrorMessage name="invoice_address" />
                                                                                </span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                            {isLogged && (
                                                                <div className="col-1 mt-4">
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
                                                                                        name="invoice_address_id"
                                                                                        component={SelectField}
                                                                                        options={addressesOption}
                                                                                        disabled={billingAddressDisabled(values.empty_billing_address) || isLoading(isSubmitting)}
                                                                                        loading={!values.empty_billing_address && addressesList.isLoading}
                                                                                    />
                                                                                        <ErrorMessage name="invoice_address_id" />
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
                                                            )}
                                                            <div className="col-1 mt-4">
                                                                <div className="woocommerce-billing-fields">
                                                                    <h3>Kargo</h3>
                                                                    <div className="woocommerce-billing-fields__field-wrapper-outer">
                                                                        <div className="woocommerce-billing-fields__field-wrapper">
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
                                                            installmentFee={installmentFee}
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

export default Payment;
