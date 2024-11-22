import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router()

//创建磁盘存储引擎
//开辟存储空间放置接收到的上传图片，存储空间是‘uploads/’文件夹，destination是空间位置
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname} - ${Date.now()}${path.extname(file.
            originalname)}`)
    }
})

//验证文件类型
const checkFileType = (file, cb) => {
    //定义允许的文件扩展名
    const fileTypes = /jpg|jpeg|png/
    //判断文件扩展名
    const extname = fileTypes.test(path.extname(file.originalname).
    toLowerCase())
    //验证资源的媒体类型
    const mimetype = fileTypes.test(file.mimetype)
    if(mimetype && extname) {
        return cb(null, true)
    } else {
        cb(new Error('Error: Images Only!'))
    }
}

//上传文件
const upload = multer({storage, fileFilter: function(req, file, cb) {
    checkFileType(file, cb)
}})

//创建文件上传路由
router.post('/', (req, res) => {
    upload.single('image')(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            // 发生错误时，Multer 遇到上传错误
            return res.status(500).send(err.message);
        } else if (err) {
            // 发生错误时，文件验证失败
            return res.status(400).send(err);
        }

        // 如果 req.file 为空，说明没有上传文件或文件类型错误
        if (!req.file) {
            return res.status(400).send('No file uploaded or file type error.');
        }

        // 成功上传文件
        res.send(`/${req.file.path}`);
    });
});


export default router