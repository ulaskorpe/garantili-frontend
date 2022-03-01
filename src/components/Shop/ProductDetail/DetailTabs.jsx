import React, { Component } from "react";
import AccessoriesTab from "./AccessoriesTab";
import ContentTab from "./ContentTab";
import ReviewTab from "./ReviewTab";
import ProductTech from "./ProductTech";

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
                            switch (tab.type) {
                                case 'accessory':
                                    return <AccessoriesTab tab={tab} classes={classes} key={i} />
                                case 'technique':
                                    return <ProductTech tab={tab} classes={classes} key={i} />;
                                case 'review':
                                    return <ReviewTab tab={tab} classes={classes} key={i} />
                                default:
                                    return <ContentTab tab={tab} classes={classes} key={i} />
                            }
                        })
                    }
                </div>
            </div >
        )
    }
}

export default DetailTabs