import React, { Component } from 'react';
import $ from 'jquery'
import slick from 'slick-carousel'

class RecentPosts extends Component {
    state = [
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
    ]

    componentDidMount() {
        $('[data-ride="tm-slick-carousel"]').each(function () {
            var $slick_target = false;

            if ($(this).data('slick') !== 'undefined' && $(this).find($(this).data('wrap')).length > 0) {
                $slick_target = $(this).find($(this).data('wrap'));
                $slick_target.data('slick', $(this).data('slick'));
            } else if ($(this).data('slick') !== 'undefined' && $(this).is($(this).data('wrap'))) {
                $slick_target = $(this);
            }

            if ($slick_target) {
                $slick_target.slick();
            }
        });
    }
    render() {
        return (<div class="widget garantili_posts_carousel_widget">
            <section class="section-posts-carousel" id="sidebar-posts-carousel">
                <header class="section-header">
                    <h2 class="section-title">Son Haberler</h2>
                    <div class="custom-slick-nav"></div>
                </header>
                <div class="post-item-carousel" data-ride="tm-slick-carousel" data-wrap=".posts"
                    data-slick="{&quot;slidesToShow&quot;:1,&quot;slidesToScroll&quot;:1,&quot;dots&quot;:false,&quot;arrows&quot;:true,&quot;prevArrow&quot;:&quot;&lt;a href=\&quot;#\&quot;&gt;&lt;i class=\&quot;tm tm-arrow-left\&quot;&gt;&lt;\/i&gt;&lt;\/a&gt;&quot;,&quot;nextArrow&quot;:&quot;&lt;a href=\&quot;#\&quot;&gt;&lt;i class=\&quot;tm tm-arrow-right\&quot;&gt;&lt;\/i&gt;&lt;\/a&gt;&quot;,&quot;appendArrows&quot;:&quot;#sidebar-posts-carousel .custom-slick-nav&quot;}">
                    <div class="posts">
                        {
                            this.state.map((item, i) => {
                                return (<div class="post-item">
                                    <a href={item.url} class="post-thumbnail">
                                        <div class="post-thumbnail">
                                            <img width="270" height="270" alt=""
                                                class="attachment-techmarket-blog-carousel wp-post-image"
                                                src={item.imageUrl} />
                                        </div>
                                    </a>
                                    <div class="post-content">
                                        <a href={item.url} class="post-name" tabindex="-1">{item.title}</a>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>

        </div>
        );
    }
}

export default RecentPosts;

