import React from 'react';
import { useState } from "react";
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import TopBar from "../layout/TopBar";
import {useQuery} from "react-query";
import {DEFAULT_API_KEY, fetchThis, GET_NEW_LIST, retry} from "../../api";

let timer = null;
export default function News(props) {
    const { basket, onAddToBasket, removeFromBasket } = props
    // const [tags, setTags] = useState([
    //     {
    //         "title": "aliquip",
    //         "url": "#"
    //     },
    //     {
    //         "title": "deserunt",
    //         "url": "#"
    //     },
    //     {
    //         "title": "elit",
    //         "url": "#"
    //     },
    //     {
    //         "title": "officia",
    //         "url": "#"
    //     },
    //     {
    //         "title": "ex",
    //         "url": "#"
    //     }
    // ]);
    const [crumbs, setCrumb] = useState([{ url: '#', title: 'Haberler' }]);
    let [searchQuery, setSearchQuery] = useState(null);
    const handleSearchChange = (e) => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        timer = setTimeout(() => {
            setSearchQuery(e.target.value);
        }, 500)
    };

    const news = useQuery(
        ['getNews', searchQuery],
        () => (
            fetchThis(
                GET_NEW_LIST,
                [],
                DEFAULT_API_KEY,
                {
                    start: 0,
                    len: 10,
                    query: searchQuery || null,
                }
            )
        ),
        { retry, refetchOnWindowFocus: false }
    );

    return (
        <div id="content" className="right-sidebar blog-grid">
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
                    </div>
                    <div className="row" style={{ flexWrap: 'wrap-reverse' }}>
                        <div id="primary" className="content-area">
                            <main id="main" className="site-main">
                                {Boolean(news.isLoading || news.isError) && (
                                    <div style={{
                                        display: 'flex',
                                        width: '100%',
                                        padding: '20px 10px',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        {news.isLoading && <span>Haberler getiriliyor, lütfen bekleyiniz...</span>}
                                        {news.isError && <span>Haberler alınırken bir sorun ile karşılaşıldı.</span>}
                                    </div>
                                )}
                                {Boolean(news.isSuccess && news.data.status) &&
                                    news.data.data.map((item, i) => {
                                        return (
                                            <article className="post format-image hentry" key={`article_${i}`}>
                                                <div className="media-attachment">
                                                    <div className="post-thumbnail">
                                                        <a href={item.url}>
                                                            <img alt="" className="wp-post-image" src={`https://buyback.garantiliteknoloji.com/${item.imageUrl}`} />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="content-body">
                                                    <header className="entry-header">
                                                        <h1 className="entry-title">
                                                            <a rel="bookmark" href={item.url}>{item.title}</a>
                                                        </h1>
                                                        <div className="entry-meta">
                                                            <span className="posted-on">
                                                                <a href={item.url} rel="bookmark">
                                                                    <span className="entry-date published">{item.date}</span>
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </header>
                                                    <div className="entry-content">
                                                        <p>{item.description}</p>
                                                    </div>
                                                    <div className="post-readmore">
                                                        <a className="btn btn-primary" href={item.url}>Devamı</a>
                                                    </div>
                                                </div>
                                            </article>
                                        )
                                    })
                                }
                                {Boolean(news.isSuccess && news.data.status && !news.data.data.length) && (
                                    <div style={{
                                        display: 'flex',
                                        width: '100%',
                                        padding: '20px 10px',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <span>Haber bulunamadı.</span>
                                    </div>
                                )}
                            </main>
                        </div>
                        <div
                            id="secondary"
                            className="sidebar-blog widget-area"
                            role="complementary"
                            style={{ margin: 0}}
                        >
                            <div className="widget_search" id="search-2">
                                <form action="#" className="search-form" method="get" role="search">
                                    <label>
                                        <span className="screen-reader-text">Arayın:</span>
                                        <input
                                            type="search"
                                            name="s"
                                            defaultValue={searchQuery || ''}
                                            placeholder="Haber ara…"
                                            className="search-field"
                                            onChange={handleSearchChange}
                                        />
                                    </label>
                                    <input type="submit" defaultValue="Search" className="search-submit" />
                                </form>
                            </div>
                            {/*<div className="widget widget_tag_cloud">*/}
                            {/*    <span className="gamma widget-title">Tags Clouds</span>*/}
                            {/*    <div className="tagcloud">*/}
                            {/*        {tags.map((_, idx) => <a className="tag-cloud-link" href={_.url} key={`tag_${idx}`}>{_.title}</a>)}*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}