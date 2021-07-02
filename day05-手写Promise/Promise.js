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
    // console.log('resolve', value)

    // 如果当前不是pending状态, 直接结束
    if (self.state!==PENDING) return

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
    // console.log('reject', reason)

    // 如果当前不是pending状态, 直接结束
    if (self.state!==PENDING) return

    self.state = REJECTED // promise的状态由pending变为rejected
    self.data = reason // 结果数据为reason
    // 异步调用callbacks中保存的所有失败的回调函数
    if (self.callbacks.length>0) {
      setTimeout(() => {
        self.callbacks.forEach( obj => {
          obj.onRejected(reason)
        })
      }, 0)
    }
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

  // 返回一个新promise对象
  // 新promise的状态由onResolved或onRejected的执行结果决定
    /* 抛出错误 ==> 失败 reason为抛出的错误*/
    /* 返回一个失败的promise  失败  reason为result的reason*/
    /* 返回一个成功的promise 成功 value为result的value*/
    /* 返回非promise值 ==> 成功, 成功的value是返回的值*/
  return new Promise((resolve, reject) => {

    // 如果onResolved没有指定为函数, 指定onResolved默认值将value传递给返回的promise
    if (typeof onResolved !== 'function') {
      onResolved = value => {return value}
    }

    // 如果onRejected没有指定为函数, 指定onRejected默认值将reason传递给then返回的promise
    if (typeof onRejected !== 'function' ) {
      onRejected = reason => {throw reason}
    }

    /* 
    执行回调函数, 并根据回调函数执行的结果更新返回的promise状态
    */
    function handle(callback) {
      try {
        const result = callback(self.data)
        
        if (result instanceof Promise) {
          result.then(
            /* 
            如果回调函数返回一个成功的promise 
            ==> then返回的promise就是成功的, 且value是回调返回的promise的value
            如何让then返回的promise变为成功的, 且成功的值为value?
            */
            // value => resolve(value),
            resolve,
            /* 如果回调函数返回失败promise ==> then返回的promise就失败, 且失败的值为reason */
            // reason => reject(reason)
            reject
          )
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }


    // 如果是fulfilled状态, 异步调用成功的回调
    if (self.state===FULFILLED) {
      setTimeout(() => {
        handle(onResolved)
      })
      
    // 如果是rejected状态, 异步调用失败的回调
    } else if (self.state===REJECTED) {
      setTimeout(() => {
        handle(onRejected) 
      })
    // 如果在pending状态 , 需要将2个回调函数都保存起来
    } else {
      self.callbacks.push({
        // 问题: 将有结果后就会调用此回调函数, 但不会更新返回的promise的状态
        // onResolved,
        // onRejected,

        /* 怎么做才能有机会在回调函数执行完后去更新返回的promise的状态? */
        onResolved (value) {  // 将来成功后会调用它
          // 异步执行成功回调函数, 并根据回调函数执行的结果更新返回的promise状态
          handle(onResolved)
        },
        onRejected (reason) { // 将来失败后会调用它
          // 异步执行失败回调函数, 并根据回调函数执行的结果更新返回的promise状态
          handle(onRejected)
        }
      })
    }
  })
}


Promise.prototype.then = function (onResolved, onRejected) {
  const self = this

  if (typeof onResolved !== 'function') {
    onResolved = value => value
  }
  if (typeof onRejected !== 'function') {
    onRejected = reason => {throw reason}
  }


  return new Promise((resolve, reject) => {

    /* 
    调用指定的回调, 并根据调用的结果更新返回的promise的状态
    */
    function handle (callback) {
      /* 抛出错误 ==> 失败 reason为抛出的错误*/
      /* 返回一个失败的promise  失败  reason为result的reason*/
      /* 返回一个成功的promise 成功 value为result的value*/
      /* 返回非promise值 ==> 成功, 成功的value是返回的值*/
      try {
        const result = callback(self.data)
        if (result instanceof Promise) {
          // result.then(
          //   value => resolve(value),
          //   reason => reject(reason)
          // )
          result.then(resolve, reject)
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }

    if (self.state===FULFILLED) { 
      // 如果当前是成功的, 异步调用成功的回调, 并根据调用的结果更新返回的promise的状态
      setTimeout(() => {
        handle(onResolved)
      })
    } else if (self.state===REJECTED) {
      // 如果当前是失败的, 异步调用失败的回调, 并根据调用的结果更新返回的promise的状态
      setTimeout(() => {
        handle(onRejected)
      })
    } else {
      // 如果pending状态, 保存回调函数,等有结果后执行
      self.callbacks.push({
        // onResolved,
        // onRejected,
        onResolved (value) {
          handle(onResolved)
        },
        onRejected (reason) {
          handle(onRejected)
        }
      })
    }
  })
}

// const fn = 1
// const obj = {
//   fn () {
//     console.log(fn)
//   }
// }

/* 
指定失败的回调函数
返回值为一个新的promise
*/
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

/* 
创建并返回一个指定value的成功promise

*/
Promise.resolve = function (value) {

  // 如果value就是一个promise, 直接返回它
  if (value instanceof Promise) {
    return value
  }
  // 否则, 返回一个新的成功promise, 成功的值为value
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}

/* 
创建并返回一个指定reason的失败promise
*/
Promise.reject = function (reason) {
  // 返回一个新的失败的promise, 失败的结果值为reason
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

/* 
创建并返回一个延迟成功的promise
*/
Promise.resolveDelay = function (value, delay) {
  // 如果value就是一个promise, 直接返回它
  // if (value instanceof Promise) {
  //   return value
  // }
  // 否则, 返回一个新的成功promise, 成功的值为value
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value instanceof Promise) {
        // value.then(
        //   value => resolve(value),
        //   reason => reject(reason)
        // )
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    }, delay)
  })
} 

/* 
创建并返回一个延迟失败的promise
*/
Promise.rejectDelay = function (reason, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(reason)
    }, delay)
  })
} 

/* 
返回一个新的promise
只有当promises中所有promise都成功了, 返回的才成功, 
  value为promises中所有promise的value的数组
只要promises有一个失败的promise, 直接失败, 且reason是失败promise的reason
*/
Promise.all = function (promises) {

  // if (!Array.isArray(promises)) {
  //   throw new Error('必须指定个数组')
  // }

  // 用于保存已成功的p的个数
  let resolvedCount = 0
  // 用于保存已成功的p的value
  const values = []

  return new Promise((resolve, reject) => {
    // 遍历得到每个promise的结果状态
    promises.forEach((p, index) => {
      Promise.resolve(p).then(
        value => { // 只有当所有p都成功了, 那all返回的promise才成功, 且成功的结果为所有p的value组成的数组
          // 问题1: 我怎么知道都成功了?
          // 问题2: 我怎么才得得到所有的value?
          // values.push(value)  // 谁先成功, 谁先保存到数组中  不对
          values[index] = value  // value在数组中的位置与p在数组中的位置是对应的
          resolvedCount++
          if (resolvedCount===promises.length) {
            // 都成功了(当前是最后一个成功的) ==> all返回的promise变为成功, 且value为values
            resolve(values)
          }
        },
        reason => {  // 一旦p失败了, 那all返回的promise失败, 且失败的结果就是p的reason
          reject(reason)
        }
      )
    })
  })
}