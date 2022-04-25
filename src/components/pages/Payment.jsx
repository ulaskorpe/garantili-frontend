import React, {useCallback, useEffect, useMemo} from 'react';
import { useState } from "react"
import OrderReview from "../cart/OrderReview"
import BreadCrumb from "../layout/BreadCrumb"
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"
import {Formik, Field, ErrorMessage} from "formik";
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
import * as moment from "moment";
import useTemp from "../../store/hooks/useTemp";
import {useSearchParams} from "react-router-dom";

const initialInputValues = {
    customer_address_id: null,
    invoice_address_id: null,
    installment_fee: null,
    empty_billing_address: true,
    payment_method: '',
    bank_id: null,
    name_surname: (
        process.env.NODE_ENV === 'development'
            ? 'Emin TAYFUR'
            : ''
    ),
    cc_number: (
        process.env.NODE_ENV === 'development'
            ? '4506347049583145'
            : ''
    ),
    expires_at: (
        process.env.NODE_ENV === 'development'
            ? '05/24'
            : ''
    ),
    csc: (
        process.env.NODE_ENV === 'development'
            ? '000'
            : ''
    ),
    cargo_company_id: null,
    receipt: null,
    installments: null,
    // delivery
    delivery_full_name: (
        process.env.NODE_ENV === 'development'
            ? 'Emin TAYFUR'
            : ''
    ),
    delivery_city_id: '',
    delivery_phone: (
        process.env.NODE_ENV === 'development'
            ? '5432206528'
            : ''
    ),
    delivery_address: (
        process.env.NODE_ENV === 'development'
            ? 'Mahfesığmaz mah. XXXX sok. Kat: X Daire: X'
            : ''
    ),
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
            value={
                !Boolean(
                    typeof field?.value === 'undefined'
                    || field?.value === null
                ) ?
                    (options ? options.find(option => option.value === field.value) : '')
                    : ''
            }
            onChange={(option) => {
                if (field.value !== option.value) {
                    form.setFieldValue(field.name, option.value)
                    if (onChange && onChange?.call) onChange(option);
                }
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
    const {
        temps = { fetchedBasket: false },
    } = useTemp();
    const { basketArray } = useBasket();
    const { clearLocalBasket, totalPrice } = useBasket();
    const [installmentFee, setInstallmentFee] = useState(0);
    const [lastBank, setLastBank] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

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
                customer_id: data?.customer_id?.toString(),
                guid: data?.guid?.toString(),
                customer_address_id: data?.customer_address_id?.toString(),
                invoice_address_id: data?.invoice_address_id?.toString(),
                cargo_company_id: data?.cargo_company_id?.toString(),
                bank_id: data?.bank_id?.toString(),
                taksit: data?.taksit?.toString(),

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
    const parseExpireDate = useCallback((expire) => {
        let returnedData = [];

        const split = expire.split('/');
        if (split.length === 2) {
            const currentDate = moment();
            const [month, year] = split.map((deg) => parseInt(deg));

            if (
                !Number.isNaN(month)
                && month <= 12
                && !Number.isNaN(year)
            ) {
                const momentMonth = parseInt(currentDate.format('MM'));
                const momentYear = parseInt(currentDate.format('YY'));

                if (
                    (year > momentYear)
                    || (year === momentYear && month >= momentMonth)
                ) {
                    returnedData = [
                        (month > 9 ? month : (`0${month}`)).toString(),
                        (year > 9 ? year : (`0${year}`)).toString(),
                    ];
                }
            }
        }

        return returnedData;
    }, []);
    const validateForm = useCallback((values) => {
        const errors = {};
        const errorMessages = {
            required: 'Bu alan zorunlu!',
        }

        if (
            getOrderCode.isSuccess
            && !(getOrderCode?.data?.data?.order_code)
        ) errors.order_id = 'Order verisi gelmedi!'

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
            if (!values.cc_number || !values.cc_number?.toString()?.length) {
                errors.cc_number = errorMessages.required;
            }
            if (
                !values.expires_at
                || !values.expires_at?.toString()?.length
            ) {
                errors.expires_at = errorMessages.required;
            } else if (parseExpireDate(values.expires_at).length !== 2)
                errors.expires_at = 'Hatalı son kullanım tarihi!';

            if (!values.csc || !values.csc?.toString()?.length) {
                errors.csc = errorMessages.required;
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
    }, [isLogged, getOrderCode, parseExpireDate]);
    const handleSubmit = useCallback((iValues, {
        setSubmitting = (q) => null,
    }, onlyReturnValues = false) => {
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
        values.bank_id = values?.bank_id?.value?.toString();
        values.taksit = values?.installments?.toString();

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

        if (!onlyReturnValues) {
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
            setSubmitting(true);
            setLoading(true);
        }

        if (onlyReturnValues) {
            return values;
        }
    }, [account, isUser, isGuest, placeOrder, clearLocalBasket, go, installmentFee, getOrderCode]);
    const ccSubmit = useCallback((values) => async (e) => {
        const validate = validateForm(values)

        if (
            Object.keys(validate).length > 0
            || !installmentFee
            || !installmentFee?.installment
            || Boolean(
                typeof installmentFee?.tutar === 'undefined'
                || installmentFee?.tutar === null
                || !(installmentFee?.tutar >= 0)
            )
            || !placeOrder
            || !placeOrder?.mutateAsync
            || !placeOrder?.isIdle
        ) {
            e.preventDefault();
        }

        const formValues = handleSubmit(values, {}, true);
        const response = await placeOrder?.mutateAsync(formValues);
        if (!response?.status) {
            e.preventDefault();
        }
    }, [validateForm, installmentFee, handleSubmit, placeOrder])

    const isLoading = useCallback((isSubmitting = false) => (
        loading || isSubmitting || placeOrder?.isLoading
    ), [loading, placeOrder]);
    const inputDisabled = useCallback((isSubmitting = false) => (
        !basketArray.length || isLoading(isSubmitting)
    ), [basketArray.length, isLoading])
    const submitIsDisabled = useCallback((isSubmitting, errors = {}, values) => (
        inputDisabled(isSubmitting) || Boolean(Object.keys(errors).length) || Boolean(Object.keys(validateForm(values)).length)
    ), [validateForm, inputDisabled]);

    const HiddenInput = useCallback((props) => {
        const {
            name,
            value,
        } = props;
        return (
            <input
                name={name}
                defaultValue={value}
                type="hidden"
                readOnly
                style={{ display: 'none' }}
            />
        );
    }, []);

    useEffect(() => {
        const paymentFail = searchParams.has('payment_failure');

        if (paymentFail) {
            const paymentFailMessage = searchParams.get('payment_failure');
            sweetalert({
                icon: 'error',
                title: 'Ödeme Alınamadı',
                text: paymentFailMessage || 'Ödeme alınırken bilinmeyen bir hata ile karşılaşıldı!',
                button: {
                    text: 'Tamam',
                },
            }).then(() => {
                searchParams.delete('payment_failure');
                setSearchParams(searchParams);
            });
        }
    }, [searchParams, setSearchParams]);

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
                                            basketArray.length
                                            && isLogged
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
                                        {Boolean(
                                            basketArray.length
                                            && !isLogged
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
                                        {Boolean(
                                            !basketArray.length
                                            && temps.fetchedBasket
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
                                                    Sepetiniz boş. Lütfen sepetinize ürün ekleyin.
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
                                                      handleSubmit: formSubmit
                                                  }) => (
                                                    <form
                                                        className="checkout woocommerce-checkout"
                                                        name="checkout"
                                                        method="POST"
                                                        action={(
                                                            values?.payment_method === 0 ?
                                                                'https://garantili.com.tr/eticaretodeme/odeme'
                                                                : '#'
                                                        )}
                                                        onSubmit={(
                                                            values?.payment_method === 0
                                                                ? ccSubmit(values)
                                                                : formSubmit
                                                        )}
                                                    >
                                                        {values?.payment_method === 0 && (
                                                            <>
                                                                {Boolean(
                                                                    getOrderCode.isSuccess
                                                                    && getOrderCode?.data?.data?.order_code
                                                                ) && (
                                                                    <HiddenInput
                                                                        name="siparis_no"
                                                                        value={getOrderCode?.data?.data?.order_code}
                                                                    />
                                                                )}
                                                                <HiddenInput
                                                                    name="expiryMM"
                                                                    value={parseExpireDate(values.expires_at)[0] || ''}
                                                                />
                                                                <HiddenInput
                                                                    name="expiryYY"
                                                                    value={parseExpireDate(values.expires_at)[1] || ''}
                                                                />
                                                                <HiddenInput
                                                                    name="banka"
                                                                    value={values?.bank_id?.value || ''}
                                                                />
                                                                <HiddenInput
                                                                    name="tutar"
                                                                    value={
                                                                        installmentFee
                                                                            ? (
                                                                                installmentFee?.tutar
                                                                                || ''
                                                                            )
                                                                            : ''
                                                                    }
                                                                />
                                                                {Boolean(
                                                                    installmentFee
                                                                    && installmentFee?.installment
                                                                    && installmentFee.installment !== 1
                                                                ) && (<HiddenInput
                                                                    name="taksit"
                                                                    value={
                                                                        installmentFee
                                                                            ? (
                                                                                installmentFee?.installment
                                                                                || ''
                                                                            )
                                                                            : ''
                                                                    }
                                                                />)}
                                                                {Boolean(
                                                                    installmentFee
                                                                    && installmentFee?.installment
                                                                    && installmentFee.installment === 1
                                                                ) && (<HiddenInput
                                                                    name="tekcekim"
                                                                    value="1"
                                                                />)}
                                                                {Boolean(values.cc_number) && (
                                                                    <HiddenInput
                                                                        name="cc_no"
                                                                        value={values?.cc_number || ''}
                                                                    />
                                                                )}
                                                                {Boolean(values.csc) && (
                                                                    <HiddenInput
                                                                        name="CCV"
                                                                        value={values?.csc || ''}
                                                                    />
                                                                )}
                                                            </>
                                                        )}
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
                                                                                        disabled={banksSelectBoxDisabled || inputDisabled(isSubmitting)}
                                                                                        loading={bankAccountList.isLoading}
                                                                                        onChange={() => {
                                                                                            if (values.receipt) {
                                                                                                setTouched({...touched, receipt: false});
                                                                                                setFieldValue("receipt", null);
                                                                                            }

                                                                                            setTouched({...touched, installments: false});

                                                                                            setFieldValue('bank_id', null);
                                                                                            setFieldValue('installments', '');

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
                                                                                        disabled={bankListSelectBoxDisabled || inputDisabled(isSubmitting)}
                                                                                        loading={banks.isLoading}
                                                                                        onChange={(val) => {
                                                                                            setFieldValue('installments', null);
                                                                                            setFieldValue("bank_id", val);
                                                                                            setInstallmentFee(0);
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
                                                                                        name="installments"
                                                                                        component={SelectField}
                                                                                        options={installmentOptions}
                                                                                        disabled={Boolean(
                                                                                            banksSelectBoxDisabled
                                                                                            || inputDisabled(isSubmitting)
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
                                                                                                disabled={inputDisabled(isSubmitting) || !values.installments}
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
                                                                                                name="cc_number"
                                                                                                autoComplete="cc-number"
                                                                                                disabled={inputDisabled(isSubmitting) || !values.installments}
                                                                                            />
                                                                                            <br/>
                                                                                            <ErrorMessage name="cc_number" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="form-group row col-md-12">
                                                                                        <div className="col-xs-12 col-md-6">
                                                                                            <label>
                                                                                                Son Kullanım Tarihi
                                                                                                <abbr title="Ay yıl şeklinde. ÖR: 03/25" className="required">*</abbr>
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
                                                                                                placeholder="AA/YY"
                                                                                                maxLength="5"
                                                                                                disabled={inputDisabled(isSubmitting) || !values.installments}
                                                                                                onKeyPress={(event) => {
                                                                                                    if (!(
                                                                                                        ['0', '1','2','3','4','5','6','7','8','9']
                                                                                                            .includes(event?.key)
                                                                                                    )) {
                                                                                                        event.preventDefault();
                                                                                                    }

                                                                                                    if (
                                                                                                        event?.key === '/'
                                                                                                        && event?.target?.value?.length !== 2
                                                                                                    ) {
                                                                                                        event?.preventDefault();
                                                                                                    }

                                                                                                    if (
                                                                                                        event?.target?.value?.length === 2
                                                                                                        && event?.key !== '/'
                                                                                                    ) {
                                                                                                        event.target.value += `/`;
                                                                                                    }
                                                                                                }}
                                                                                                onPaste={(event) => {
                                                                                                    const deg = (event?.clipboardData || window?.clipboardData)?.getData('text');

                                                                                                    if (
                                                                                                        (deg?.length === 4 || deg?.length === 5)
                                                                                                        && (
                                                                                                            (deg?.length === 4 && !Number.isNaN(parseInt(deg)))
                                                                                                            || (deg?.length === 5 && deg?.split('/')?.length === 2)
                                                                                                        )
                                                                                                    ) {
                                                                                                        let expire = deg;
                                                                                                        if (deg?.length === 4) expire = `${deg.slice(0, 2)}/${deg.slice(2)}`
                                                                                                        if (parseExpireDate(expire).length !== 2) event?.preventDefault();
                                                                                                    } else {
                                                                                                        event?.preventDefault();
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <br/>
                                                                                            <ErrorMessage name="expires_at" />
                                                                                        </div>
                                                                                        <div className="col-xs-12 col-md-6">
                                                                                            <label>
                                                                                                cvc
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
                                                                                                name="csc"
                                                                                                autoComplete="cc-csc"
                                                                                                disabled={inputDisabled(isSubmitting) || !values.installments}
                                                                                            />
                                                                                            <br/>
                                                                                            <ErrorMessage name="csc" />
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
                                                                                                disabled={inputDisabled(isSubmitting)}
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
                                                                                                disabled={inputDisabled(isSubmitting)}
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
                                                                                                disabled={inputDisabled(isSubmitting)}
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
                                                                                        disabled={citiesSelectBoxDisabled(false) || inputDisabled(isSubmitting)}
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
                                                                                        disabled={inputDisabled(isSubmitting)}
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
                                                                                                    disabled={inputDisabled(isSubmitting)}
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
                                                                                                        disabled={inputDisabled(isSubmitting) || values.empty_billing_address}
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
                                                                                                        disabled={inputDisabled(isSubmitting) || values.empty_billing_address}
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
                                                                                        disabled={citiesSelectBoxDisabled(values.empty_billing_address) || inputDisabled(isSubmitting)}
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
                                                                                        disabled={inputDisabled(isSubmitting) || values.empty_billing_address}
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
                                                                                        disabled={addressesSelectBoxDisabled || inputDisabled(isSubmitting)}
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
                                                                                        disabled={billingAddressDisabled(values.empty_billing_address) || inputDisabled(isSubmitting)}
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
                                                                                                disabled={inputDisabled(isSubmitting)}
                                                                                            />
                                                                                            Fatura, teslimat adresine kesilsin.
                                                                                        </label>
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
                                                                                        disabled={cargoCompaniesSelectBoxDisabled || inputDisabled(isSubmitting)}
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
                                                    </form>
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
