import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ReviewPage.css";

const initialRatings = {
  overall: 4,
  socialLife: 3,
  comfort: 2,
  safety: 5,
  distance: 4,
  amenities: 1,
};

function ReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Later, if you click from a specific building card, you can pass it via state
  const building = location.state?.building || {
    id: 1,
    name: "Broadway Hall",
    address: "West 114th Street and Broadway",
  };

  const [title, setTitle] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [overallReview, setOverallReview] = useState("");
  const [ratings, setRatings] = useState(initialRatings);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleRatingChange = (key, value) => {
    setRatings((prev) => ({ ...prev, [key]: Number(value) }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  // New: just move to verify-email with reviewDraft
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const reviewDraft = {
      buildingId: building.id,
      buildingName: building.name, // handy for Success message
      title,
      pros,
      cons,
      overallReview,
      ratings,
      // If later you want to send the image, you can add imagePreview
    };

    navigate("/verify-email", { state: { reviewDraft } });
  };

  return (
    <main className="review-page">
      <section className="review-card">
        {/* LEFT: Form */}
        <div className="review-left">
          <h2 className="review-title">Submit Review</h2>

          <form onSubmit={handleSubmit} className="review-form">
            <label className="form-label">
              Title
              <input
                type="text"
                className="input"
                placeholder="Give your review a short title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                required
              />
            </label>

            <div className="pros-cons-row">
              <label className="form-label">
                Pros
                <input
                  type="text"
                  className="input"
                  placeholder="List some pros in a couple of words"
                  value={pros}
                  onChange={(e) => setPros(e.target.value)}
                  maxLength={200}
                />
                <span className="char-count">{pros.length}/200</span>
              </label>

              <label className="form-label">
                Cons
                <input
                  type="text"
                  className="input"
                  placeholder="List some cons in a couple of words"
                  value={cons}
                  onChange={(e) => setCons(e.target.value)}
                  maxLength={200}
                />
                <span className="char-count">{cons.length}/200</span>
              </label>
            </div>

            <label className="form-label">
              Overall Review
              <textarea
                className="textarea"
                placeholder="Share details about your experience at this place..."
                value={overallReview}
                onChange={(e) => setOverallReview(e.target.value)}
                maxLength={1000}
                rows={5}
                required
              />
              <span className="char-count">{overallReview.length}/1000</span>
            </label>

            {message && <p className="status-message">{message}</p>}

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Continue..." : "Submit"}
            </button>
          </form>
        </div>

        {/* RIGHT: building + ratings */}
        <div className="review-right">
          <div className="building-card">
            <h3 className="building-name">{building.name}</h3>
            <p className="building-location">{building.address}</p>

            <div className="upload-box">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Upload preview"
                  className="upload-preview"
                />
              ) : (
                <>
                  <div className="upload-icon">⬆</div>
                  <p className="upload-text">Upload a picture</p>
                  <p className="upload-note">
                    Avoid posting sensitive personal information and images.
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="upload-input"
              />
            </div>
          </div>

          <div className="ratings-card">
            <h3 className="ratings-title">Rate your experience!</h3>

            <RatingRow
              label="Overall"
              value={ratings.overall}
              onChange={(v) => handleRatingChange("overall", v)}
            />
            <RatingRow
              label="Social Life"
              value={ratings.socialLife}
              onChange={(v) => handleRatingChange("socialLife", v)}
            />
            <RatingRow
              label="Comfort"
              value={ratings.comfort}
              onChange={(v) => handleRatingChange("comfort", v)}
            />
            <RatingRow
              label="Safety"
              value={ratings.safety}
              onChange={(v) => handleRatingChange("safety", v)}
            />
            <RatingRow
              label="Distance"
              value={ratings.distance}
              onChange={(v) => handleRatingChange("distance", v)}
            />
            <RatingRow
              label="Amenities"
              value={ratings.amenities}
              onChange={(v) => handleRatingChange("amenities", v)}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function RatingRow({ label, value, onChange }) {
  return (
    <div className="rating-row">
      <span className="rating-label">{label}</span>
      <div className="rating-bar-wrapper">
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rating-slider"
        />
        <div
          className="rating-fill"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="rating-value">{value}</span>
    </div>
  );
}

export default ReviewPage;
