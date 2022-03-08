import {useCallback, useEffect, useMemo, useState} from "react"
import BreadCrumb from "../layout/BreadCrumb"
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"
import ForgetForm from "../forms/ForgetForm";
import {useMutation} from "react-query";
import {CUSTOMER_FORGET_PASSWORD, DEFAULT_API_KEY, fetchThis} from "../../api";
import {useLocation, useNavigate} from "react-router-dom";
import sweetalert from "sweetalert";

function ForgetPassword(props) {
    /* Props */
    const { basket, removeFromBasket } = props;
    const location = useLocation();
    const navigate = useNavigate();

    /* States */
    const [loading, setLoading] = useState(false);
    const [crumb] = useState([
        { url: '#', title: 'Şifremi Unuttum' }
    ]);

    /* Mutations */
    const forgetPasswordMutation = useMutation((data) => {
        return fetchThis(
            CUSTOMER_FORGET_PASSWORD,
            data,
            DEFAULT_API_KEY,
            [],
        );
    });

    /* Handlers */
    const handleForgetFormSubmit = (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        setLoading(true);
        forgetPasswordMutation?.mutate(values, {
            onSuccess (data) {
                if (!data?.status) {
                    sweetalert({
                        icon: 'error',
                        title: 'Hata',
                        text:data?.errors?.msg || 'Bilinmeyen bir hata ile karşılaşıldı!',
                        button: null,
                    }).then();
                } else {
                    sweetalert({
                        icon: 'success',
                        title: 'İşlem başarılı',
                        text: 'Yeni şifre oluşturuldu ve hesabınıza mail gönderildi.',
                        button: null,
                    }).then(() => {
                        resetForm();
                        navigate('/login', { fromTo: location, replace: true, state: { email: values.email } });
                    });
                }
                setSubmitting(false);
                setLoading(false);
            },
            onError (error) {
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
    };

    /* Utils */
    const isLoading = useCallback((isSubmitting = false) => (
        loading || isSubmitting || forgetPasswordMutation?.isLoading
    ), [loading, forgetPasswordMutation]);
    const submitIsDisabled = useCallback((isSubmitting, errors = {}, values, validator) => (
        isLoading(isSubmitting) || Boolean(Object.keys(errors).length) || Boolean(Object.keys(validator(values)).length)
    ), [isLoading]);

    /* Validations */
    const validateForgetForm = (values) => {
        const errors = {};
        const errorMessages = {
            required: 'Bu alan zorunlu!',
        }

        /* E-posta kontrolleri */
        if (!values.email) {
            errors.email = errorMessages.required;
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Hatalı e-posta adresi girildi';
        }

        return errors;
    }

    /* Effects */
    useEffect(() => {
        if (
            !loading
            && forgetPasswordMutation?.isLoading
            ) {
            setLoading(true);
        }
    }, [loading, setLoading, forgetPasswordMutation?.isLoading]);

    /* Memos */
    const defaultFormProps = useMemo(() => ({
        isLoading,
        submitIsDisabled,
    }),[isLoading, submitIsDisabled])

    return (
        <div className="woocommerce-active single-product full-width normal">
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
                                        <div className="woocommerce">
                                            <div className="customer-login-form">
                                                <div id="customer_login" className="u-columns col2-set">
                                                    <ForgetForm
                                                        handleSubmit={handleForgetFormSubmit}
                                                        validateForm={validateForgetForm}
                                                        {...defaultFormProps}
                                                    />
                                                </div>
                                            </div>
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

export default ForgetPassword