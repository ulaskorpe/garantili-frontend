import {useMemo, useState} from "react";
import BreadCrumb from "../layout/BreadCrumb";
import Footer from "../layout/Footer/Footer";
import HeaderMain from "../layout/Header/Header";
import TopBar from "../layout/TopBar";
import RecentPosts from "../RecentPosts";
import {useQuery} from "react-query";
import {API_URL, DEFAULT_API_KEY, fetchThis, GET_NEW_DETAIL, retry} from "../../api";
import {useParams} from "react-router-dom";

export default function NewsDetails() {
    const params = useParams();
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
    // ])

    const details = useQuery(
        ['get-new-detail'],
        () => (
            fetchThis(
                GET_NEW_DETAIL,
                {},
                DEFAULT_API_KEY,
                {
                    id: params.id
                },
            )
        ),
        {
            retry,
            refetchOnWindowFocus: false,
            enabled: Boolean(typeof params?.id !== 'undefined'),
        },
    );

    const crumbs = useMemo(() => ([
        { url: '/bizden-haberler', title: 'Haberler' },
        ...(
            details.isSuccess && ([
                { url: '#', title: details.data.data.title }
            ]) || []
        ),
    ]), [details]);

    return (
        <div id="content" className="right-sidebar single single-pos">
            <div id="page" className="hfeed site">
                <TopBar />
                <HeaderMain />
            </div>
            <div id="content" className="site-content" tabIndex="-1">
                <div className="col-full">
                    <div className="row">
                        {(details.isLoading || details.isError) && (
                            <div>
                                <span>
                                    {details.isLoading && 'Yükleniyor...'}
                                    {details.isError && 'Hata!'}
                                </span>
                            </div>
                        )}
                        {details.isSuccess && (
                            <>
                                <BreadCrumb crumbs={crumbs} />
                                <div id="primary" className="content-area">
                                    <main id="main" className="site-main">
                                        <article className="post format-image">
                                            <div className="media-attachment">
                                                <div className="post-thumbnail">
                                                    <img
                                                        width="1433"
                                                        height="560"
                                                        alt=""
                                                        className="wp-post-image"
                                                        src={`https://buyback.garantiliteknoloji.com/${details.data.data.imageUrl}`}
                                                    />
                                                </div>
                                            </div>
                                            <header className="entry-header">
                                                <h1 className="entry-title">{details.data.data.title}
                                                </h1>
                                                <div className="entry-meta">
                                            <span className="posted-on">
                                                <a rel="bookmark" href="#">
                                                    <span className="entry-date published">{details.data.data.date}</span>
                                                </a>
                                            </span>
                                                </div>
                                            </header>
                                            <div className="entry-content" itemProp="articleBody" dangerouslySetInnerHTML={{ __html: details.data.data.content }}>
                                            </div>
                                        </article>
                                        <nav aria-label="Post Navigation" className="navigation post-navigation" id="post-navigation">
                                            <span className="screen-reader-text">Post navigation</span>
                                            <div className="nav-links">
                                                <div className="nav-previous">
                                                    <a rel="prev" href={details.data.data.previousContent.url}>
                                                        <span className="meta-nav">←</span>&nbsp;{details.data.data.previousContent.title}</a>
                                                </div>
                                                <div className="nav-next">
                                                    <a href={details.data.data.nextContent.url} rel="next">{details.data.data.nextContent.title} &nbsp;
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
                                    {/*<div className="widget widget_tag_cloud">*/}
                                    {/*    <span className="gamma widget-title">Tags Clouds</span>*/}
                                    {/*    <div className="tagcloud">*/}
                                    {/*        {tags.map((_, idx) => <a key={idx} className="tag-cloud-link" href={_.url}>{_.title}</a>)}*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <RecentPosts />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}