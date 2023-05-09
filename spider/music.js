const {musicModel}=require('../models/music')

const baseURL='https://music.163.com';
const baseURL2='https://music.163.com/#/discover/toplist';
const baseURL3='https://www.9ku.com/zhuanji/taste8.htm';

const getOMMusic=async (baseRequest)=>{
  let data  =await musicModel.find();
  if (data.length!=0) return;
  const $=await baseRequest(baseURL3);
  const list=$('form .intro_item');
  const dataList=[];
  list.each((i,e)=>{
    $(e).find('li a[target="_1"]').each((j,e2)=>{
      dataList.push({
        url:'https://www.9ku.com'+$(e2).attr('href'),
        name:$(e2).text()
      })
    })
  })
  // console.log(dataList);
  // return {dataList,baseURL:'https://www.9ku.com'};
  let data2  =await musicModel.create(dataList);
}
// getOMMusic()

module.exports={
  getOMMusic,
}