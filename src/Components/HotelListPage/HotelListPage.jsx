import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // 引入 Link 组件
import "./hotelListPage.css"; // 确保文件路径正确

const HotelListPage = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/hotels");
                setHotels(response.data);
            } catch (error) {
                console.error("Error fetching hotels:", error);
            }
        };
        fetchHotels();
    }, []);

    return (
        <section className="hotelListPage container section">
            <div className="secTitle">
                <h3 className="title">Available Hotels</h3>
            </div>
            <div className="secContent grid">
                {hotels.map(({ _id, hotelName, location, description, rooms }) => (
                    <div key={_id} className="singleHotelCard">
                        <div className="hotelInfo">
                            <h4>{hotelName}</h4>
                            <p>{location}</p>
                            <p>{description}</p>
                        </div>
                        <div className="roomOptions">
                            <h4>Room Types</h4>
                            {rooms.map((room, index) => (
                                <div key={index} className="roomOption">
                                    <span>{room.type}</span> - <span>{room.price}</span>
                                </div>
                            ))}
                        </div>
                        <Link to={`/booking/${_id}`}>
                            <button className="bookingBtn">Book Now</button>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HotelListPage;
