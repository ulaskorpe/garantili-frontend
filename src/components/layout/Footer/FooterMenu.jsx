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
    data = {
        menuData: [
            {
                id: 3,
                title: 'KURUMSAl',
                items: [
                    { title: 'Hakkımızda', url: '' },
                    { title: 'Hizmetlerimiz', url: '' },
                    { title: 'Bizden Haberler', url: '' },
                    { title: 'İnsan Kaynakları', url: '' },
                    { title: 'Kullanım Kılavuzu', url: '' },
                ]
            },
            {
                id: 3,
                title: '',
                items: [

                    { title: 'Çerez Politikası', url: '' },
                    { title: 'Satış Sözleşmesi', url: '' },
                    { title: 'Bize Ulaşın', url: '' },
                    { title: 'S.S.S.', url: '' }
                ]
            },


            {
                id: 1,
                title: 'HIZLI ERİŞİM',
                items: [
                    { title: 'Süper Teklif', url: '' },
                    { title: 'Telefonlar', url: '' },
                    { title: 'Tabletler', url: '' },
                    { title: 'Aksesuarlar', url: '' },
                    { title: 'Apple', url: '' },
                    { title: 'Samsung', url: '' },
                ]
            }, {
                id: 2,
                title: 'İŞLEMLER',
                items: [
                    { title: 'Telefon Sat', url: '' },
                    { title: 'Telefon Onar / Yenile', url: '' },
                    { title: 'IMEI Sorgula', url: '' },
                    { title: 'Üye Ol', url: '' },
                    { title: 'Üye Grişi', url: '' },
                    { title: 'Sipariş Takibi', url: '' },
                    { title: 'İade Formu', url: '' },
                ]
            },

        ]
    }
    render() {
        return (
            <div className="col-lg-7 col-12 form-inline footer-widgets pb-4 mt-5 footer-content footer-m">
                <MenuWidgetList data={this.data} />
            </div>
        )
    }
}

export default FooterMenu