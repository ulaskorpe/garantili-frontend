import React, { Component } from "react";

class ContentTab extends Component {
    render() {
        const { tab, classes, tabName } = this.props
        let totalPrice = 0
        return <div className={classes} id={tab.name} role="tabpanel" dangerouslySetInnerHTML={{ __html: tab.content }}></div >
    }
}

export default ContentTab