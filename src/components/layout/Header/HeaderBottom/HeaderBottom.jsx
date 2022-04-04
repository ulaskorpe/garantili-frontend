import React  from "react";
import Search from "./Search";
import LeftMenu from './LeftMenu';

const HeaderBottom = (props) => {
    return (
        <div className="row align-items-center">
            <LeftMenu />
            <Search {...(props?.parentProps || {})} />
        </div>
    )
};

export default HeaderBottom;