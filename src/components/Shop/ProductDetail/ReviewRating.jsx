import React, { Component } from "react";

class ReviewRating extends Component {
    state = {
        reviewCount: 1,
        averageRating: 5.0,
        reviewCounts: [
            { starCount: 5, value: 1 },
            { starCount: 4, value: 0 },
            { starCount: 3, value: 0 },
            { starCount: 2, value: 0 },
            { starCount: 1, value: 0 },
        ]
    }
    render() {
        return (
            <div className="advanced-review-rating">
                <h2 className="based-title">Yorumlar ({this.state.reviewCount})</h2>
                <div className="avg-rating">
                    <span className="avg-rating-number">{this.state.averageRating}</span>
                    <div className="star-rating">
                        <span className="w-100"></span>
                    </div>
                </div>
                <div className="rating-histogram">
                    {
                        this.state.reviewCounts.map((review, i) => {
                            return (
                                <div className="rating-bar" key={i}>
                                    <div title="5 üzerinden {review.startCount}" className="star-rating">
                                        <span className="w-100"></span>
                                    </div>
                                    <div className="rating-count">{review.value}</div>
                                    <div className="rating-percentage-bar">
                                        <span className="rating-percentage" className="w-100"></span>
                                    </div>
                                </div>)
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ReviewRating