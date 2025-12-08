import "./Home.css";

function Home() {
  const buildings = [
    { id: 1, name: "Hartley Hall", rating: 4.5, reviews: 23 },
    { id: 2, name: "Wallach Hall", rating: 4.2, reviews: 18 },
    { id: 3, name: "John Jay Hall", rating: 3.8, reviews: 45 },
    { id: 4, name: "Carman Hall", rating: 4.0, reviews: 32 },
    { id: 5, name: "Furnald Hall", rating: 4.3, reviews: 27 },
    { id: 6, name: "East Campus", rating: 3.9, reviews: 41 },
  ];

  return (
    <div className="home">
      <section className="hero">
        <h2>Find Your Perfect Columbia Housing</h2>
        <p>Read honest reviews from students about campus housing options</p>
      </section>

      <section className="buildings-grid">
        <h3>Popular Buildings</h3>
        <div className="grid">
          {buildings.map((building) => (
            <div key={building.id} className="building-card">
              <div className="building-image"></div>
              <div className="building-info">
                <h4>{building.name}</h4>
                <div className="rating">
                  <span className="stars">★ {building.rating}</span>
                  <span className="review-count">
                    ({building.reviews} reviews)
                  </span>
                </div>
                <button className="btn-view">View Reviews</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
