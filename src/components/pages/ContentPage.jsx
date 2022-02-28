import { useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import Topbar from "../layout/Topbar";

export default function ContentPage(props) {


    const { basket, onAddToBasket, removeFromBasket } = props


    const { id } = useParams()

    const [pages, setPages] = useState([
        {
            id: 1,
            title: 'Hakkımızda',
            body: `
            <div class="type-page hentry">
                <header class="entry-header">
                <div class="page-header-caption">
                    <h1 class="entry-title">Hakkımızda</h1>
                    <br />
                </div>
                </header>
                <div class="entry-content text-left">
                <div class="row accordion-block">
                <div class="text-boxes col-sm-12">
                    <div class="row first-row">
                        <div class="col-sm-6 pr-6">
                            <div class="text-block">
                                <h3 class="highlight">Vizyonumuz</h3>
                                <p>Kaliteli hizmet prensibimizle fark oluşturmak, yenilenmiş ürün çalışma modelimizle atıl durumda
                                    bekleyen ürünleri tekrar kullanıma kazandırmak ve bu şekilde yurt dışına döviz akışını azaltıp
                                    ülke ekonomisine katkıda bulunmak.</p>
                            </div>
                        </div>
                        <div class="col-sm-6 pl-6">
                            <div class="text-block">
                                <h3 class="highlight">Misyonumuz</h3>
                                <p>Her biri konusunda uzman personelimiz ve yüksek teknoloji ekipmanlarımızla; kaliteli işçilik,
                                    kaliteli malzeme ve kaliteli hizmet mottomuz ışığında, müşterilerimize ayrıcalıklı olduklarını
                                    hissettirmek ve memnuniyetlerini sağlamak.</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 pr-6">
                            <div class="text-block">
                                <h3 class="highlight">Değerlerimiz</h3>
                                <p>Dürüst, vazgeçilemez etik prensipleri olan, çevreye duyarlı, yenilikçi, güvenilir, gelişim ve
                                    değişime açık, temasta olduğu tüm kişi ve kurumların değerlerine saygı duyan, gerçek başarının
                                    insanların mutluluğunu sağlamak olduğuna inanan bir firmayız. </p>
                            </div>
                        </div>
                        <div class="col-sm-6 pl-6">
                            <div class="text-block">
                                <h3 class="highlight">Farklılıklarımız</h3>
                                <p>Firmamızda 1. kalite, 2. kalite ayrımı yoktur. Yaptığımız tüm işlemler ve kullandığımız tüm yedek
                                    parçalar 1. kalitedir.Yenilediğimiz tüm telefonlar en üst kalitede, sıfır telefon özelliklerinde
                                    hizmete sunulur.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
                </div>
                    </section>
                </div>
            </div>
            `,
            crumbs: [
                { url: '#', title: 'Hakkımızda' },
            ]
        },
        {
            id: 2,
            title: 'Hizmetlerimiz',
            body: `
            <div class="type-page hentry">
            <header class="entry-header">
                <div class="page-header-caption">
                    <h1 class="entry-title">Hizmetlerimiz</h1>
                    <br />
                </div>
            </header>
            <div class="entry-content text-left">
                <div class="row accordion-block">
                    <div class="text-boxes col-sm-12">
                        <div class="row first-row">
                        <div class="col-sm-6 pr-6">
                        <div class="text-block">
                            <h3 class="highlight">Cep Telefonu Yenileme</h3>
                            <p>TSE ve Ticaret Bakanlığı onaylı cep telefonu yenileme merkezimizde toplanan cep
                                telefonları, her biri konusunda uzman ekibimiz tarafından kontrol edilip değişimi
                                gereken parçalar belirlenir. Bu parçalar en kaliteli ve orijinal yedek parçalar
                                kullanılarak değiştirilir, telefonun donanım ve kozmetik bakımı sonrası testleri
                                yapılır. Testlerden sorunsuz geçen telefonlara hologram ve karekod eklenir. Kullanıma
                                hazır telefonlar ambalajlanır ve paketlenir. Paket içeriğindeki garanti belgesi ile
                                satışa sunulur. Yenilenen her cihazın bir karekodu mevcuttur, telefonu satın alan
                                kullanıcı; telefonun IMEI numarası veya karekodunu kullanarak ilgili telefona dair
                                yapılan tüm işlemleri görebilir. </p>
                        </div>
                    </div>
                            <div class="col-sm-6 pl-6">
                                <div class="text-block">
                                    <h3 class="highlight">Cep Telefonu Tamiri</h3>
                                    <p>Bakım onarım gerektiren cep telefonlarınızı, web adresimizde bulunan "Telefon Onarım"
                                        formunu doldurarak ve ücretsiz olarak firmamıza gönderebilirsiniz. Gönderdiğiniz ürünün
                                        kontrolleri yapılarak, bakım onarım maliyeti sizinle paylaşılacak ve onayınızdan sonra
                                        bakım onarım işlemi yapılacaktır. Bakım onarım sonrası ürününüz, yine ücretsiz olarak
                                        faturasıyla birlikte tarafınıza gönderilecektir. Değiştirilen parçalar 12 ay boyunca
                                        garanti kapsamındadır.</p>
                                </div>
                            </div>
                           
                        </div>
                        <div class="row first-row">
                            <div class="col-sm-6 pr-6">
                                <div class="text-block">
                                    <h3 class="highlight">Cep Telefonu Geri Alım</h3>
                                    <p>Eskiyen veya kullanmadığınız cep telefonlarınız için web sitemizdeki "Telefon Sat"
                                        modülünü kullanarak talep oluşturabilirsiniz. Aldığınız fiyat teklifine onay vermeniz
                                        durumunda ürününüzü kolaylıkla satabilirsiniz. Gönderdiğiniz ürünler için kargo bedeli
                                        alınmamaktadır. Ödemeler tarafınıza 4-5 iş günü içerisinde yapılmaktadır.</p>
                                </div>
                            </div>
                            <div class="col-sm-6 pl-6">
                                <div class="text-block">
                                    <h3 class="highlight">Garantili Cep Telefonu Satışı</h3>
                                    <p>TSE ve Ticaret Bakanlığı tarafından denetlenerek 1 yıl garantili yenilenmiş cep telefonu
                                        satmaya yetkili olan yenileme merkezimizin genel merkezinden veya web sitemizden
                                        “Telefon Al” linkini tıklayarak güvenle alışveriş yapabilirsiniz. </p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 pr-6">
                                <div class="text-block">
                                    <h3 class="highlight">Aksesuar Satışı</h3>
                                    <p>Çeşitli marka ve modele göre cep telefonu kılıfı, sarj aleti, kulaklık vb. aksesuar
                                        satışımız bulunmaktadır. Elektronik aksesuarlarda kullanım hatası harici problem
                                        yaşamanız durumunda 0531 733 00 38 numaralı whatsapp hattından müşteri temsilcimiz ile
                                        iletişime geçebilirsiniz.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </div>
            `,
            crumbs: [
                { url: '#', title: 'Hizmetlerimiz' },
            ]
        }
    ])

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
                        <BreadCrumb crumbs={pages.find(l => l.id == id)?.crumbs} />
                        <div id="primary" class="content-area">
                            <main id="main" class="site-main text-center">
                                <div id="primary" className="content-area">
                                    <main id="main" className="site-main" dangerouslySetInnerHTML={{ __html: pages.find(l => l.id == id)?.body }}>

                                    </main>
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