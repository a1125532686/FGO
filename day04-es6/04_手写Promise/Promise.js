/* 
1. 定义语法结构
*/
// 三个常量状态值
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
/* 
构造函数
excutor: 在构造函数中立即同步执行的回调函数
*/
function Promise(excutor) {
  const self = this
  // 状态属性, 初始值为pending
  self.state = PENDING
  // 结果数据属性
  self.data = undefined
  /* 
  用来存储待执行的回调函数的数组
  数组中的元素的结构: 
    {
      onResolved (value) {}
      onRejected (reason) {}
    }

    [
      {onResolved: value => {}, onRejected: reson => {}}
      {onResolved: value => {}, onRejected: reson => {}}
    ]
  */
  self.callbacks = [] 

  /* 
  promise的状态由pending变为fulfilled
  结果数据为value
  */
  function resolve (value) {
    console.log('resolve', value)
    self.state = FULFILLED // 状态由pending变为fulfilled
    self.data = value // 结果数据为value
    // 异步调用callbacks中保存的所有成功的回调函数
    /* 
      说明: 原本应该让回调函数进行队列后执行, 但我们不方便操作微队列 
      我们可以用定时器来操作宏队列来模拟
    */
    if (self.callbacks.length>0) {
      setTimeout(() => {
        self.callbacks.forEach( obj => {
          obj.onResolved(value)
        })
      }, 0)
    }
    
  }

  /* 
  promise的状态由pending变为rejected
  结果数据为reason
   */
  function reject(reason) {
    console.log('reject', reason)

    self.state = REJECTED // promise的状态由pending变为rejected
    self.data = reason // 结果数据为reason
    // 异步调用callbacks中保存的所有失败的回调函数
    setTimeout(() => {
      self.callbacks.forEach( obj => {
        obj.onRejected(reason)
      })
    }, 0)
  }

  // 立即同步执行excutor
  excutor(resolve, reject)
}

/* 
指定成功和失败的回调函数
返回值为一个新的promise
*/
Promise.prototype.then = function (onResolved, onRejected) {

  const self = this

  // 假设当前promise还是pending状态, 需要将2个回调函数都保存起来
  self.callbacks.push({
    onResolved,
    onRejected
  })
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