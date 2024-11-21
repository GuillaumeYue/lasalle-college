import React, { useState } from 'react';
import { Form, Button, Row, Col, Image, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { Link } from 'react-router-dom';

const PlaceoderScreen = () => {
    const cart = useSelector(state => state.cart)

    //计算价格
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc 
        + item.price * item.qty, 0))

    cart.shippingPrice = addDecimals(cart.itemsPrice > 5000 ? 0 : 20)

    cart.totalPrice = addDecimals(Number(cart.itemsPrice) + Number(cart.shippingPrice))

    //提交订单的函数
    const placeorderHandler = () => {
        console.log('placeorder')
    }
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping Address</h2>
                    <p>
                        <strong>Address:</strong>
                        {cart.shippingAddress.address}, 
                        {cart.shippingAddress.city}, 
                        {cart.shippingAddress.postalCode}, 
                        {cart.shippingAddress.province}
                    </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method:</strong>
                        {cart.paymentMethod}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? (
                            <Message variant='info'>Your cart is empty</Message> 
                         ): (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/products/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>)}
                    </ListGroup.Item>
            </ListGroup>
        </Col>

        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Subtotal</Col>
                            <Col>${cart.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${cart.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>${cart.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type='button' className='btn-block' onClick=
                        {placeorderHandler} disabled={cart.cartItems.length === 0}>
                            Place Order
                        </Button>
                    </ListGroup.Item>
                </ListGroup>

            </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceoderScreen
