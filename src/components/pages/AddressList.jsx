import React, {useCallback, useEffect, useMemo} from 'react';
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"
import BreadCrumb from "../layout/BreadCrumb"
import { useState } from "react"
import {useMutation, useQuery} from "react-query";
import {DEFAULT_API_KEY, DELETE_ADDRESS, fetchThis, retry} from "../../api";
import {SHOW_ADDRESSES} from "../../api";
import useAuth from "../../store/hooks/useAuth";
import {calcPageCount} from "../../api/utils/pagination";
import PaginationBar from "../Shop/ProductList/PaginationBar";
import useRouterDOM from "../../hooks/useRouterDOM";
import sweetalert from "sweetalert";

const perPages = [
    {
        key: 'per_page_5',
        value: 5,
    },
    {
        key: 'per_page_10',
        value: 10,
    },
    {
        key: 'per_page_20',
        value: 20,
    },
    {
        key: 'per_page_50',
        value: 50,
    },
];
function Addresses() {
    const [crumb] = useState([
        { url: '#', title: 'Adreslerim' }
    ])
    const { account, isLogged } = useAuth();
    const [totalCount, setTotalCount] = useState(0);
    const [pagination, setPagination] = useState({
        page: { value: 1 },
        perPage: perPages[0],
    });
    const { goEvent } = useRouterDOM();


    const list = useQuery(
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
                    page: pagination.page.value,
                    page_count: pagination.perPage.value,
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

    const deleteMutation = useMutation((data) => (
        fetchThis(
            DELETE_ADDRESS,
            {
                customer_id: data?.customer_id?.toString(),
                address_id: data?.address_id?.toString(),
            },
            DEFAULT_API_KEY,
            {}
        )
    ));

    const handleDelete = useCallback((address_id) => (e) => {
        e.preventDefault();
        if (!address_id) return;

        deleteMutation?.mutate({
            customer_id: account.customer_id,
            address_id,
        }, {
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
                    list.refetch().then(() => {
                        sweetalert({
                            icon: 'success',
                            title: 'Başarılı',
                            text: 'Adresin başarıyla silindi.',
                            button: {
                                text: 'Tamam',
                            },
                        }).then(() => {});
                    });
                }
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
            },
        })
    }, [account, list, deleteMutation])

    const perPagesObject = useMemo(() => {
        const obj = {};
        perPages.forEach((_perPage) => {
            obj[_perPage.value] = _perPage;
        });
        return obj;
    }, []);

    const totalPageCount = useMemo(() => (
        calcPageCount(
            list?.data?.data?.item_count || 0,
            pagination.perPage.value
        )
    ), [list.data, pagination.perPage]);

    /* Handlers */
    const handlePerPageChange = useCallback((event) => {
        const perPage = perPagesObject[event.target.value];

        const newPagination = {
            ...pagination,
            perPage,
        }

        const maxPageCount = calcPageCount(totalCount, perPage.value);
        if (maxPageCount < pagination.page.value) newPagination.page = { value: maxPageCount };

        setPagination(newPagination);
    }, [totalCount, pagination, perPagesObject]);
    const handlePageChange = useCallback((page) => {
        setPagination({
            ...pagination,
            page,
        })
    }, [pagination]);
    useEffect(() => {
        if (
            list?.data?.data?.item_count
            && list?.data?.data?.item_count !== totalCount
        ) setTotalCount(list?.data?.data?.item_count);
    }, [list.data, totalCount])

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
                                                <h2>Adreslerim</h2>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    style={{ marginBottom: '20px' }}
                                                    onClick={goEvent('/adreslerim/ekle')}
                                                >
                                                    Ekle
                                                </button>
                                            </header>
                                            <div className="tab-content">
                                                <div className="tab-pane active" role="tabpanel">
                                                    <div className="row contact-info">
                                                        <div className="col-md-12">
                                                            <div className="contact-form">
                                                                <div role="form" className="wpcf7" id="wpcf7-f425-o1" lang="en-US" dir="ltr">
                                                                    <div className="screen-reader-response" />
                                                                    <div className="my-addresses-container">
                                                                        {/* Addresses */}
                                                                        <div className="my-addresses">
                                                                            {list.isLoading && (
                                                                                <span>Listeyi getiriyoruz, lütfen bekleyin...</span>
                                                                            )}
                                                                            {list.isError && (
                                                                                <span>Hata!</span>
                                                                            )}
                                                                            {/* Items */}
                                                                            {list?.data?.data?.addresses?.map((address, addressIDX) => (
                                                                                <div
                                                                                    className="my-address"
                                                                                    key={`my_address_${addressIDX}_${address?.id}`}
                                                                                    style={{
                                                                                        borderWidth: address?.first ? 3 : 1,
                                                                                    }}
                                                                                >
                                                                                    {/* Title */}
                                                                                    <div className="my-address-header">
                                                                                        <h4>{address.address_name}</h4>
                                                                                        <div
                                                                                            style={{
                                                                                                display: 'flex',
                                                                                                flexWrap: 'wrap',
                                                                                                gap: 8,
                                                                                            }}
                                                                                        >
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-primary"
                                                                                                onClick={goEvent(`/adreslerim/duzenle/${address.id}`)}
                                                                                            >
                                                                                                Düzenle
                                                                                            </button>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-primary"
                                                                                                onClick={handleDelete(address.id)}
                                                                                                disabled={deleteMutation.isLoading}
                                                                                            >
                                                                                                Sil
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>

                                                                                    {/* content */}
                                                                                    <div className="my-address-content">
                                                                                        <div className="my-address-top">
                                                                                            <p>{address.contact_person}</p>
                                                                                            <p>
                                                                                                {address?.phone_1}
                                                                                                {address?.phone_2 && ' - '}
                                                                                                {address?.phone_2}
                                                                                            </p>
                                                                                        </div>
                                                                                        <p>
                                                                                            {address.combined_address}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>

                                                                        {/* Pagination */}
                                                                        <PaginationBar
                                                                            totalPageCount={totalPageCount}
                                                                            perPage={pagination.perPage}
                                                                            page={pagination.page}
                                                                            perPages={perPages}
                                                                            onPerPageChange={handlePerPageChange}
                                                                            onPageChange={handlePageChange}
                                                                        />
                                                                    </div>
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
                                                    Siparişlerim
                                                </a>
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

export default Addresses;
