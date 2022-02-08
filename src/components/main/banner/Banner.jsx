import React, { Component } from "react";

const BannerItem = (props) => {

    const imageUrl = 'url('.concat(props.item.imageUrl, ')')
    const bannerStyle = {
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: imageUrl,
        height: "259px"
    }
    let bannerType = ''
    if (props.item.type === 'small')
        bannerType = 'banner small-banner'
    if (props.item.type === 'large')
        bannerType = 'banner large-banner'

    bannerType += ' text-in-left'
    let banner = (
        <div className={bannerType}>
            <a href={props.item.Url}>
                <div className="banner-bg" style={bannerStyle}>
                    <div className="caption">
                        <div className="banner-info">
                            <h3 className="title" dangerouslySetInnerHTML={{ __html: props.item.title }} />
                        </div>
                        <span className="banner-action button">İncele</span>
                    </div>
                </div>
            </a>
        </div>
    )

    return banner
}

const BannerList = (props) => {
    const items = props.items.map((_, index) => {
        return <BannerItem item={_} key={index} />
    })

    return items
}

class Banner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        };
    }


    componentDidMount() {
        // fetch("http://buyback.test/api/site/banners")
        fetch("https://buyback.garantiliteknoloji.com/api/site/banners")
            .then((res) => res.json())
            .then(
                (result) => {

                    this.setState({ isLoaded: true, items: result });
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
            <div className="banners">
                <div className="row">
                    <BannerList items={this.state.items} />
                </div>
            </div>
        )
    }
}

export default Banner