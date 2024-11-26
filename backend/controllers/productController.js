import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


//@desc    请求所有产品
//@route   GET /api/products?keyword=${keyword}
//@access  公开
const getProducts = asyncHandler(async (req, res) => {
    //每页展示的产品数量
    const pageSize = 6
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name:{
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    //获取产品数量（包括符合条件的关键词）
    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword }).limit(pageSize).
    skip(pageSize * (page - 1))
    res.json({products, page, pages: Math.ceil(count / pageSize)})
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

//@desc    创建产品
//@route   POST/api/products
//@access  私密（仅限管理员）
const createProduct = asyncHandler(async (req, res) => {
    //创建一个产品模板
    const product = new Product({
        name: 'Sample product',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
        rating: 0
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
    if(product) {
        await Product.deleteOne({ _id: req.params.id }); // 使用 deleteOne 方法
        res.json({ message: 'Product removed' });
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc    更新产品内容
//@route   PUT/api/products/:id
//@access  私密（仅限管理员）
const updateProduct = asyncHandler(async (req, res) => {
    //创建一个产品模板
    const {name, price, image, brand, category, countInStock, description} = req.body

    const product = await Product.findById(req.params.id)
    if(product){
        product.name = name
        product.price = price
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        product.description = description
        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
        
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc    创建产品评论
//@route   POST/api/products/:id/reviews
//@access  私密
const createProductReview = asyncHandler(async (req, res) => {
    //创建一个产品模板
    const {rating, comment} = req.body
    const product = await Product.findById(req.params.id)

    if(product){
        //判断用户是否已经评论过
        const alreadyReviewed = product.reviews.find(r => r.user.
            toString() === req.user._id.toString())
        if(alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

    //创建新评论
    const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
    }
    product.reviews.push(review)
    //更新产品评论数及总评分
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc,review) => acc + review.rating, 0) / product.reviews.length

    await product.save()
    res.status(201).json({message: 'Commnet added'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview}