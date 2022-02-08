import React, { Component } from "react";
import ReviewCommentList from "./ReviewCommentList";
import ReviewForm from "./ReviewForm";
import ReviewRating from "./ReviewRating";

class ReviewTab extends Component {
    render() {
        const { tab, classes, tabName } = this.props
        return (
            <div className={classes} id={tab.name} role="tabpanel">
                <div className="techmarket-advanced-reviews" id="reviews">
                    <div className="advanced-review row">
                        <ReviewRating />
                        <ReviewForm />
                    </div>
                    <ReviewCommentList comments={tab.content} />
                </div>
            </div>
        )
    }
}

export default ReviewTab