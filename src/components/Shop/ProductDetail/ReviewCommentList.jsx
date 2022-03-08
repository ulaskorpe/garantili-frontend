import React, { Component } from "react";

class ReviewCommentList extends Component {
    render() {
        const { comments } = this.props
        return (
            <div id="comments">
                <ol className="commentlist">
                    {comments.map((comment, i) => {
                        const rate = Math.round(comment.rating / 2);
                        return (
                            <li id="li-comment-83" key={i} className="comment byuser comment-author-admin bypostauthor even thread-even depth-1">
                                <div className="comment_container" id="comment-83">
                                    <div className="comment-text">
                                        <div className="star-rating">
                                            <span
                                                title={`Puan: 5 üzerinden ${rate}`}
                                                style={{ width: `${rate * 20}%`}}
                                            />
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