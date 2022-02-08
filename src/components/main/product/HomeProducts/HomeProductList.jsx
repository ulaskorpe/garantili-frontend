import React, { Component } from "react";
import DealList from "./DealList";
import HomeProducts from "./HomeProduct";

class HomeProductList extends Component {
    state = {
        content:null
    }
    componentDidMount() {
        fetch(`${process.env.REACT_APP_BASE}/api/products/middle-products`,{
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY
            }
        })
            .then((res) => res.json())
            .then(
                (result) => {

                    this.setState({ isLoaded: true, content: result });
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
        const { onAddToBasket} = this.props
        const {isLoaded,content} = this.state;
        return (
            <div className="section-deals-carousel-and-products-carousel-tabs row">               
                {isLoaded &&
                <>
                <DealList /> 
                <HomeProducts
                    products={content}
                    onAddToBasket={onAddToBasket} />
                </>}
            </div>
        )
    }
}

export default HomeProductList