## then方法

- then(onResolved, onReject): 指定成功和失败的回调返回一个新的promise
- 创建并返回一个新的promise对象
- 根据当前promise的状态, 对回调函数进行不同的处理
  - 如果是成功的, 异步调用成功的回调onResolved
  - 如果是失败的, 异步调用失败的回调onReject
  - 如果是未确定的, 将回调函数先保存到当前promise对象中
- 需要根据回调函数执行的结果来更新返回的promise的结果状态
  - 抛出错误   ==> 失败, 且失败的reason为抛出的错误
  - 返回promise对象 ==> 与它的结果一致
  - 返回非promise对象值  ==> 成功, 且成功的value为返回值
- 如果成功或失败的回调没有指定为函数, 需要默认指定一个函数
  - 成功回调: value => value
  - 失败回调: reason => {throw reason}



## catch方法

- catch(onRejected)
- 本质: then(null, onRejected)

## Promise.resolve方法

- Promise.resolve(value):
- 如果value是一个promise对象, 直接返回它
- 否则创建并返回一个新的成功promise(结果值为value)

## Promise.reject方法

- Promise.reject(reason)
- 创建并返回一个新的失败promise(结果值为reason)

## Promise.all方法

- Promise.all(promises)

- 创建并返回一个新的promise

- 遍历promises中的每个元素, 如果元素不是promise, 包装成promise对象

- 取出每个promise的结果值(可能是成功, 也可能是失败)

  - 如果失败了, 将返回的promise更新为失败状态, 且结果值为当前失败promise的reason

  - 如果成功了, 将成功的计数加1, 将成功的value保存的values数组

    只有当成功的数量等于了promises的长度==> 将返回promise更新为成功状态, 且结果值为values

## Promise.resolveDelay方法

- Promise.resolveDelay(value, delay)
- 通过定时器延迟resolve()

## Promise.rejectDelay方法

- Promise.rejectDelay(reason, delay)
- 通过定时器延迟reject()

