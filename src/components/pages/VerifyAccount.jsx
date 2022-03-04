import {useCallback, useEffect, useMemo, useState} from "react"
import BreadCrumb from "../layout/BreadCrumb"
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"
import {useMutation} from "react-query";
import {CUSTOMER_ACTIVATION, CUSTOMER_RESEND_ACTIVE_CODE, DEFAULT_API_KEY, fetchThis} from "../../api";
import {useLocation, useNavigate} from "react-router-dom";
import VerifyForm from "../forms/VerifyForm";
import {useAuth} from "../../context/auth";

function ForgetPassword(props) {
    /* Props */
    const { basket, removeFromBasket } = props;
    const location = useLocation();
    const navigate = useNavigate();

    /* States */
    const [loading, setLoading] = useState(false);
    const [crumb] = useState([
        { url: '#', title: 'Hesap Doğrulama' }
    ]);

    const { state, isLogged } = useAuth();

    /* Mutations */
    const verifyMutation = useMutation((data) => {
        return fetchThis(
            CUSTOMER_ACTIVATION,
            {
                activation_key: parseInt(data.activation_key || '0'),
                email: location?.state?.email,
            },
            DEFAULT_API_KEY,
            [],
        );
    });
    const resendCodeMutation = useMutation((data) => {
        return fetchThis(
            CUSTOMER_RESEND_ACTIVE_CODE,
            {
                email: location?.state?.email,
            },
            DEFAULT_API_KEY,
            [],
        );
    });

    /* Handlers */
    const handleVerifyFormSubmit = (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        setLoading(true);
        verifyMutation?.mutate(values, {
            onSuccess (data) {
                if (!data?.status) {
                    alert(data?.errors?.msg || 'Bilinmeyen bir hata ile karşılaşıldı!');
                } else {
                    alert('Hesabınızı doğruladınız, teşekkürler.');
                    resetForm();
                    navigate(
                        '/login', {
                            fromTo: location,
                            state: {
                                email: location?.state?.email,
                            },
                        },
                    );
                }
                setSubmitting(false);
                setLoading(false);
            },
            onError (error) {
                alert(error?.message || error || 'Bilinmeyen bir hata ile karşılaşıldı!');
                resetForm();
                setSubmitting(false);
                setLoading(false);
            },
        });
    };
    const handleClickResendLink = (resetForm) => (e) => {
        e.preventDefault();
        setLoading(true);
        resendCodeMutation?.mutate({ email: location?.state?.email }, {
            onSuccess (data) {
                if (!data?.status) {
                    alert(data?.errors?.msg || 'Bilinmeyen bir hata ile karşılaşıldı!');
                } else {
                    alert('Doğrulama mesajı tekrardan gönderildi, lütfen istenmeyen klasörünü kontrol edin..');
                    resetForm();
                }
                setLoading(false);
            },
            onError (error) {
                alert(error?.message || error || 'Bilinmeyen bir hata ile karşılaşıldı!');
                resetForm();
                setLoading(false);
            },
        });
    };

    /* Utils */
    const isLoading = useCallback((isSubmitting = false) => (
        loading || isSubmitting || verifyMutation?.isLoading || resendCodeMutation?.isLoading
    ), [loading, verifyMutation, resendCodeMutation]);
    const disableResendButton = useCallback((isSubmitting = false) => (
        isLoading(isSubmitting) || resendCodeMutation.isSuccess
    ), [isLoading, resendCodeMutation]);
    const submitIsDisabled = useCallback((isSubmitting, errors = {}, values, validator) => (
        isLoading(isSubmitting) || Boolean(Object.keys(errors).length) || Boolean(Object.keys(validator(values)).length)
    ), [isLoading]);

    /* Validations */
    const validateVerifyForm = (values) => {
        const errors = {};
        const errorMessages = {
            required: 'Bu alan zorunlu!',
        }

        /* */
        if (!values.activation_key) {
            errors.activation_key = errorMessages.required;
        } else if (
            !/^[0-9]{6}/g.test(values.activation_key.replace(' ', ''))
        ) {
            errors.activation_key = 'Girilen kod hatalı';
        }

        return errors;
    }

    /* Effects */
    useEffect(() => {
        if (
            !loading
            && verifyMutation?.isLoading
            ) {
            setLoading(true);
        }
    }, [loading, setLoading, verifyMutation?.isLoading]);
    useEffect(() => {
        let redirect = !location.state?.email;
        let redirectPath = '/login';

        if (isLogged) {
            if (state.status === 0) {
                redirect = false;
            } else {
                redirect = true;
                redirectPath = '/';
            }
        }

        if (redirect) navigate(redirectPath, { fromTo: location, replace: true });

    }, [location, navigate, state, isLogged])

    /* Memos */
    const defaultFormProps = useMemo(() => ({
        isLoading, submitIsDisabled, handleClickResendLink, disableResendButton
    }),[isLoading, submitIsDisabled]);

    if (!location?.state?.email) {
        return <></>;
    }

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
                                                    <VerifyForm
                                                        handleSubmit={handleVerifyFormSubmit}
                                                        validateForm={validateVerifyForm}
                                                        email={location?.state?.email}
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