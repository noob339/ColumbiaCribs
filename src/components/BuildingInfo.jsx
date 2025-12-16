import React from "react";
import { buildingImages } from "../data/buildingImages";
import fallbackImg from "../assets/lowLibrary.jpg"; //placeholder in case it goes kaputz
import "./BuildingInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import buildings from "../data/buildings";

function BuildingInfo() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const building = buildings.find((b) => b.slug === slug);
    const imgSrc = buildingImages[building.slug] ?? fallbackImg;

    const goToReviewFlow = () => {
        navigate(`/review?building=${slug ?? ""}`);
    };

    //for unknown path
    if (!building) {
        return (
            <div className='building-card'>
                <div className='building-left'>
                    <h1>Building not found</h1>
                    <p className='address'>
                        Try searching for a building from the header.
                    </p>
                </div>
            </div>
        );
    }

    //name missing then address is the tile
    const title =
        building.name && building.name.trim().length > 0
            ? building.name
            : building.address;

    return (
        <div className='building-card'>
            <div className='building-left'>
                <h1>{title}</h1>

                <img src={imgSrc} alt={title || "Building"} />

                {building.address && (
                    <p className='address'>{building.address}</p>
                )}

                {/* may just load more in the future once db is set and normalized */}
                <div className='pagination'>
                    {buildings.findIndex((b) => b.slug === slug) + 1} /{" "}
                    {buildings.length}
                </div>
            </div>

            <div className='building-right'>
                <h2>Residence Information</h2>

                <ul>
                    {building.floors != null && (
                        <li>{building.floors} Floors</li>
                    )}
                    {building.singlesCapacity != null && (
                        <li>{building.singlesCapacity} Singles</li>
                    )}
                    {building.doublesCapacity != null && (
                        <li>{building.doublesCapacity} Doubles</li>
                    )}
                    {building.airConditioner && (
                        <li>{building.airConditioner} AC</li>
                    )}
                    {building.elevators && (
                        <li>{building.elevators} Elevators</li>
                    )}
                    {building.bathroomType && <li>{building.bathroomType}</li>}
                    {building.classMix && <li>{building.classMix}</li>}
                </ul>

                <button className='review-btn' onClick={goToReviewFlow}>
                    Write a review
                </button>
            </div>
        </div>
    );
}

export default BuildingInfo;
