import React, { Component } from "react";

class ReviewCommentList extends Component {
    render() {
        const { comments } = this.props
        return (
            <div id="comments">
                <ol className="commentlist">
                    {comments.map((comment, i) => {
                        return (
                            <li id="li-comment-83" key={i} className="comment byuser comment-author-admin bypostauthor even thread-even depth-1">
                                <div className="comment_container" id="comment-83">
                                    <div className="comment-text">
                                        <div className="star-rating">
                                            <span className="w-100">Puna
                                                5 üzerinden <strong className="rating">{comment.rating}</strong></span>
                                        </div>
                                        <p className="meta">
                                            <strong itemProp="author" className="woocommerce-review__author">{comment.name}</strong>
                                            <span className="woocommerce-review__dash">&ndash;</span>
                                            <span className="woocommerce-review__published-date">{comment.date}</span>
                                        </p>
                                        <div className="description">
                                            <p>{comment.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
        )
    }
}

export default ReviewCommentList