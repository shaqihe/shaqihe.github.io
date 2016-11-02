---
title: 关于this
date: 2015-05-11 19:02:10
tags: [this]
---


**说说 this**
-----------

javascript的 this总是指向一个对象，具体指向那个对象，就是基于函数的运行环境动态绑定的，而不是函数声明时的环境。

this的指向大致分为四种：

 1. 作为对象的方法调用（this就指向这个对象）
 2. 作为普通函数调用（this指向window）
 3. 构造函数now时调用（指向实例出的这个对象）
 4. Function.prototype.call 或 Function.prototype.apply 调用

<!--more-->

//作为对象方法调用
```
var obj = {
    a: 1,
    getA: function () {
        alert(this.a)  
    }
}
obj.getA() // 1 
```

// 作为普通函数调用，this指向window
```
window.name = 'globalName';
function getName(){
    alert(this.name)
}
getName() // globalName
//或者
var 
var obj = {
    name: subName,
    getName: function () {
        alert(this.name)  
    }
}

var get = obj.getName;
get() //这里还是指向window， 输出 “globalName”
```
有时候我们会遇到，在一个dom事件函数里定义的函数，this都指向window， 被视为普通函数调用了。
```
//我们可能会这么做,变量保存this

div.onclick= function () {
    var that = this;
    function test () {
        // code  
    }
}
```
//作为构造器调用
js中没有类，单可以从构造函数中创建对象，同事提供new 运算符。

大部分js函数都可以当做构造函数，只是构造函数的调用方式，用new运算符调用这个函数时，该函数总会返回一个对象，构造函数里的this就指向这个对象。

```
var MyClass = function () {
 this .name = 'test';
}
 var obj = new MyClass();
 alert(obj.name) //test
 
 // 注：如果构造函数返回一个对象，就蒙圈了！
```

//Function.prototype.call 或 Function.prototype.apply 调用
这个两个函数可以动态的改变 this的指向
```
var obj = {
    name: ‘test’，
    get: function () {
        alert(this.name);
    }
}

var boj2 = {
    name: 'xiaoming'
}

boj.get.call(obj2);  //xiaoming   改变了this指向
```

有时间总结下call 和 apply 的一些东西，今天就先这些，吃饭去
----------


作者 [@sha Qihe]
QQ：330630770
2015 年 5月 10日
