const {baseRequest} =require('./index');

const baseURL1='https://www.baidu.com';

const getBaiduSearch=async ()=>{
  const $ = await baseRequest(baseURL1);
  // console.log($);
  const list= $('.hot-news-wrapper .s-news-rank-content .news-meta-item');
  const node=$('body');
  console.log(node.find('.hot-news-wrapper'));
}

// getBaiduSearch();
module.exports={
  getBaiduSearch,
}