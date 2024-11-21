import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // 替换 history
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserDetails } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate(); // 使用 useNavigate 替代 history

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails || {}; // 确保 userDetails 不为 undefined

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin || {}; // 确保 userLogin 不为 undefined

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile || {}; // 确保 userUpdateProfile 不为 undefined

    useEffect(() => {
        if (!userInfo) {
            navigate('/login'); // 使用 navigate 进行跳转
        } else {
            if (!user?.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails('profile'));
            } else {
                setName(user.name || '');
                setEmail(user.email || '');
            }
        }
    }, [dispatch, navigate, userInfo, user, success]);

    // 表单提交函数（更新用户资料）
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(updateUserDetails({ id: user._id, name, email, password }));
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {success && <Message variant="success">Profile Updated</Message>}
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Re-enter password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Modify
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    );
};

export default ProfileScreen;
