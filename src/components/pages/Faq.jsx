import React from 'react';
import { useState } from "react";
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import TopBar from "../layout/TopBar";
import {useQuery} from "react-query";
import {DEFAULT_API_KEY, fetchThis, GET_FAQ_LIST, retry} from "../../api";

export default function ContentPage(props) {
    const { basket, removeFromBasket } = props;

    const faq = useQuery(
        ['faq-list'],
        () => (
            fetchThis(
                GET_FAQ_LIST,
                {},
                DEFAULT_API_KEY,
            )
        ),
        { retry, refetchOnWindowFocus: false  },
    );
    // const [faq, setFaqs] = useState([
    //     { title: 'Yenilenmiş cep telefonu nedir?', content: 'Yenilenmiş cep telefonu; uzman teknik ekip kadromuz tarafından TSE Standardlarına göre 32 kontrol noktada testlerden geçen, sıfır telefon gibi fonksiyonları %100 çalışan, IMEI numarası hukuksal hiçbir sorun teşkil etmeyen, özel kutuya sahip ve 1 yıl garantilli olan üründür. Kullanılmış cep telefonlarının belirli bir standartta yenilenerek, garantili ve sertifikalı bir şekilde “yenilenmiş ürün” olarak tekrar satışa sunulmasına ilişkin usul ve esasları düzenleyen Yenilenmiş Ürünlerin Satışı Hakkında Yönetmelik 22.08.2020 tarihli ve 31221 sayılı Resmî Gazetede yayımlanarak yürürlüğe girmiştir. Anılan Yönetmelik hükümleri uyarınca, “yenileme” işlemlerini yapma ve “yenilenmiş ürün” piyasaya arz etme faaliyetleri Ticaret Bakanlığı tarafınca yetkilendirilen Garantili Teknoloji tarafından yapılabilecektir. ' },
    //     { title: 'Yenilenmiş cep telefonu nedir?', content: 'Yenilenmiş cep telefonu; uzman teknik ekip kadromuz tarafından TSE Standardlarına göre 32 kontrol noktada testlerden geçen, sıfır telefon gibi fonksiyonları %100 çalışan, IMEI numarası hukuksal hiçbir sorun teşkil etmeyen, özel kutuya sahip ve 1 yıl garantilli olan üründür. Kullanılmış cep telefonlarının belirli bir standartta yenilenerek, garantili ve sertifikalı bir şekilde “yenilenmiş ürün” olarak tekrar satışa sunulmasına ilişkin usul ve esasları düzenleyen Yenilenmiş Ürünlerin Satışı Hakkında Yönetmelik 22.08.2020 tarihli ve 31221 sayılı Resmî Gazetede yayımlanarak yürürlüğe girmiştir. Anılan Yönetmelik hükümleri uyarınca, “yenileme” işlemlerini yapma ve “yenilenmiş ürün” piyasaya arz etme faaliyetleri Ticaret Bakanlığı tarafınca yetkilendirilen Garantili Teknoloji tarafından yapılabilecektir. ' },
    //     { title: 'Yenilenmiş cep telefonu nedir?', content: 'Yenilenmiş cep telefonu; uzman teknik ekip kadromuz tarafından TSE Standardlarına göre 32 kontrol noktada testlerden geçen, sıfır telefon gibi fonksiyonları %100 çalışan, IMEI numarası hukuksal hiçbir sorun teşkil etmeyen, özel kutuya sahip ve 1 yıl garantilli olan üründür. Kullanılmış cep telefonlarının belirli bir standartta yenilenerek, garantili ve sertifikalı bir şekilde “yenilenmiş ürün” olarak tekrar satışa sunulmasına ilişkin usul ve esasları düzenleyen Yenilenmiş Ürünlerin Satışı Hakkında Yönetmelik 22.08.2020 tarihli ve 31221 sayılı Resmî Gazetede yayımlanarak yürürlüğe girmiştir. Anılan Yönetmelik hükümleri uyarınca, “yenileme” işlemlerini yapma ve “yenilenmiş ürün” piyasaya arz etme faaliyetleri Ticaret Bakanlığı tarafınca yetkilendirilen Garantili Teknoloji tarafından yapılabilecektir. ' },
    //     { title: 'Yenilenmiş cep telefonu nedir?', content: 'Yenilenmiş cep telefonu; uzman teknik ekip kadromuz tarafından TSE Standardlarına göre 32 kontrol noktada testlerden geçen, sıfır telefon gibi fonksiyonları %100 çalışan, IMEI numarası hukuksal hiçbir sorun teşkil etmeyen, özel kutuya sahip ve 1 yıl garantilli olan üründür. Kullanılmış cep telefonlarının belirli bir standartta yenilenerek, garantili ve sertifikalı bir şekilde “yenilenmiş ürün” olarak tekrar satışa sunulmasına ilişkin usul ve esasları düzenleyen Yenilenmiş Ürünlerin Satışı Hakkında Yönetmelik 22.08.2020 tarihli ve 31221 sayılı Resmî Gazetede yayımlanarak yürürlüğe girmiştir. Anılan Yönetmelik hükümleri uyarınca, “yenileme” işlemlerini yapma ve “yenilenmiş ürün” piyasaya arz etme faaliyetleri Ticaret Bakanlığı tarafınca yetkilendirilen Garantili Teknoloji tarafından yapılabilecektir. ' },
    //     { title: 'Yenilenmiş cep telefonu nedir?', content: 'Yenilenmiş cep telefonu; uzman teknik ekip kadromuz tarafından TSE Standardlarına göre 32 kontrol noktada testlerden geçen, sıfır telefon gibi fonksiyonları %100 çalışan, IMEI numarası hukuksal hiçbir sorun teşkil etmeyen, özel kutuya sahip ve 1 yıl garantilli olan üründür. Kullanılmış cep telefonlarının belirli bir standartta yenilenerek, garantili ve sertifikalı bir şekilde “yenilenmiş ürün” olarak tekrar satışa sunulmasına ilişkin usul ve esasları düzenleyen Yenilenmiş Ürünlerin Satışı Hakkında Yönetmelik 22.08.2020 tarihli ve 31221 sayılı Resmî Gazetede yayımlanarak yürürlüğe girmiştir. Anılan Yönetmelik hükümleri uyarınca, “yenileme” işlemlerini yapma ve “yenilenmiş ürün” piyasaya arz etme faaliyetleri Ticaret Bakanlığı tarafınca yetkilendirilen Garantili Teknoloji tarafından yapılabilecektir. ' },
    // ])

    const [crumbs] = useState([{ url: '/', title: 'Sıkça Sorulan Sorular' }])

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
                                <div className="type-page hentry">
                                    <header className="entry-header mb-0">
                                        <div className="page-header-caption text-center">
                                            <h1 className="entry-title">Sıkça Sorulan Sorular</h1>
                                            <br />
                                        </div>
                                    </header>
                                    <div className="entry-content">
                                        <div id="accordion" className="faq-accordion-wrap" role="tablist" aria-multiselectable="true">
                                            {faq.isSuccess && faq.data.status && (
                                                faq.data.data.map((item, itemIdx) => {
                                                    return (
                                                        <div className="card" key={item.id}>
                                                            <div className="card-header" role="tab" id={'heading-' + item.id}>
                                                                <h5 className="mb-0">
                                                                    <a data-toggle="collapse" data-parent="#accordion" href={'#collapse-' + item.id} aria-expanded="true"
                                                                       aria-controls={'collapse-' + item.id}>
                                                                        <i className="icon" />
                                                                        {item.title}
                                                                    </a>
                                                                </h5>
                                                            </div>

                                                            <div id={'collapse-' + item.id} className={itemIdx === 0 ? 'collapse show' : 'collapse'} role="tabpanel" aria-labelledby={'heading-' + item.id}>
                                                                <div className="card-block" dangerouslySetInnerHTML={{ __html: item.content }} />
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            )}
                                            {faq.isLoading && (
                                                <div style={{ display: 'flex', padding: '30px 40px', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                    <span>Sıkça sorulan sorular listesi getiriliyor lütfen bekleyin...</span>
                                                </div>
                                            )}
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