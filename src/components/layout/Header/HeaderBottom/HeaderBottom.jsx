import React, { Component } from "react";
import Search from "./Search";
import LeftMenu from './LeftMenu';
class HeaderBottom extends Component {
    render() {
        return (
            <div className="row align-items-center">
                <LeftMenu />
                <Search />
            </div>
        )
    }
}

export default HeaderBottom;