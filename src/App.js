import React from "react";
import './app.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./Components/HomePage/HomePage"; // 主页面
import HotelBookingPage from "./Components/HotelBookingPage/HotelBookingPage";
import HotelListPage from "./Components/HotelListPage/HotelListPage";
import DestinationDetails from "./Components/DestinationDetails/DestinationDetails";
import HotelBooking from './Components/HotelBooking/HotelBooking';
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import UserProfile from "./Components/UserProfile/UserProfile";

// Layout component for pages without HomePage components
const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/main" element={<HomePage />} />
                <Route path="/booking" element={<Layout><HotelBookingPage /></Layout>} />
                <Route path="/hotellist/:id" element={<Layout><HotelListPage /></Layout>} />
                <Route path="/hotelbooking/:id" element={<Layout><HotelBooking /></Layout>} />
                <Route path="/destinationdetails/:id" element={<Layout><DestinationDetails /></Layout>} />
                <Route path="/userprofile" element={<Layout><UserProfile /></Layout>} />

            </Routes>
        </Router>
    );
};

export default App;
