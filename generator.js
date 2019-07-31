import { fstat } from "fs";

/** Generator 简介
 * 
 */
function* Hello(){
    yield 100
    yield (function(){ return 200})
    yield 300
}
var h = Hello()
h.next()

// 定义时 需要使用 function*  来和普通的函数 区分开
// 内部使用yield 标识
// 执行完 Hello()之后 内部的代码 不会马上执行 而是会处于一个暂停状态
// h.next()  会激活当前的暂停状态 开始执行Hello内部的状态   知道遇到yield语句，一旦遇到yield 会执行yidld之后的语句，然后又立即进入暂定状态
// 返回的值 是一个对象 {value:100,done:false}  value是第一个field返回的值 done:false 标识当前处于暂停状态 尚未执行结束 还可以往下执行
// done:true  表示执行结束 无法继续再往下执行了
// 如果继续调用next() 方法  会返回一个对象  {value:undefined,done:true}
// value会返回undefined

/**
 * 使用promise
 */
readFilePromise('some1.json').then(data=>{
    console.log(data)// 打印出第一个 data
    return readFilePromise('some2.json')
}).then(data=>{
    console.log(data)// 打印出第二个 data
    return readFilePromise('some3.json')
})

/**
 * 使用Generator
 */
function* getDta(){
    const data1 = yield readFilePromise('some1.json')
    console.log(data1)
    const data2 = yield readFilePromise('some2.json')
    console.log(data2)
}

/**
 * Iterator遍历器
 */
/**
 * Iterator对象 是一个指针对象  类似于单向链表的数据结构 通过next()将指针指向下一个节点 
 * 1. 简介Symbol数据类型
 * 2. 具有 [Symbol.iterator]属性的数据类型
 * 3. 生成Iterator对象
 * 4. Genrator返回的也是Iterator对象
 */

/**
 * 1. 简介Symbol数据类型
 * 是一个特殊的数据类型 和number，string并列
 * [Symbol.itearator]是一个特殊的数据类型 可以作为对象的属性key来使用
 */
/**
 * 
 * 在ES6中 具有 [Symbol.iterator]属性类型的有 数组  类似数组的对象 Set和Map
 * 特点  可以使用for..of 来遍历
 * iterator对象，那么就可以使用next()和for...of进行操作
 */
/**
 * Generator的具体应用
 * 1. next和yield参数传递
 * 2. for..of 的应用
 * 3. yield* 语句
 * 4. Generator中的this Generator 不是函数，更不是构造函数 Generator返回的是一个Iterator对象。
 */
/**
 * 1. next和yield参数传递
 * 方向1  yield->next  yield 会返回数据 返回的数据可以在next中接收
 * 方向2  next->yield 
 * 会停留在yield语句 
 * 有一个要点需要注意，就g.next('aaa')是将'aaa'传递给上一个已经执行完了的yield语句前面的变量
 * ，而不是即将执行的yield前面的变量。这句话要能看明白，看不明白就说明刚才的代码你还没看懂，继续看
 */


const thunk = function(fileName,codeType) {
    // 返回一个只接受callback参数的函数
    return function(callback) {
        fs.readFile(fileName,codeType,callback)
    }
}
const readFileThunk = thunk('data1.json','utf-8')
readFileThunk((data,err)=>{
    // ···
})