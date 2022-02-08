import React, { Component } from "react";

class ReviewForm extends Component {
    render() {
        return (
            <div className="advanced-review-comment">
                <div id="review_form_wrapper">
                    <div id="review_form">
                        <div className="comment-respond" id="respond">
                            <h3 className="comment-reply-title" id="reply-title">Puan</h3>
                            <form noValidate="" className="comment-form" id="commentform" method="post" action="#">
                                <div className="comment-form-rating">
                                    <label>Puanınız</label>
                                    <p className="stars">
                                        <span><a href="#" className="star-1">1</a><a href="#" className="star-2">2</a><a
                                            href="#" className="star-3">3</a><a href="#" className="star-4">4</a><a
                                                href="#" className="star-5">5</a></span>
                                    </p>
                                </div>
                                <p className="comment-form-comment">
                                    <label htmlFor="comment">Yorum</label>
                                    <textarea aria-required="true" rows="8" cols="45" name="comment"
                                        id="comment"></textarea>
                                </p>
                                <p className="comment-form-author">
                                    <label htmlFor="author">Ad Soyad
                                        <span className="required">*</span>
                                    </label>
                                    <input type="text" aria-required="true" size="30" defaultValue="" name="author" id="author" />
                                </p>
                                <p className="comment-form-email">
                                    <label htmlFor="email">E-Posta
                                        <span className="required">*</span>
                                    </label>
                                    <input type="text" aria-required="true" size="30" defaultValue="" name="email" id="email" />
                                </p>
                                <p className="form-submit">
                                    <input type="submit" value="Yorum ekle" className="submit" id="submit" name="submit" />
                                    <input type="hidden" id="comment_post_ID" defaultValue="185" name="comment_post_ID" />
                                    <input type="hidden" defaultValue="0" id="comment_parent" name="comment_parent" />
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReviewForm