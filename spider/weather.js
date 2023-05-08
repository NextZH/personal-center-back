const axios=require('axios');
const cheerio=require('cheerio');
const fs =require('fs');
const { log } = require('console');
//基础请求
const baseRequest=async ()=>{
  const res=await axios.get('https://tianqi.2345.com');//vue中请求会存在跨域问题，node不会
  // console.log(res);
  const $=cheerio.load(res.data);
  return $;
}
//请求当天天气情况
const getWeather=async ()=>{
  const $=await baseRequest();
  const currentCity =$('.banner-left .banner-city .banner-city-change a').eq(0).text();
  const currentTemp =$('.banner-left .banner-whether .banner-whether-info a').eq(0).text().trim();
  const currentWeather =$('.banner-left .banner-whether .banner-right-desc .banner-whether-desc2').text();
  const list=$('.banner-left .banner-whether .banner-whether-list dd span');
  const arr=[];
  let obj={};
  list.each((i,e)=>{
    if (i<list.length-1) {
      if (i%2==0) {
        obj={title:$(e).text()}
      }else{
        obj.value=$(e).text().trim();
        arr.push(obj);
      }
    }
    // log($(e).text())
  })
  const data={
    currentCity,
    currentTemp,
    currentWeather,
    weatherList:arr
  }
  return data;
  // fsWrite('../spiderData/weatherData.js',`export const weatherData=${JSON.stringify(data)}`)
}
function fsWrite(path,content){
  return new Promise((res,rej)=>{
    fs.writeFile(path,content,{encoding:'utf-8'},err=>{
      if (!err) {
        console.log('写入成功！');
        res('写入成功！')
      }else{
        rej(err)
      }
    })
  })
  
}
//请求未来一周天气情况
const getWeekWeather=async ()=>{
  const $=await baseRequest();
  const  weekNodeList=$('.content .banner-right-con-list .banner-right-con-list-item');
  const list=[];
  weekNodeList.each((i,e)=>{
    const weekName= $(e).children('.banner-right-con-list-time').text().trim();
    const date=$(e).children('.date').text().trim();
    const status=$(e).children('.banner-right-con-list-status').text().trim();
    const temp=$(e).children('.banner-right-con-list-temp').text().trim();
    list.push({weekName,date,status,temp});
  })
  return list;
}
module.exports={
  getWeather,
  getWeekWeather,
}

// const job=schedule.scheduleJob('* /1 * * * *',()=>{
//   getWeather();
// })
