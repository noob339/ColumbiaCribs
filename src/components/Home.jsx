import "./Home.css";

// import dorm images
import SchapiroHallImg from "../assets/SchapiroHall.jpg";
import WoodbridgeHallImg from "../assets/WoodbridgeHall.jpg";
import RugglesHallImg from "../assets/RugglesHall.jpg";
import EastCampusImg from "../assets/EastCampus.jpg";
import BroadwayHallImg from "../assets/broadwayHall.jpg";
import HartleyHallImg from "../assets/HartleyHall.jpg";

function Home() {
  const reviews = [
    {
      id: 1,
      buildingName: "Schapiro Hall",
      title: "Not bad ... Could be better",
      date: "Nov 6, 2025",
      text: "Rooms are small but get good light. It’s pretty quiet most nights, but the heating is loud and the lounges feel a bit tired.",
      upvotes: 20,
      downvotes: 12,
      image: SchapiroHallImg,
    },
    {
      id: 2,
      buildingName: "Woodbridge Hall",
      title: "Great location, noisy at night",
      date: "Nov 6, 2025",
      text: "Love being so close to campus and Riverside, but the street noise and sirens are constant. Great if you want an apartment vibe.",
      upvotes: 32,
      downvotes: 5,
      featured: true,
      image: WoodbridgeHallImg,
    },
    {
      id: 3,
      buildingName: "Ruggles Hall",
      title: "Dining is convenient",
      date: "Nov 6, 2025",
      text: "Super social suites with people always in the hallway. Kitchen is clutch, but the building is old and you feel it.",
      upvotes: 18,
      downvotes: 7,
      image: RugglesHallImg,
    },
    {
      id: 4,
      buildingName: "East Campus",
      title: "Amazing views, older interior",
      date: "Nov 6, 2025",
      text: "Insane skyline views and big common rooms. Interiors feel a bit dated, and the elevators can be slow at peak hours.",
      upvotes: 25,
      downvotes: 9,
      image: EastCampusImg,
    },
    {
      id: 5,
      buildingName: "Broadway",
      title: "Quiet but far from classes",
      date: "Nov 6, 2025",
      text: "Very calm, clean, and feels more like an off-campus apartment. Great if you want quiet, less great if you hate walking in the cold.",
      upvotes: 14,
      downvotes: 3,
      image: BroadwayHallImg,
    },
    {
      id: 6,
      buildingName: "Hartley Hall",
      title: "Great place to live and chill",
      date: "Nov 6, 2025",
      text: "Super central and very social. You’re in the middle of everything, but that also means noise and people 24/7.",
      upvotes: 20,
      downvotes: 2,
      image: HartleyHallImg,
    },
  ];

  return (
    <div className="home">
      <section className="reviews-section">
        <h3 className="reviews-heading">Most Recent Reviews</h3>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <article
              key={review.id}
              className={`recent-review-card ${
                review.featured ? "recent-review-card--featured" : ""
              }`}
            >
              <div
                className="recent-review-image"
                style={{ backgroundImage: `url(${review.image})` }}
              />

              <div className="recent-review-body">
                <div className="recent-review-main">
                  <h4 className="recent-review-title">{review.title}</h4>
                  <p className="recent-review-building">
                    {review.buildingName}
                  </p>
                  <p className="recent-review-date">{review.date}</p>
                  <p className="recent-review-text">{review.text}</p>
                </div>

                <div className="recent-review-votes">
                  <div className="recent-vote-row">
                    <span className="recent-vote-count">{review.upvotes}</span>
                    <span className="recent-vote-arrow recent-vote-arrow--up">
                      ▲
                    </span>
                  </div>
                  <div className="recent-vote-row">
                    <span className="recent-vote-count">
                      {review.downvotes}
                    </span>
                    <span className="recent-vote-arrow recent-vote-arrow--down">
                      ▼
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
