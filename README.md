# pachong
es6环境搭建
=====
es6开发环境搭建
es6开发环境搭建
王凯
王凯
1 个月前

做项目之前，需要搭建一个舒适的开发环境。选择es6不仅是为了尝鲜，更是为了跟上潮流，强迫自己学习新语法，最大化的利用好语言的优势。

    最小／最方便搭建的开发环境
    自动编译／打包
    测试

本阶段先完成第一部分，即搭建一个es6的开发环境，需要监控文件变化，自动重启。解决方案就是nodemon+babel。
nodemon和babel的介绍

nodemon是一个nodejs应用的自动监控工具，会监听文件修改，自动重启。

nodemon官网

    Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.

babel是一个javascript编译器，可以将es6或者更新的js语言版本转换成es5或者更低，从而达到语法兼容的目的。

Babel · The compiler for writing next generation JavaScript
具体搭建步骤

1. 全局安装两个必要的cli工具

npm i -g nodemon babel-cli

其中i是install的简写。

2. 初始化package.json

npm init

初始化完成后会得到一个package.json文件

3. 安装两个babel插件

npm i -D babel-preset-es2015 babel-preset-stage-0

-D 是 --save-dev的简写

用babel-preset-stage-0是为了支持async/await，这个是es7的语法，但是考虑到这是异步的较好解决方案，项目中会用到，因此加上了。

4. 写.babelrc

{
    "presets": ["es2015", "stage-0"]
}

5. 添加dev script命令

修改package.json中的scripts字段为

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon --exec babel-node index.js"
  },

6. 创建index.js文件

这里为了测试async/await，贴一段经典代码

const f = () => {
return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(123);
    }, 2000);
  });
};

const testAsync = async () => {
const t = await f();
  console.log(t);
};

testAsync();

至此一个最简单的es6开发环境完成了，创建好index.js文件，运行使用以下命令

npm run dev

