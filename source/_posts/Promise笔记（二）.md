---
title: Promise笔记（二）
date: 2014-12-23 19:51:12
tags: [promise,异步]
---

上一篇写了一部分，再写一些关于promise的笔记

----------
### Promise.then() &&链式写法

 - promise可以写成方法链的形式
 ```
 aPromise.then(function taskA(value) { 
 // task A
}).then(function taskB(vaue){
// task B
}).catch(function onRejected(error){ //最后catch 统一捕捉异常
console.log(error);
});

 ```
<!--more-->
 来段代码，看下链式操作的执行流程
 ```
function taskA() { 
    console.log("Task A");
}
function taskB() {
    console.log("Task B"); 
}
function onRejected(error) { 
    console.log("Catch Error: A or B", error);
}
function finalTask() {
    console.log("Final Task"); 
}
var promise = Promise.resolve(); 
promise.then(taskA)
        .then(taskB)
        .catch(onRejected)
        .then(finalTask);

 ```
上面这段代码的执行流程如下图：
![此处输入图片的描述][1]


  [1]: http://7xqd2y.com1.z0.glb.clouddn.com/3ce44941df94e3c19e891b27fc1f847c.png
  **注释：** .cntch() 可以捕捉 taskA taskB出现的异常，但是 onRejected、finalTask这两个后面没有catch捕捉了，所以这两个函数出现问题不会被捕捉到。
  
  

 - **用then、catch 链式写法，要比纯then写法好！！**
     - catch 可以捕捉到resolve函数里面的错误，有时候我可以主动在resolve函数里throw一个错误或者返回一个Rejected状态的promise对象（推荐后者）；
     - 链式操作代码更简洁
     
----------

### Promise链式写法中参数如何传递
前面例子中的Task都是相互独立的,只是被简单调用而已。这时候如果 Task A 想给 Task B 传递一个参数，那就是在 Task A 中 return 的返回值,会在 Task B 执行时传给它。
```
function doubleUp(value) { 
    return value * 2;
}
function increment(value) {
    return value + 1; 
}
function output(value) { 
    console.log(value);
}
var promise = Promise.resolve(1); 
promise
.then(increment) 
.then(doubleUp) 
.then(output) 
.catch(function(error){
    ￼￼￼// promise chain中出现异常的时候会被调用
    console.error(error); 
});

 1. Promise.resolve(1); 传递 1 给 increment 函数
 2. 函数 increment 对接收的参数进行 +1 操作并返回(通过 return ) 3. 这时参数变为2,并再次传给 doubleUp 函数
 3. 最后在函数 output 中打印结果
```
**注：**每个方法中return的值不仅只局限于字符串或者数值类型,也可以是对象或者promise 对象等复杂类型。

 4. return的值会由Promise.resolve进行相应的包装处理,因此不回调函数中会返回一个什么样的值,最终的结果都是返回一个新创建的promise对象。
 
----------
### Promise.catch 的一些小问题

 1. IE8 兼容问题catch是ECMAScrip3中保留字是不能作为对象的属性名使用的（ie8大概是基于es3实现的）可以用Promise['catch']来调用（不过很多压缩、打包工具自带转换功能，还不错）
 
----------

### Promise处理多个异步任务，promise.all 上场
Promise.all 接收一个promise对象的数组作为参数,当这个数组里的所有promise对象 全部变为resolve或reject状态的时候,它才会去调用 .then 方法。
```
// `delay`毫秒后执行resolve 
function timerPromisefy(delay) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(delay); }, delay
        );
    }); 
}

var startDate = Date.now();
// 所有promise变为resolve后程序退出 
Promise.all([
    timerPromisefy(1),
    timerPromisefy(32), 
    timerPromisefy(64), 
    timerPromisefy(128)
]).then(function (values) { 
    console.log(Date.now() - startDate + 'ms'); // 約128ms
    console.log(values); // [1,32,64,128]
    }
);
```
**注：**从总用时120ms来看，传递给Promise.all的promise并不是一个个的顺序执行的,而是 同时开始、并行执行的。

----------
### Promise处理多个异步任务，Promise.race 上场
它的使用方法和Promise.all一样,接收一个promise对象数组为参数

Promise.all 在接收到的所有的对象promise都变为 FulFilled 或者 Rejected 状态之后才会继续进行后面的处理,与之相对的是Promise.race 只要有一个promise对象进入FulFilled或者Rejected状态的话,就会继续进行后面的处理。
```
Promise.race([
timerPromisefy(1), 
timerPromisefy(32), 
timerPromisefy(64), 
timerPromisefy(128)
]).then(function (value) { 
    console.log(value); // => 1 只打印出一个最先出结果的
});

```

    就先酱了，用promise来进行异步编程已经不稀奇了，ES6也把promise带进了规范，详细的技巧和方法还是要多看手册和实践。


作者 [@sha Qihe]     
2014 年 12月 22日 
