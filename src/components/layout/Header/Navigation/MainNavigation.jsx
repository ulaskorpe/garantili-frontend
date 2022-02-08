import React, { Component } from "react";

const MenuItemWithChild = (props) => {
    return (
        <li className="menu-item menu-item-has-children animate-dropdown dropdown">
            <a title={props.data.title} data-toggle="dropdown" className="dropdown-toggle"
                aria-haspopup="true" href={props.data.url}>{props.data.title}<span className="caret"></span>
                <ul role="menu" className=" dropdown-menu">
                    <SubItem row={props.data.subItems} />
                </ul>
            </a>
        </li>
    )
}

const SubItem = (props) => {
    const items = props.row.map((item, index) => {
        return (
            <li className="menu-item animate-dropdown" key={index}>
                <a title={item.url} href={item.url}>
                    {item.title}
                </a>
            </li>
        )
    })
    return items
}

const MenuItemNoChild = (props) => {
    return (
        <li className="menu-item animate-dropdown">
            <a title={props.data.title} href={props.data.url}>{props.data.title}</a>
        </li>
    )
}
const MenuItem = (props) => {
    const items = props.menuData.map((item, index) => {
        if (item.isDropdown) {
            return <MenuItemWithChild data={item} key={index} />
        }
        else {
            return <MenuItemNoChild data={item} key={index} />
        }
    })

    return items
}



class MainNavigation extends Component {
    menuItems = [
        {
            id: 2, isDropdown: true, title: 'TELEFONLAR', url: '#', subItems: [
                { id: 11, isDropdown: false, 'title': 'Apple', url: '/urunler/telefonlar-2?brand=apple' },
                { id: 12, isDropdown: false, 'title': 'Samsung', url: '/urunler/telefonlar-2?brand=samsung' },
                { id: 13, isDropdown: false, 'title': 'Xiaomi', url: '/urunler/telefonlar-2?brand=xiaomi' },
                { id: 14, isDropdown: false, 'title': 'Huawei', url: '/urunler/telefonlar-2?brand=huawei' }
            ]
        },
        {
            id: 3, isDropdown: true, title: 'TABLETLER', url: '#', subItems: [
                { id: 21, isDropdown: false, 'title': 'Apple', url: '/urunler/tabletler-3?brand=apple' },
                { id: 22, isDropdown: false, 'title': 'Samsung', url: '/urunler/telefonlar-3?brand=samsung' },
                { id: 23, isDropdown: false, 'title': 'Xiaomi', url: '/urunler/telefonlar-3?brand=xiaomi' },
                { id: 24, isDropdown: false, 'title': 'Huawei', url: '/urunler/telefonlar-3?brand=huawei' }
            ]
        },
        { id: 3, isDropdown: false, title: 'TELEFON SAT', url: '/sell-phone', subItems: [] },
        { id: 4, isDropdown: false, title: 'TELEFON ONAR / YENİLE', url: '/repair-phone', subItems: [] },
        { id: 5, isDropdown: false, title: 'GARANTİ SORGULA', url: '/warrany', subItems: [] },
    ];

    render() {
        return (
            <nav id="primary-navigation" className="primary-navigation" aria-label="Primary Navigation" data-nav="flex-menu">
                <ul id="menu-primary-menu" className="nav yamm">
                    <li className="sale-clr yamm-fw menu-item animate-dropdown"><a title="Süper Teklif" href="/urunler/super-teklif-1">SÜPER
                        TEKLİF</a>&nbsp;
                    </li>
                    <MenuItem menuData={this.menuItems} />
                    <li className="garantili-flex-more-menu-item dropdown">
                        <a title="..." href="#" data-toggle="dropdown" className="dropdown-toggle">...</a>
                        <ul className="overflow-items dropdown-menu"></ul>
                    </li>
                </ul>
            </nav>
        )
    }
}





export default MainNavigation