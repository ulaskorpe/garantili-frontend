import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import TopBar from "../layout/TopBar";

export default function GivingBackForm(props) {
    const { basket, onAddToBasket, removeFromBasket } = props
    const crumbs = [
        { url: '#', title: 'İade Formu' }
    ]
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
                        <BreadCrumb crumbs={crumbs} />
                        <div id="primary" className="content-area">
                            <main id="main" className="site-main">
                                <div class="type-page hentry">
                                    <header class="entry-header">
                                        <div class="page-header-caption text-center">
                                            <h1 class="entry-title">İade Formu</h1>
                                            <br />
                                        </div>
                                    </header>
                                    <div class="entry-content">
                                        <div class="row contact-info">
                                            <div class="col-md-9 left-col">
                                                <div class="text-block">
                                                    <h2 class="contact-page-title">İade Formu</h2>
                                                </div>
                                                <div class="contact-form">
                                                    <div role="form" class="wpcf7" id="wpcf7-f425-o1" lang="en-US" dir="ltr">
                                                        <div class="screen-reader-response"></div>
                                                        <form class="wpcf7-form" novalidate="novalidate">
                                                            <div class="form-group row">
                                                                <div class="col-xs-12 col-md-6">
                                                                    <label>Adınız
                                                                        <abbr title="required" class="required">*</abbr>
                                                                    </label>
                                                                    <br />
                                                                    <span class="wpcf7-form-control-wrap first-name">
                                                                        <input type="text" aria-invalid="false" aria-required="true"
                                                                            class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                            size="40" value="" name="first-name" />
                                                                    </span>
                                                                </div>
                                                                <div class="col-xs-12 col-md-6">
                                                                    <label>Soyadınız
                                                                        <abbr title="required" class="required">*</abbr>
                                                                    </label>
                                                                    <br />
                                                                    <span class="wpcf7-form-control-wrap last-name">
                                                                        <input type="text" aria-invalid="false" aria-required="true"
                                                                            class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                            size="40" value="" name="last-name" />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="form-group row">
                                                                <div class="col-xs-12 col-md-6">
                                                                    <label>Telefon
                                                                        <abbr title="required" class="required">*</abbr>
                                                                    </label>
                                                                    <br />
                                                                    <span class="wpcf7-form-control-wrap first-name">
                                                                        <input type="text" aria-invalid="false" aria-required="true"
                                                                            class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                            size="40" value="" name="phone" />
                                                                    </span>
                                                                </div>
                                                                <div class="col-xs-12 col-md-6">
                                                                    <label>E-Posta
                                                                        <abbr title="required" class="required">*</abbr>
                                                                    </label>
                                                                    <br />
                                                                    <span class="wpcf7-form-control-wrap last-name">
                                                                        <input type="text" aria-invalid="false" aria-required="true"
                                                                            class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                            size="40" value="" name="email" />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="form-group row">
                                                                <div class="col-xs-12 col-md-6">
                                                                    <label>IMEI
                                                                        <abbr title="required" class="required">*</abbr>
                                                                    </label>
                                                                    <br />
                                                                    <span class="wpcf7-form-control-wrap first-name">
                                                                        <input type="text" aria-invalid="false" aria-required="true"
                                                                            class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required input-text"
                                                                            size="40" value="" name="imei" />
                                                                    </span>
                                                                </div>
                                                                <div class="col-xs-12 col-md-6">
                                                                    <label>IMEI 2 (Çift SIM özellikli telefonlar için)
                                                                    </label>
                                                                    <br />
                                                                    <span class="wpcf7-form-control-wrap last-name">
                                                                        <input type="text" aria-invalid="false"
                                                                            class="wpcf7-form-control wpcf7-text input-text"
                                                                            size="40" value="" name="imei-2" />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="form-group row">
                                                                <div class="col-xs-12 col-md-6">
                                                                    <label>Göndermeden önce kontrol edin
                                                                        <abbr title="required" class="required">*</abbr>
                                                                    </label>
                                                                    <br />
                                                                    <span class="wpcf7-form-control-wrap first-name">
                                                                        <input type="checkbox" name="screen-lock" /> <span className="form-text-cb">Ekran Kilidini kaldırdım.</span>
                                                                    </span><br />
                                                                    <span class="wpcf7-form-control-wrap first-name">
                                                                        <input type="checkbox" name="screen-lock" /> <span className="form-text-cb">Hesaplarımdan çıkış yaptım.</span>
                                                                    </span> <br />
                                                                    <span class="wpcf7-form-control-wrap first-name">
                                                                        <input type="checkbox" name="screen-lock" /> <span className="form-text-cb">iPhone'umu Bul'u kapattım.</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label>Not</label>
                                                                <br />
                                                                <span class="wpcf7-form-control-wrap your-message">
                                                                    <textarea aria-invalid="false" class="wpcf7-form-control wpcf7-textarea" rows="2"
                                                                        cols="40" name="your-message"></textarea>
                                                                </span>
                                                            </div>
                                                            <div class="form-group clearfix">
                                                                <p>
                                                                    <input type="submit" value="Gönder" class="wpcf7-form-control wpcf7-submit" />
                                                                </p>
                                                            </div>
                                                            <p className="form-text-cb">İade süreçleri, bankanıza bağlı olarak 7-14 iş günü sürmektedir.</p>
                                                            <div class="wpcf7-response-output wpcf7-display-none"></div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-3 store-info">
                                                <div class="text-block">
                                                    <h2 class="contact-page-title">Adres</h2>
                                                    <address>
                                                        GARANTİLİ TEKNOLOJİ İLETİŞİM HİZMETLERİ LTD ŞTİ
                                                        <br />
                                                        15 Temmuz Mahallesi, Nur Yıldız Plaza, No: 7/21 Kat: 2 Bağcılar / İstanbul
                                                    </address>
                                                    <p>
                                                        Ticari Sicil Numarası: 776437 <br /> Çağrı Merkezi: 0212 485 28 29
                                                    </p>
                                                    <p>Ürününüzü Aras Kargo ve MNG Kargo ile ücretsiz olarak gönderebilirsiniz.
                                                    </p>
                                                    <p className="text-danger">UYARI: İade için gönderilen telefonlarda şifre veya kişisel hesap olması halinde kesinlikle işlem yapılmadan geri gönderilecektir. (* ile belirtilen yerlerin doldurulması zorunludur.)</p>
                                                    <h3>E-Posta</h3>
                                                    <p class="inner-right-md">E-Posta: <a href="mailto:info@garantili.com.tr">info@garantili.com.tr</a></p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>

                    </div>
                </div>
            </div >
            <Footer />
        </div >
    )
}