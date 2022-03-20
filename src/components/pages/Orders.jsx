import React, {useCallback, useEffect, useMemo} from 'react';
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"
import BreadCrumb from "../layout/BreadCrumb"
import { useState } from "react"
import {useQuery} from "react-query";
import {DEFAULT_API_KEY, fetchThis, GET_ORDER_LIST, retry} from "../../api";
import {useAuth} from "../../context";
import moment from "moment";
import useRouterDOM from "../../hooks/useRouterDOM";
import {ayir} from "../../store/selectors/basket";
import PaginationBar from "../Shop/ProductList/PaginationBar";
import {calcPageCount} from "../../api/utils/pagination";

// constants
const ROOT_CRUMB = { url: '/siparislerim', title: 'Siparişlerim' };
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

function Orders() {
    const { state: customer, isLogged } = useAuth();
    const [totalCount, setTotalCount] = useState(0);
    const [pagination, setPagination] = useState({
        page: { value: 1 },
        perPage: perPages[0],
    });
    const [crumb] = useState([
        ROOT_CRUMB,
    ]);
    const { goEvent } = useRouterDOM();

    const orderHistory = useQuery(
        [
            'get-order-history', customer,
            pagination.page, pagination.perPage,
        ],
        () => (
            fetchThis(
                GET_ORDER_LIST,
                {
                    customer_id: customer.customer_id.toString(),
                    page: pagination.page.value,
                    page_count: pagination.perPage.value,
                },
                DEFAULT_API_KEY,
                {},
            )
        ),
        {
            retry,
            refetchOnWindowFocus: false,
            enabled: isLogged,
        },
    );
    const perPagesObject = useMemo(() => {
        const obj = {};
        perPages.forEach((_perPage) => {
            obj[_perPage.value] = _perPage;
        });
        return obj;
    }, []);

    const totalPageCount = useMemo(() => (
        calcPageCount(
            orderHistory?.data?.data?.item_count || 0,
            pagination.perPage.value
        )
    ), [orderHistory.data, pagination.perPage]);

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
            orderHistory?.data?.data?.item_count
            && orderHistory?.data?.data?.item_count !== totalCount
        ) setTotalCount(orderHistory?.data?.data?.item_count);
    }, [orderHistory.data, totalCount])

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
                            {/* Items */}
                            <div className="order-items">
                                {/* item */}
                                {orderHistory?.data?.data?.orders?.map((order, orderIDX) => (
                                    <div
                                        className="order-item"
                                        key={order.order_id}
                                    >
                                        <div>
                                            <p>Tarih:</p>
                                            <p>
                                                <strong>{moment.unix(order.date_time).format('DD MMMM YYYY')}</strong>
                                            </p>
                                        </div>
                                        <div>
                                            <p>Toplam Tutar</p>
                                            <p>
                                                <strong>{ayir(order.amount)}₺</strong>
                                            </p>
                                        </div>
                                        <div>
                                            <p>Ödeme Yöntemi:</p>
                                            <p>
                                                <strong>{order.order_method}</strong>
                                            </p>
                                        </div>
                                        <div>
                                            <p>Sipariş Numarası:</p>
                                            <p>
                                                <strong>{order.order_id}</strong>
                                            </p>
                                        </div>
                                        <div className="order-more-button-container">
                                            <a
                                                className="btn btn-primary order-more-button"
                                                href={`/siparis/${order.order_id}`}
                                                onClick={goEvent(`/siparis/${order.order_id}`)}
                                            >
                                                <span>Detaylar</span>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                                {orderHistory.isLoading && (
                                    <span>Sipariş geçmişi getiriliyor, lütfen bekleyiniz...</span>
                                )}
                                {orderHistory.isError && (
                                    <span>Hata!</span>
                                )}
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
                                                    <span className="no-child" />Şifre Güncelleme</a>
                                            </li>
                                            <li className="cat-item  current-cat">
                                                <a href="/adreslerim">
                                                    <span className="no-child" />Adreslerim</a>
                                            </li>

                                        </ul>
                                    </li>
                                    <li className="product_cat">
                                        <ul>
                                            <li className="cat-item">
                                                <a href="#">
                                                    <strong>Siparişlerim</strong>
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

export default Orders