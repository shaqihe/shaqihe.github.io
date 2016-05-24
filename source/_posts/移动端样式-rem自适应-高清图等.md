---
title: 移动端样式(rem自适应/高清图等)
date: 2015-11-16 17:45:01
tags: [rem,移动端,自适应]
---

**移动端开发的时候，除了hybrid开发，普通的移动wap站开发时，和pc比较大的区别还是在样式写法上，主要是要做的样式的自适应。**

**从这几个方面介绍下移动端样式：**

 - viewport
 - 高清图的实现
 - 自适应布局
 - 吧啦吧啦的其他。。

---

<!--more-->

**一. viewport**

 简单来讲，viewport就是浏览器上，用来显示网页的那一部分区域了，也就是说，浏览器的实际宽
度，是和我们手机的宽度不一样的，无论你的手机宽度是320px，还是640px，在手机浏览器内部的宽度
，始终会是浏览器本身的viewport。如今的浏览器，都会给自己的本身提供一个viewport的默认值，
可能是980px，或者是其他值。就以手机来说吧，目前，新版本的手机浏览器，绝大部分是以980px作
为默认的viewport值的。
    
但是一般的移动端设备，很难达到960px的宽度，这个时候就会出现滚动条。viewport是可以进行手动设置的，如下：
```
1.width: 设置viewport的宽度（即上面提及到的，浏览器的宽），这里可以为一个整数，又或者是字符串"width-device"

2.initial-scale: 页面初始的缩放值，为数字，可以是小数

3.minimum-scale: 允许用户的最小缩放值，为数字，可以是小数

4.maximum-scale: 允许用户的最大缩放值，为数字，可以是小数

5.height: 设置viewport的高度（我们一般而言并不能用到）

6.user-scalable: 是否允许用户进行缩放，'no'为不允许，'yes'为允许

//一般添加一段这个meta标签，就能对viewport进行设置：
// 这样viewport的大小就和手机大小一样了
<meta name="viewport" content="initial-scale=1,
maximum-scale=1, minimum-scale=1, user-scalable=no">
```
**二. 各种移动设备**

 - 三个需要了解的概念:
     - PPI: 可以理解为屏幕的显示密度 
     - dpr: 设备物理像素和逻辑像素的对应关系，即物理像素/逻辑像素 
     - Resolution: 就是我们常说的分辨率
     
 - 物理像素与逻辑像素：
物理像素和逻辑像素的关系就是dpr，以iPhone6为例：在不做任何缩放的条件下，iphone6的获取到的'width-device'为375px,为屏幕的逻辑像素。而购买时我们所知的750px，则为屏幕的物理像素。

 - CSS中的px在移动端：
早iPhone6中CSS的1px为2px的物理像素。所以，最后的，给出一个结论。就是我们写的1px，在移动端，是逻辑像素的1px，而非物理像素的1px。
 
**三. 高清图：**

一般视觉稿会遵循以下几个特点：

1）首先，选取一款手机的屏幕宽高作为基准(现在更多的是iphone6的375×667)。

2）对于retina屏幕(如:dpr=2)，为了达到高清效果，视觉稿的画布大小会是基准的2倍，也就是说像素点个数是原来的4倍（对iphone6而言：原先的375×667，就会变成750×1334）。

这样就会有些问题出现：

```
问题：

1.对于dpr=2的手机，为什么画布大小×2，就可以解决高清问题？

2.对于2倍大小的视觉稿，在具体的css编码中如何还原每一个
区块真实宽高(也就是布局问题)?

```
在高清屏幕上，物理像素（一个成像单元）大于逻辑像素（手机实际的宽度），所以一个正常大小的图片，在物理像素（成像单元）密集的高清屏幕上就模糊失真了。

```
//drp (设备像素比)：
1.在javascript中，可以通过window.devicePixelRatio获取到当前设备的dpr。

以iphone6为例：
2.设备实际宽高为375×667，可以理解为设备独立像素(或css像素)。

3.dpr为2，根据上面的计算公式，其物理像素就应该×2，为750×1334。

当：
img {
    width： 200px；
    height： 200px；
}
这段代码在非高清、高清屏幕上图片的实际宽高都是 200X200
但是在高清屏幕上就变得模糊（因为成像单元密集了）
```
**所以在高清屏幕上，我们要使用img宽度的2倍作为图片素材，才能保证图片的清晰。**
同样有缺点：
```
在飞高清的屏幕下：
1）同样下载了@2x的图片，造成资源浪费。

2）图片可能会有色差。

//所以做好的方法是，不同的dpr采用不同的图片，现在很多cdn图片库都支持在线剪裁压缩功能，可以尝试一下。
```

**四. 高清屏下1px边框问题：**

