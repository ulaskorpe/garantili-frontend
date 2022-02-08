import React, { Component } from "react";
import $ from 'jquery'
const MenuList = (props) => {
    const items = props.data.map((_, i) => {
        if (_.subMenu.length < 1) return <MenuListItem data={_} key={i} />
        else return <MenuListItemWithChild data={_} key={i} />
    })

    return items
}

const SubMenuListItem = (props) => {
    const items = props.data.map((_, i) => {
        if (i === 0) return (<li key={i} className="nav-title">{_.title}</li>)
        return (<li key={i}><a href="#">{_.title}</a></li>)
    })
    items.push(<li key='nav-divider' className="nav-divider"></li>)
    return (
        <div className="kc-col-container">
            <div className="kc_text_block">
                <ul>{items}</ul>
            </div>
        </div>
    )
}

const SubMenuList = (props) => {
    const items = props.data.map((_, i) => {
        return <SubMenuListItem data={_.items} key={i} />
    })

    const result = items.map((item, i) => {
        let d = items.splice(0, 2)

        return (<div className="col-md-6 col-sm-12" key={i}>{d}</div>)
    })

    return (<div className="row yamm-content-row" key='subMenuList'>{result}</div>)
}

const MenuListItemWithChild = (props) => {
    const data = props.data
    return (
        <li className="yamm-tfw menu-item menu-item-has-children animate-dropdown dropdown-submenu">
            <a title={data.title} data-toggle="dropdown" className="dropdown-toggle"
                aria-haspopup="true" href={data.url}>{data.title} <span className="caret"></span></a>
            <ul role="menu" className=" dropdown-menu">
                <li className="menu-item menu-item-object-static_block animate-dropdown">
                    <div className="yamm-content">
                        <div className="bg-yamm-content bg-yamm-content-bottom bg-yamm-content-right">
                            <div className="kc-col-container">
                                <div className="kc_single_image">
                                    <img src={data.subMenu.imageUrl} className="" alt="" />
                                </div>
                            </div>
                        </div>
                        <SubMenuList data={data.subMenu.items} />
                    </div>
                </li>
            </ul>
        </li>)
}



const MenuListItem = (props) => {
    const data = props.data
    return (
        <li className="highlight menu-item animate-dropdown">
            <a title={data.title} href={data.url}>{data.title}</a>
        </li>
    )
}

class Leftmenu extends Component {




    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            leftMenuData: [],
        };
    }
    componentDidMount() {
         fetch("https://buyback.garantiliteknoloji.com/api/site/left-menu", {
        //fetch("http://buyback.test/api/site/left-menu", {
            headers: {
                'x-api-key': '5c35640a3da4f1e3970bacbbf7b20e6c'
            }
        })
            .then((res) => res.json())
            .then(
                (result) => {

                    this.setState({ isLoaded: true, leftMenuData: result });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    }

    componentDidUpdate() {
        if ($(window).width() > 768) {
            // Departments Menu Height
            var $departments_menu_dropdown = $('.departments-menu-dropdown'),
                departments_menu_dropdown_height = $departments_menu_dropdown.height();

            $departments_menu_dropdown.find('.dropdown-submenu > .dropdown-menu').each(function () {
                $(this).find('.menu-item-object-static_block').css('min-height', departments_menu_dropdown_height - 4);
                $(this).css('min-height', departments_menu_dropdown_height - 4);
            });

            $('.departments-menu-dropdown').on('mouseleave', function () {
                var $this = $(this);
                $this.removeClass('animated-dropdown');
            });

            $('.departments-menu-dropdown .menu-item-has-children').on({
                mouseenter: function () {
                    var $this = $(this),
                        $dropdown_menu = $this.find('> .dropdown-menu'),
                        $departments_menu = $this.parents('.departments-menu-dropdown'),
                        css_properties = {
                            width: 540,
                            opacity: 1
                        },
                        animation_duration = 300,
                        has_changed_width = true,
                        animated_class = '',
                        $container = '';

                    if ($departments_menu.length > 0) {
                        $container = $departments_menu;
                    }

                    if ($this.hasClass('yamm-tfw')) {
                        css_properties.width = 540;

                        if ($departments_menu.length > 0) {
                            css_properties.width = 600;
                        }
                    } else if ($this.hasClass('yamm-fw')) {
                        css_properties.width = 900;
                    } else if ($this.hasClass('yamm-hw')) {
                        css_properties.width = 450;
                    } else {
                        css_properties.width = 277;
                    }

                    $dropdown_menu.css({
                        visibility: 'visible',
                        display: 'block',
                        // overflow: 	'hidden'
                    });

                    if (!$container.hasClass('animated-dropdown')) {
                        $dropdown_menu.animate(css_properties, animation_duration, function () {
                            $container.addClass('animated-dropdown');
                        });
                    } else {
                        $dropdown_menu.css(css_properties);
                    }
                }, mouseleave: function () {
                    $(this).find('> .dropdown-menu').css({
                        visibility: 'hidden',
                        opacity: 0,
                        width: 0,
                        display: 'none'
                    });
                }
            });
        }
    }
    render() {
        return (
            <div id="departments-menu" className="dropdown departments-menu">
                <button className="btn dropdown-toggle btn-block" type="button" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                    <i className="tm tm-departments-thin"></i>
                    <span className="mx-2">Tüm Kategoriler</span>
                </button>
                <ul id="menu-departments-menu" className="dropdown-menu yamm departments-menu-dropdown">
                    <MenuList data={this.state.leftMenuData} />
                </ul>
            </div>
        )
    }
}

export default Leftmenu;