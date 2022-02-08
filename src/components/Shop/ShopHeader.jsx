import React, { Component } from "react";

class ShopHeader extends Component {
    render() {
        const { header } = this.props
        return (
            <div className="shop-archive-header">
                <div className="jumbotron">
                    <div className="jumbotron-img">
                        <img width="416" height="283" alt="" src={header.imageUrl} className="jumbo-image alignright" />
                    </div>
                    <div className="jumbotron-caption">
                        <h3 className="jumbo-title">{header.title}</h3>
                        <p className="jumbo-subtitle" dangerouslySetInnerHTML={{ __html: header.content }}></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShopHeader