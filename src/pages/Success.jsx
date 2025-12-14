import { useLocation, Link } from "react-router-dom";
import "./VerifyEmail.css";

function Success() {
  const location = useLocation();
  const buildingName = location.state?.buildingName;

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2>Success ✓</h2>
        <p>
          You have successfully reviewed{" "}
          <strong>{buildingName || "this building"}</strong>.
        </p>

        <Link
          to="/"
          className="verify-btn"
          style={{
            display: "inline-block",
            marginTop: "1.5rem",
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default Success;
