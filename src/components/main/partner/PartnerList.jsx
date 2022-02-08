import React, { Component } from "react";
import $ from 'jquery'
const PartnerListItem = (props) => {
    const items = props.brandItems.map((partnerItem, index) => {
        return (
            <div className="item" key={index}>
                <a href={partnerItem.externalUrl}>
                    <figure>
                        <figcaption className="text-overlay">
                            <div className="info">
                                <h4>{partnerItem.title}</h4>
                            </div>
                        </figcaption>
                        <img width="145" height="50" className="img-responsive desaturate" alt={partnerItem.title} src={partnerItem.src} />
                    </figure>
                </a>
            </div>
        )
    })

    return items
}


class PartnerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            brandItems: [],
        };
    }
    componentDidMount() {
        //fetch("http://buyback.test/api/site/brands-list")
        fetch("https://buyback.garantiliteknoloji.com/api/site/brands-list", {
            headers: {
                'x-api-key': '5c35640a3da4f1e3970bacbbf7b20e6c'
            }
        })
            .then((res) => res.json())
            .then(
                (result) => {

                    this.setState({ isLoaded: true, brandItems: result });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    }

    componentDidUpdate() {
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
        return (
            <section className="brands-carousel">
                <h2 className="sr-only">Brands Carousel</h2>
                <div className="col-full" data-ride="tm-slick-carousel" data-wrap=".brands" data-slick="{&quot;slidesToShow&quot;:6,&quot;slidesToScroll&quot;:1,&quot;dots&quot;:false,&quot;arrows&quot;:true,&quot;responsive&quot;:[{&quot;breakpoint&quot;:400,&quot;settings&quot;:{&quot;slidesToShow&quot;:1,&quot;slidesToScroll&quot;:1}},{&quot;breakpoint&quot;:800,&quot;settings&quot;:{&quot;slidesToShow&quot;:3,&quot;slidesToScroll&quot;:3}},{&quot;breakpoint&quot;:992,&quot;settings&quot;:{&quot;slidesToShow&quot;:3,&quot;slidesToScroll&quot;:3}},{&quot;breakpoint&quot;:1200,&quot;settings&quot;:{&quot;slidesToShow&quot;:4,&quot;slidesToScroll&quot;:4}},{&quot;breakpoint&quot;:1400,&quot;settings&quot;:{&quot;slidesToShow&quot;:5,&quot;slidesToScroll&quot;:5}}]}">
                    <div className="brands">
                        <PartnerListItem brandItems={this.state.brandItems} />
                    </div>
                </div>
            </section>
        )
    }
}

export default PartnerList