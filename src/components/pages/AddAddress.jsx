import React, {useCallback} from 'react';
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"
import BreadCrumb from "../layout/BreadCrumb"
import { useState } from "react"
import Select from 'react-select';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useMutation, useQuery} from "react-query";
import {
    ADD_ADDRESS,
    DEFAULT_API_KEY,
    fetchThis,
    GET_CITIES,
    GET_DISTRICTS,
    GET_NEIGHBORHOODS,
    GET_TOWNS
} from "../../api";
import sweetalert from "sweetalert";
import useRouterDOM from "../../hooks/useRouterDOM";
import useAuth from "../../store/hooks/useAuth";

const NOT_SELECTED = { value: -1, label: 'Seçilmedi' };

const initialInputValues = {
    title: '',
    name: '',
    surname: '',
    address: '',
    phone_number: '',
    phone_number_2: '',
    is_first: 0,
};

function AddAddress() {
    const [crumb] = useState([
        { url: '/adreslerim', title: 'Adreslerim' },
        { url: '#', title: 'Adres Ekle' },
    ]);
    const { account, isLogged = false } = useAuth();
    const [loading, setLoading] = useState(false);
    const { go } = useRouterDOM();
    
    const [addressesSelectBox, setAddressesSelectBox] = useState({
        city: { ...NOT_SELECTED, isDisabled: false },
        town: NOT_SELECTED,
        district: NOT_SELECTED,
        neighborhood: NOT_SELECTED,
    });

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
                &&addressesSelectBox.town
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

    const addAddressMutation = useMutation((data) => (
        fetchThis(
            ADD_ADDRESS,
            data,
            DEFAULT_API_KEY,
            {},
        )
    ));
    const handleSubmit = useCallback((iValues, {
        setSubmitting,
    }) => {
        if (!isLogged) return;
        const values = JSON.parse(JSON.stringify(iValues));

        values.customer_id = account.customer_id.toString();

        values.name_surname = `${values.name} ${values.surname}`;
        delete values.name;
        delete values.surname;

        values.city_id = addressesSelectBox.city.value;
        values.town_id = addressesSelectBox.town.value;
        values.district_id = addressesSelectBox.district.value;
        values.neighborhood_id = addressesSelectBox.neighborhood.value;

        setSubmitting(true);
        setLoading(true);
        addAddressMutation?.mutate(values, {
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
                        text: 'Adres başarıyla eklendi ',
                        button: {
                            text: 'Tamam',
                        },
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
                    button: {
                        text: 'Tamam',
                    },
                }).then();
                setSubmitting(false);
                setLoading(false);
            },
        });
    }, [account, isLogged, addAddressMutation, addressesSelectBox]);
    const isLoading = useCallback((isSubmitting = false) => (
        loading || isSubmitting || addAddressMutation?.isLoading
    ), [loading, addAddressMutation]);
    const submitIsDisabled = useCallback((isSubmitting, errors = {}, values) => (
        isLoading(isSubmitting) || Boolean(Object.keys(errors).length) || Boolean(Object.keys(validateForm(values)).length)
    ), [isLoading, validateForm]);

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
                                                <h2>Adres ekle</h2>
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
                                                                        initialValues={initialInputValues}
                                                                        validate={validateForm}
                                                                    >
                                                                        {({
                                                                              isSubmitting,
                                                                              errors,
                                                                              values,
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
                                                                                            value="Ekle"
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

export default AddAddress