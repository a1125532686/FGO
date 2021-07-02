## ES6新特性

- let / const
- 解构赋值
- 字符串扩展
- 数值扩展
- 函数扩展
- 数组扩展
- 对象扩展
- 新增基本类型
- 新增容器数据结构
- 新增遍历方式
- 类语法
- Promise
- Generator
- async与await
- 模块化语法



## 解构赋值

- 解构对象: const {a, b, toString} = {a: 2, b: 3}
- 解构数组: const [c, d] = [3, 4]
- 解构不存在的是undefined, 可以指定解构变量的默认值
- 嵌套解构

## 字符串扩展

- 模板字符串: `xxxx${动态值表达式}yyyy`
- 方法扩展
  - includes()
  - startsWith()

## 数值扩展 (了解)

- 二/八进制写法
- 指数运算
- Math的新方法
- Number的新方法



## 函数扩展

- 箭头函数
  - 常用写法
    - a => a + 1
    - () => {}
    - (a, b) => {} 
  - 比较箭头函数与一般函数
    - this的问题: 箭头函数中没有this, 会沿着作用域链去外部找
    - 不能作为构造函数通过new调用创建实例
    - 没有arguments(可以通过rest参数实现同样效果)
- 形参默认值: (a,b='atguigu') => {}
- rest参数
  - (a, ...args) => {}     fn(2, 4, 5, 6)
  - (...args) => {}
  - const {a, ...args} = {a, b, c, d}   ==> args就是{b, c, d}

## 数组扩展

- 扩展运算符: [...arr1, ...arr2]

- Array的静态方法

  - Array.from(): 根据所有可迭代的对象生成数组
  - Array.of(): 将多个数据封装成功数组

- Array的实例方法

  - find(): 查找满足条件的元素

  - findIndex(): 查找满足条件的元素下标

  - includes(): 判断数组中是否包含某个元素

    

## 对象扩展

- 属性与方法的简写: {a, fn (){}}
- 对象的扩展运算: {..obj1, ...obj2}



## 新增基本类型

- Symbol: 用来定义一个唯一的标识名称 ===> 用做对象的属性名
- BigInt: 用来存储大整数(一般的整数有最大值的限制)



## 新增容器数据结构

- Map
  - 用来存储多个key-value键值对数据
  - key和value都可以是任意类型
  - size / set() / get() / delete() / clear() / has() / forEach()
- Set
  - 用来存储多个value值, 但value是不允许重复的   ==> 数组去重
  - size / add() / get() / delete() / clear() / has() / forEach()



新增遍历方式

- Iterator (纯了解)
- for...of
  - 可以遍历: 字符串 / 数组 / Set / Map / arguments / NodeList
  - 不可以遍历: object对象  (因为没有实现Iterator接口)
  - 本质: 只能遍历实现了Iterator接口的容器