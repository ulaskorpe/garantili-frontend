import React, { Component } from "react";
import AccessoriesTab from "./AccessoriesTab";
import ContentTab from "./ContentTab";
import ReviewTab from "./ReviewTab";

class DetailTabs extends Component {
    render() {
        const { tabs } = this.props
        return (
            <div className="woocommerce-tabs wc-tabs-wrapper">
                <ul role="tablist" className="nav tabs wc-tabs">
                    {tabs.map((tab, i) => {
                        let classes = i === 0 ? 'nav-link active' : 'nav-link'
                        const tabName = 'tab-pd-' + i
                        return (<li className="nav-item accessories_tab" key={i}>
                            <a className={classes} data-toggle="tab" role="tab" aria-controls={tab.name} href={'#'+tab.name}>{tab.title}</a>
                        </li>)
                    })}
                </ul>
                <div className="tab-content">
                    {
                        tabs.map((tab, i) => {
                            let classes = i === 0 ? 'tab-pane active' : 'tab-pane'
                            const tabName = 'tab-pd-' + i
                            switch (tab.type) {
                                case 'accessory':
                                    return <AccessoriesTab tab={tab} classes={classes} tabName={tabName} key={i} />
                                case 'review':
                                    return <ReviewTab tab={tab} classes={classes} tabName={tabName} key={i} />
                                default:
                                    return <ContentTab tab={tab} classes={classes} tabName={tabName} key={i} />
                            }
                        })
                    }
                </div>
            </div >
        )
    }
}

export default DetailTabs