import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // React Router v6
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const navigate = useNavigate(); // 使用 useNavigate 替代 history.push
    const dispatch = useDispatch();

    if (!shippingAddress) {
        navigate('/shipping'); // 如果没有地址信息，跳转到 /shipping
    }

    const [paymentMethod, setPaymentMethod] = useState('wechatpay');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder'); // 跳转到 /placeorder
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                {/* 将单选框分组 */}
                <Form.Group>
                    <Form.Label as="legend" className="mb-4">
                        Select Payment Method
                    </Form.Label>
                    <div>
                        {/* 单选按钮 */}
                        <Form.Check
                            type="radio"
                            label="Wechatpay"
                            id="wechatpay"
                            name="paymentMethod"
                            value="wechatpay"
                            checked={paymentMethod === 'wechatpay'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mb-3"
                        />
                        <Form.Check
                            type="radio"
                            label="Alipay"
                            id="alipay"
                            name="paymentMethod"
                            value="alipay"
                            checked={paymentMethod === 'alipay'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mb-3"
                        />
                    </div>
                </Form.Group>

                {/* 提交按钮 */}
                <Button type="submit" variant="primary" className="mt-3">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;
