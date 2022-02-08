import React, { Component } from "react";
import $ from 'jquery'
const SliderItem = (props) => {
    const backgroundImageUrl = 'url('.concat(props.item.backgroundImageUrl, ')')
    const sliderStyle = {
        backgroundImage: backgroundImageUrl
    }
    let item = (
        <div className="slider-1" style={sliderStyle}>
            <img src={props.item.imageUrl} alt={props.item.title} />
            <div className="caption pl-2 pl-sm-5">
                <div className="title">{props.item.title}
                </div>
                <div className="sub-title">{props.item.subTitle}
                </div>
                <div className="button">{props.item.buttonTitle}
                    <i className="tm tm-long-arrow-right"></i>
                </div>
                <div className="bottom-caption">{props.item.bottomTitle}</div>
            </div>
        </div>
    )

    return item
}

const SliderList = (props) => {
    const items = props.data.map((_, index) => {
        return <SliderItem item={_} key={index} />
    })

    return items
}

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            sliders: null,
        };
    }


    componentDidMount() {
        //   fetch("http://buyback.test/api/site/slider-list")
        fetch(`${process.env.REACT_APP_BASE}/api/site/slider-list`, {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY
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

    componentDidUpdate() {
        $('.home-slider').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            autoplay: true,
            pauseOnHover: false,
            arrows: false,
            autoplaySpeed: 3000,
            fade: true,
            lazyLoad: 'progressive',
            cssEase: 'linear'


        });
    }


    render() {
        return (
            <div className="home-v1-slider home-slider">
               {this.state.isLoaded&& this.state.sliders !== null && <SliderList data={this.state.sliders} />}
            </div>
        )
    }
}

export default Slider