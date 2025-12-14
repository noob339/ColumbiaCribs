import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import "./EnterCode.css";

function EnterCode() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [params] = useSearchParams();
  const email = params.get("email");
  const navigate = useNavigate();
  const location = useLocation();

  const reviewDraft = location.state?.reviewDraft || null;

  // If user comes here without a review, send them back
  useEffect(() => {
    if (!reviewDraft) {
      navigate("/review");
    }
  }, [reviewDraft, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1) Verify the code
      const res = await fetch("http://localhost:5000/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError("Invalid or expired code.");
        return;
      }

      // 2) Submit the review to backend
      const reviewPayload = {
        buildingId: reviewDraft.buildingId,
        title: reviewDraft.title,
        pros: reviewDraft.pros,
        cons: reviewDraft.cons,
        overallReview: reviewDraft.overallReview,
        ratings: reviewDraft.ratings,
      };

      const reviewRes = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewPayload),
      });

      if (!reviewRes.ok) {
        throw new Error("Failed to submit review");
      }

      // 3) Go to success page
      navigate("/success", {
        state: { buildingName: reviewDraft.buildingName },
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2>Last Step!</h2>
        <p>Enter the code sent to your Columbia email</p>

        <form onSubmit={handleSubmit}>
          <label className="verify-label">
            Code:
            <input
              type="text"
              placeholder="XNG42J"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
            />
          </label>

          {error && <p className="verify-error">{error}</p>}

          <button type="submit" className="verify-btn">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnterCode;
