import { useState } from "react";
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import TopBar from "../layout/TopBar";

export default function News(props) {

    const { basket, onAddToBasket, removeFromBasket } = props
    const [posts, setPosts] = useState([
        {
            "title": "Id nulla reprehenderit duis dolore adipisicing anim laboris.",
            "imageUrl": "/assets/images/haber4.jpg",
            "url": "/bizden-haberler/0",
            "date": "Şubat 1, 2022",
            "description": "Quis ad consectetur ipsum eiusmod minim reprehenderit ea mollit qui cillum. Duis nulla amet exercitation est cillum ex."
        },
        {
            "title": "Quis ea dolor nostrud est eiusmod eu reprehenderit nulla.",
            "imageUrl": "/assets/images/haber1.jpg",
            "url": "/bizden-haberler/1",
            "date": "Şubat 1, 2022",
            "description": "Est laborum eu nisi id sit aliquip minim esse ea. Proident eiusmod ullamco reprehenderit excepteur magna labore."
        },
        {
            "title": "Esse cillum dolor quis culpa qui nostrud laborum.",
            "imageUrl": "/assets/images/haber2.jpg",
            "url": "/bizden-haberler/2",
            "date": "Şubat 1, 2022",
            "description": "Ullamco nostrud ex anim laborum nulla cillum sunt anim adipisicing aliquip id. Consequat veniam Lorem duis culpa."
        },
        {
            "title": "Qui reprehenderit ex et Lorem veniam cillum nisi nulla.",
            "imageUrl": "/assets/images/haber3.jpg",
            "url": "/bizden-haberler/3",
            "date": "Şubat 1, 2022",
            "description": "Irure excepteur ea laborum amet consequat aliqua. Incididunt aute incididunt qui reprehenderit id enim velit."
        },
        {
            "title": "Minim pariatur reprehenderit non nulla aute.",
            "imageUrl": "/assets/images/haber4.jpg",
            "url": "/bizden-haberler/4",
            "date": "Şubat 1, 2022",
            "description": "Tempor consequat ex est amet dolor labore officia pariatur non voluptate id aute ea. Cupidatat eiusmod ad ad sint ad."
        },
        {
            "title": "Amet elit fugiat qui officia excepteur esse culpa.",
            "imageUrl": "/assets/images/haber1.jpg",
            "url": "/bizden-haberler/5",
            "date": "Şubat 1, 2022",
            "description": "Ipsum et mollit irure velit minim tempor tempor. Consequat ea minim tempor qui officia laborum exercitation ullamco."
        }
    ])

    const [tags, setTags] = useState([
        {
            "title": "aliquip",
            "url": "#"
        },
        {
            "title": "deserunt",
            "url": "#"
        },
        {
            "title": "elit",
            "url": "#"
        },
        {
            "title": "officia",
            "url": "#"
        },
        {
            "title": "ex",
            "url": "#"
        }
    ])

    const [crumbs, setCrumb] = useState([{ url: '#', title: 'Haberler' }])
    return (
        <div id="content" class="right-sidebar blog-grid">
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
                                {
                                    posts.map((item, i) => {
                                        return (
                                            <article class="post format-image hentry">
                                                <div class="media-attachment">
                                                    <div class="post-thumbnail">
                                                        <a href={item.url}>
                                                            <img alt="" class="wp-post-image" src={item.imageUrl} />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="content-body">
                                                    <header class="entry-header">
                                                        <h1 class="entry-title">
                                                            <a rel="bookmark" href={item.url}>{item.title}</a>
                                                        </h1>
                                                        <div class="entry-meta">
                                                            <span class="posted-on">
                                                                <a href={item.url} rel="bookmark">
                                                                    <span class="entry-date published">{item.date}</span>
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </header>
                                                    <div class="entry-content">
                                                        <p>{item.description}</p>
                                                    </div>
                                                    <div class="post-readmore">
                                                        <a class="btn btn-primary" href={item.url}>Devamı</a>
                                                    </div>
                                                </div>
                                            </article>
                                        )
                                    })
                                }
                            </main>
                        </div>
                        <div id="secondary" class="sidebar-blog widget-area" role="complementary">
                            <div class="widget widget_search" id="search-2">
                                <form action="#" class="search-form" method="get" role="search">
                                    <label>
                                        <span class="screen-reader-text">Arayın:</span>
                                        <input type="search" name="s" value="" placeholder="Arama …" class="search-field" />
                                    </label>
                                    <input type="submit" value="Search" class="search-submit" />
                                </form>
                            </div>
                            <div class="widget widget_tag_cloud">
                                <span class="gamma widget-title">Tags Clouds</span>
                                <div class="tagcloud">
                                    {tags.map(_ => <a class="tag-cloud-link" href={_.url}>{_.title}</a>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}