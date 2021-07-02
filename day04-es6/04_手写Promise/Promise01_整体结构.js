/* 
1. 定义语法结构
*/

/* 
构造函数
excutor: 在构造函数中立即同步执行的回调函数
promise对象内部有哪此数据

*/
function Promise(excutor) {
  
}

/* 
指定成功和失败的回调函数
返回值为一个新的promise
*/
Promise.prototype.then = function (onResolved, onRejected) {

}

/* 
指定失败的回调函数
返回值为一个新的promise
*/
Promise.prototype.catch = function (onRejected) {
  
}

/* 
创建并返回一个指定value的成功promise
*/
Promise.resolve = function (value) {
  
}

/* 
创建并返回一个指定reason的失败promise
*/
Promise.reject = function (reason) {
  
}

/* 
返回一个新的promise
只有当promises中所有promise都成功了, 返回的才成功, 
  value为promises中所有promise的value的数组
只要promises有一个失败的promise, 直接失败, 且reason是失败promise的reason
*/
Promise.all = function (promises) {
  
}