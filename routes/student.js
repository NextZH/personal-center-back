var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
// /routes/一级路由.js开头:
const schemaStudent = mongoose.Schema({
    //设置集合里的文档（对象）属性的数据类型，
    //文档的_id属性是自动引入，无需处理
    name: String,
    age: String,
    sex: String
}, {
    versionKey: false
});
//将schema模型代码和数据库的指定集合进行关联，
mongoose.model("studentModel", schemaStudent, "student");

//查找
router.get('/', async function (req, res) {
    let data = await mongoose.model("studentModel").find({});
    console.log(data);
    res.send({ code: 200, data })
});
//修改
router.post('/update', async function (req, res) {
    let { id, name, sex, age } = req.body;
    let data = await mongoose.model("studentModel").updateMany({ name }, { sex, age });
    console.log(data);
    res.send({ code: 200, data })
});
//删除
router.post('/del', async function (req, res) {
    let { id, name, sex, age } = req.body;
    let data = await mongoose.model("studentModel").deleteMany({
        $or: [
            { name },
            { id },
            { sex },
            { age }
        ]
    });
    console.log(data);
    res.send({ code: 200, data })
});
//新增
router.post('/add', async function (req, res) {
    let { name, sex, age } = req.body;
    let data1 = await mongoose.model("studentModel").find({ name, sex, age });
    if (data1.length>0) {
        res.send({ code:-1, message:"新增失败，存在相同数据" });
    } else {
        let data = await mongoose.model("studentModel").create({ name, sex, age });
        console.log(data);
        res.send({ code: 200, data });
    }
    
});


module.exports = router;