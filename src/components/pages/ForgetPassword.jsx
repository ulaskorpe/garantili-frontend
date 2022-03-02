import {useCallback, useEffect, useMemo, useState} from "react"
import BreadCrumb from "../layout/BreadCrumb"
import Footer from "../layout/Footer/Footer"
import HeaderMain from "../layout/Header/Header"
import Topbar from "../layout/Topbar"
import ForgetForm from "../forms/ForgetForm";
import {useMutation} from "react-query";
import {CUSTOMER_FORGET_PASSWORD, DEFAULT_API_KEY, fetchThis} from "../../api";
import {useLocation, useNavigate} from "react-router-dom";

function ForgetPassword(props) {
    /* Props */
    const { basket, removeFromBasket } = props;
    const location = useLocation();
    const navigate = useNavigate();

    /* States */
    const [loading, setLoading] = useState(false);
    const [crumb] = useState([
        { url: '#', title: 'Giriş Yap / Kayıt Ol' }
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
                    alert(data?.errors?.msg || 'Bilinmeyen bir hata ile karşılaşıldı!');
                } else {
                    alert('Yeni şifre oluşturuldu ve hesabınıza mail gönderildi.');
                    resetForm();
                    navigate('/login', { fromTo: location, replace: true });
                }
                setSubmitting(false);
                setLoading(false);
            },
            onError (error) {
                alert(error?.message || error || 'Bilinmeyen bir hata ile karşılaşıldı!');
                setSubmitting(false);
                setLoading(false);
            },
        });
    };

    /* Utils */
    const isDisabled = useCallback((isSubmitting = false) => (
        loading || isSubmitting || forgetPasswordMutation?.isLoading
    ), [loading, forgetPasswordMutation?.isLoading]);

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