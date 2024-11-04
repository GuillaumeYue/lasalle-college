// src/Components/UserProfile/UserProfile.jsx
import React from 'react';
import './userProfile.css';

const UserProfile = () => {
    // 模拟用户数据（可以从 API 获取真实数据）
    const user = {
        profilePicture: '/path/to/profile_picture.jpg',
        name: 'Guillaume Yue',
        birthday: 'August 8, 1993',
        gender: 'Male',
        email: 'alexyuehan@gmail.com',
        alternateEmail: '137412785@qq.com',
        phone: '(514) 566-3218',
        addresses: [
            { type: 'Home', address: '2100 Boulevard de Maisonneuve O, Montréal, QC' },
            { type: 'Work', address: 'Sinsa-dong Community Service Center, 128 Apgujeong-ro, Sinsa-dong, Gangnam-gu, Seoul' },
            { type: 'Other', address: 'Other addresses you added' },
        ],
    };

    return (
        <div className="userProfile">
            <h1>Personal info</h1>
            <p>Info about you and your preferences across our services</p>

            <section className="profileSection">
                <h2>Your profile info in our services</h2>
                <p>Personal info and options to manage it. You can make some of this info visible to others so they can reach you easily.</p>
                
                {/* Basic Info */}
                <div className="infoSection">
                    <h3>Basic info</h3>
                    <div className="infoRow">
                        <label>Profile picture</label>
                        <img src={user.profilePicture} alt="Profile" className="profilePicture" />
                    </div>
                    <div className="infoRow">
                        <label>Name</label>
                        <p>{user.name}</p>
                    </div>
                    <div className="infoRow">
                        <label>Birthday</label>
                        <p>{user.birthday}</p>
                    </div>
                    <div className="infoRow">
                        <label>Gender</label>
                        <p>{user.gender}</p>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="infoSection">
                    <h3>Contact info</h3>
                    <div className="infoRow">
                        <label>Email</label>
                        <p>{user.email}</p>
                        <p>{user.alternateEmail}</p>
                    </div>
                    <div className="infoRow">
                        <label>Phone</label>
                        <p>{user.phone}</p>
                    </div>
                </div>

                {/* Address Info */}
                <div className="infoSection">
                    <h3>Addresses</h3>
                    {user.addresses.map((address, index) => (
                        <div className="infoRow" key={index}>
                            <label>{address.type}</label>
                            <p>{address.address}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default UserProfile;
