const axios=require('axios');
const cheerio=require('cheerio');
const fs =require('fs');
const { log } = require('console');
// const schedule=require('node-schedule');
// import axios from 'axios';
// import {load} from 'cheerio';
const getWeather=async ()=>{
  const res=await axios.get('https://tianqi.2345.com');//vue中请求会存在跨域问题，node不会
  // console.log(res);
  const $=cheerio.load(res.data);
  // const $=load(res.data);
  const currentCity =$('.banner-left .banner-city .banner-city-change a').eq(0).text();
  const currentTemp =$('.banner-left .banner-whether .banner-whether-info a').eq(0).text().trim();
  const currentWeather =$('.banner-left .banner-whether .banner-right-desc .banner-whether-desc2').text();
  // log($('.banner-left .banner-city .banner-city-change a').eq(0).text());
  // log($('.banner-left .banner-whether .banner-whether-info a').eq(0).text());
  // log($('.banner-left .banner-whether .banner-right-desc .banner-whether-desc2').text());
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
  // log(arr);
  // console.log({
  //   currentCity,
  //   currentTemp,
  //   currentWeather,
  //   weatherList:arr
  // });
  const data={
    currentCity,
    currentTemp,
    currentWeather,
    weatherList:arr
  }
  return {
    currentCity,
    currentTemp,
    currentWeather,
    weatherList:arr
  }
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
module.exports={
  getWeather,
}

// const job=schedule.scheduleJob('* /1 * * * *',()=>{
//   getWeather();
// })
