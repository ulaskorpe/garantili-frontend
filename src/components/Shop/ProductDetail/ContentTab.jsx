import React, { Component } from "react";

class ContentTab extends Component {
    render() {
        const { tab, classes } = this.props
        let totalPrice = 0
        return <div className={classes} id={tab.name} role="tabpanel" dangerouslySetInnerHTML={{ __html: tab.content }} />
    }
}

export default ContentTab