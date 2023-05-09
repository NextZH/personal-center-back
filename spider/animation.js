const { baseRequest } = require('./index');

const baseURL1 = 'http://www.yinghuacd.com';

const getAnime = async () => {
  const $ = await baseRequest(baseURL1);
  const dataNodelist = $('.area .side .tlist ul');
  const dataList = [];
  dataNodelist.each((i, e) => {
    const arr = [];
    $(e).children('li').each((j, e2) => {
      arr.push({
        name: $(e2).find('>a').text().trim(),
        nameUrl: $(e2).find('>a').attr('href'),
        num: $(e2).find('span').text().trim(),
        numUrl: $(e2).find('span a').attr('href'),
      });
    })
    dataList.push(arr);
  })
  // console.log(dataList);
  const tagNodeList = $('.area .side .tag span');
  const tagList = [];
  tagNodeList.each((i, e) => {
    tagList.push($(e).text());
  })
  // console.log(tagList);
  return{
    dataList,
    tagList,
    baseURL:baseURL1
  }
}

// getAnime();
module.exports = {
  getAnime,
}