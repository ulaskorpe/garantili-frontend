import {useCallback, useEffect, useMemo, useState} from "react"
import BreadCrumb from "../layout/BreadCrumb"
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import TopBar from "../layout/TopBar"
import RegisterForm from "../forms/RegisterForm";
import LoginForm from "../forms/LoginForm";
import {useMutation} from "react-query";
import sweetalert from 'sweetalert';
import {CREATE_CUSTOMER, DEFAULT_API_KEY, fetchThis, LOGIN_CUSTOMER} from "../../api";
import {useAuth} from "../../context/auth";
import {useLocation, useNavigate} from "react-router-dom";

function Login(props) {
    /* Props */
    const { basket, removeFromBasket } = props;
    const navigate = useNavigate();
    const location = useLocation();

    /* context */
    const { login } = useAuth();

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
            sweetalert({
                icon: 'error',
                title: 'Hata',
                text: error?.message || error || 'Bilinmeyen bir hata ile karşılaşıldı!',
                button: null,
            }).then();
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
                text: successMessage || 'İşlem başarılı',
                button: null,
            }).then(() => {
                resetForm();
                cb(data);
            });
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
    const isLoading = useCallback((isSubmitting = false) => (
        loading || isSubmitting || loginMutation?.isLoading || registerMutation?.isLoading
    ), [loading, loginMutation, registerMutation]);
    const submitIsDisabled = useCallback((isSubmitting, errors = {}, values, validator) => (
        isLoading(isSubmitting) || Boolean(Object.keys(errors).length) || Boolean(Object.keys(validator(values)).length)
    ), [isLoading]);

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
                                                <div className="u-columns col2-set">
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