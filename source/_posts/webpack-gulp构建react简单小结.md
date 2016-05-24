---
title: webpack+gulp构建react简单小结
date: 2016-01-20 20:27:37
tags: [react,webpack,glup,打包]
---


最近前端圈里，glup、webpack、react火的一比啊，忍不住尝尝，试着用react写个小页面，了解一下react的基本流程。

---
**先贴一个项目地址**：[基于gulp+webpack构建的react小Demo][1]


  小demo的整体介绍：
  <!--more-->
```
// 后端用node爬虫爬的糗事百科的数据，前端用react搞的简单的展示页面

1.前后端是完全分离了，前端单要起单独的服务器，XHR基于promise编程

2.后端是node 提供数据，数据是爬虫抓取的，为加快爬虫数据读
写，数据存储用的是redis(node我是个菜鸟，也就随意用express框架起了个服务)

3.样式是less

4.代码采用es6 jsx   用babel编译

5.文件结构比较简单  
```

**下图是我文件分布的一个截图，比较简单，大型的项目可能要修改了：**
![此处输入图片的描述][2]
----------

**来一段组件的代码：**

```
/**
 * UserLink.js
 * @author shaqihe
 * Created 2016-1-7
 */

import React, {PropTypes, Component} from 'react'

class UserLink extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.userName) {
            return (
                <div className = "user-link">欢迎{this.props.userName}</div>
            )
        } else {
            return ( < div className = "user-link" >
                    <a href = "#"> 首页 </a>
                    <a href = "#"> 注册 </a>
                    <a href = "#"> 登录 </a>
                < /div>
            );
        }
    }
}
UserLink.propTypes = {
    userName: PropTypes.string
};
export default UserLink
```
上面这个组件调用起来就是
```
<UserLink name="xiaoming"/>
```
这段代码是我用es6的写法写的，用webpack打包解决兼容，，es6包管理、类继承就清晰不少。

**注意这几点：**

 - 组件的名字要大些开头。
 - this.props 是用来访问上级给传递的参数。
     - 父级给组件传递数据都是通过属性值来的
     - this.props.children 是用来表示组件里所有的字节点。
     - 组件接收的属性通过propTypes来验证类型（如上面的代码）


----------

**this.state：**
组件的状态，是来标志组件形态的控制器，当state发生改变，就会触发react组件重新render

 - 组件内部可以调用setstate() 方法来改变state的值，从而触发组件从新render
 - state和props是不同的，props一旦初始化时确定，组件内部是没办法通过方法去改变的。
 


----------

**组件有生命周期：**

```
//三种状态：
Mounting：已插入真实 DOM

Updating：正在被重新渲染

Unmounting：已移出真实 DOM
```

对应每个状态，react给提供了几个方法，有利于对组件进行操作

```
componentWillMount()
组件实例即将初次渲染时被调用（只调用一次）

componentDidMount() 
组件实例被初次渲染后被调用（只调用一次）

componentWillUpdate(object nextProps, object nextState)
组件实例即将重新渲染时被调用，这个方法在初次渲染时不会被调
用。//注意：不能在此方法内调用setState()造成又一次渲染

componentDidUpdate(object prevProps, object prevState)
组件实例重新渲染后被调用，初次渲染不会调用

componentWillUnmount()
组件实例即将从DOM树移除时被调用
```


----------
**react一些注意的地方**

 - 上层组件给下层数据，通过pros
 - 下层组件给上层数据通信，一般通过回调函数（上层把一个函数当做参数给下层组件）
 - 组件添加样式的class要写成calssName
 - 现在react有很多成熟的mixin函数，提供一些现成的方法
 
----------
**glup和webpack结合使用**

 - webpack强大的是它的打包能力，各种静态资源大打包都能搞定
打包思路：该配置方案的思路是每个页面一个入口文件，文件中可以通过require引入其他模块，而这些模块webpack会自动跟入口文件合并为一个文件（这是写法也很适合react项目）

 - glup什么雪碧图、压缩、CDN等支持的更好，所以结合使用很不错

在gulp的配置文件里这个配置：
```
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
gulp.task("webpack", function(callback) {
  var myConfig = Object.create(webpackConfig);
  // run webpack
  webpack(
    // configuration
    myConfig
  , function(err, stats) {
    // if(err) throw new gutil.PluginError("webpack", err);
    // gutil.log("[webpack]", stats.toString({
    //	 // output options
    // }));
    callback();
  });
});
```

具体的配置大家可以看下git上的源代码：
[可以看下gulpfile.js和webpack.config.js的写法][3]


----------

**我也是大致把glup+webpack+react的整体流程跑通一下，文章只是简单的记录一下，有很多好的学习资料，大家自行参考。**

 
 
作者 [@sha Qihe]     
2016 年 1月 15日  
QQ:330630770


  [1]: https://github.com/shaqihe/sunweb
  [2]: http://7xqd2y.com1.z0.glb.clouddn.com/react.png
  [3]: https://github.com/shaqihe/sunweb.git
