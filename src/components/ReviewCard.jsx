import React from 'react';
import './ReviewCard.css';
import Broadway from '../assets/broadwayHall.jpg'

function ReviewCard() {
  const ratings = [
    { label: 'Overall', value: 4 },
    { label: 'Social Life', value: 3 },
    { label: 'Comfort', value: 2 },
    { label: 'Safety', value: 5 },
    { label: 'Distance', value: 4 },
    { label: 'Amenities', value: 1 },
  ];

  return (
    <div className="review-card">
      <div className="review-header">
        <h1>Location + elevators = easy living</h1>
        <div className="vote-section">
            <div className="vote-row">
              <span className="vote-count">20</span>
              <span className="vote-arrow vote-arrow--up">▲</span>
            </div>
            <div className="vote-row">
              <span className="vote-arrow vote-arrow--down">▼</span>
              <span className="vote-count">12</span>
            </div>
          </div>
      </div>
      <div className='review-info'>
        <span className="tag">Single</span>
        <span className="date">11/5/2025</span>
      </div>
      <div className="content">
        <div className="ratings">
          {ratings.map(r => (
            <div key={r.label} className="rating-row">
              <span className="rating-label">{r.label}</span>
              <div className="bar">
                <div
                  className="fill"
                  style={{ width: `${(r.value / 5) * 100}%` }}
                />
              </div>
              <span className="score">{r.value}</span>
            </div>
          ))}
        </div>

        <div className="image-section">
          <img src={Broadway} alt="Broadway Hall"/>
        </div>
      </div>

      <div className="comment">
        <strong>Comment:</strong>
        <p>
          Classic corridor-style dorm right by campus. Seasonal A/C helps in
          hotter months, and having multiple elevators keeps move-in/out sane.
          Shared bathrooms on my floor were cleaned regularly. Street noise from
          Broadway is real, and you'll get elevator queues at peak times.
        </p>
      </div>

      <div className="pros-cons">
        <div className="pros">
          <strong>Pros:</strong>
          <p>
            Steps from campus, multiple elevators, decent lounges/study spaces,
            active community.
          </p>
        </div>
        <div className="cons">
          <strong>Cons:</strong>
          <p>Shared bathrooms, street noise, elevator bottlenecks at rush hours.</p>
        </div>
      </div>

      <div className="verified">
        Verified Review <span className="verified-icon">✓</span>
      </div>
    </div>
  );
}

export default ReviewCard;