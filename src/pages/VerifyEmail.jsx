import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./VerifyEmail.css";

function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const reviewDraft = location.state?.reviewDraft || null;

  // If someone opens /verify-email directly, send them back to the review form
  useEffect(() => {
    if (!reviewDraft) {
      navigate("/review");
    }
  }, [reviewDraft, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.endsWith("@columbia.edu")) {
      setError("Please enter a valid Columbia email.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Failed to send code");
      }

      navigate(`/enter-code?email=${encodeURIComponent(email)}`, {
        state: { reviewDraft },
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2>Almost there!</h2>
        <p>Use your active Columbia email</p>

        <form onSubmit={handleSubmit}>
          <label className="verify-label">
            Columbia Email:
            <input
              type="email"
              placeholder="abc123@columbia.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

export default VerifyEmail;
