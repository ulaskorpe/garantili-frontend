import {useCallback, useEffect, useMemo, useState} from "react"
import BreadCrumb from "../layout/BreadCrumb"
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import Topbar from "../layout/Topbar"
import RegisterForm from "../forms/RegisterForm";
import LoginForm from "../forms/LoginForm";
import {useMutation} from "react-query";
import {CREATE_CUSTOMER, DEFAULT_API_KEY, fetchThis, LOGIN_CUSTOMER} from "../../api";
import {useAuth} from "../../context/auth";
import {useLocation, useNavigate} from "react-router-dom";

function Login(props) {
    /* Props */
    const { basket, removeFromBasket } = props;
    const navigate = useNavigate();
    const location = useLocation();

    /* context */
    const { login, state } = useAuth();

    /* States */
    const [loading, setLoading] = useState(false);
    const [crumb] = useState([
        { url: '#', title: 'Giriş Yap / Kayıt Ol' }
    ]);

    /* Mutations */
    const loginMutation = useMutation((data) => {
        return fetchThis(
            LOGIN_CUSTOMER,
            data,
            DEFAULT_API_KEY,
            [],
        );
    });
    const registerMutation = useMutation((data) => {
        return fetchThis(
            CREATE_CUSTOMER,
            data,
            DEFAULT_API_KEY,
            [],
        );
    });

    /* Handlers */
    const onError = (setSubmitting, cb = (err, data) => null) => (error, data) => {
        if (!(error?.code === 'not_verified')) {
            alert(error?.message || error || 'Bilinmeyen bir hata ile karşılaşıldı!');
        }
        setSubmitting(false);
        setLoading(false);
        cb(error, data);
    };
    const onSuccess = (
        successMessage,
        resetForm,
        setSubmitting,
        cb = (data) => null
    ) => ({ status = false, errors = { msg: '' }, data = {}}) => {
        if (!status) {
            alert(errors?.msg || 'Bilinmeyen bir hata ile karşılaşıldı!');
        } else {
            alert(successMessage || 'İşlem başarılı');
            resetForm();
            cb(data);
        }
        setSubmitting(false);
        setLoading(false);
    }
    const handleLoginFormSubmit = (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        setLoading(true);
        loginMutation?.mutate(values, {
            onSuccess: onSuccess(
                'Giriş başarılı',
                resetForm,
                setSubmitting,
                (data) => {
                    login(data);
                }
            ),
            onError: onError(
                setSubmitting,
                (err, data) => {
                    if (err.code === 'not_verified') {
                        navigate(
                            '/verify-account',
                            {
                                fromTo: location,
                                replace: true,
                                state: { email: data.email }
                            }
                        );
                    }
                }
            ),
        });
    };
    const handleRegisterFormSubmit = (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        setLoading(true);
        registerMutation?.mutate(values, {
            onSuccess: onSuccess(
                'Kayıt başarılı.',
                resetForm,
                setSubmitting,
                () => {
                  navigate('/verify-account', {
                      fromTo: location,
                      replace: true,
                      state: {
                          email: values.email
                      },
                  })
                },
            ),
            onError: onError(setSubmitting),
        });
    };

    /* Utils */
    const isDisabled = useCallback((isSubmitting = false) => (
        loading || isSubmitting || loginMutation?.isLoading || registerMutation?.isLoading
    ), [loading, loginMutation, registerMutation]);

    /* Validations */
    const validateLoginForm = (values) => {
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

        /* Şifre kontrolleri */
        if (!values.password) {
            errors.password = errorMessages.required;
        }

        return errors;
    }
    const validateRegisterForm = (values) => {
        const errors = {};
        const errorMessages = {
            required: 'Bu alan zorunlu!',
        }

        /* Ad kontrolleri */
        if (!values.name) {
            errors.name = errorMessages.required;
        }

        /* Soyad kontrolleri */
        if (!values.surname) {
            errors.surname = errorMessages.required;
        }

        /* E-posta kontrolleri */
        if (!values.email) {
            errors.email = errorMessages.required;
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Hatalı e-posta adresi girildi';
        }

        /* Şifre kontrolleri */
        if (!values.password) {
            errors.password = errorMessages.required;
        }

        return errors;
    }

    /* Effects */
    useEffect(() => {
        if (
            !loading
            && (
                loginMutation?.isLoading
                || registerMutation?.isLoading
            )
            ) {
            setLoading(true);
        }
    }, [loading, setLoading, loginMutation?.isLoading, registerMutation?.isLoading]);

    /* Memos */
    const defaultFormProps = useMemo(() => ({
        isDisabled,
    }),[isDisabled])

    return (
        <div className="woocommerce-active single-product full-width normal">
            <div id="page" className="hfeed site">
                <Topbar />
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
                                                    <LoginForm
                                                        handleSubmit={handleLoginFormSubmit}
                                                        validateForm={validateLoginForm}
                                                        {...defaultFormProps}
                                                    />
                                                    <RegisterForm
                                                        handleSubmit={handleRegisterFormSubmit}
                                                        validateForm={validateRegisterForm}
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

export default Login