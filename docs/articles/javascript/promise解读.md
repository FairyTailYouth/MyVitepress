# promise
##### 参考文档
[阮一峰的Promise对象](https://wangdoc.com/es6/promise.html)  

#### Promise 的含义
Promise 是异步编程的一种解决方案,比传统的解决方案——回调函数和事件——更合理和更强大。
简单来说promise就是一个容器里面有各种异步操作的结果
从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。
#### Promise 的状态
（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
#### Promise的缺点
首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）
#### 基本用法
ES6 规定，Promise对象是一个构造函数，用来生成Promise实例。
````
const promise = new Promise(function(resolve, reject) {
  // 自己写的代码块

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
````
Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。  
resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去    
Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数
````
promise.then(function(value) {
  //成功的回调
}, function(error) {
  // 失败的回调
});
````
这两个函数都是可选的，不一定要提供。它们都接受Promise对象传出的值作为参数。

Promise 新建后就会立即执行。
````
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

//结果
// Promise
// Hi!
// resolved
````
#### 常用Api
##### Promise.prototype.then() 
Promise 实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then方法的第一个参数是resolved状态的回调函数，第二个参数是rejected状态的回调函数，它们都是可选的。
then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。  
示例代码:
````
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});
````
上面的代码使用then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数    
采用链式的then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用   

示例代码:
````
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function (comments) {
  console.log("resolved: ", comments);
}, function (err){
  console.log("rejected: ", err);
});

//箭头函数写法
getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("resolved: ", comments),
  err => console.log("rejected: ", err)
);
````
上面代码中，第一个then方法指定的回调函数，返回的是另一个Promise对象。这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。如果变为resolved，就调用第一个回调函数，如果状态变为rejected，就调用第二个回调函数。  
##### Promise.prototype.catch()
Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。
````
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});
````
上面代码中，getJSON()方法返回一个 Promise 对象，如果该对象状态变为resolved，则会调用then()方法指定的回调函数；如果异步操作抛出错误，状态就会变为rejected，就会调用catch()方法指定的回调函数，处理这个错误。另外，then()方法指定的回调函数，如果运行中抛出错误，也会被catch()方法捕获。
````
p.then((val) => console.log('fulfilled:', val))
  .catch((err) => console.log('rejected', err));

// 等同于
p.then((val) => console.log('fulfilled:', val))
  .then(null, (err) => console.log("rejected:", err));
````
示例:  
promise抛出一个错误，就被catch()方法指定的回调函数捕获。
````
//写法一
const promise = new Promise(function(resolve, reject) {
  throw new Error('test');
});
promise.catch(function(error) {
  console.log(error);
});
//结果
// Error: test
// 写法二
const promise = new Promise(function(resolve, reject) {
  try {
    throw new Error('test');
  } catch(e) {
    reject(e);
  }
});
promise.catch(function(error) {
  console.log(error);
});

// 写法三
const promise = new Promise(function(resolve, reject) {
  reject(new Error('test'));
});
promise.catch(function(error) {
  console.log(error);
});
````
如果 Promise 状态已经变成resolved，再抛出错误是无效的。
````
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
````
Promise 会吃掉错误  意思就是内部的错误不影响外部代码的执行  promise尽管提示错误但是程序还会一直执行下去,不过在nodejs中专门有处理promise错误的事件，unhandledRejection事件，专门监听未捕获的reject错误，上面的脚本会触发这个事件的监听函数，可以在监听函数里面抛出错误,有两个参数，第一个是错误对象，第二个是报错的 Promise 实例，它可以用来了解发生错误的环境信息。不过注意的是Node 有计划在未来废除unhandledRejection事件。如果 Promise 内部有未捕获的错误，会直接终止进程，并且进程的退出码不为 0。

示例:
````
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
//结果
// Uncaught (in promise) ReferenceError: x is not defined
// 123
````
一般总是建议，Promise 对象后面要跟catch()方法，这样可以处理 Promise 内部发生的错误。catch()方法返回的还是一个 Promise 对象，因此后面还可以接着调用then()方法。
示例代码：
````
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing()
.catch(function(error) {
  console.log('oh no', error);
})
.then(function() {
  console.log('carry on');
});
//结果
// oh no [ReferenceError: x is not defined]
// carry on
//解析
//上面代码运行完catch()方法指定的回调函数，会接着运行后面那个then()方法指定的回调函数。果没有报错，则会跳过catch()方法。
````
##### Promise.prototype.finally()
finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
````
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
````
上面代码中，不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数。

finally本质上是then方法的特例。
````
promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);
````
上面代码中，如果不使用finally方法，同样的语句需要为成功和失败两种情况各写一次。有了finally方法，则只需要写一次
Promise.prototype.finally的js实现代码
````
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
````
finally方法总是会返回原来的值。
````
// resolve 的值是 undefined
Promise.resolve(2).then(() => {}, () => {})

