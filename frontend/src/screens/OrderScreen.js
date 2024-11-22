import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Button,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // 使用 useParams 替代 match
import { getOrderDetails } from "../actions/orderActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const OrderScreen = () => {
  const { id: orderId } = useParams(); // 从路由中获取订单 ID
  const dispatch = useDispatch();
  //弹出框状态
  const [show, setShow] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  // 计算价格的辅助函数
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  if (!loading && order) {
    // 如果订单已加载，计算价格
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId]);

  //创建开启和关闭弹出框的函数
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order Id: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping Address</h2>
              <p>
                <strong>Address:</strong>
              </p>
              <p>
                <strong>Name:</strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email:</strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.province}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on
                  {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on
                  {order.paidAt}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Subtotal</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100"
                  onClick={handleShow}
                  disabled={order.orderItems.length === 0}
                >
                  Place Order
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Order ID: {order._id}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Total Price: ${order.totalPrice}</p>
                    <p>Payment Method: {order.paymentMethod}</p>
                    <Row>
                        <Col md={6} style={{textAlign: 'center'}}>
                        <Image src='/images/wechat.jpg' />
                        <p style={{backgroundColor: '#00c800', color: 'white'}}>Scan the QR code to pay</p>
                        </Col>
                        <Col>
                        <Image src='/images/saoyisao.jpg' />
                        </Col>
                    </Row>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
