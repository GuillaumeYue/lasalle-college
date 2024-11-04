import React, { useState, useEffect } from 'react';
import './DestinationDetails.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DestinationDetails = () => {
    const { id } = useParams(); // Retrieve the destination ID from the URL
    const [destination, setDestination] = useState({});
    
    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/destinations/${id}`);
                setDestination(response.data);
            } catch (error) {
                console.error('Error fetching destination details', error);
            }
        };
        fetchDestination();
    }, [id]);

    return (
        <div className="destination-details">
            {/* Header Section */}
            <div className="header-section">
                <img className="header-image" src={destination.imageUrl} alt={destination.title} />
                <div className="header-info">
                    <h1>{destination.title}</h1>
                    <p className="creator-info">Created by {destination.creator} | Views: {destination.views}</p>
                    <div className="header-stats">
                        <span>Start Date: {destination.startDate}</span>
                        <span>Days: {destination.days}</span>
                        <span>Cost: {destination.cost} {destination.currency}</span>
                        <span>Group Type: {destination.groupType}</span>
                    </div>
                </div>
            </div>

            {/* Trip Details Section */}
            <div className="trip-details">
                <div className="sidebar">
                    <ul>
                        <li><a href="#overview">Overview</a></li>
                        <li><a href="#itinerary">Itinerary</a></li>
                        <li><a href="#preparation">Preparation</a></li>
                        <li><a href="#expenses">Expenses</a></li>
                    </ul>
                </div>
                <div className="details-content">
                    <section id="overview">
                        <h2>Overview</h2>
                        <p>{destination.overview}</p>
                    </section>
                    <section id="itinerary">
                        <h2>Itinerary</h2>
                        {/* Display each day's itinerary */}
                        {destination.itinerary && destination.itinerary.map((day, index) => (
                            <div key={index}>
                                <h3>Day {index + 1}: {day.title}</h3>
                                <p>{day.description}</p>
                            </div>
                        ))}
                    </section>
                    <section id="preparation">
                        <h2>Preparation</h2>
                        <p>{destination.preparation}</p>
                    </section>
                    <section id="expenses">
                        <h2>Expenses</h2>
                        <p>{destination.expenses}</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DestinationDetails;
