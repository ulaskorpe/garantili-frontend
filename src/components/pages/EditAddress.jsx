import React, {useCallback, useEffect, useRef} from 'react';
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"
import BreadCrumb from "../layout/BreadCrumb"
import { useState } from "react"
import Select from 'react-select';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useMutation, useQuery} from "react-query";
import {
    DEFAULT_API_KEY,
    fetchThis, GET_ADDRESS,
    GET_CITIES,
    GET_DISTRICTS,
    GET_NEIGHBORHOODS,
    GET_TOWNS, UPDATE_ADDRESS
} from "../../api";
import sweetalert from "sweetalert";
import {useAuth} from "../../context";
import useRouterDOM from "../../hooks/useRouterDOM";

const NOT_SELECTED = { value: -1, label: 'Seçilmedi' };

const initialFormValues = {
    title: '',
    name: '',
    surname: '',
    address: '',
    phone_number: '',
    phone_number_2: '',
    is_first: 0,
};

// 1 - 3 - 7 - 162
// todo: make dynamic
const defaultSelectedIDS = {
    city_id: 1,
    town_id: 3,
    district_id: 7,
    neighborhood_id: 162,
}

function EditAddress() {
    const [crumb] = useState([
        { url: '/adreslerim', title: 'Adreslerim' },
        { url: '#', title: 'Adresimi düzenle' },
    ]);
    const formikRef = useRef();
    const { state: account, isLogged = false } = useAuth();
    const [loading, setLoading] = useState(false);
    const { go, params } = useRouterDOM();
    
    const [addressesSelectBox, setAddressesSelectBox] = useState({
        city: { ...NOT_SELECTED, isDisabled: false },
        town: NOT_SELECTED,
        district: NOT_SELECTED,
        neighborhood: NOT_SELECTED,
    });

    const getAddressInfo = useQuery(
        [ 'get-address-info', account, isLogged, params ],
        () => fetchThis(
            GET_ADDRESS,
            {
                customer_id: account.customer_id.toString(),
                address_id: params.id.toString(),
            },
            DEFAULT_API_KEY,
            {},
        ),
        {
            refetchOnWindowFocus: false,
            enabled: Boolean(
                isLogged
                && typeof params.id !== 'undefined'
                && params?.id
            )
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

    const getTowns = useQuery(
        [
            'get-towns',
            addressesSelectBox.city
        ],
        () => {
            return fetchThis(
                GET_TOWNS,
                {},
                DEFAULT_API_KEY,
                {
                    city_id: addressesSelectBox.city.value,
                },
            );
        },
        {
            refetchOnWindowFocus: false,
            enabled: Boolean(
                addressesSelectBox.city
                && addressesSelectBox.city.value
                && addressesSelectBox.city.value !== -1
            ),
        }
    );
    const getDistricts = useQuery(
        [
            'get-districts',
            addressesSelectBox.city,
            addressesSelectBox.town,
        ],
        () => {
            return fetchThis(
                GET_DISTRICTS,
                {},
                DEFAULT_API_KEY,
                {
                    town_id: addressesSelectBox.town.value,
                },
            );
        },
        {
            refetchOnWindowFocus: false,
            enabled: Boolean(
                addressesSelectBox.city
                && addressesSelectBox.city.value
                && addressesSelectBox.city.value !== -1
                && addressesSelectBox.town
                && addressesSelectBox.town.value
                && addressesSelectBox.town.value !== -1
            ),
        }
    );
    const getNeighborhoods = useQuery(
        [
            'get-neighborhoods',
            addressesSelectBox.city,
            addressesSelectBox.town,
            addressesSelectBox.district,
        ],
        () => {
            return fetchThis(
                GET_NEIGHBORHOODS,
                {},
                DEFAULT_API_KEY,
                {
                    district_id: addressesSelectBox.district.value,
                },
            );
        },
        {
            refetchOnWindowFocus: false,
            enabled: Boolean(
                addressesSelectBox.city
                && addressesSelectBox.city.value
                && addressesSelectBox.city.value !== -1
                &&addressesSelectBox.town
                && addressesSelectBox.town.value
                && addressesSelectBox.town.value !== -1
                && addressesSelectBox.district
                && addressesSelectBox.district.value
                && addressesSelectBox.district.value !== -1
            ),
        }
    );

    const setSelectBox = useCallback((key, clearList) => (value) => {
        const newValue = JSON.parse(JSON.stringify(addressesSelectBox));
        newValue[key] = value;

        (clearList || [])?.forEach((clearKey) => {
            newValue[clearKey] = NOT_SELECTED;
        });

        if (
            JSON.stringify(newValue) !== JSON.stringify(addressesSelectBox)
        ) {
            setAddressesSelectBox(newValue);
        }
    }, [addressesSelectBox]);

    const handleChangeSelectBox = useCallback((key, refetch = () => {}, ...clearList) => (data) => {
        setSelectBox(
            key,
            clearList,
        )(data);
    }, [setSelectBox]);

    useEffect(() => {
        if (getAddressInfo.isSuccess) {
            const addresses = defaultSelectedIDS;

            // city
            if (
                getCities.isSuccess
                && addressesSelectBox.city.value === -1
            ) {
                const selected = getCities.data.find((elem) => elem.id === addresses.city_id);
                if (selected)
                    setSelectBox('city', ['town', 'district', 'neighborhood'])({
                        label: selected.name,
                        value: selected.id,
                    });
            }

            if (
                getTowns.isSuccess
                && addressesSelectBox.town.value === -1
            ) {
                const selected = getTowns.data.find((elem) => elem.id === addresses.town_id);
                if (selected)
                    setSelectBox('town', ['district', 'neighborhood'])({
                        label: selected.name,
                        value: selected.id,
                    });
            }

            if (
                getDistricts.isSuccess
                && addressesSelectBox.district.value === -1
            ) {
                const selected = getDistricts.data.find((elem) => elem.id === addresses.district_id);
                if (selected)
                    setSelectBox('district', ['neighborhood'])({
                        label: selected.name,
                        value: selected.id,
                    });
            }

            if (
                getNeighborhoods.isSuccess
                && addressesSelectBox.neighborhood.value === -1
            ) {
                const selected = getNeighborhoods.data.find((elem) => elem.id === addresses.neighborhood_id);
                if (selected)
                    setSelectBox('neighborhood', [])({
                        label: selected.name,
                        value: selected.id,
                    });
            }



        }
    }, [getAddressInfo, addressesSelectBox])

    const validateForm = useCallback((values) => {
        const errors = {};
        const errorMessages = {
            required: 'Bu alan zorunlu!',
        }

        if (!values.title) {
            errors.title = errorMessages.required;
        }
        if (!values.name) {
            errors.name = errorMessages.required;
        }
        if (!values.surname) {
            errors.surname = errorMessages.required;
        }
        if (!values.phone_number) {
            errors.phone_number = errorMessages.required;
        }
        if (addressesSelectBox.city.value === -1) {
            errors.city = errorMessages.required;
        }
        if (addressesSelectBox.town.value === -1) {
            errors.town = errorMessages.required;
        }
        if (addressesSelectBox.district.value === -1) {
            errors.district = errorMessages.required;
        }
        if (addressesSelectBox.neighborhood.value === -1) {
            errors.neighborhood = errorMessages.required;
        }
        if (!values.address) {
            errors.address = errorMessages.required;
        }
        return errors;
    }, [addressesSelectBox])

    const editAddressMutation = useMutation((data) => (
        fetchThis(
            UPDATE_ADDRESS,
            data,
            DEFAULT_API_KEY,
            {},
        )
    ));
    const handleSubmit = useCallback((iValues, {
        setSubmitting,
    }) => {
        if (!isLogged) return;
        if (!params?.id) return;
        const values = JSON.parse(JSON.stringify(iValues));

        values.customer_id = account.customer_id.toString();
        values.address_id = params.id;

        values.name_surname = `${values.name} ${values.surname}`;
        delete values.name;
        delete values.surname;

        values.city_id = addressesSelectBox.city.value;
        values.town_id = addressesSelectBox.town.value;
        values.district_id = addressesSelectBox.district.value;
        values.neighborhood_id = addressesSelectBox.neighborhood.value;

        setSubmitting(true);
        setLoading(true);
        editAddressMutation?.mutate(values, {
            onSuccess: ({ status = false, errors = { msg: '' }}) => {
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
                        text: 'Kayıt işlemi başarılı',
                        button: null,
                    }).then(() => {
                        go('/adreslerim');
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
                    button: null,
                }).then();
                setSubmitting(false);
                setLoading(false);
            },
        });
    }, [account, isLogged, editAddressMutation, addressesSelectBox, go, params]);
    const isLoading = useCallback((isSubmitting = false) => (
        loading || isSubmitting
        || editAddressMutation?.isLoading
        || getAddressInfo?.isLoading || getCities?.isLoading
        || getTowns?.isLoading || getDistricts?.isLoading
        || getNeighborhoods?.isLoading
    ), [loading, editAddressMutation, getAddressInfo]);
    const submitIsDisabled = useCallback((isSubmitting, errors = {}, values) => (
        isLoading(isSubmitting) || Boolean(Object.keys(errors).length) || Boolean(Object.keys(validateForm(values)).length)
    ), [isLoading, validateForm]);

    useEffect(() => {
        if (
            isLogged
            && getAddressInfo.isSuccess
            && formikRef
            && formikRef.current
            && formikRef.current.setFieldValue
        ) {
            const address = getAddressInfo?.data?.data?.address || {};

            formikRef.current.setFieldValue(
                'title',
                address?.address_name || initialFormValues.title,
            );

            const fullNameSplit = (address?.contact_person || '').split(' ');
            let name = '', surname = '';
            if (fullNameSplit.length) {
                name = fullNameSplit.slice(
                    0,
                    (
                        fullNameSplit.length > 0
                            ? fullNameSplit.length
                            : 2
                    ) - 1
                );

                if (fullNameSplit.length > 1) {
                    surname = fullNameSplit.slice(-(
                        fullNameSplit.length-1
                    ));
                }
            }

            formikRef.current.setFieldValue(
                'name',
                name || initialFormValues.name,
            );
            formikRef.current.setFieldValue(
                'surname',
                surname || initialFormValues.surname,
            );

            formikRef.current.setFieldValue(
                'phone_number',
                address?.phone_1 || initialFormValues.phone_number,
            );
            formikRef.current.setFieldValue(
                'phone_number_2',
                address?.phone_2 || initialFormValues.phone_number_2,
            );

            formikRef.current.setFieldValue(
                'address',
                address?.address || initialFormValues.address,
            );

            formikRef.current.setFieldValue(
                'is_first',
                address?.first || initialFormValues.is_first,
            );
        }
    }, [formikRef, isLogged, getAddressInfo]);

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
                                        <section className="section-hot-new-arrivals section-products-carousel-tabs techmarket-tabs">
                                            <header className="section-header">
                                                <h2>Adresimi düzenle</h2>
                                            </header>
                                            <div className="tab-content">
                                                <div className="tab-pane active" role="tabpanel" id="tab-delivery-address">
                                                    <div className="row contact-info">
                                                        <div className="col-md-12 left-col">
                                                            <div className="contact-form">
                                                                <div role="form" className="wpcf7" id="wpcf7-f425-o1" lang="en-US" dir="ltr">
                                                                    <div className="screen-reader-response" />
                                                                    <Formik
                                                                        onSubmit={handleSubmit}
                                                                        innerRef={formikRef}
                                                                        initialValues={initialFormValues}
                                                                        validate={validateForm}
                                                                        initialErrors={{
                                                                            title: 'test',
                                                                        }}
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
                                                                            <Form
                                                                                className="wpcf7-form"
                                                                                noValidate="novalidate"
                                                                            >
                                                                                <div className="form-group row">
                                                                                    <div className="col-xs-12 col-md-12">
                                                                                        <div
                                                                                            style={{
                                                                                                margin: 0,
                                                                                                display: 'flex',
                                                                                                justifyContent: 'space-between',
                                                                                                alignItems: 'center',
                                                                                                gap: '8px',
                                                                                                flexWrap: 'wrap',
                                                                                            }}
                                                                                        >
                                                                                            <label>
                                                                                                Adres Başlığı
                                                                                                <abbr title="required" className="required">*</abbr>
                                                                                            </label>
                                                                                            <label htmlFor="first_cb"
                                                                                                   className="woocommerce-form__label woocommerce-form__label-for-checkbox inline">
                                                                                                <Field
                                                                                                    className="woocommerce-form__input woocommerce-form__input-checkbox"
                                                                                                    name="is_first"
                                                                                                    id="first_cb"
                                                                                                    type="checkbox"
                                                                                                    disabled={isLoading(isSubmitting)}
                                                                                                />
                                                                                                Varsayılan adresim bu olsun
                                                                                            </label>
                                                                                        </div>
                                                                                        <span className="wpcf7-form-control-wrap first-name">
                                                                                            <Field
                                                                                                type="text"
                                                                                                aria-invalid="false"
                                                                                                aria-required="true"
                                                                                                className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                                size="40"
                                                                                                name="title"
                                                                                                disabled={isLoading(isSubmitting)}
                                                                                            />
                                                                                            <ErrorMessage name="title" />
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
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
                                                                                    <Field
                                                                                        type="text"
                                                                                        aria-invalid="false"
                                                                                        aria-required="true"
                                                                                        className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                        size="40"
                                                                                        name="surname"
                                                                                        disabled={isLoading(isSubmitting)}
                                                                                    />
                                                                                            <ErrorMessage name="surname" />
                                                                                </span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="form-group row">
                                                                                    <div className="col-xs-12 col-md-6">
                                                                                        <label>Telefon
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
                                                                                        name="phone_number"
                                                                                        disabled={isLoading(isSubmitting)}
                                                                                    />
                                                                                            <ErrorMessage name="phone_number" />
                                                                                </span>
                                                                                    </div>
                                                                                    <div className="col-xs-12 col-md-6">
                                                                                        <label>
                                                                                            Telefon-2
                                                                                        </label>
                                                                                        <br />
                                                                                        <span className="wpcf7-form-control-wrap last-name">
                                                                                    <Field
                                                                                        type="text"
                                                                                        aria-invalid="false" aria-required="true"
                                                                                        className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                        size="40"
                                                                                        name="phone_number_2"
                                                                                        disabled={isLoading(isSubmitting)}
                                                                                    />
                                                                                            <ErrorMessage name="phone_number_2" />
                                                                                </span>
                                                                                    </div>
                                                                                </div>
                                                                                {/* Şehir, İlçe */}
                                                                                <div className="form-group row">
                                                                                    {/* Şehir */}
                                                                                    <div className="col-xs-12 col-md-6">
                                                                                        <label>
                                                                                            Şehir
                                                                                            <abbr title="required" className="required">*</abbr>
                                                                                        </label>
                                                                                        <br />
                                                                                        <span className="wpcf7-form-control-wrap first-name">
                                                                                    <Select
                                                                                        name="city"
                                                                                        placeholder="Lütfen seçin"
                                                                                        isSearchable
                                                                                        isLoading={getCities.isLoading}
                                                                                        isDisabled={Boolean(
                                                                                            getCities.isLoading
                                                                                            || getCities.isError
                                                                                            || isLoading(isSubmitting)
                                                                                        )}
                                                                                        value={addressesSelectBox.city}
                                                                                        onChange={handleChangeSelectBox('city', () => {}, 'town', 'district', 'neighborhood', )}
                                                                                        options={[
                                                                                            NOT_SELECTED,
                                                                                            ...(
                                                                                                getCities.isSuccess
                                                                                                    ? (
                                                                                                        getCities?.data?.map((city) => ({
                                                                                                            label: city.name,
                                                                                                            value: city.id,
                                                                                                        })) || []
                                                                                                    )
                                                                                                    : []
                                                                                            )
                                                                                        ]}
                                                                                    />
                                                                                            <ErrorMessage name="city" />
                                                                                </span>
                                                                                    </div>

                                                                                    {/* İlçe */}
                                                                                    <div className="col-xs-12 col-md-6">
                                                                                        <label>
                                                                                            İlçe
                                                                                            <abbr title="required" className="required">*</abbr>
                                                                                        </label>
                                                                                        <br />
                                                                                        <span className="wpcf7-form-control-wrap first-name">
                                                                                    <Select
                                                                                        name="town"
                                                                                        placeholder="Lütfen seçin"
                                                                                        isSearchable
                                                                                        isLoading={getTowns.isLoading}
                                                                                        isDisabled={Boolean(
                                                                                            getCities.isLoading
                                                                                            || getCities.isError
                                                                                            || getTowns.isLoading
                                                                                            || getTowns.isError
                                                                                            || !(addressesSelectBox.city.value !== -1)
                                                                                            || isLoading(isSubmitting)
                                                                                        )}
                                                                                        value={addressesSelectBox.town}
                                                                                        onChange={handleChangeSelectBox('town', () => {}, 'district', 'neighborhood' )}
                                                                                        options={[
                                                                                            NOT_SELECTED,
                                                                                            ...(
                                                                                                getTowns.isSuccess
                                                                                                    ? (
                                                                                                        getTowns?.data?.map((district) => ({
                                                                                                            label: district.name,
                                                                                                            value: district.id,
                                                                                                        })) || []
                                                                                                    )
                                                                                                    : []
                                                                                            )
                                                                                        ]}
                                                                                    />
                                                                                            <ErrorMessage name="town" />
                                                                                </span>
                                                                                    </div>
                                                                                </div>

                                                                                {/* Cadde, Mahalle */}
                                                                                <div className="form-group row">
                                                                                    {/* Cadde */}
                                                                                    <div className="col-xs-12 col-md-6">
                                                                                        <label>
                                                                                            Cadde
                                                                                            <abbr title="required" className="required">*</abbr>
                                                                                        </label>
                                                                                        <br />
                                                                                        <span className="wpcf7-form-control-wrap last-name">
                                                                                    <Select
                                                                                        name="district"
                                                                                        placeholder="Lütfen seçin"
                                                                                        isSearchable
                                                                                        isLoading={getDistricts.isLoading}
                                                                                        value={addressesSelectBox.district}
                                                                                        isDisabled={Boolean(
                                                                                            getCities.isLoading
                                                                                            || getCities.isError
                                                                                            || getTowns.isLoading
                                                                                            || getTowns.isError
                                                                                            || getDistricts.isLoading
                                                                                            || getDistricts.isError
                                                                                            || !(addressesSelectBox.city.value !== -1)
                                                                                            || !(addressesSelectBox.town.value !== -1)
                                                                                            || isLoading(isSubmitting)
                                                                                        )}
                                                                                        onChange={handleChangeSelectBox('district', () => null, 'neighborhood')}
                                                                                        options={[
                                                                                            NOT_SELECTED,
                                                                                            ...(
                                                                                                getDistricts.isSuccess
                                                                                                    ? (
                                                                                                        getDistricts?.data?.map((city) => ({
                                                                                                            label: city.name,
                                                                                                            value: city.id,
                                                                                                        })) || []
                                                                                                    )
                                                                                                    : []
                                                                                            )
                                                                                        ]}
                                                                                    />
                                                                                            <ErrorMessage name="district" />
                                                                                </span>
                                                                                    </div>

                                                                                    {/* Mahalle */}
                                                                                    <div className="col-xs-12 col-md-6">
                                                                                        <label>
                                                                                            Mahalle
                                                                                            <abbr title="required" className="required">*</abbr>
                                                                                        </label>
                                                                                        <br />
                                                                                        <span className="wpcf7-form-control-wrap last-name">
                                                                                    <Select
                                                                                        name="neighborhood"
                                                                                        placeholder="Lütfen seçin"
                                                                                        isSearchable
                                                                                        isLoading={getDistricts.isLoading}
                                                                                        value={addressesSelectBox.neighborhood}
                                                                                        isDisabled={Boolean(
                                                                                            getCities.isLoading
                                                                                            || getCities.isError
                                                                                            || getTowns.isLoading
                                                                                            || getTowns.isError
                                                                                            || getDistricts.isLoading
                                                                                            || getDistricts.isError
                                                                                            || getNeighborhoods.isLoading
                                                                                            || getNeighborhoods.isError
                                                                                            || !(addressesSelectBox.city.value !== -1)
                                                                                            || !(addressesSelectBox.town.value !== -1)
                                                                                            || !(addressesSelectBox.district.value !== -1)
                                                                                            || isLoading(isSubmitting)
                                                                                        )}
                                                                                        onChange={handleChangeSelectBox('neighborhood')}
                                                                                        options={[
                                                                                            NOT_SELECTED,
                                                                                            ...(
                                                                                                getNeighborhoods.isSuccess
                                                                                                    ? (
                                                                                                        getNeighborhoods?.data?.map((city) => ({
                                                                                                            label: city.name,
                                                                                                            value: city.id,
                                                                                                        })) || []
                                                                                                    )
                                                                                                    : []
                                                                                            )
                                                                                        ]}
                                                                                    />
                                                                                            <ErrorMessage name="neighborhood" />
                                                                                </span>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="form-group row">
                                                                                    <div className="col-xs-12 col-md-12">
                                                                                        <label>Adres
                                                                                            <abbr title="required" className="required">*</abbr>
                                                                                        </label>
                                                                                        <br />
                                                                                        <span className="wpcf7-form-control-wrap first-name">
                                                                                    <Field
                                                                                        className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                                        name="address"
                                                                                        component="textarea"
                                                                                        disabled={isLoading(isSubmitting)}
                                                                                    />
                                                                                            <ErrorMessage name="address" />
                                                                                </span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="form-group clearfix">
                                                                                    <p>
                                                                                        <input
                                                                                            type="submit"
                                                                                            value="Kaydet"
                                                                                            className="wpcf7-form-control wpcf7-submit btn-navy"
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
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                    </div>
                                </div>
                            </main>
                        </div>
                        <div id="secondary" className="widget-area shop-sidebar" role="complementary">
                            <div className="widget woocommerce widget_product_categories techmarket_widget_product_categories" id="techmarket_product_categories_widget-2">
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
                                                    <span className="no-child" />Şifre Güncelleme</a>
                                            </li>
                                            <li className="cat-item  current-cat">
                                                <a href="/adreslerim">
                                                    <span className="no-child" /><strong>Adreslerim</strong></a>
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

export default EditAddress;
