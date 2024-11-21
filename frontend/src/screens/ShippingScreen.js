import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // 使用 useNavigate
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // 使用 useNavigate 替代 history.push

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [province, setProvince] = useState(shippingAddress?.province || '');

    // 提交收货地址函数
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, province }));
        navigate('/payment'); // 使用 navigate 替代 history.push
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping Address</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Street"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>Region:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Region"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Postal Code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="province">
                    <Form.Label>Province</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Province"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;
