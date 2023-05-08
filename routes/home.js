var express=require('express');
var router=express.Router();
var {getWeather,getWeekWeather}=require('../spider/weather');

router.get('/weather',async (req,res,next)=>{
  const data=await getWeather();
  if (data) {
    res.send({
      code:1,
      data,
      message:'获取天气数据成功'
    })
  }else{
    res.send({
      code:0,
      message:'获取天气数据失败'
    })
  }
})
router.get('/weekWeather',async (req,res,next)=>{
  const data=await getWeekWeather();
  if (data) {
    res.send({
      code:1,
      data,
      message:'获取天未来一周气数据成功'
    })
  }else{
    res.send({
      code:0,
      message:'获取未来一周天气数据失败'
    })
  }
})

module.exports = router;