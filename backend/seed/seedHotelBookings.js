import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

const HotelBooking = () => {
  const { id } = useParams();  // 获取URL中的id参数
  const [hotel, setHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);  // 保存用户选择的房型
  const [loading, setLoading] = useState(true);  // 控制加载状态
  const [error, setError] = useState(null);  // 保存错误信息

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hotels/${id}`);
        setHotel(response.data);
      } catch (error) {
        setError('Error fetching hotel data');
      } finally {
        setLoading(false);
      }
    };
    fetchHotelData();
  }, [id]);

  // 处理点击预订按钮的事件
  const handleBooking = () => {
    if (selectedRoom) {
      alert(`You have successfully booked ${hotel.hotelName} the ${selectedRoom.type}, price is ${selectedRoom.price}。`);
    } else {
      alert("Please select a room!");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!hotel) return <p>Hotel not found</p>;

  return (
    <section className="hotelBooking container section">
      <div className="secTitle">
        <h3 className="title">{hotel.hotelName}</h3>
      </div>

      <div className="hotelContent">
        <p>Location: {hotel.location}</p>
        <p>Price: {hotel.price}</p>
        <p>{hotel.description}</p>
        <p>Booking Date: {new Date(hotel.bookingDate).toLocaleDateString()}</p> {/* 格式化日期 */}

        <div className="roomSelection">
          <h4>Available Room Types</h4>
          {hotel.rooms.map((room, index) => (
            <div key={index} className="roomOption">
              <input
                type="radio"
                id={`room-${index}`}
                name="room"
                value={room.type}
                onChange={() => setSelectedRoom(room)}  // 选择房型时更新状态
              />
              <label htmlFor={`room-${index}`}>
                {room.type} - {room.price}
              </label>
            </div>
          ))}
        </div>

        {/* 添加点击事件处理 */}
        <button onClick={handleBooking} className="bookingBtn">Booking</button>
      </div>
    </section>
  );
};

export default HotelBooking;
