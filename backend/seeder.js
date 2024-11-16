import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

//插入样本数据到数据库
const importData = async () => {
    try{
        //清空数据库中的样本数据
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        //实现样本数据插入
        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map(product => {
            return {...product, user: adminUser}
        })

        await Product.insertMany(sampleProducts);

        console.log('Data Imported'.green.inverse);
        process.exit();

    }catch{
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}
//销毁样本数据
const destroytData = async () => {
    try{
        //清空数据库中的样本数据
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed'.green.inverse);
        process.exit();

    }catch{
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

//判断命令行执行的函数
if(process.argv[2] === '-d'){
    destroytData()
} else{
    importData()
} 