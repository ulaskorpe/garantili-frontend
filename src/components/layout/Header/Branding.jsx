import React, { Component } from "react";

class Branding extends Component {
    render() {
        return (
            <div className="site-branding">
                <a href="/" className="custom-logo-link" rel="home">
                    <img src="/assets/images/LOGO.svg" className="logo-main" />
                </a>
            </div>
        )
    }
}

export default Branding