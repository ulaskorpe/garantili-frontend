import { useState } from "react";
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import TopBar from "../layout/TopBar";
import RecentPosts from "../RecentPosts";

export default function NewsDetails(props) {

    const { basket, onAddToBasket, removeFromBasket } = props


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

    const [details, setDetails] = useState({
        title: 'Amet elit fugiat qui officia excepteur esse culpa.',
        imageUrl: '/assets/images/haber3.jpg',
        date: "Şubat 1, 2022",
        content: `<p>Officia magna laborum veniam elit ea elit qui duis cupidatat dolor labore exercitation ipsum. Anim nulla cillum cupidatat laboris exercitation id amet ea amet proident. Adipisicing sint amet culpa eu aliqua ullamco eu. Mollit ea consequat esse culpa velit ex qui quis ullamco. Non nisi eu ea pariatur eiusmod do sunt pariatur.\r\n</p>
        <p>Ea nisi ea nostrud fugiat velit id aliquip eiusmod ex Lorem nostrud veniam commodo. Excepteur cillum quis nisi dolor sit aliqua exercitation proident cillum. Et amet eu fugiat eu ullamco cupidatat consequat labore proident Lorem esse. Commodo mollit eu quis ullamco esse sint commodo commodo pariatur ad enim adipisicing pariatur elit.\r\n</p>
        <p>Commodo ipsum reprehenderit reprehenderit deserunt aliqua in esse amet voluptate anim est duis nulla. Adipisicing ea reprehenderit pariatur nisi enim eiusmod labore anim fugiat voluptate et ullamco. Qui nulla et eu anim esse Lorem ex tempor. Cupidatat voluptate nostrud irure ea veniam duis labore nostrud Lorem irure eiusmod aliquip culpa aliqua. Nostrud ex id consequat eu est culpa sit ex in.\r\n</p>
        <p>In sunt non voluptate ullamco qui duis nostrud sint incididunt aute dolore et. Esse deserunt esse laboris sint dolore Lorem irure consequat proident. Aliqua cupidatat nulla consequat voluptate dolor exercitation ea ipsum duis consectetur magna deserunt eu. Labore laboris occaecat ea cupidatat in anim ullamco est. Velit qui officia eiusmod ea commodo consequat. Sit nostrud adipisicing Lorem commodo ad ut mollit in adipisicing est quis. Minim occaecat tempor consequat qui consequat aute cillum et laboris occaecat.\r\n</p>
        `,
        previousContent: {
            title: 'Commodo ipsum reprehenderit reprehenderit deserunt aliqua',
            url: '#'
        },
        nextContent: {
            title: 'In sunt non voluptate ullamco qui duis nostrud sint',
            url: '#'
        }
    })

    const [crumbs, setCrumb] = useState([
        { url: '/bizden-haberler', title: 'Haberler' },
        { url: '#', title: 'Id nulla reprehenderit duis dolore adipisicing anim laboris.' }
    ])
    return (
        <div id="content" class="right-sidebar single single-pos">
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
                                <article class="post format-image">
                                    <div class="media-attachment">
                                        <div class="post-thumbnail">
                                            <img width="1433" height="560" alt="" class="wp-post-image" src={details.imageUrl} />
                                        </div>
                                    </div>
                                    <header class="entry-header">
                                        <h1 class="entry-title">{details.title}
                                            {/* <span class="comments-link">
                                                <a href="#comments">3</a>
                                            </span> */}
                                        </h1>
                                        <div class="entry-meta">
                                            <span class="posted-on">
                                                <a rel="bookmark" href="#">
                                                    <span class="entry-date published">{details.date}</span>
                                                </a>
                                            </span>
                                        </div>
                                    </header>
                                    <div class="entry-content" itemprop="articleBody" dangerouslySetInnerHTML={{ __html: details.content }}>
                                    </div>
                                </article>
                                <nav aria-label="Post Navigation" class="navigation post-navigation" id="post-navigation">
                                    <span class="screen-reader-text">Post navigation</span>
                                    <div class="nav-links">
                                        <div class="nav-previous">
                                            <a rel="prev" href={details.previousContent.url}>
                                                <span class="meta-nav">←</span>&nbsp;{details.previousContent.title}</a>
                                        </div>
                                        <div class="nav-next">
                                            <a href={details.nextContent.url} rel="next">{details.nextContent.title} &nbsp;
                                                <span class="meta-nav">→</span>
                                            </a>
                                        </div>
                                    </div>
                                </nav>
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
                           <RecentPosts />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}