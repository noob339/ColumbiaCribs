import React from 'react'
import './RatingsCard.css'

function RatingsCard() {
    const ratings = [
        { label: 'Overall', value: 4 },
        { label: 'Social Life', value: 3 },
        { label: 'Comfort', value: 2 },
        { label: 'Safety', value: 5 },
        { label: 'Distance', value: 4 },
        { label: 'Amenities', value: 1 },
    ];
    return (
        <>
            <h2 className='RatingsCard-Title'>Average Ratings</h2>
            <div className="average-ratings">
            {ratings.map(r => (
                <div key={r.label} className="average-rating-row">
                <span className="average-rating-label">{r.label}</span>
                <div className="average-bar">
                    <div
                    className="average-fill"
                    style={{ width: `${(r.value / 5) * 100}%` }}
                    />
                </div>
                <span className="average-score">{r.value}</span>
                </div>
            ))}
            </div>
        </>
    )
}

export default RatingsCard
