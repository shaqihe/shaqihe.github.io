---
title: Promise笔记（一）
date: 2014-12-16 16:34:09
tags: [promise,异步,回调]
---
在前端开发中，有个很熟悉的词叫做“回调”，在处理一些异步的函数的时候，回调被广泛应用，但是大量用回调来编程，会出现嵌套层级过多，代码风格不规范，不清晰的问题。“**Promise/A+规范**”是一种很方便的异步编程方式。

------
## 使用promise进行编程有哪些好处？ ##

> * 将复杂的异步处理轻松地进行模式化
> * 代码更清晰
> * 异常处理更方便
> * 代码链式操作，**爽**！
<!--more-->
先来一段简单的promise的代码：
```
var promise = getAsyncPromise("fileA.txt"); 
promise.then(function(result){
// 获取文件内容成功时的处理
}).catch(function(error){
// 获取文件内容失败时的处理
});
```
通过这个代码，是不是觉得promise异步编程很清晰？


> 下面我详细介绍下promise实用的方法。

------

## Promise 简介

### 1. 构建promise对象

 - Promise类似于 XMLHttpRequest ,从构造函数 Promise 来创建一个新建新 promise 对 象作为接口。
 - 要想创建一个promise对象、可以使用 new 来调用 Promise 的构造器来进行实例化。如下：
```
var promise = new Promise(function(resolve, reject) { 
// 异步处理
// 处理结束后、调用resolve 或 reject
});
```

### 2. 常用的方法

 - 对通过new生成的promise对象为了设置其值在 resolve(成功) / reject(失败)时调用的回调函数 可以使用 promise.then() 实例方法。
```
promise.then(onFulfilled, onRejected)

//resolve(成功)时 onFulfilled 会被调用
//reject(失败)时onRejected 会被调用
//onFulfilled 、 onRejected 两个都为可选参数。
```

 - promise.then成功和失败时都可以使用。另外在只想对异常进行处理时可以采用promise.then(undefined, onRejected),这种方式,只指定reject时的回调函数即可。 不过这种情况下 promise.catch(onRejected)￼ 应该是个更好的选择。
```
promise.catch(onRejected)
```

### 3. 静态方法

 - 包括 Promise.all() 还有 Promise.resolve() 等在内,主要都是一些对Promise进行操作的 辅助方法。

### 4. 来个栗子 
```
function asyncFunction() {
    return new Promise(function (resolve, reject) { //①
    setTimeout(function () {
        resolve('Async Hello world'); }, 16); //②
    }); 
}
asyncFunction().then(function (value) { console.log(value); // => 'Async Hello world'
}).catch(function (error) { console.log(error);
});
```
栗子说明：
 1. new Promise构造器之后,会返回一个promise对象
 2. 为promise对象用设置 .then 调用返回值时的回调函数。
 3. 这个函数会返回promise对象,对于这个promise对象,我们调用的 方法来设置resolve后的回调函数,catch方法来设置发生错误时的回调函数。
 4. 在这种情况下catch的回调函数并不会被执行(因为promise返回了resolve), 不过如果运行环境没有提供setTimeout函数的话,那么上面代码在执行中就会产生异常,在catch中设置的回调函数就会被执行。
 
 **上面的代码也也可以不用catch方法，用then（resolve, reject）的形式(链式操作时最好用catch，可以统一捕捉异常)：**
```
asyncFunction().then(function (value) { console.log(value);
}, function (error) { console.log(error);
});
```
## Promise 状态详解
大致的了解promise处理流程，单独介绍一下promise状态

### 1. 大致三个状态
 - resolve(成功)时。此时会调用 onFulfilled
 - reject(失败)时。此时会调用 onRejected
 - 既不是resolve也不是reject的状态。也就是promise对象刚被创建后的初始化状态等

![此处输入图片的描述][1]

*注意：从Pending转换为Fulfilled或Rejected之后, 这个promise对象的状 态就不会再发生任何变化。

当promise的对象状态发生变化时,用 .then 来定义只会被调用一次的函数。
## 编写Promise代码：
### 1. 创建promise对象 
1. new Promise(fn) 返回一个promise对象 
2. 在 fn 中指定异步等处理
• 处理结果正常的话,调用 resolve(处理结果值)
• 处理结果错误的话,调用 reject(Error对象)


