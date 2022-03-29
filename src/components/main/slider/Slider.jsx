import React, { Component } from "react";
import DSlick from 'react-slick';

const SliderItem = (props) => {
    const backgroundImageUrl = 'url('.concat(props.item.backgroundImageUrl, ')')
    const sliderStyle = {
        backgroundImage: backgroundImageUrl
    }

    return (
        <div className="slider-1" style={sliderStyle}>
            <img src={props.item.imageUrl} alt={props.item.title} />
            <div className="caption pl-2 pl-sm-5">
                <div className="title">{props.item.title}
                </div>
                <div className="sub-title">{props.item.subTitle}
                </div>
                <div className="button">{props.item.buttonTitle}
                    <i className="tm tm-long-arrow-right" />
                </div>
                <div className="bottom-caption">{props.item.bottomTitle}</div>
            </div>
        </div>
    );
}

const slickSettings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    autoplay: false,
    pauseOnHover: false,
    arrows: false,
    autoplaySpeed: 3000,
    fade: true,
    lazyLoad: 'progressive',
    cssEase: 'linear'
};

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            sliders: [],
        };
    }


    componentDidMount() {
        //   fetch("http://buyback.test/api/site/slider-list")
        fetch("https://buyback.garantiliteknoloji.com/api/site/slider-list", {
            headers: {
                'x-api-key': '5c35640a3da4f1e3970bacbbf7b20e6c'
            }
        })
            .then((res) => res.json())
            .then(
                (result) => {

                    this.setState({ isLoaded: true, sliders: result });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            )
    }


    render() {
        return (
            <DSlick
                className="home-v1-slider home-slider"
                {...slickSettings}
            >
                {this.state.sliders.map((_, index) => {
                    return <SliderItem item={_} key={index} />
                })}
            </DSlick>
        )
    }
}

export default Slider