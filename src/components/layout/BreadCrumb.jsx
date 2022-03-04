import React, { Component } from "react";

class BreadCrumb extends Component {
    render() {
        const { crumbs } = this.props;
        return (
            <nav className="woocommerce-breadcrumb">
                <a href="/">Anasayfa</a>
                {
                    crumbs.map((item, i) => {
                        if (item.url !== '#')
                            return (
                                <React.Fragment key={i}>
                                    <span className="delimiter">
                                        <i className="tm tm-breadcrumbs-arrow-right"></i>
                                    </span>
                                    <a href={item.url}>{item.title}</a>
                                </React.Fragment>
                            )
                        else {
                            return (
                                <React.Fragment key={i}>
                                    <span className="delimiter">
                                        <i className="tm tm-breadcrumbs-arrow-right"></i>
                                    </span>{item.title}
                                </React.Fragment>
                            )
                        }
                    })
                }
            </nav>
        )
    }
}

export default BreadCrumb