import React from 'react';
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
        <div id="content" className="right-sidebar single single-pos">
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
                                <article className="post format-image">
                                    <div className="media-attachment">
                                        <div className="post-thumbnail">
                                            <img width="1433" height="560" alt="" className="wp-post-image" src={details.imageUrl} />
                                        </div>
                                    </div>
                                    <header className="entry-header">
                                        <h1 className="entry-title">{details.title}
                                        </h1>
                                        <div className="entry-meta">
                                            <span className="posted-on">
                                                <a rel="bookmark" href="#">
                                                    <span className="entry-date published">{details.date}</span>
                                                </a>
                                            </span>
                                        </div>
                                    </header>
                                    <div className="entry-content" itemProp="articleBody" dangerouslySetInnerHTML={{ __html: details.content }}>
                                    </div>
                                </article>
                                <nav aria-label="Post Navigation" className="navigation post-navigation" id="post-navigation">
                                    <span className="screen-reader-text">Post navigation</span>
                                    <div className="nav-links">
                                        <div className="nav-previous">
                                            <a rel="prev" href={details.previousContent.url}>
                                                <span className="meta-nav">←</span>&nbsp;{details.previousContent.title}</a>
                                        </div>
                                        <div className="nav-next">
                                            <a href={details.nextContent.url} rel="next">{details.nextContent.title} &nbsp;
                                                <span className="meta-nav">→</span>
                                            </a>
                                        </div>
                                    </div>
                                </nav>
                            </main>
                        </div>
                        <div id="secondary" className="sidebar-blog widget-area" role="complementary">
                            <div className="widget widget_search" id="search-2">
                                <form action="#" className="search-form" method="get" role="search">
                                    <label>
                                        <span className="screen-reader-text">Arayın:</span>
                                        <input type="search" name="s" defaultValue="" placeholder="Arama …" className="search-field" />
                                    </label>
                                    <input type="submit" defaultValue="Search" className="search-submit" />
                                </form>
                            </div>
                            <div className="widget widget_tag_cloud">
                                <span className="gamma widget-title">Tags Clouds</span>
                                <div className="tagcloud">
                                    {tags.map((_, idx) => <a key={idx} className="tag-cloud-link" href={_.url}>{_.title}</a>)}
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