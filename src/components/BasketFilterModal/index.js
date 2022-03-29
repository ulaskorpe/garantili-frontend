import React, {useCallback, useMemo, useState} from "react";
import ReactModal from 'react-modal';
import {useMutation, useQuery} from "react-query";
import {ADD_CART, DEFAULT_API_KEY, fetchThis, GET_COLOR_FILTERS, GET_MEMORY_FILTER, retry} from "../../api";
import Select from "react-select";
import useAuth from "../../store/hooks/useAuth";
import {toast} from "react-toastify";
import useBasket from "../../store/hooks/useBasket";

const INITIAL_SELECTED_VALUES = {
    color: null,
    memory: null,
};

const BasketFilterModal = () => {
    const [productInfo, setProductInfo] = useState({});
    const [show, setShow] = useState(false);
    const [selectedValues, setSelectedValues] = useState(INITIAL_SELECTED_VALUES);

    const { setFetchedData } = useBasket();
    const { isUser, isGuest, account } = useAuth();

    const getColors = useQuery(
        [
            'get-colors-for-basket',
            productInfo,
            show, isUser, isGuest,
        ],
        () => (
            fetchThis(
                GET_COLOR_FILTERS,
                {
                    product_id: productInfo.id.toString(),
                },
                DEFAULT_API_KEY,
                {},
            )
        ),
        {
            retry,
            refetchOnWindowFocus: false,
            enabled: Boolean(
                show
                && productInfo
                && productInfo?.id
                && (isGuest || isUser)
            ),
        }
    );
    const getMemories = useQuery(
        [
            'get-memories-for-basket',
            selectedValues?.color,
            show, isUser, isGuest,
        ],
        () => (
            fetchThis(
                GET_MEMORY_FILTER,
                {
                    product_id: productInfo.id.toString(),
                    color_id: selectedValues.color.value.toString(),
                },
                DEFAULT_API_KEY,
                {},
            )
        ),
        {
            retry,
            refetchOnWindowFocus: false,
            enabled: Boolean(
                show
                && productInfo
                && productInfo?.id
                && selectedValues?.color
                && (isGuest || isUser)
            ),
        }
    );
    const addCartMutation = useMutation((data) => (
        fetchThis(
            ADD_CART,
            data,
            DEFAULT_API_KEY,
            {}
        )
    ));

    const colorSelectBoxIsDisabled = useMemo(() => Boolean(
        !getColors.isSuccess
        || getColors.isLoading || getColors.isError
        || (getColors.isSuccess && !getColors.data.data.length)
    ), [
        getColors.isSuccess,
        getColors.isLoading,
        getColors.isError,
        getColors.data,
    ]);

    const memorySelectBoxIsDisabled = useMemo(() => Boolean(
        colorSelectBoxIsDisabled
        || !getMemories.isSuccess
        || getMemories.isLoading || getMemories.isError
        || (getMemories.isSuccess && !getMemories.data.data.length)
    ), [
        colorSelectBoxIsDisabled,
        getMemories.isSuccess,
        getMemories.isLoading,
        getMemories.isError,
        getMemories.data,
    ]);

    const submitIsDisabled = useMemo(() => Boolean(
        !addCartMutation.isIdle
        || colorSelectBoxIsDisabled
        || memorySelectBoxIsDisabled
        || !selectedValues.memory
    ), [
        addCartMutation.isIdle,
        colorSelectBoxIsDisabled,
        memorySelectBoxIsDisabled,
        selectedValues.memory,
    ]);

    const handleChange = useCallback((elem, clear = null) => (data) => {
        if (typeof data === 'undefined') return;
        const item = selectedValues[elem];

        if (typeof item !== 'undefined') {
            const oldValue = JSON.parse(JSON.stringify(selectedValues));
            const newValue = {
                ...oldValue,
                [elem]: data,
            }
            if (clear) newValue[clear] = null;

            if (
                JSON.stringify(newValue) !== JSON.stringify(oldValue)
            ) {
                setSelectedValues(newValue);
            }
        }
    }, [selectedValues]);

    const clearAll = useCallback(() => {
        setProductInfo({});
        setSelectedValues(INITIAL_SELECTED_VALUES);
        addCartMutation.reset();
    }, [addCartMutation])
    const closeModal = useCallback(() => {
        setShow(false);
        clearAll()
    }, [clearAll]);
    const closeModalEvent = useCallback((e) => {
        e.preventDefault();
        closeModal();
    }, [closeModal]);

    const openModal = useCallback((
        productInfo,
    ) => {
        if (!productInfo || !productInfo?.id) return false;

        setProductInfo(productInfo);
        setShow(true);
    }, []);
    const openModalEvent = useCallback((
        productInfo, quantity = 1
    ) => (e) => {
        e.preventDefault();
        openModal({...productInfo, quantity})
    }, [openModal]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        if (
            (isUser || isGuest)
            && !addCartMutation.isLoading
            && selectedValues
            && selectedValues?.color
            && selectedValues?.color?.value
            && selectedValues?.memory
            && selectedValues?.memory?.value
        ) {
            const data = JSON.parse(JSON.stringify(productInfo));

            data[(
                isUser
                    ? 'customer_id'
                    : 'guid'
            )] = account.customer_id.toString();

            data.product_id = data.id.toString();
            data.memory_id = selectedValues.memory.value.toString();
            data.color_id = selectedValues.color.value.toString();
            data.quantity = (data.quantity || 1).toString();

            // mutate
            addCartMutation.mutate(data, {
                onSuccess: (response) => {
                    if (
                        response
                        && response?.data
                        && Array.isArray(response?.data?.cart_items)
                    ) {
                        setFetchedData(response.data.cart_items);
                        clearAll()
                    }
                    toast('🎉 Ürün, sepetine eklendi!');
                    closeModal();
                },
                onError: () => {
                    toast('❌ Ürünü sepetine eklerken bir hata ile karşılaştık :(');
                    console.log('error');
                }
            })
        }
    }, [
        closeModal,
        clearAll,
        selectedValues,
        productInfo,
        isUser,
        isGuest,
        account,
        addCartMutation,
        setFetchedData,
    ]);

    const Modal = useCallback(() => (
        <ReactModal
            isOpen={show}
            className="basket-filter-modal"
            overlayClassName="basket-filter-modal-overlay"
            onRequestClose={closeModal}
            ariaHideApp={false}
        >
            {/* Head */}
            <div className="basket-filter-modal-head">
                <h3>Özellik seçimi</h3>
                <p>
                    Lütfen sepete ekleyeceğiniz ürünün özelliklerini seçin.
                </p>
            </div>

            {/* Filters */}
            <div className="basket-modal-filters">
                {/* Filter */}
                <div className="basket-modal-filter">
                    <label>
                        Renk
                    </label>
                    <div className="basket-modal-filter-input">
                        <Select
                            isLoading={getColors.isLoading}
                            isDisabled={colorSelectBoxIsDisabled}
                            placeholder="Seçiniz"
                            id="basket-modal-filter-memory"
                            value={selectedValues.color || undefined}
                            options={getColors.isSuccess ? getColors.data.data.map(({id, color_name}) => ({
                                label: color_name,
                                value: id,
                            })) : []}
                            onChange={handleChange('color', 'memory')}
                        />
                    </div>
                </div>

                {/* Filter */}
                <div className="basket-modal-filter">
                    <label>
                        Saklama Alanı
                    </label>
                    <div className="basket-modal-filter-input">
                        <Select
                            isLoading={getMemories.isLoading}
                            isDisabled={memorySelectBoxIsDisabled}
                            placeholder="Seçiniz"
                            id="basket-modal-filter-memory"
                            value={selectedValues.memory || undefined}
                            options={getMemories.isSuccess ? getMemories.data.data.map(({memory_value, id}) => ({
                                label: `${memory_value || ''}GB`,
                                value: id,
                            })) : []}
                            onChange={handleChange('memory')}
                        />
                    </div>
                </div>
            </div>

            <div className="basket-filter-modal-buttons">
                <button
                    className="btn btn-secondary"
                    onClick={closeModalEvent}
                >
                    Vazgeç
                </button>
                <button
                    className="btn btn-primary"
                    disabled={submitIsDisabled}
                    onClick={handleSubmit}
                >
                    {addCartMutation.isIdle && 'Sepete Ekle'}
                    {addCartMutation.isSuccess && 'Sepete Eklendi!'}
                    {addCartMutation.isLoading && 'Ekleniyor...'}
                    {addCartMutation.isError && 'Hata!'}
                </button>
            </div>
        </ReactModal>
    ), [
        //
        show,
        selectedValues,

        //
        closeModal,
        closeModalEvent,
        handleChange,
        handleSubmit,

        //
        getColors.isLoading,
        getColors.isSuccess,
        colorSelectBoxIsDisabled,
        getColors.data,

        //
        getMemories.isLoading,
        getMemories.isSuccess,
        memorySelectBoxIsDisabled,
        getMemories.data,

        //
        addCartMutation.isIdle,
        addCartMutation.isLoading,
        addCartMutation.isError,
        addCartMutation.isSuccess,

        //
        submitIsDisabled,
    ]);

    return ({
        Modal,
        show,
        openModal,
        openModalEvent,
        closeModal,
        closeModalEvent,
    });
};

export default BasketFilterModal;
