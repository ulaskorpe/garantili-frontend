import React from "react";
import {useQuery} from "react-query";
import {DEFAULT_API_KEY, fetchThis, GET_TOP_MENU} from "../../../../api";
import {useNavigate} from "react-router-dom";

const MenuItemWithChild = (props) => {

    return (
        <li className="menu-item menu-item-has-children animate-dropdown dropdown">
            <div
                aria-hidden="true"
                title={props.data.title}
                data-toggle="dropdown"
                className="dropdown-toggle"
                aria-haspopup="true"
            >
                {props.data.title}
                <span className="caret" />
                <ul role="menu" className=" dropdown-menu">
                    <SubItem row={props.data.subItems} />
                </ul>
            </div>
        </li>
    )
}

const SubItem = (props) => {
    const navigate = useNavigate();
    const urlController = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'g');
    const isLink = urlController.test(props.data.url);

    return props.row.map((item, index) => {
        return (
            <li className="menu-item animate-dropdown" key={index}>
                {isLink && (
                    <a
                        title={item.title}
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {item.title}
                    </a>
                )}
                {!isLink && (
                    <a
                        title={item.title}
                        href={item.url}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(item.url)
                        }}
                    >
                        {item.title}
                    </a>
                )}
            </li>
        )
    })
}

const MenuItemNoChild = (props) => {
    const navigate = useNavigate();
    const urlController = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'g');
    const isLink = urlController.test(props.data.url);

    return (
        <li className="menu-item animate-dropdown">
            {isLink && (
                <a
                    title={props.data.title}
                    href={props.data.url}
                    target="_blank"
                    rel="noreferrer"
                >
                    {props.data.title}
                </a>
            )}
            {!isLink && (
                <a
                    title={props.data.title}
                    href={props.data.url}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(props.data.url)
                    }}
                >
                    {props.data.title}
                </a>
            )}
        </li>
    )
}
const MenuItem = (props) => {
    return props.menuData.map((item, index) => {
        if (item.isDropdown) {
            return <MenuItemWithChild data={item} key={index} />
        }
        else {
            return <MenuItemNoChild data={item} key={index} />
        }
    });
}


const MainNavigation = () => {
    const topMenu = useQuery(
        [
            'get-top-menu'
        ],
        () => (
            fetchThis(
                GET_TOP_MENU,
                {},
                DEFAULT_API_KEY,
                {}
            )
        ),
        {
            retry: false,
            refetchOnWindowFocus: false,
        }
    )

    return (
        <nav id="primary-navigation" className="primary-navigation" aria-label="Primary Navigation" data-nav="flex-menu">
            <ul id="menu-primary-menu" className="nav yamm">
                {/*
                <li className="sale-clr yamm-fw menu-item animate-dropdown">
                    <a title="S??per Teklif" href="/super-teklif">
                        S??PER TEKL??F
                    </a>&nbsp;
                </li>
                */}
                {topMenu.isSuccess && (
                    <MenuItem menuData={topMenu.data} />
                )}
                <li className="garantili-flex-more-menu-item dropdown">
                    <a title="..." href="#" data-toggle="dropdown" className="dropdown-toggle">...</a>
                    <ul className="overflow-items dropdown-menu" />
                </li>
            </ul>
        </nav>
    );
}

export default MainNavigation