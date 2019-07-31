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

