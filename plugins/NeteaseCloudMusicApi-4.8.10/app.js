#!/usr/bin/env node
let server=null;
async function start() {
  // 如果需要手动修改anonymous_token，需要注释generateConfig调用
  server=require('./server').serveNcmApi({
    checkVersion: true,
  })
}
async function end() {
  // 关闭服务
  server.close();
  server=null;
}
// start()
module.exports={
  start,
  end,
  server,
}
