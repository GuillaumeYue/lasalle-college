import React, { useState, useEffect } from "react";
import "./navbar.css";
import axios from 'axios';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
import { TbGridDots } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [active, setActive] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [loginError, setLoginError] = useState(null);
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:5000/api/users/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setEmail(response.data.email);
                setIsLoggedIn(true);
            })
            .catch(() => setIsLoggedIn(false));
        }
    }, []);

    const toggleNavbar = () => setActive(!active);
    const toggleLoginModal = () => {
        setShowLoginModal(!showLoginModal);
        setLoginError(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoginError(null);
        
        try {
            const endpoint = isSignUp ? 'signup' : 'login';
            const response = await axios.post(`http://localhost:5000/api/users/${endpoint}`, {
                email,
                password,
            });
      
            if (response.status === 200 || response.status === 201) {
                localStorage.setItem('token', response.data.token);
                setIsLoggedIn(true);
                setShowLoginModal(false);
            }
        } catch (error) {
            console.error('Error response:', error.response); 
            setLoginError(error.response?.data?.message || 'An error occurred. Please try again later.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setEmail('');
        navigate('/');
    };

    return (
        <section className='navBarSection'>
            <header className='header flex'>
                <div className="logoDiv">
                    <Link to="/" className="logo flex">
                        <h1><MdOutlineTravelExplore className="icon" /> CNTravel</h1>
                    </Link>
                </div>

                <nav className={active ? 'navBar activeNavbar' : 'navBar'}>
                    <ul className="navLists flex">
                        {['Home', 'Packages', 'Shop', 'About', 'Pages', 'News', 'Contact'].map((item, index) => (
                            <li key={index} className="navItem">
                                <a href="#" className="navLink">{item}</a>
                            </li>
                        ))}
                        <Link to="/booking"><button className='btn'>BOOK NOW</button></Link>
                    </ul>
                    <div onClick={toggleNavbar} className="closeNavbar">
                        <AiFillCloseCircle className="icon" />
                    </div>
                </nav>

                <div onClick={toggleNavbar} className="toggleNavbar">
                    <TbGridDots className="icon" />
                </div>

                {!isLoggedIn ? (
                    <button className="loginBtn" onClick={toggleLoginModal}>Login</button>
                ) : (
                    <div className="userInfo">
                        <Link to="/userprofile" className="userLink">Hi, {email}</Link>
                        <button className="logoutBtn" onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </header>

            {showLoginModal && (
                <div className="modalOverlay">
                    <div className="loginModal">
                        <button className="closeBtn" onClick={toggleLoginModal}><AiOutlineClose /></button>
                        <div className="buttonContainer">
                            <button type="button" onClick={() => setIsSignUp(false)}>Log in</button>
                            <button type="button" onClick={() => setIsSignUp(true)}>Sign up</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <label>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <label>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            {isSignUp && (
                                <>
                                    <label>Re-enter Password</label>
                                    <input type="password" value={reEnterPassword} onChange={(e) => setReEnterPassword(e.target.value)} required />
                                </>
                            )}
                            <button type="submit">{isSignUp ? 'Sign up' : 'Log in'}</button>
                            {loginError && <div className="error">{loginError}</div>}
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Navbar;