// resolve 的值是 2
Promise.resolve(2).finally(() => {})

// reject 的值是 undefined
Promise.reject(3).then(() => {}, () => {})

// reject 的值是 3
Promise.reject(3).finally(() => {})
````
##### Promise.all()
Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
````
const p = Promise.all([p1, p2, p3]);
````
上面代码中，Promise.all()方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。另外，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

p的状态由p1、p2、p3决定，分成两种情况。
（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
示例:
````
const databasePromise = connectDatabase();

const booksPromise = databasePromise
  .then(findAllBooks);

const userPromise = databasePromise
  .then(getCurrentUser);

Promise.all([
  booksPromise,
  userPromise
])
.then(([books, user]) => pickTopRecommendations(books, user));
````
上面代码中，booksPromise和userPromise是两个异步操作，只有等到它们的结果都返回了，才会触发pickTopRecommendations这个回调函数。

注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。
````
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了]
````
上面代码中，p1会resolved，p2首先会rejected，但是p2有自己的catch方法，该方法返回的是一个新的 Promise 实例，p2指向的实际上是这个实例。该实例执行完catch方法后，也会变成resolved，导致Promise.all()方法参数里面的两个实例都会resolved，因此会调用then方法指定的回调函数，而不会调用catch方法指定的回调函数。

##### Promise.race()
Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
````
const p = Promise.race([p1, p2, p3]);
````
上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
意思就是竞速，看哪个跑得快 跑得快的作为p的回调函数
Promise.race()方法的参数与Promise.all()方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve()方法，将参数转为 Promise 实例，再进一步处理
示例:
下面是一个例子，如果指定时间内没有获得结果，就将 Promise 的状态变为reject，否则变为resolve。
````
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);

p
.then(console.log)
.catch(console.error);
````
上面代码中，如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。

##### Promise.allSettled()
Promise.all()方法只适合所有异步操作都成功的情况，如果有一个操作失败，就无法满足要求
Promise.all()可以确定所有请求都成功了，但是只要有一个请求失败，它就会报错，而不管另外的请求是否结束
ES2020 引入了Promise.allSettled()方法，用来确定一组异步操作是否都结束了（不管成功或失败）。所以，它的名字叫做”Settled“，包含了”fulfilled“和”rejected“两种情况
Promise.allSettled()方法接受一个数组作为参数，数组的每个成员都是一个 Promise 对象，并返回一个新的 Promise 对象。只有等到参数数组的所有 Promise 对象都发生状态变更（不管是fulfilled还是rejected），返回的 Promise 对象才会发生状态变更
示例:
````
const promises = [
  fetch('/api-1'),
  fetch('/api-2'),
  fetch('/api-3'),
];

await Promise.allSettled(promises);
removeLoadingIndicator();
````
上面示例中，数组promises包含了三个请求，只有等到这三个请求都结束了（不管请求成功还是失败），removeLoadingIndicator()才会执行。

该方法返回的新的 Promise 实例，一旦发生状态变更，状态总是fulfilled，不会变成rejected。状态变成fulfilled后，它的回调函数会接收到一个数组作为参数，该数组的每个成员对应前面数组的每个 Promise 对象。
````
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

allSettledPromise.then(function (results) {
  console.log(results);
});
// [
//    { status: 'fulfilled', value: 42 },
//    { status: 'rejected', reason: -1 }
// ]
````
上面代码中，Promise.allSettled()的返回值allSettledPromise，状态只可能变成fulfilled。它的回调函数接收到的参数是数组results。该数组的每个成员都是一个对象，对应传入Promise.allSettled()的数组里面的两个 Promise 对象。
results的每个成员是一个对象，对象的格式是固定的，对应异步操作的结果。
````
// 异步操作成功时
{status: 'fulfilled', value: value}

// 异步操作失败时
{status: 'rejected', reason: reason}
````
成员对象的status属性的值只可能是字符串fulfilled或字符串rejected，用来区分异步操作是成功还是失败。如果是成功（fulfilled），对象会有value属性，如果是失败（rejected），会有reason属性，对应两种状态时前面异步操作的返回值。

返回值的用法例子:  
````
const promises = [ fetch('index.html'), fetch('https://does-not-exist/') ];
const results = await Promise.allSettled(promises);

// 过滤出成功的请求
const successfulPromises = results.filter(p => p.status === 'fulfilled');

// 过滤出失败的请求，并输出原因
const errors = results
  .filter(p => p.status === 'rejected')
  .map(p => p.reason);
