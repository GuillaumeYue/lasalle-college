// HotelBooking.jsx
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
    console.error("Error fetching hotel data:", error); // 打印错误信息
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
      alert(`你已成功预订 ${hotel.hotelName} 的 ${selectedRoom.type}，价格为 ${selectedRoom.price}。`);
    } else {
      alert("请选择一个房型！");
    }
  };

  if (loading) return <p>加载中...</p>;
  if (error) return <p>{error}</p>;
  if (!hotel) return <p>未找到相关酒店信息</p>;

  return (
    <section className="hotelBooking container section">
      <div className="secTitle">
        <h3 className="title">{hotel.hotelName}</h3> {/* 显示酒店名称 */}
      </div>

      <div className="hotelContent">
        <p>位置: {hotel.location}</p>
        <p>价格: {hotel.price}</p>
        <p>{hotel.description}</p>

        <div className="roomSelection">
          <h4>可选房型</h4>
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

        <button onClick={handleBooking} className="bookingBtn">预订</button>
      </div>
    </section>
  );
};

export default HotelBooking;
