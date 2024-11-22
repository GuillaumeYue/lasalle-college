import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductDetails, updateProduct } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = () => {
  const { id: productId } = useParams();  // 使用 useParams 获取路由参数
  const navigate = useNavigate();  // 使用 useNavigate 进行导航

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate('/admin/productlist');  // 使用 navigate 替代 history.push
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, navigate, productId, product, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    }));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);//和路由里的upload.single(image)对应
    setUploading(true);

    try {
        const config = {
            headers: {
                // 移除这行: 'Content-Type': 'multipart/form-data',
            },
        };
        const { data } = await axios.post('/api/upload', formData, config);
        setImage(data);
        setUploading(false);
    } catch (error) {
        console.error(error);
        setUploading(false);
    }
};


  return (
    <FormContainer>
      <Link to='/admin/productlist' className='btn btn-dark my-3'>
        返回上一页
      </Link>
      <h1>编辑产品界面</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>名称：</Form.Label>
            <Form.Control
              type='name'
              placeholder='请输入产品名称'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='price'>
            <Form.Label>产品价格：</Form.Label>
            <Form.Control
              type='number'
              placeholder='请输入价格'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='image'>
    <Form.Label>图片：</Form.Label>
    <Form.Control
      type='text'
      placeholder='请输入图片路径'
      value={image}
      onChange={(e) => setImage(e.target.value)}
    ></Form.Control>
    <input 
      type="file" 
      id="image-file" 
      onChange={uploadFileHandler}
      className="form-control"
    />
    {uploading && <Loader />}
    </Form.Group>
    <Form.Group controlId='brand'>
            <Form.Label>品牌：</Form.Label>
            <Form.Control
              type='text'
              placeholder='请输入品牌'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>{' '}
          <Form.Group controlId='countInStock'>
            <Form.Label>产品库存：</Form.Label>
            <Form.Control
              type='number'
              placeholder='请输入库存数量'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='category'>
            <Form.Label>产品类型：</Form.Label>
            <Form.Control
              type='text'
              placeholder='请输入产品类型'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>产品介绍：</Form.Label>
            <Form.Control
              type='text'
              placeholder='请输入产品介绍'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            更新信息
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default ProductEditScreen;
