import React, { Component } from "react";
import DSlick from 'react-slick';

const slickSettings = {
    "slidesToShow": 6,
    "slidesToScroll": 1,
    "dots": false,
    "arrows": true,
    "responsive": [
        {
            "breakpoint": 400,
            "settings": {
                "slidesToShow": 1,
                "slidesToScroll": 1
            }
        },
        {
            "breakpoint": 800,
            "settings": {
                "slidesToShow": 3,
                "slidesToScroll": 3
            }
        },
        {
            "breakpoint": 992,
            "settings": {
                "slidesToShow": 3,
                "slidesToScroll": 3
            }
        },
        {
            "breakpoint": 1200,
            "settings": {
                "slidesToShow": 4,
                "slidesToScroll": 4
            }
        },
        {
            "breakpoint": 1400,
            "settings": {
                "slidesToShow": 5,
                "slidesToScroll": 5
            }
        }
    ]
};

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

    render() {
        return (
            <section className="brands-carousel">
                <h2 className="sr-only">Brands Carousel</h2>
                <div
                    className="col-full"
                >
                    <DSlick
                        className="brands"
                        {...slickSettings}
                    >
                        {this.state.brandItems.map((partnerItem, index) => {
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
                        })}
                    </DSlick>
                </div>
            </section>
        )
    }
}

export default PartnerList