# 数据类型

## 基础类型

undefine、Null、Boolean、Number、String、Symbol、BigInt

## 引用类型

Object

在 `Object` 里面包含：function、Array、Date、Math、RegExp

# 强制转换

## Number()

![画板](http://oss.snailuu.cn/picgo/1732171080271-990e1b61-8cc6-453d-a8a1-8c7145eb52f4.jpeg)

## Object

对象在转换的时候会先调用内置的 `Symbol.toPrimitive` 函数，有重写该方法的时候优先级最高，接着就是走下面的流程：

- 调用 `xxx.valueOf()`，如果转换后是基础类型，返回
- 调用 `xxx.toString()`，如果转换后是基础类型，返回
- 报错

```javascript
const obj2 = {
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') {
      return 10;
    }
    if (hint === 'string') {
      return 'hello';
    }
    return true;
  },
};
console.log(+obj2); // 10  — hint 参数值是 "number"
console.log(`${obj2}`); // "hello"   — hint 参数值是 "string"
console.log(`${obj2}`); // "true"    — hint 参数值是 "default"
```

> 在上面提及到的 `hint` 参数是一个字符串，它的属性值可以是'number'、'string'、'default' 其中的一种，对象根据这个不同的属性值进行原始值的转换。

# 隐式转换

![画板](http://oss.snailuu.cn/picgo/1732169902809-a0ec7e18-7974-452c-b4b4-1ea623ff033a.jpeg)

```javascript
console.debug(1, undefined == false);
console.debug(2, undefined == true);
console.debug(3, undefined == null);
console.debug(4, undefined == !null);
console.debug(5, undefined == undefined);
console.debug(6, undefined == '');
console.debug(7, undefined == 0);
console.debug(8, undefined == 1);
console.debug(9, undefined == []);
console.debug(10, [] == !'');
console.debug(11, [] == '');
console.debug(12, [0] == '');
console.debug(13, [0] == true);
console.debug(14, [1] == true);
console.debug(15, [] == 0);
console.debug(16, [] == !0);
console.debug(17, null == true);
console.debug(18, null == false);
console.debug(19, null == null);
console.debug(20, !null == null);
console.debug(21, null == '');
console.debug(22, !'' == null);
console.debug(23, Number.NaN == Number.NaN);
console.debug(24, Number.NaN != Number.NaN);
console.debug(25, typeof Number.NaN == true);

/**
 * 隐式转换规则：
 * 判断双方类型是否一致
 *   T: 直接比较
 *   F:
 *     某一个为 null/undefined,另一个也为 null/undefined,则返回 true
 *     某一个为 Symbol 类型，则返回 false
 *     双方都是 string/number, 字符串转 number
 *     某一个为 boolean 类型，会先调用 Number() 方法
 *     某一个为 object 类型，会先调用 valueOf() 方法，返回的不是基础数据类型继续调用 toString() 方法
 *
 * 12.
 *  数组是 object 类型，另外一个是 string，会调用 toString() 方法将数组元素每一项用 , 拼接起来变成字符串
 *  [0].toString() 就会变成 '0'
 *  此时两边都是字符串就直接比较
 *
 * 13.
 *  有一个为 boolean 类型，会将两边强制转换成 Number()
 *  Number([0]) 会先调用 valueOf() 方法，但返回的是 [0], 不是基础数据类型，继续调用 toString() 方法返回 '0' 字符串
 *  Number('0') 就会变成 0, 而 Number(true) 会变成 1
 *
 * 14.
 *  跟13 一样,NUmber('1') 变成了 1
 *
 * 15.
 *  [] 是 object 类型而另外一个是 number，会调用 valueOf() 方法， 返回的是 [] 不是基础数据类型继续调用 toString() 方法返回 ''
 *  '' 转换成 number 会变成 0,
 *
 * 16.
 *  !0 会先经过 Boolean(0) 变成 false，取反就会变成 true
 *  Number([]) 会先调用 valueOf() 方法，返回的是 [] 不是基础数据类型继续调用 toString() 方法返回 ''
 *  Number('') 会变成 0，Number(true) 会变成 1
 *
 */

/**
 * 1 false
 * 2 false
 * 3 true
 * 4 false
 * 5 true
 * 6 false
 * 7 false
 * 8 false
 * 9 false
 * 10 false Number([]) == true -> 0 == 1
 * 11 true [].toString() == '' -> '' == ''
 * 12 false [0].toString() == '' -> '0' == ''
 * 13 false Number([0]) == true -> 0 == 1
 * 14 true Number([1]) == true -> 1 == 1
 * 15 true [].valueOf() == 0 -> 0 == 0
 * 16 false [].valueOf() == !0 -> 0 == 1
 * 17 false
 * 18 false
 * 19 true
 * 20 false
 * 21 false
 * 22 false
 * 23 false
 * 24 true NaN 不等于任何值
 * 25 false
 */
```

```javascript
const undefined = 1;
console.debug(1, undefined, window.undefined);
{
  console.debug(2, undefined, window.undefined);
  undefined = 2;
  console.debug(3, undefined, window.undefined);
  function undefined() {}
  console.debug(4, undefined, window.undefined);
}
console.debug(5, undefined, window.undefined);

/**
 * 1 undefined undeined
 * 2 function(){} undefined
 * 3 2 undefined
 * 4 2 undefined undefined
 * 5 undefined undefined
 */
```
