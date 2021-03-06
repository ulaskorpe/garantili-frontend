import React, { Component } from "react";

const MenuWidgetItem = (props) => {
    const items = props.items.map((_, index) => {
        return (<li className="menu-item" key={index}>
            <a href={_.url}>{_.title}</a>
        </li>)
    })

    return items
}

const MenuWidget = (props) => {
    const widgetData = props.widgetData
    return (
        <div className="col-sm-3 col-12 columns">
            <aside className="widget widget-footer clearfix">
                <div className="body">
                    {widgetData.title !== '' ?
                        <h4 className="widget-title">{widgetData.title}</h4> : <h4 className="widget-title">&nbsp;</h4>}
                    <div className="menu-footer-menu-1-container">
                        <ul id="menu-footer-menu-1" className="menu">
                            <MenuWidgetItem items={widgetData.items} />
                        </ul>
                    </div>
                </div>
            </aside>
        </div>
    )
}

const MenuWidgetList = (props) => {
    const items = props.data.menuData.map((_, index) => {
        return <MenuWidget widgetData={_} key={index} />
    })

    return items
}

class FooterMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            footer_data: { menuData: [] },
        };
    }
    componentDidMount() {
        //fetch("https://buyback.garantiliteknoloji.com/api/site/left-menu", {
        let dat = fetch("https://buyback.garantiliteknoloji.com/api/site/footer-menu", {
            headers: {
                'x-api-key': '5c35640a3da4f1e3970bacbbf7b20e6c'
            }
        })
            .then((res) => res.json())
            .then(
                (result) => {

                    this.setState({ isLoaded: true, footer_data: result });
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
            <div className="col-lg-7 col-12 form-inline footer-widgets pb-4 mt-5 footer-content footer-m">
                <MenuWidgetList data={this.state.footer_data} />
            </div>
        )
    }
}

export default FooterMenu