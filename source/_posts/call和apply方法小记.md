---
title: call和apply方法小记
date: 2015-05-28 17:21:34
tags: [call,apply]
---
javascript 中有两个比较有意思的函数，call()和apply(),这两个函数可以应用比较广泛，写个小文，总结一下。、

---

**call 和 apply 的区别？**
---------------------
Function.prototype.call 和Function.protopype.apply，这两个函数的作用一模一样，区别就是传入的参数形式不同。

<!--more-->

 - apply 传入两个参数，第一个指定this，第二个是一个带下表的集合（第二个参数作为参数传给调用的函数）
 - call 是传入参数不固定，第一个是指定的this，第二个参数往后依次传入被调用的函数。

```
//当第一个参数是null，则this的指向是window

function test () {
    alert(this === window)
}

test.call(null, 1) // trun
```

**call 和 apply 的用途？**

**1. 改变this指向**
call 和 apply 最常用的手法是改变this指向。看下这个例子：
```
var obj1 = {
    name: 'xiaoming';
} 

var obj2 = {
    name: 'xiaohong';
} 

window.nama = 'window';

var getName = function () {
    alert(this.name);
}
getName() // window
getName.call(boj1); //xiaoming
getName.call(obj2); //xiaohong

```
事件开发中经常遇到this指向不经意改变的场景，比如有一个DIV 节点， onclick事件中的this我们感觉都是是指向这个div，但是有时候在事件内部定义的函数就里的this就指向window。

例如：
```
document.getElementById('div1').onclick = function () {
    alert(this.id); //div1
    var showId = function () {
        alert(this.id);
    }
    showId(); //undefined 这里的this就指向window了，js就是这么任性
    
    // 我们以前这么干，缓存this
    var self = this；
    var showId = function () {
        alert(self.id);
    }
}
```
  有了call 和appyl 就可以换个方法搞了，来个栗子：
  
  ```
  document.getElementById('div1').onclick = function () {
    alert(this.id); //div1
    var showId = function () {
        alert(this.id);
    }
    showId.call(this); // div1  把this指向改一下，就这么简单
}
  ```
  
2. **Function.prototype.bind** 大部分浏览器都实现了，即使没有我们也可以模拟一个

```
Function.prototype.bind = Function.prototype.bind //兼容已有的
|| function (fun) {
    var self = this；
    return function () {
        return self.apply(fun, arguments);
    }
}

//大致这个是一个简化版的bind放过实现
```


----------


3. **借用其他对象（对象冒充），继承时会用到**

栗子：
```
var A = function (name) {
    this.name = name;
}

var B = function () {
    A.apply(this, arguments);
}

B.prototype.getName = function () {
    alert(this.name);
}

var b = new B('xiaoming');
b.getName() // xiaoming  

//我们在js实现继承的时候，也是利用apply对象冒充，
//来实现构造函数的继承
// 用 new 还实现原型方法继承
```


----------


4. **借用js原生方法**

```
// 函数的arguments 是个类数组方法，但不是数组
// 这样就可以得到一个真的数组
(function() {
    var slice = Array.prototype.slice,
        aArguments = [].slice.apply(arguments);
})(10, 20, 30);

```

这两个函数很有用，在使用中慢慢体会，今个就写这些


----------


作者 [@sha Qihe]
QQ：330630770
2015 年 5月 28日


