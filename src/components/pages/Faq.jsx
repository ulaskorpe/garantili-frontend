import { useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import TopBar from "../layout/TopBar";

export default function ContentPage(props) {


    const { basket, onAddToBasket, removeFromBasket } = props


    const { id } = useParams()

    const [faq, setFaqs] = useState([
        { title: 'Yenilenmiş cep telefonu nedir?', content: 'Yenilenmiş cep telefonu; uzman teknik ekip kadromuz tarafından TSE Standardlarına göre 32 kontrol noktada testlerden geçen, sıfır telefon gibi fonksiyonları %100 çalışan, IMEI numarası hukuksal hiçbir sorun teşkil etmeyen, özel kutuya sahip ve 1 yıl garantilli olan üründür. Kullanılmış cep telefonlarının belirli bir standartta yenilenerek, garantili ve sertifikalı bir şekilde “yenilenmiş ürün” olarak tekrar satışa sunulmasına ilişkin usul ve esasları düzenleyen Yenilenmiş Ürünlerin Satışı Hakkında Yönetmelik 22.08.2020 tarihli ve 31221 sayılı Resmî Gazetede yayımlanarak yürürlüğe girmiştir. Anılan Yönetmelik hükümleri uyarınca, “yenileme” işlemlerini yapma ve “yenilenmiş ürün” piyasaya arz etme faaliyetleri Ticaret Bakanlığı tarafınca yetkilendirilen Garantili Teknoloji tarafından yapılabilecektir. ' },
        { title: 'Yenilenmiş cep telefonu nedir?', content: 'Yenilenmiş cep telefonu; uzman teknik ekip kadromuz tarafından TSE Standardlarına göre 32 kontrol noktada testlerden geçen, sıfır telefon gibi fonksiyonları %100 çalışan, IMEI numarası hukuksal hiçbir sorun teşkil etmeyen, özel kutuya sahip ve 1 yıl garantilli olan üründür. Kullanılmış cep telefonlarının belirli bir standartta yenilenerek, garantili ve sertifikalı bir şekilde “yenilenmiş ürün” olarak tekrar satışa sunulmasına ilişkin usul ve esasları düzenleyen Yenilenmiş Ürünlerin Satışı Hakkında Yönetmelik 22.08.2020 tarihli ve 31221 sayılı Resmî Gazetede yayımlanarak yürürlüğe girmiştir. Anılan Yönetmelik hükümleri uyarınca, “yenileme” işlemlerini yapma ve “yenilenmiş ürün” piyasaya arz etme faaliyetleri Ticaret Bakanlığı tarafınca yetkilendirilen Garantili Teknoloji tarafından yapılabilecektir. ' },
        { title: 'Yenilenmiş cep telefonu nedir?', content: 'Yenilenmiş cep telefonu; uzman teknik ekip kadromuz tarafından TSE Standardlarına göre 32 kontrol noktada testlerden geçen, sıfır telefon gibi fonksiyonları %100 çalışan, IMEI numarası hukuksal hiçbir sorun teşkil etmeyen, özel kutuya sahip ve 1 yıl garantilli olan üründür. Kullanılmış cep telefonlarının belirli bir standartta yenilenerek, garantili ve sertifikalı bir şekilde “yenilenmiş ürün” olarak tekrar satışa sunulmasına ilişkin usul ve esasları düzenleyen Yenilenmiş Ürünlerin Satışı Hakkında Yönetmelik 22.08.2020 tarihli ve 31221 sayılı Resmî Gazetede yayımlanarak yürürlüğe girmiştir. Anılan Yönetmelik hükümleri uyarınca, “yenileme” işlemlerini yapma ve “yenilenmiş ürün” piyasaya arz etme faaliyetleri Ticaret Bakanlığı tarafınca yetkilendirilen Garantili Teknoloji tarafından yapılabilecektir. ' },
        { title: 'Yenilenmiş cep telefonu nedir?', content: 'Yenilenmiş cep telefonu; uzman teknik ekip kadromuz tarafından TSE Standardlarına göre 32 kontrol noktada testlerden geçen, sıfır telefon gibi fonksiyonları %100 çalışan, IMEI numarası hukuksal hiçbir sorun teşkil etmeyen, özel kutuya sahip ve 1 yıl garantilli olan üründür. Kullanılmış cep telefonlarının belirli bir standartta yenilenerek, garantili ve sertifikalı bir şekilde “yenilenmiş ürün” olarak tekrar satışa sunulmasına ilişkin usul ve esasları düzenleyen Yenilenmiş Ürünlerin Satışı Hakkında Yönetmelik 22.08.2020 tarihli ve 31221 sayılı Resmî Gazetede yayımlanarak yürürlüğe girmiştir. Anılan Yönetmelik hükümleri uyarınca, “yenileme” işlemlerini yapma ve “yenilenmiş ürün” piyasaya arz etme faaliyetleri Ticaret Bakanlığı tarafınca yetkilendirilen Garantili Teknoloji tarafından yapılabilecektir. ' },
        { title: 'Yenilenmiş cep telefonu nedir?', content: 'Yenilenmiş cep telefonu; uzman teknik ekip kadromuz tarafından TSE Standardlarına göre 32 kontrol noktada testlerden geçen, sıfır telefon gibi fonksiyonları %100 çalışan, IMEI numarası hukuksal hiçbir sorun teşkil etmeyen, özel kutuya sahip ve 1 yıl garantilli olan üründür. Kullanılmış cep telefonlarının belirli bir standartta yenilenerek, garantili ve sertifikalı bir şekilde “yenilenmiş ürün” olarak tekrar satışa sunulmasına ilişkin usul ve esasları düzenleyen Yenilenmiş Ürünlerin Satışı Hakkında Yönetmelik 22.08.2020 tarihli ve 31221 sayılı Resmî Gazetede yayımlanarak yürürlüğe girmiştir. Anılan Yönetmelik hükümleri uyarınca, “yenileme” işlemlerini yapma ve “yenilenmiş ürün” piyasaya arz etme faaliyetleri Ticaret Bakanlığı tarafınca yetkilendirilen Garantili Teknoloji tarafından yapılabilecektir. ' },
    ])

    const [crumbs, setCrumb] = useState([{ url: '/', title: 'Sıkça Sorulan Sorular' }])

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
                        <div id="primary" class="content-area">
                            <main id="main" class="site-main">
                                <div class="type-page hentry">
                                    <header class="entry-header mb-0">
                                        <div class="page-header-caption text-center">
                                            <h1 class="entry-title">Sıkça Sorulan Sorular</h1>
                                            <br />
                                        </div>
                                    </header>
                                    <div class="entry-content">                                       
                                        <div id="accordion" class="faq-accordion-wrap" role="tablist" aria-multiselectable="true">
                                            {
                                                faq.map((item, i) => {
                                                    return (
                                                        <div class="card" key={i}>
                                                            <div class="card-header" role="tab" id={'heading-' + i}>
                                                                <h5 class="mb-0">
                                                                    <a data-toggle="collapse" data-parent="#accordion" href={'#collapse-' + i} aria-expanded="true"
                                                                        aria-controls={'collapse-' + i}>
                                                                        <i class="icon"></i>
                                                                        {item.title}
                                                                    </a>
                                                                </h5>
                                                            </div>

                                                            <div id={'collapse-' + i} class={i === 0 ? 'collapse show' : 'collapse'} role="tabpanel" aria-labelledby={'heading-' + i}>
                                                                <div class="card-block" dangerouslySetInnerHTML={{ __html: [item.content] }} />
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
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