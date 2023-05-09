const axios=require('axios');
const cheerio=require('cheerio');
const {getOMMusic}=require('./music');

//基础请求
const baseRequest=async (baseURL)=>{
  const res=await axios.get(baseURL);//vue中请求会存在跨域问题，node不会
  // console.log(res);
  const $=cheerio.load(res.data);
  return $;
}

const spider=()=>{
  getOMMusic(baseRequest);
}

module.exports={
  baseRequest,
  spider
}