## 类语法 

- 相关关键字: class / constructor / static / extends / super

- 代替构造函数, 定义类型, 从而可以创建这个类型的多个实例

- 优势: 编码更简洁, 语义化更好

- 使用

  ```js
  class Student extends Person {
      // 静态属性
      static xxx = 5
  	// 实例属性
  	yyy = 6
  	// 实例方法
  	zzz = function () {}
  
      // 构造器
      constructor (name, age, price) {
          super(name, age)
          this.price = price
      }
      // 定义原型对象上的方法
      foo () {}
  }
  ```

  

## 同步回调与异步回调

- 同步回调: 立即调用, 只有当回调函数执行完后整个任务才结束
  - 数组遍历相关回调
  - Promise的执行器函数
- 异步回调: 不会立即挪用 , 启动异步任务后立即向下执行, 后面某个时刻才执行回调函数
  - 定时器回调
  - dom事件监听回调
  - Promise的成功或失败的回调
  - ajax请求的回调

## 回调地狱

- 多层回调函数嵌套 ==> 回调地狱
- 为什么?   这种代码的可阅读性非常差
- 解决: 使用Promise的链式调用



## Promise的理解

- Promise是ES6提出的新的异步编程方式(以前是纯回调函数)
- 优势:
  - 可以解决回调地狱问题
  - 指定回调函数(用于得到异步结果数据)的时机更灵活, 可以在异步任务完后指定(以前的只能在完成前指定)  --暂时放着
- promise对象的3个状态
  - pending: 未确定的, 初始状态
  - fulfilled/resolved: 已成功的
  - rejected: 已失败
- promise对象的2种状态变化
  - pending  ==> fulfilled
  - pending ==> rejected
- promise对象只能发生1次状态改变
  - 要么是pending ==> fulfilled
  - 要么是pending ==> rejected
  - 改变后不可再改变

## Promise的使用

```js
new Promise((resolve, reject) => {
    // 启动异步任务
    setTimeout(() => {
        // 如果成功了
        resolve(1) // pending ==> filfilled
        // 如果失败了
        reject(2) // 状态不会有任何改变
    }, 1000)
}).then(
    value => {
        console.log('onResolved', value)
        throw 3
    },
    reason => {
        console.log('onRejected', reason)
    }
).catch(reason => {
    console.log('onRejected2', reason)
}).finally(() => {
    console.log('onFinally')
})

const p1 = Promise.resolve(4)
const p2 = Promise.reject(5)
const p3 = Promise.all([p1, p2])
```

- Promise(excuctor)
  - excuctor在Promise构造函数同步执行的回调
  - excuctor的结构: (resolve, reject) => {}
    - resolve函数: 将promise对象的状态改为fulfilled, 且指定成功的value
    - reject函数: 将promise对象的状态改为rejected, 且指定失败的reason
    - 函数体内: 执行异步任务, 如果成功调用resolve, 如果失败调用reject 
- Promise.prototype.then(onResolved, onRejected)
  - 指定成功和失败的回调, 并返回一个新的promise
  - onResolved: value => {}
  - onRejected: reason => {}
  - 这2个回调函数都是异步回调
- Promise.prototype.catch(onRejected)
  - 指定失败回调, 并返回一个新的promise
  - 是then(null, onRejected)的语法糖(简洁语法)
- Promise.prototype.finally(onFinally)
  - 指定成功或失败都会调用的回调
- Promise.resolve(value)
  - 创建并返回一个指定value的成功promise
- Promise.reject(reason)
  - 创建并返回一个指定reason的失败promise
- Promise.all(promises)
  - 返回一个新的promise
  - 只有当promises中所有的promise都成功了, 才成功, 且value为所有成功promise的value的数组
  - 只要promises中有一个promise失败, 直接失败, 且reason为失败的promise的reason



## then方法返回的promise的结果状态如何确定

- 简单表达:  由then()指定的回调函数执行的结果决定

- 详细表达: 4大情况
  - 如果抛出错误 ==> 失败, reason为抛出的错误
  - 如果返回失败的promise  ==> 失败, reason为失败promise的reason
  - 如果返回成功的promise  ==> 成功, value为成功promise的value
  - 返回其它值  ==> 成功, value为返回的值



```js
.then(
    value => {
        console.log('onResolved', value)
        // throw 3
        // return Promise.reject(4)
        // return Promise.resolve(5)
        return 其它值
    },
    reason => {
        console.log('onRejected', reason)
    }
)
```



## async与await

- 是异步编程的终极解决方案  ==> 消灭回调函数
- 用于简化promise对象的使用 ==> 不再需要通过then/catch来指定成功/失败的回调
- 哪里使用await?  promise表达式的左侧  ===> 直接在左侧接收异步成功的结果
- 哪里使用async?  await表达式所在函数定义的左侧