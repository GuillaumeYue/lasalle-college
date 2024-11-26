import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import { listProductDetails, createProductReview } from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_DETAILS_RESET } from "../constants/productConstants";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert("Comment success");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  
    // 当产品详情不存在或产品 ID 不匹配时才获取产品详情
    if (!product || product._id !== productId) {
      dispatch(listProductDetails(productId));
    }
  
    return () => {
      // 当组件卸载时进行清理，以避免无限的 GET 请求
      dispatch({ type: PRODUCT_DETAILS_RESET });
    };
  }, [dispatch, productId, successProductReview]);
  

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId, { rating, comment }));
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {product && (
            <>
              <Meta title={product.name} />
              <Row>
                <Col md={6}>
                  <Image src={product.image || ""} alt={product.name || "Product"} fluid />
                </Col>
                <Col md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews || 0}reviews`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>Price:¥{product.price}</ListGroup.Item>
                    <ListGroup.Item>description:{product.description}</ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={3}>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>
                            <strong>¥{product.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Stock</Col>
                          <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                        </Row>
                      </ListGroup.Item>
                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Stock</Col>
                            <Col>
                              <Form.Control
                                as="select"
                                value={qty}
                                onChange={(e) => setQty(Number(e.target.value))}
                              >
                                {[...Array(product.countInStock).keys()].map((i) => (
                                  <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                  </option>
                                ))}
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}
                      <ListGroup.Item>
                        <Button
                          onClick={addToCartHandler}
                          className="btn-block"
                          type="button"
                          disabled={product.countInStock === 0}
                        >
                          Add to Cart
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <h2>Comment</h2>
                  {product.reviews && product.reviews.length === 0 && (
                    <Message>No comments</Message>
                  )}
                  <ListGroup variant="flush">
                    {product.reviews && product.reviews.length > 0 ? (
                      product.reviews.map((review) => (
                        <ListGroup.Item key={review._id}>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating} />
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment}</p>
                        </ListGroup.Item>
                      ))
                    ) : (
                      <Message>No comments</Message>
                    )}
                    <ListGroup.Item>
                      <h2>Write a comment</h2>
                      {loadingProductReview && <Loader />}
                      {errorProductReview && (
                        <Message variant="danger">{errorProductReview}</Message>
                      )}
                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              as="select"
                              value={rating}
                              onChange={(e) => setRating(Number(e.target.value))}
                            >
                              <option value="">Select...</option>
                              <option value="1">1 - Very Bad</option>
                              <option value="2">2 - Bad</option>
                              <option value="3">3 - Average</option>
                              <option value="4">4 - Good</option>
                              <option value="5">5 - Excellent</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="comment" className="mt-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows="3"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Button type="submit" variant="primary" className="mt-3">
                            submit
                          </Button>
                        </Form>
                      ) : (
                        <Message>
                          Please<Link to="/login">Login</Link>to write a comment
                        </Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductScreen;
