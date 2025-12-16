import React from 'react'
import Broadway from '../assets/broadwayHall.jpg'
import './BuildingInfo.css';
import { Link, useNavigate } from "react-router-dom";

function BuildingInfo() {
    const navigate = useNavigate();
    const goToReviewFlow = () => {
        navigate("/review");
        setIsMenuOpen(false);
    };
    return (
        <div className="building-card">
            <div className="building-left">
                <h1>Broadway Hall</h1>
                <img
                src={Broadway}
                alt="Broadway Hall"
                />
                <p className="address">
                West 114th Street and Broadway, New York, NY, 10027
                </p>
                <div className="pagination">1 / 7</div>
            </div>
                
            <div className="building-right">
                <h2>Residence Information</h2>
                <ul>
                    <li>11 Floors</li>
                    <li>310 Singles</li>
                    <li>Seasonal AC</li>
                    <li>3 Elevators</li>
                    <li>Shared bathroom</li>
                    <li>Soph 1% · Jr 51% · Sr 38%</li>
                </ul>
                <button className="review-btn" onClick={goToReviewFlow}>Write a review</button>
            </div>
        </div>
        );
}

export default BuildingInfo