因为物料像素过大，代码中写的 1px边框，实际看起来就比较模糊，
但是我们写成 0.5px 又存在兼容问题，一般解决办法如下：
```
.scale{
    position: relative;
}
.scale:after{
    content:"";
    position: absolute;
    bottom:0px;
    left:0px;
    right:0px;
    border-bottom:1px solid #ddd;
    -webkit-transform:scaleY(.5); //通过transform的缩放来实现
    -webkit-transform-origin:0 0;
}
```


----------


**多屏适配布局 rem上厂**
基于rem的原理，我们要做的就是: 针对不同手机屏幕尺寸和dpr动态的改变根节点html的font-size大小(基准值)。

这里我们提取了一个公式(rem表示基准值)

```
var rem = document.documentElement.clientWidth * dpr / 10

1）乘以dpr，是因为页面有可能为了实现1px border页面会缩放(scale) 1/dpr 倍(如果没有，dpr=1)。

2）除以10，是为了取整，方便计算(理论上可以是任何值)

所以就像下面这样，html的font-size可能会：

iPhone3gs: 320px / 10 = 32px

iPhone4/5: 320px * 2 / 10 = 64px

iPhone6: 375px * 2 / 10 = 75px

对于动态改变根节点html的font-size，我们可以通过css做，也可以通过javascript做。
```
通过js脚本跑一个 font-size的值，代码如下：

```
var dpr, rem, scale;
var docEl = document.documentElement;
var fontEl = document.createElement('style');
var metaEl = document.querySelector('meta[name="viewport"]';
scale = 1 / dpr;  //缩放的比例
dpr = win.devicePixelRatio || 1;
rem = docEl.clientWidth * dpr / 10;
// 设置viewport，进行缩放，达到高清效果

metaEl.setAttribute('content','width='+dpr*docEl.clientWidt+
',initial-scale=' + scale + 
',maximum-scale=' + scale + 
',minimum-scale=' + scale + 
',user-scalable=no');

// 设置data-dpr属性，留作的css hack之用
docEl.setAttribute('data-dpr', dpr);

// 动态写入样式
docEl.firstElementChild.appendChild(fontEl);
fontEl.innerHTML = 'html{font-size:' + rem +'px!important;}';

// 给js调用的，某一dpr下rem和px之间的转换函数
window.rem2px = function(v) {
    v = parseFloat(v);
    return v * rem;
};

window.px2rem: function(v) {
    v = parseFloat(v);
    return v / rem;
};
window.dpr = dpr;
window.rem = rem;
```
这种方式，可以精确地算出不同屏幕所应有的rem基准值，缺点就是要加载这么一段js代码，相对比较好的方法了，解决了下面的问题

```
1）border: 1px问题(根据不同屏幕，计算缩放比例)

2）图片高清问题（设置data-dpr 可以实现css的hack不同尺寸的图片）

3）屏幕适配布局问题（rem动态变化值，适合不同屏幕的自适应）
```


----------

说到布局，自然就得回答一下最初的留下的那个问题：如何在css编码中还原视觉稿的真实宽高？

**前提条件：**

1）拿到的是一个针对iPhone6的高清视觉稿 750×1334（也有可能其他尺寸）

2）采用上述的高清方案(js代码)。

如果有一个区块，在psd文件中量出：宽高750×300px的div，那么如何转换成rem单位呢？

X = 设计稿大小/基准值 (上面提到iphone6的基准值是 75px)
750×300px的div就写成：
```
div {
    width: 10rem;
    height: 4rem;
}

最后因为dpr为2，页面scale了0.5，所以在手机屏幕上显示的真实宽高应该是375×150px，就刚刚好。
```

**?字体大小就存在问题（自动缩放坑爹了）**

既然上面的方案会使得页面缩放(scale)，对于页面区块的宽高，我们可以依赖高清视觉稿，因为视觉稿本来就×2了，我们直接量就可以了，那么对于字体该如何处理呢？

字体不能用rem了，不然误差明显。

**一般设计搞上的字体大小，是更具人的阅读习惯来设计的，所以设计师一般是要求在什么设备上，字体的大小都是统一的！**

在使用 less的情况下，可以写一个mixin
```
// data-dpr 在第一个js脚本里有设置

.sizewise(@name, @px){
    @{name}: round(@px / 2) * 1px;
    [data-dpr="2"] & {
        @{name}: @px * 1px;
    }
    // for mx3
    [data-dpr="2.5"] & {
        @{name}: round(@px * 2.5 / 2) * 1px;
    }
    // for 小米note
    [data-dpr="2.75"] & {
        @{name}: round(@px * 2.75 / 2) * 1px;
    }
    [data-dpr="3"] & {
        @{name}: round(@px / 2 * 3) * 1px
    }
    // for 三星note4
    [data-dpr="4"] & {
        @{name}: @px * 2px;
    }
}
```

使用起来如下：

```
.sizewise(font-size, 32);

.sizewise(padding, 20);
```


----------

作者 [@sha Qihe]     
2015 年 11月 15日  
QQ:330630770


