import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // 用于获取路径参数
import Product from '../components/Product';
import { listProducts } from '../actions/productActions'; 
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductsCarousel from '../components/ProdecutsCarousel';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const { keyword, pageNumber = 1 } = useParams(); // 使用 useParams 获取路径参数
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber)); // 当 keyword 或 pageNumber 发生变化时重新加载产品
  }, [dispatch, keyword, pageNumber]); // 添加 keyword 和 pageNumber 到依赖数组

  return (
    <>
      <Meta />
      {!keyword ? <ProductsCarousel /> : <Link to='/' classsName='btn btn-dark'>Go Back</Link>}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate 
          pages={pages} 
          page={page} 
          keyword={keyword ? keyword : ''}
        />
        </>
      )}
    </>
  );
};

export default HomeScreen;
