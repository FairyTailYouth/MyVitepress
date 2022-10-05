<!--
 * @Autor: zt
 * @Description: 
 * @Date: 2022-10-01 13:36:31
-->
# Object对象
##### 参考文档
[阮一峰的Object对象](https://wangdoc.com/javascript/stdlib/object.html)  
[Object的相关方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)  

#### 重难点解读
Object本身是一个函数可以当工具方法使用,把任意值转为对象,如果参数为空（或者为undefined和null），Object()返回一个空对象。
````
let obj = Object();
// 等同于
let obj = Object(undefined);
let obj = Object(null);
obj instanceof Object //true
````
数组也是一个对象
下面这个是判断变量是否为对象的函数
````
function isObject(value) {
    return value === Object(value);
}
isObject([])//true
isObject([1, 2, 2]) // true
isObject(true) // false
````
Object(value)与new Object(value)两者的语义是不同的，Object(value)表示将value转成一个对象，new Object(value)则表示新生成一个对象，它的值是value。
