## async与await

- 是异步编程的终极解决方案  ==> 消灭回调函数
- 用于简化promise对象的使用 ==> 不再需要通过then/catch来指定成功/失败的回调
- 哪里使用await?  promise表达式的左侧  ===> 直接在左侧接收异步成功的结果
- 哪里使用async?  await表达式所在函数定义的左侧

- async函数的返回值是一个promise对象,  它的结果状态由函数体执行的结果决定
- await 右侧一般是promise对象, 但也可以不是, 如果不是, await立即返回原值(相当于没有await)



## JS单线程异步的原理

- JS是单线程执行(都是在JS线程上执行)
- JS回调函数可以异步执行
- JS单线程异步的实现原理:  JS事件循环机制
- 事件循环机制的2个重要组成部分
  - 在其它线程执行的管理模块
  - 用于存储待执行回调(任务)的队列(数组)
- 在其它线程执行的管理?
  - 定时器的
  - dom事件监听的
  - ajax请求
- 2个回调/任务队列
  - 宏队列: [宏任务1, 宏任务2]
    - 定时器的
    - dom事件监听的
    - ajax请求的
  - 微队列: [微任务1, 微任务2]
    - Promise ==> async/await(本质Promise)
- JS引擎执行代码的基本顺序
  - 先执行完所有的初始化同步调用
  - 再依次取出回调队列中所有回调执行
- 2个队列中任务的执行顺序
  - 在取出第一个宏任务执行前, 必须先依次取出所有的微任务执行完
- Promise相关执行顺序的2个重要点
  - 如果promise对象是pending状态, 那不会将成功/失败的回调放入回调队列
  - 如果then指定的回调函数还没有执行完, then返回的promise就还是pending状态

## 自定义/手写Promise

### 1. 定义整体语法结构

- Promise(executor)
- Promise.prototype.then(onResolved, onRejected)
- Promise.prototype.catch(onRejected)
- Promise.resolve(value)
- Promise.reject(reason)
- Promise.all(promises)

### 2. 构造函数

- 给promise对象添加内部的3个属性

  - state: 状态, 初始值为pending, 后面可以改为fulfilled/rejected

  - data: 结果数据, 初始为undefined, 后面可以变为成功的value或失败的reason

  - callbacks: 用于存储待执行的回调函数的数组

    [

       {onResolved: value => {}, onRejected: reson => {}}

       {onResolved: value => {}, onRejected: reson => {}}

     ]

- 定义resolve和reject函数
  - resolve函数
    - 将state改为成功的状态
    - 将value保存到data
    - 异步执行callbacks中所有待执行的成功的回调函数
  - reject函数
    - 将state改为失败的状态
    - 将reason保存到data
    - 异步执行callbacks中所有待执行的失败的回调函数
- 立即同步执行executor函数, 并传入resolve和reject函数



### then方法

- 直接将成功的回调和失败的回调保存到promise对象内部的callbacks中