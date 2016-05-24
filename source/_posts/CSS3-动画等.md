---
title: CSS3 动画等
date: 2014-10-22 12:13:05
tags: [CSS3,动画,transition]
---
本文对CSS3动画方面做一些笔记，可能不全，css3关于动画方面的一些东西主要涉及一下几个方面：

 1. box-shadow：阴影，动画可能会涉及
 2. border-redius：圆角
 3. linear-gradient：渐变
 4. transform：变形
 5. transition：过渡
 6. animation：动画
 <!--more-->
**文中的代码地址：[CSS3的一些demo代码，git代码地址][1]**
dome效果地址：
**大部分的效果都是用 hover来举例的，PC查看效果请鼠标hover**
 1. box-shadow：[box-shadow效果][2]
 2. gradient: [gradient效果][3]
 3. transform: [transform效果][4]
 4. transition: [transition效果][5]
 5. animation:  [animation效果][6]
 6. 小球效果：[结合多个属性的小球效果][7]

1.box-shadow（阴影）：
=========

 - 兼容： ie9+
 - 使用方法：box-shadow: h-shadow v-shadow blur spread color inset（水平位置、垂直位置、模糊距离、模糊尺寸、颜色、内部阴影）
  
> 使用起来比较简单，水平和垂直位置是必须选属性，下面举个简单的例子，说明一下内外阴影等效果
```html
<style type="text/css">
	.box-shadow p:first-child{
		box-shadow: 5px 5px 3px 2px rgba(0,0,0, .3);
	}
	.box-shadow p:last-child{
		box-shadow:  5px 5px 3px 2px rgba(0,0,0, .3) inset;
	}
</style>
<div class="box-shadow">
	<p>外阴影</p>
	<p>内阴影</p>
</div>
```
效果图：
![效果图][8]

----------

2.border-reduis：圆角：
-------------------

 - 兼容ie9+
 - border-radius: XXpx（可简写，也可以分别写四个角）
 
```
 使用起来比较简单，不举例了
```
----------

3.linear-gradient：渐变，主要用到背景颜色的渐变
--------------------------------

 - 兼容ie10+（注意）
 - 使用：linear-gradient( 方向，起点颜色，重点颜色 )；
 - 使用的时候要加上浏览器前缀-moz-linear-gradient、-webkit-linear-gradient···

下面来个示例代码：
```html
<style>
	.linear-gradient p:first-child{
		background: -webkit-linear-gradient(top, #09f, #fff 20px, #0c0);
	}
	.linear-gradient p:last-child{
		background: -webkit-linear-gradient(20deg, #09f, #fff, #0c0);
	}
</style>   
<div class="linear-gradient">
    <p>普通渐变</p>
	<p>角度渐变</p>
</div>
```
效果图：
![此处输入图片的描述][9]
----------
4.transform：变形
-------------------
 - 兼容ie10+（使用时，建议都加上浏览器前缀）
 - 使用：transform: none|transform-functions（transform-functions主要使用的值有四个：rotate:旋转、scale:缩放、translate:移动、skew:翻转）
 - 参照点设置：transform-origin：默认是中心
 - **transform使用不会触发浏览器的重排，所以是一个性能优化的点**
 
代码示例：
```html
<style>
	.transform > p .rotate{
		transform:rotate(20deg);
	}
	.transform > p .translate{
		transform:translate(20px, 20px);
	}
	.transform > p .scale{
		transform:scale(.5);
	}
	.transform > p .skew{
		transform:skew(20deg, -30deg);
	}
> 	如果加上变换参照点：
	.transform.origin > p span{
		background-color: #0c0;
		-webkit-transform-origin:0 -40px;
	}
</style>
<div class="transform origin">
	<p>
		<strong>旋转（rotate）</strong>
		<span class="rotate"></span>
	</p>
	<p>
		<strong>移动（translate）</strong>
		<span class="translate"></span>
	</p>
	<p>
		<strong>缩放（scale）</strong>
		<span class="scale"></span>
	</p>
	<p>
		<strong>扭曲（skew）</strong>
		<span class="skew"></span>
	</p>
</div>
```
效果截图，是否设置transfor-origin属性差距：
![此处输入图片的描述][10]
----------

5.transition：过渡，**注意：**所有参与变形的属性是同时进行
-----------------------
 - 兼容:ie10+
 - 使用: transition: property duration timing-function delay;(要过渡的CSS属性、时间、速度曲线、何时开始)
 
事例代码：

具体效果就请移步代码样例地址吧： [transition 效果浏览地址][11]
---------------------------------------

```html
<style type="text/css">
	.box{
		width: 100px;
		height: 100px;
		margin:50px auto;
		background-color: #f00;
		transition:all 1s ease-in 1s; //所以属性都有过渡效果
	}
	.box:hover{
		width: 200px;
		height: 200px;
		border-radius: 50%;
		background-color: #666;
		transition:all 1s ease 1s;
	}
</style>

<div class="box"></div>
```

----------
6.终极篇：animation：动画
-----------------------
 -  兼容:ie10+
 -  使用: animation: name duration timing-function delay iteration-count direction;（绑定的选择器、用时、动画曲线、延迟、播放的次数、是否反向播放）

    **解释一下**： 
 动画曲线：一个动画的过程的速度，如：先快后慢，先慢后快，匀速等； 绑定的选择器：用于创建动画的规则，关键字是 “@keyframes”
 
事例代码：

具体效果就请移步代码样例地址吧： [animation 效果浏览地址][12]
--------------------------------------


```html
	<style type="text/css">
		.box{
			width: 100px;
			height: 100px;
			margin:50px auto;
			background-color: #f00;
		}
		.box:hover{
			-webkit-animation:hover 2s ease-in 1s infinite alternate;   // 用时2S 先快后慢 延迟1S 无限循环 反向动画
		}
		@-webkit-keyframes hover{ //定义一个名字叫hover的动画规则，每个阶段的变化，都会是动画过渡完成
			0%{width: 100px;height: 100px;border-radius: 0%;}
			30%{width: 200px;height: 200px;border-radius: 50%; background-color: #999}
			60%{width: 200px;height: 200px;border-radius: 50%; background-color: #333}
			100%{width: 100px;height: 100px;border-radius: 0%;}
		}
	</style>

<div class="box"></div>
```


----------


  [1]: https://github.com/shaqihe/myBlog/tree/master/css3_transform
  [2]: http://118.192.156.85:3000/demo/shadow
  [3]: http://118.192.156.85:3000/demo/gradient
  [4]: http://118.192.156.85:3000/demo/transform
  [5]: http://118.192.156.85:3000/demo/transition
  [6]: http://118.192.156.85:3000/demo/animation
  [7]: http://118.192.156.85:3000/demo/ball
  [8]: http://7xqd2y.com1.z0.glb.clouddn.com/box-shadow.png
  [9]: http://7xqd2y.com1.z0.glb.clouddn.com/gradient.png
  [10]: http://7xqd2y.com1.z0.glb.clouddn.com/transform.png
  [11]: http://118.192.156.85:3000/demo/transition
  [12]: http://118.192.156.85:3000/demo/animation
