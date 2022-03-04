import React, { useMemo } from "react";

const maxStar = 5;
const ReviewRating = (props) => {
    const {
        content = [],
    } = props;

    const totalCount = useMemo(() => (
        content.length
    ), [content]);
    const avgRate = useMemo(() => (
        Math.round((
            content
                .reduce((prev = 0, current) => prev + parseInt(current.rating), 0) / totalCount
        ) / 2)
    ), [content, totalCount]);

    const reviews = useMemo(() => {
        const stars = (new Array(maxStar))
            .fill(null)
            .map((_, starIDX) => ({
                id: `star_of_${starIDX}`,
                starVal: starIDX+1,
                starLen: 0,
                percent: 0,
            }));

        content.forEach((contentItem) => {
            const starWith = Math.round(contentItem.rating / (Math.round(10 / maxStar)));

            const starItem = stars.find((star) => star.starVal === starWith);
            if (!starItem) return;

            const starItemIDX = stars.findIndex((star) => star.starVal === starWith);
            stars[starItemIDX] = {
                ...starItem,
                starLen: (starItem.starLen + 1)
            };
        });
        content.forEach((contentItem) => {
            const starWith = Math.round(contentItem.rating / (Math.round(10 / maxStar)));

            const starItem = stars.find((star) => star.starVal === starWith);
            if (!starItem) return;

            const starItemIDX = stars.findIndex((star) => star.starVal === starWith);
            stars[starItemIDX] = {
                ...starItem,
                percent: (starItem.starLen / totalCount) * 100
            };
        });

        return stars.sort(function(a, b) {
            return b.starVal - a.starVal;
        });
    }, [content, totalCount]);

    return (
        <div className="advanced-review-rating">
            <h2 className="based-title">Yorumlar ({totalCount})</h2>
            <div className="avg-rating">
                <span className="avg-rating-number">{avgRate}</span>
                <div className="star-rating">
                    <span style={{ width: `${avgRate * 20}%`  }} />
                </div>
            </div>
            <div className="rating-histogram">
                {
                    reviews.map((review, i) => {
                        return (
                            <div className="rating-bar" key={i}>
                                <div title={`5 üzerinden ${review.starVal}`} className="star-rating">
                                    <span style={{ width: review.starVal * 20 }} />
                                </div>
                                <div className="rating-count">{review.starLen}</div>
                                <div className="rating-percentage-bar">
                                    <span className="rating-percentage" style={{ width: `${review.percent}%`, backgroundColor: '#fed700' }} />
                                </div>
                            </div>)
                    })
                }
            </div>
        </div>
    );
}

export default ReviewRating