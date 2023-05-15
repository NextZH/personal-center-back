var express = require('express');
var router = express.Router();
const {start,end,server}= require('../plugins/NeteaseCloudMusicApi-4.8.10/app.js');

router.get('/menu',async ()=>{
  
})
//手动打开关闭网易云音乐插件
router.post('/wyyMusic',async (req,res)=>{
  const {flag}=req.body;
  if (flag) {
    if (server) {
      res.send({
        code:0,
        message:'音乐插件服务已经正在运行！'
      })
    } else {
      await start();
      res.send({
        code:1,
        message:'音乐插件服务启动成功！'
      })
    }
  } else {
    if (server) {
      await end();
      res.send({
        code:1,
        message:'音乐插件服务关闭成功！'
      })
    } else {
      res.send({
        code:0,
        message:'音乐插件服务已经处于关闭状态！'
      })
    }
  }
})

module.exports = router;