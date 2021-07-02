## ES5.1的新特性

- 严格模式
- JSON对象
- Object的扩展: 内个静态方法
- Array的扩展: 多个实例方法
- Function的扩展: 实例bind方法

## 严格模式

- 开启: 'use strict'
- 变化:
  - 给未定义的变量赋值, 不再是自动创建全局变量, 而是报错
  - 函数中的this不能再是window, 而是undefined
  - 多个形参不能同名

## JSON与JSON对象

- JSON: 有特定格式的字符串文本
  - json对象: {key1: value1, key2: value2}
  - json数组: [value1, value2]
  - key是string
  - value是string/number/boolean/null/[]/{}
- 比较json与xml
  - 更小
  - 解析或生成更快
- json与js对象/数组的相互转换: 使用JSON对象
  - js ==> json: JSON.stringify()
  - json ==> js: JSON.parse()

## Object的扩展: 内个静态方法

- 存取器属性

  get fullName () {return value}: 当读取属性值时自动调用, 将函数的返回值作为属性值, this是属性所属的对象

  set fullName (value){}: 当我们设置了新的属性值时自动调用, 用来监视属性值的变化, this是属性所属的对象

- Object.defineProperty(obj, name, 属性描述符对象): 添加/修改属性(可以定义一个更强大的属性)

  - get():  属性的getter, 用来得到动态的属性值
  - set(): 属性的setter, 用来监视属性值的变化
  - 
  - value: 指定初始值
  - writable: 指定属性值是否可以修改
  - configurable: 是否可以重新再定义这个属性
  - enumurable: 是否可以被遍历

- Object.create(protoObj):  创建一个指定对象的子对象

  - 返回的对象的隐式原型对象就是 protoObj
  - 返回的对象就自动拥有了protoObj的属性/方法

## Array的扩展: 多个实例方法

- forEach()
- indexOf() / lastIndex()
- some() / every()
- filter()
- map()
- reduce()

## Function的扩展: 实例bind方法

- 区别call方法与bind方法
  - call方法: 立即调用函数, 并指定函数的this为第一个参数对象  fn.call(obj)
  - bind方法: 不立即调用函数, 而是返回一个新函数, 当调用新函数时就会执行原函数, 且this是第一个参数对象      const fn2 = fn.bind(obj)  ==> fn2()

## Error的理解和使用

- 程序运行出问题, JS引擎会自动抛出错误(error对象)
- 我们在判断数据不满足功能需求时, 也可以手动抛出错误
- 如果程序抛出错误, 我们没有处理try..catch, 程序中断运行
- 如果出错后, 还想继续向下运行, 必须try...catch
- 几个常见的内置Error
  - ReferenceError: 引用错误
  - TypeError: 类型错误
  - syntaxError: 语法错误

## ES6的let与const

- let定义变量
- 区别let与var
  - 有块作用域
  - 没有声明提升: 提升了定义, 但没有初始化赋值 ==> 不能访问
  - 不能重复声明
  - 全局变量不会成为window的属性
- const定义常量
  - 常量本身不能修改, 但如果它指向的是对象, 对象内部可以修改
  - 具有let的所有特点

## 一些重要概念

- 方法与属性的关系
- 方法与函数
- 空对象和空数组
- 如何判断是否是回调函数的3个条件
- 回调函数需要确定的3个问题