var express = require('express');
var router = express.Router();
var { getWeather, getWeekWeather } = require('../spider/weather');
var { getAnime } = require('../spider/animation');
const {musicModel}=require('../models/music')

//获取当日天气
router.get('/weather', async (req, res, next) => {
  const data = await getWeather();
  if (data) {
    res.send({
      code: 1,
      data,
      message: '获取天气数据成功'
    })
  } else {
    res.send({
      code: 0,
      message: '获取天气数据失败'
    })
  }
})
//获取未来一周天气
router.get('/weekWeather', async (req, res, next) => {
  const data = await getWeekWeather();
  if (data) {
    res.send({
      code: 1,
      data,
      message: '获取未来一周天气数据成功'
    })
  } else {
    res.send({
      code: 0,
      message: '获取未来一周天气数据失败'
    })
  }
})
//获取所有动画数据列表
router.get('/allAnime', async (req, res, next) => {
  const data = await getAnime();
  if (data) {
    res.send({
      code: 1,
      data,
      message: '获取所有动画数据列表数据成功'
    })
  } else {
    res.send({
      code: 0,
      message: '获取所有动画数据列表数据失败'
    })
  }
})
//获取动画日期列表
router.get('/animeTag', async (req, res, next) => {
  const { tagList } = await getAnime();
  if (tagList) {
    res.send({
      code: 1,
      data: tagList,
      message: '获取动画日期列表数据成功'
    })
  } else {
    res.send({
      code: 0,
      message: '获取动画日期列表数据失败'
    })
  }
})
//获取当日动画数据列表
router.post('/anime', async (req, res, next) => {
  const { index } = req.body;
  const { dataList,baseURL } = await getAnime();
  if (dataList) {
    res.send({
      code: 1,
      data: {
        list:dataList[index],
        baseURL
      },
      message: '获取当日动画数据列表成功'
    })
  } else {
    res.send({
      code: 0,
      message: '获取当日动画数据列表失败'
    })
  }
})
//获取欧美音乐列表
router.get('/OMMusic', async (req, res, next) => {
  const {pageNum,pageSize}=req.body;
  const dataList = await musicModel.find().limit(10).skip(0);
  if (dataList) {
    res.send({
      code: 1,
      data: dataList,
      message: '获取欧美音乐列表成功'
    })
  } else {
    res.send({
      code: 0,
      message: '获取欧美音乐列表失败'
    })
  }
})

module.exports = router;