import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


//@desc    请求所有产品
//@route   GET /api/products
//@access  公开
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

//@desc    请求单个产品
//@route   GET /api/products/：id
//@access  公开
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product) {
        res.json(product)
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc    删除单个产品
//@route   DELETE/api/products/：id
//@access  私密（仅限管理员）
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product) {
        await Product.deleteOne({ _id: req.params.id }); // 使用 deleteOne 方法
        res.json({ message: 'Product removed' });
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }
})


export {getProducts, getProductById, deleteProduct}