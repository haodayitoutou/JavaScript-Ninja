# Secrets of JavaScript Ninja

## Chapter 3
函数是代码执行的主要模块化单元  
First-class object
* function literal
* as variable/array/object attribute
* as parameter
* return by function
* invoked

### 函数作用域
作用域是由function声明，而不是代码块。创建于代码块，但不终结于代码块；  
变量声明的作用域开始于声明的地方，结束于所在函数的结尾；  
命名函数的作用域：声明该函数的整个函数范围；  
函数可以在其作用域范围内提前被引用，变量不行；

### 函数调用
隐式参数  
1 arguments：类数组  
2 this：function context  
Java中的this依赖于函数的声明，JavaScript中的this依赖于函数的调用方式

|invoke         | context     |note  |
|---------------|-------------|------|
|as function    | window      |作为方法调用的一种特殊情况
|as method      | 方法的拥有者 |调用相同的函数，其函数上下文也会随着函数调用方式的变化而变化，而不是取决于函数是怎样声明的
|by constructor | 新创建的对象 |创建一个新对象并对其进行设置，然后将其作为构造器的返回值进行返回
|by apply/call  | 指定的上下文 |

构造器行为  
a 创建空对象  
b 空对象作为this传递给构造器，成为构造器的函数上下文  
c 如果没有显示的返回值，新创建的对象被返回  
构造器以大写字母开头  

apply(context, [arg1, arg2, ...])  
call(context, arg1, arg2, ...)  


## Chapter 4
内联函数inline function：给匿名函数取名字  
Note: 内联函数的名字只在自身函数内部可见，作用域仅限于声明它们的函数  
Q：为什么要将全局函数作为window的方法进行创建？  
A：不使用window的属性就无法引用这些函数  

callee：引用的是当前所执行的函数  

memoization: 记住先前计算的结果  
优势：性能好；发生在幕后；  
缺点：占内存；不'单一目的'；  

使用apply支持可变参数  
Math.min.apply(Math, array)  
此处将Math设为上下文并不是必须的  

函数的length属性：等于该函数声明时所需要传入的形参数量  
1 length: 声明时的形参数  
2 arguments.length: 调用时的实参数  

函数重载  
1 传入参数的类型  
2 检查特定参数是否存在  
3 传入参数的个数  
Note:  
1 重载只适用于不同数量的参数，但并不区分类型、参数名或其他东西  
2 有函数调用开销  

函数判断  
typeof fcn == "function"  
特例：  
Firefox：<object>元素上使用typeof返回function，而不是object  
IE：对iframe的不存在对象进行类型判断会返回unknown  
Safari：NodeList of DOM is considered function  


## Chapter 5
闭包：函数在创建时允许该函数访问并操作自身函数之外的变量时所创建的作用域  
闭包不仅包含函数声明，还包含了函数声明的那一时刻点上该作用域中的所有变量  
1 内部函数的参数是包含在闭包里的  
2 作用域之外的所有变量，即便是函数声明之后的那些声明，也都包含在闭包中  
3 相同的作用域内，尚未声明的变量不能进行提前引用

用途  
1 私有变量  
2 处理回调或使用计时器  
3 绑定函数上下文  
4 偏应用函数  
柯里化currying：在一个函数中首先填充几个参数（然后在返回一个新函数）的技术  