````
##### Promise.any()
ES2021 引入了Promise.any()方法。该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。
只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。
````
Promise.any([
  fetch('https://v8.dev/').then(() => 'home'),
  fetch('https://v8.dev/blog').then(() => 'blog'),
  fetch('https://v8.dev/docs').then(() => 'docs')
]).then((first) => {  // 只要有一个 fetch() 请求成功
  console.log(first);
}).catch((error) => { // 所有三个 fetch() 全部请求失败
  console.log(error);
});
````

Promise.any()跟Promise.race()方法很像，只有一点不同，就是Promise.any()不会因为某个 Promise 变成rejected状态而结束，必须等到所有参数 Promise 变成rejected状态才会结束。

下面是Promise()与await命令结合使用的例子。
````
const promises = [
  fetch('/endpoint-a').then(() => 'a'),
  fetch('/endpoint-b').then(() => 'b'),
  fetch('/endpoint-c').then(() => 'c'),
];

try {
  const first = await Promise.any(promises);
  console.log(first);
} catch (error) {
  console.log(error);
}
````
上面代码中，Promise.any()方法的参数数组包含三个 Promise 操作。其中只要有一个变成fulfilled，Promise.any()返回的 Promise 对象就变成fulfilled。如果所有三个操作都变成rejected，那么await命令就会抛出错误。


Promise.any()抛出的错误是一个 AggregateError 实例（详见《对象的扩展》一章），这个 AggregateError 实例对象的errors属性是一个数组，包含了所有成员的错误。
示例:
````
var resolved = Promise.resolve(42);
var rejected = Promise.reject(-1);
var alsoRejected = Promise.reject(Infinity);

Promise.any([resolved, rejected, alsoRejected]).then(function (result) {
  console.log(result); // 42
});

Promise.any([rejected, alsoRejected]).catch(function (results) {
  console.log(results instanceof AggregateError); // true
  console.log(results.errors); // [-1, Infinity]
});
````

##### Promise.resolve()
有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。
示例:
````
const jsPromise = Promise.resolve($.ajax('/whatever.json'));
````
上面代码将 jQuery 生成的deferred对象，转为一个新的 Promise 对象。
Promise.resolve()等价于下面的写法。
````
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
````

Promise.resolve()方法的参数分成四种情况。

（1）参数是一个 Promise 实例

如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

（2）参数是一个thenable对象

thenable对象指的是具有then方法的对象，比如下面这个对象。
````
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
````
Promise.resolve()方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then()方法。
````
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function (value) {
  console.log(value);  // 42
});
````
（3）参数不是具有then()方法的对象，或根本就不是对象

如果参数是一个原始值，或者是一个不具有then()方法的对象，则Promise.resolve()方法返回一个新的 Promise 对象，状态为resolved。

````
const p = Promise.resolve('Hello');

p.then(function (s) {
  console.log(s)
});
// Hello
````
上面代码生成一个新的 Promise 对象的实例p。由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve()方法的参数，会同时传给回调函数。

（4）不带有任何参数

Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。

所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve()方法。

```
const p = Promise.resolve();

p.then(function () {
  // ...
});
````
需要注意的是，立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。
````
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
//setTimeout(fn, 0)在下一轮“事件循环”开始时执行
//Promise.resolve()在本轮“事件循环”结束时执行，
//console.log('one')则是立即执行1
````
#####  Promise.reject()

Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
````
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
````
上面代码生成一个 Promise 对象的实例p，状态为rejected，回调函数会立即执行。

Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。
````
Promise.reject('出错了')
.catch(e => {
  console.log(e === '出错了')
})
// true
````
#### Promise.try()
让同步函数同步执行，异步函数异步执行，并且让它们具有统一的 API
````
const f = () => console.log('now');
Promise.try(f);
console.log('next');
// now
// next
````
示例:
````
function getUsername(userId) {
  return database.users.get({id: userId})
  .then(function(user) {
    return user.name;
  });
}
````
上面代码中，database.users.get()返回一个 Promise 对象，如果抛出异步错误，可以用catch方法捕获，就像下面这样写。
````
database.users.get({id: userId})
.then(...)
.catch(...)
````
但是database.users.get()可能还会抛出同步错误（比如数据库连接错误，具体要看实现方法），这时你就不得不用try...catch去捕获。
````
try {
  database.users.get({id: userId})
  .then(...)
  .catch(...)
} catch (e) {
  // ...
}
````
上面这样的写法就很笨拙了，这时就可以统一用promise.catch()捕获所有同步和异步的错误。
````
Promise.try(() => database.users.get({id: userId}))
  .then(...)
  .catch(...)
````
事实上，Promise.try就是模拟try代码块，就像promise.catch模拟的是catch代码块。












