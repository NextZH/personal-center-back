# personal-center-back

## 项目介绍

#### 技术栈：采用node.js+express+axios+cheerio+mongoose

#### 因前端需要爬虫和数据库支持而创建的项目，若需要体验完整功能，请划到本文档最下方查看前端相关

```sh
作者：Next

B站：★Next★

QQ：1197299127

邮箱：1197299127@qq.com
```

## 其他插件安装(必看)

因为本程序依赖于网易云提供的音乐api插件，所以在安装之前先导入该插件，并按照以下步骤操作完成

#### 1.打开网易云音乐api地址(由于当前版本直接放在plugins文件夹下，`可以跳过该步骤，请从第4步开始查看`)

```sh
网易云音乐api插件地址：https://github.com/Binaryify/NeteaseCloudMusicApi
```

#### 2.安装

点击当前页面的`code`按钮再点击`Download ZIP`，

或者在指定安装文件夹直接打开cmd输入以下命令行

```sh
$ git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
$ cd NeteaseCloudMusicApi
$ npm install
```

#### 3.修改文件

##### a.将以下代码复制粘贴到`NeteaseCloudMusicApi`文件夹下的`app.js`文件中，将文件原有的内容**`覆盖`**

```js
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
```

##### b.打开`personal-center-back`的`app.js`文件,在文件开头添加如下代码：

```js
//我这里是用的4.8.10版本，所以文档名为NeteaseCloudMusicApi-4.8.10
//内置在plugins里的写法就是： const {start}= require('./plugins/NeteaseCloudMusicApi-4.8.10/app');
const { start } = require('你的路径名/NeteaseCloudMusicApi文档名/app');
```

c.最后在该文件末尾的`app.listen`中添加`start()`，如下所示：

```js
app.listen(9527,()=>{
  console.log("服务器启动，端口：9527");
  spider();
  start();//新增在这里
});
```

#### 4.下载NeteaseCloudMusicApi依赖

切到你的NeteaseCloudMusicApi文档下，再`npm install`安装

```sh
#我这里是用的4.8.10版本，所以文档名为NeteaseCloudMusicApi-4.8.10

#手动下载网易云音乐api的朋友请执行以下命令行：
cd NeteaseCloudMusicApi-4.8.10
#本项目因为内置了该插件，所以忽略上条步骤，执行以下命令行：
cd plugins/NeteaseCloudMusicApi-4.8.10
#下载NeteaseCloudMusicApi依赖
npm install
```

## 程序安装

```sh
npm install
```

### 启动

```sh
node app.js
```

## 前端相关

### 项目名: 

````sh
现用名：next-zoom
曾用名称：saolei
名称问题相关请查看前端README.md文件介绍
````

### 地址:

```sh
https://github.com/NextZH/next-zoom
```