### 来个XHR的promise对象的栗子
```
function getURL(URL) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();  //栗子就不做ie兼容了
        req.open('GET', URL, true); 
        req.onload = function () {
            if (req.status === 200) { 
                resolve(req.responseText);
            } 
            else {
                reject(new Error(req.statusText));
            } 
        };
        req.onerror = function () { 
            reject(new Error(req.statusText)）;
        };
        req.send(); 
    });
}
// 运行示例
var URL = "http://httpbin.org/get"; 
getURL(URL).then(function onFulfilled(value) {
console.log(value); }).catch(function onRejected(error) {
console.error(error); });

```
**栗子说明：**

 1. getURL 只有在通过XHR取得结果状态为200时才会调用 resolve - 也就是只有数据取 得成功时,而其他情况(取得失败)时则会调用 reject 方法。
 2. resolve(req.responseText) 在response的内容中加入了参数。 resolve方法的参数并没有特 别的规则,基本上把要传给回调函数参数放进去就可以了。 ( then 方法可以接收到这 个参数值)



### 6. 编写promise对象处理方法

让我们在实际中使用一下刚才创建的返回promise对象的函数
```
getURL("http://example.com/"); // => 返回promise对象
```
为promise对象添加处理方法主要有以下两种:

 -  promise对象被 resolve 时的处理(onFulfilled) 
 -  promise对象被 reject时的处理(onRejected)

```
getURL(URL).then(onFulfilled, onRejected); //纯then写法
getURL(URL).then( onFulfilled).catch( onRejected);  // then chatch写法
```
**注：一般说来,使用 .catch 来将resolve和reject处理分开来写是比较推荐的做法, 这两者的 区别会在then和catch的区别中再做详细介绍。**


---

## 详解promise

### 1. 使用 Promise.resolve

 

 -  Promise.resolve(value) 可以认为是 new Promise() 方法的快捷方式。
```
//比如 Promise.resolve(42); 可以认为是以下代码的语法糖。
new Promise(function(resolve){ 
    resolve(42);
});
```
在这段代码中的 resolve(42);会让这个promise对象立即进入确定(即resolved)状态,并将 42 传递给后面then里所指定的 onFulfilled 函数。
```
Promise.resolve(42).then(
    function (value) {
        console.log(value)  //42
    }
);
```

**注**：Promise.resolve作为newPromise()的快捷方式,在进行promise对象的初始化或者编写 测试代码的时候都非常方便。


----------


 - Promise.resolve方法另一个作用就是将thenable对象转换为promise对象。

       **thenable对象**：简单来说它就是一个非常类似promise的东西(*就像我们有时称具有.length方法的非数组对象为Arraylike一样,thenable指的是一个具有.then 方法的对象*。)   

     - 最简单的例子就是jQuery.ajax(),它的返回值就是thenable的(因为 jQuery.ajax()的返回值是jqXHRObject对象,这个对象具有 .then 方法)
     
     - 用Promise.resolve来转换为一个promise对象。变成了promse对象的话,就能直接使用 then 或者 catch等这些在ES6Promises里定
义的方法了。

```
var promise = Promise.resolve(
    $.ajax('/json/comment.json')
) // => promise对象 

promise.then(function(value){
    console.log(value); 
});

```
**总结：简单总结一下 Promise.resolve 方法的话,可以认为它的作用就是将传递给它的参数填 充(Fulfilled)到promise对象后并返回这个promise对象。**
    
----------

### 2. 使用 Promise.reject

 - Promise.reject(error) 是和 Promise.resolve(value) 类似的静态方法,是 new Promise() 方 法的快捷方式。
```
new Promise(
    function (resolve,reject) { 
        reject(new Error("出错了"));
    }
);
// 是Promise.reject(newError("出错了"))的语法糖。
//如下:
Promise.reject(new Error("BOOM!")).catch(
    function(error){ 
        console.error(error);
    }
);
```


----------
今天先写到这，有空继续

    
    
    
    
    

作者 [@sha Qihe]     
2014 年 12月 15日    

