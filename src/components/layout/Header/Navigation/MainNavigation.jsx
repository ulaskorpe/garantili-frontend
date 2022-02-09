import React, { Component } from "react";
import { Link } from "react-router-dom";

const MenuItemWithChild = (props) => {
    return (
        <li className="menu-item menu-item-has-children animate-dropdown dropdown">
            <div data-toggle="dropdown" className="dropdown-toggle"
                aria-haspopup="true"to={props.data.url}>{props.data.title}<span className="caret"></span>
                <ul role="menu" className=" dropdown-menu">
                    <SubItem row={props.data.subItems} />
                </ul>
            </div>
        </li>
    )
}

const SubItem = (props) => {
    const items = props.row.map((item, index) => {
        return (
            <li className="menu-item animate-dropdown" key={index}>
                <Link to={item.url}>
                    {item.title}
                </Link>
            </li>
        )
    })
    return items
}

const MenuItemNoChild = (props) => {
    return (
        <li className="menu-item animate-dropdown">
            <Link  to={props.data.url}>{props.data.title}</Link>
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
    state = {
        menuItems: [],
        isLoaded:false
    }
    componentDidMount() {
        fetch(`${process.env.REACT_APP_BASE}/api/site/top-menu`,{
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY
            }
        })
            .then((res) => res.json())
            .then(
                (result) => {

                    this.setState({ isLoaded: true, menuItems: result });
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
            <nav id="primary-navigation" className="primary-navigation" aria-label="Primary Navigation" data-nav="flex-menu">
                <ul id="menu-primary-menu" className="nav yamm">
                    <li className="sale-clr yamm-fw menu-item animate-dropdown"><a title="Süper Teklif" href="/urunler/super-teklif-1">SÜPER
                        TEKLİF</a>&nbsp;
                    </li>
                    {this.state.isLoaded && <MenuItem menuData={this.state.menuItems} />}
                    {/* <li className="garantili-flex-more-menu-item dropdown">
                        <a title="..." href="#" data-toggle="dropdown" className="dropdown-toggle">...</a>
                        <ul className="overflow-items dropdown-menu"></ul>
                    </li> */}
                </ul>
            </nav>
        )
    }
}





export default MainNavigation