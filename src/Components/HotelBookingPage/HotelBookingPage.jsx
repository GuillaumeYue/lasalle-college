import React, { useState, useEffect } from "react";
import axios from "axios";
import "./hotelBookingPage.css";
import { HiOutlineLocationMarker, HiOutlineClipboardCheck } from "react-icons/hi";
import { Link } from "react-router-dom";

const HotelBookingPage = () => {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/destinations");
                setDestinations(response.data);
            } catch (error) {
                console.error("Error fetching destinations:", error);
            }
        };
        fetchDestinations();
    }, []);

    return (
        <section className="main container section">
            <div className="secTitle">
                <h3 className="title">Choose Your Destination</h3>
            </div>

            <div className="secContent grid">
                {destinations.map(({ _id, imgSrc, destTitle, location, grade, fees, description }) => (
                    <div key={_id} className="singleDestination">
                        <div className="imageDiv">
                            <img src={imgSrc} alt={destTitle} />
                        </div>
                        <div className="cardInfo">
                            <h4 className="destTitle">{destTitle}</h4>
                            <span className="continent flex">
                                <HiOutlineLocationMarker className="icon" />
                                <span className="name">{location}</span>
                            </span>
                            <div className="fees flex">
                                <div className="grade">
                                    <span>{grade}<small>+1</small></span>
                                </div>
                                <div className="price">
                                    <h5>{fees}</h5>
                                </div>
                            </div>
                            <div className="decs">
                                <p>{description}</p>
                            </div>
                            <Link to={`/hotellist/${_id}`}>
                                <button className="btn flex">
                                    Book Now <HiOutlineClipboardCheck className="icon" />
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HotelBookingPage;
