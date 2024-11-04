import React, { useState, useEffect } from 'react';
import './home.css';

import { GrLocation } from "react-icons/gr";
import { HiFilter } from "react-icons/hi";
import { FiFacebook } from "react-icons/fi";
import { AiOutlineInstagram } from "react-icons/ai";
import { SiTripadvisor } from "react-icons/si";
import { BsListTask } from "react-icons/bs";
import { TbApps } from "react-icons/tb";
import Aos from 'aos';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate 用于导航
import 'aos/dist/aos.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState(5000);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // 新增错误状态
  const navigate = useNavigate(); // 使用 useNavigate 进行导航

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  // 点击搜索时的处理函数
  const handleSearch = async () => {
    if (!searchTerm) {
      setError('Please enter a destination.');
      return;
    }

    setLoading(true);
    setError(''); // 清除之前的错误
    try {
      const response = await axios.get('http://localhost:5000/api/destinations', {
        params: {
          search: searchTerm,
          maxPrice: price,
        },
      });
      setDestinations(response.data);

      if (response.data.length === 0) {
        setError('No destinations found.');
      } else {
        // 导航到第一个目的地的详情页面
        const firstDestinationId = response.data[0]._id;
        navigate(`/destinationdetails/${firstDestinationId}`);
      }
    } catch (error) {
      console.error('Error fetching destinations:', error);
      setError('An error occurred while searching. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='home'>
      <div className="overlay"></div>
        <video src="/assets/video.mp4" muted autoPlay loop></video>



      <div className="homeContent container">
        <div className="textDiv">
          <span data-aos="fade-up" className="smallText">Our Packages</span>
          <h1 data-aos="fade-up" className="homeTitle">Search Your Holiday</h1>
        </div>

        <div data-aos="fade-up" className="cardDiv grid">
          <div className="destinationInput">
            <label htmlFor="city">Search your destination:</label>
            <div className="input flex">
              <input
                type="text"
                placeholder='Enter name here......'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <GrLocation className="icon" />
            </div>
            {error && <p className="error">{error}</p>} {/* 显示错误信息 */}
          </div>

          <div className="dateInput">
            <label htmlFor="date">Select your date:</label>
            <div className="input flex">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="priceInput">
            <div className="label_total flex">
              <label htmlFor="price">Max price:</label>
              <h3 className="total">${price}</h3>
            </div>
            <div className="input flex">
              <input
                type="range"
                max="5000"
                min="500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="searchOptions flex">
            <HiFilter className="icon" />
            <span onClick={handleSearch}>SEARCH</span>
          </div>
        </div>

        {/* 显示搜索结果 */}
        <div className="results">
          {loading ? (
            <p>Loading...</p>
          ) : (
            destinations.map((destination, index) => (
              <div key={index} className="destinationItem">
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
                <p>Price: ${destination.price}</p>
                <button className="btn">View Details</button>
              </div>
            ))
          )}
        </div>

        <div data-aos="fade-up" className="homeFooterIcons flex">
          <div className="rightIcons">
            <FiFacebook className="icon" />
            <AiOutlineInstagram className="icon" />
            <SiTripadvisor className="icon" />
          </div>

          <div className="leftIcons">
            <BsListTask className="icon" />
            <TbApps className="icon" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
