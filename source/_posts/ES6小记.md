---
title: ES6小记
date: 2015-08-06 19:28:40
tags: [es6]
---

由于现在开发的项目大部分是商业性后端单页面系统，浏览器环境较好，就尝试用es6来写写代码，编译工具当然是得“babel”出把力了！

---

**总结一些ES6的新特性**

 1. **函数相关**
 
箭头函数是es6一种新的写法，具有很好的语法特性：
<!--more-->
 - 语法更为简洁
 - 固定this对象
```
//写法如下：
([param] [, param]) => {
   statements
}

param => expression
```
建议写法：
```
//参数用（）包裹，即使只有一个参数

// Good
let foo = (x) => x + 1;

// Bad
let foo = x => x + 1;
```
```
//试着用箭头函数定义函数
// 建议
let foo = () => {
    // code
};

// 以前
function foo() {
    // code
}

// 以前
let foo = function () {
    // code
}
```

**this固定:**
以前我们这么干，var self = this;或var that = this这种引用外围this的模式。但借助=>，就不需要这种模式了。
```
var obj = {
  key1: 'value1',
  key2: [1, 2, 3, 4, 5],
  func() {
    this.key2.forEach(item =>console.log(this.key1));
  }
}
------编译后------
var obj = {
  key1: "value1",
  key2: [1, 2, 3, 4, 5],
  func: function func() {
    var _this = this;

    this.key2.forEach(function (item) {
      return console.log(_this.key1);
    });
  }
};
```

**ES6写法中对于对象、类中的方法，使用增强的对象字面量：**
```
// Good
let foo = {
    bar() {
        // code
    }
};

// Bad
let foo = {
    bar: () => {
        // code
    }
};

// Bad
let foo = {
    bar: function () {
        // code
    }
};
```
**增强的对象字面量的体现？**

1.可在对象中直接定义方法
```
let foo = {
    bar() {
        // code
    }
};
```

**函数参数增强**
ES6为函数参数提供了默认值、剩余参数等功能，同时在调用函数时允许将数组展开为参数，如：

```
var foo = (x = 1) => x + 1;
foo(); // 2

//数组展开为参数
var extend = (source, ...args) => {
    for (let target in args) {
        for (let name in Object.keys(target) {
            if (!source.hasOwnProperty(name) {
                source[name] = target[name];
            }
        }
    }
};

var extensions = [
    {name: 'Zhang'},
    {age: 17},
    {work: 'hard'}
];
extend({}, ...extensions);
```


----------


**2、关键字类**

**let和const**

这是2个用来定义变量的关键字，众所周知的，let表示块作用域的变量，而const表示常量。

需要注意的是，const仅表示这个变量不能被再将赋值。

**借用网上的一句话**：我们推荐使用let全面替代var。同时建议仅在逻辑上是常量的情况下使用const，不要任何不会被二次赋值的场景均使用const。

**let实现块几作用域**
es6之前，js的块级作用域是基于函数的，为了包含一个私有变量，开发者必须声明一个函数。但现在，ES6提供了关键字let，使开发者可以声明块级变量，下面是一个例子：
```
function foo() {
  let bar = true;

  if (bar) {
    var baz = 'hi!';
  }

  console.log(baz); // hi
}

foo(); // hi

function foo2() {
  let bar = true;

  if (bar) {
    let baz = 'hi';
  }

  console.log(baz); 
}

foo2(); // Uncaught ReferenceError: baz未定义

//注： 在for循环 if判断都可以用let来实现块级作用域了
```


----------


**3、模块和模块加载器**

ES6终于在语言层面上定义了模块的语法，但这并不代表我们现在可以使用ES6的模块，因为实际在ES6定稿的时候，它把模块加载器的规范给移除了。因此我们现在有的仅仅是一个模块的import和export语法，但具体如“模块名如何对应到URL”、“如何异步/同步加载模块”、“如何按需加载模块”等这些均没有明确的定义。

**export,import 命令：**
```
// test1
export var name = 'Rainbow'
import name from './test.js'


// test2
var name = 'Rainbow';
var age = '24';
export {name, age};
 
import {name, age} from './test.js'

 //test3
  
  export function getName() {
    return name;
  }
  export function getAge(){
   return age;
  } 
  
module test from 'test.js';
test.getName();
```

**export default**
不用关心模块输出了什么，通过export default指令就能加载到默认模块，不需要通过 花括号来指定输出的模块,一个模块只能使用 export default 一次

```
  // default 导出
  export default function getAge() {} 
 
  // 或者写成
  function getAge() {}
  export default getAge;

  // 导入的时候不需要花括号
  import test from './test.js';
```

**注意：** 因为es6的模块化管理并没有最终定稿，在编写代码时还可以用AMD、CDM、commonjs 规格来写的。


----------

**4.Promise**
即便不是ES6，我们也已经满地用着Promise了，es6提供了promise的API，用起来方便些。

**建议所有异步均使用Promise实现，我还有一篇文章是记录了promise的一些用法，也可以看看**


----------

**5、类（class）**
ES6 引入了class（类），让javascript的面向对象编程变得更加容易清晰和容易理解。类只是基于原型的面向对象模式的语法糖，内部实现其实还是基于原型链的，谁让js语言最初设计就对面向对象的支持那么的特殊。

```
  class Animal {
    // 构造方法，实例化的时候将会被调用，如果不指定，那么会有一个不带参数的默认构造函数.
    constructor(name,color) {
      this.name = name;
      this.color = color;
    }
    // hello 是原型对象上的属性
    hello() {
      console.log('name:' + this.name + ',color:' + this.color);

    }
  }
   
 var animal = new Animal('dog','white');
 animal.hello();

 console.log(animal.hasOwnProperty('name')); //true
 console.log(animal.hasOwnProperty('toString')); // false
 console.log(animal.__proto__.hasOwnProperty('toString')); // true

 class Cat extends Animal {
  constructor(action) {
    // 子类必须要在constructor中指定super方法，否则在新建实例的时候会报错.
    // 如果没有置顶consructor,默认带super方法的constructor将会被添加、
    super('cat','white');
    this.action = action;
  }
  toString() {
    console.log(super.toString());
  }
 }

 var cat = new Cat('catch')
 cat.toString();
 
 // 实例cat 是 Cat 和 Animal 的实例，和Es5完全一致。
 console.log(cat instanceof Cat); // true
 console.log(cat instanceof Animal); // true
 
 /**
 * @constructor 继承时构造函数也可以这样写
 */
constructor(...args) {
    super(...args); // 省略号展开数组、

    this.xxx = xxx;
    this.yyy = yyy;
}
```

----------

    es6的的应用应该是越发的广泛，上面的这几个特性是在使用
    时，使用率比较高的地方，还有很多细节我还没有探索，此片
    小记就先到这。吃饭去！

作者 [@sha Qihe]     
QQ：330630770
2015 年 8月 6日 
