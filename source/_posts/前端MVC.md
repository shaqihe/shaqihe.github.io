---
title: 前端MVC
date: 2015-09-12 22:06:32
tags: [MVC]
---























”的单页面系统，于是就谢谢前端MVC的东西。

---
我们team现在用的是百度内部的轮子，一套比较轻的mvc框架，业界还有各种MV*框架，什么angular、vue等。

附带个代码dome链接，这是我们项目中的一个简单的mvc的写法：
[简单的MVC写法][1]
**MVC 几个核心的词语：**
view、model、controller、解耦、监听、通知、主动、被动、注册、绑定、渲染等等等。。。

<!--more-->
----------
**MVC包括三类对象：**

 - 模型model用于封装与应用程序的业务逻辑相关的数据以及对数据的处理方法，会有一个或多个视图监听此模型。一旦模型的数据发生变化，模型将通知有关的视图。

 - 视图view是它在屏幕上的表示，描绘的是model的当前状态。当模型的数据发生变化，视图相应地刷新自己。

 - 控制器controller定义用户界面对用户输入的响应方式，起到不同层面间的组织作用，用于控制应用程序的流程，它处理用户的行为和数据model上的改变。

下图是一个经典的MVC视图：
![此处输入图片的描述][2]


  view和model之间的观察者模式，view观察model，事先在此model上注册，以便view可以了解在数据model上发生的改变（其实这是一种事件机制）
  
----------

但是javascript中的MVC和上图又有一点区别：
我们使用的MVC框架是ER，适用于并能很方便地构建一个整站式的AJAX Web应用。核心的action、model和view的抽象，使得构建RIA应用变得简单可行。
![此处输入图片的描述][3]

 - 控制器做调度者，在controller中添加事件监控
 - 整个通信基于一套事件机制（发布订阅/观察者模式）
 - view 来控制模板和dom事件的添加
 - model驱动开发
     - 实际开发中，常常会以view为核心，页面上需要展示什么数据，就去model中设置数据源。发生了用户事件，我会在action中更新model，然后刷新view。有时候会遗漏更新model，直到需要数据时才发现没有保存到model中。
     - model本身是独立的，自控制的，不依赖于view，能够同步支持多view的显示。
     - 实现数据绑定，任何对模型的更改都会在界面上反映出来。那我们只要预先写好view和model的关系映射（类似angular的viewmodel的思想）
。


----------


作者 [@sha Qihe]
QQ：330630770
2015 年 9月 12日

  
  


  [1]: https://github.com/shaqihe/myBlog/tree/master/%E5%89%8D%E7%AB%AFMVC%E4%BB%A3%E7%A0%81
  [2]: http://7xqd2y.com1.z0.glb.clouddn.com/e9d45bd52764c65cdbf2d22576050481.png
  [3]: http://7xqd2y.com1.z0.glb.clouddn.com/8046d3b93bffe6defb6ddfba24c1df05.png
  

























  
  
  
