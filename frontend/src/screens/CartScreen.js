import React, { useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = () => {
  const { id: productId } = useParams() // 使用 useParams 获取路由参数
  const location = useLocation() // 使用 useLocation 获取查询字符串
  const navigate = useNavigate() // 使用 useNavigate 进行导航

  const qty = location.search ? Number(location.search.split('=')[1]) : 1 // 从查询字符串获取数量

  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart // 从购物车中解构 cartItems

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  //删除产品
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))  
  }

  //支付函数
  const checkOutHandler = () => {
    navigate('/shipping')
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
            </Message>
          ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src= {item.image} alt={item.name} 
                      fluid rounded/>
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.product}`}>
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>{item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value))
                      )
                    }
                    >
                      {[...Array(item.countInStock).keys()].map(
                        (i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                    </Form.Control>
                  </Col>
                  <Col>
                        <Button type='button' onClick={() =>
                          removeFromCartHandler(item.product)}>
                            <i className='fas fa-trash'></i>
                        </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          )}
      </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>({cartItems.reduce((acc, item) => acc+ item.qty, 0)})items in total</h2>
                ${cartItems.reduce((acc, item) => acc + item.qty*item.price, 0)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type="button" className="btn-block" disabled={
                  cartItems.length === 0} onClick={checkOutHandler}>
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
    </Row>
  )

}


export default CartScreen
