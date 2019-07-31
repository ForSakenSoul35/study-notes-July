/**
 * ES6中promise的具体应用
 * 1. 准备工作
 * 2. 参数传递
 * 3. 异常捕获
 * 4. 串联多个异步操作
 * 5. promise.all()和promise.race()  用法
 */
// 1. 准备工作 
// 因为以下的代码都会使用到Promise 因此 先封装一个Promise 
const fs = require('fs')
const path = require('path')
const readFilePromised = function(fileName){
    return new Promise(function(resolve,reject){
        fs.readFile(fileName,(err,data)=>{
            if(err){
                reject(err) // 传递了参数
            } else {
                resolve(data) // 
            }
        })
    })
}
//2.参数传递
const fullFileName = path.resolve(_dirname,'../data/data2.json')
const result = readFilePromise(fullFileName)
result.then(function(data){
    console.log(data)
    return JSON.parse(data).a
}).then( a=>{
    console.log(a)
})
// 3. 异常捕获
// then会接收两个函数 作为参数  第一个 在 执行reslove后执行，第二个在执行reject之后触发  
//但是  很少用到第二个参数 
// 对于Promise中的异常处理 一般使用catch方法
result.then(function(data){
    console.log(data)
    
}).catch(err =>{
    console.log(err)
})

// 在一连串 then操作之后 一般会在最后跟一个.catch来捕获异常，而且执行reject的参数也会在catch中获取得到。
// 好处  ：
// 1. 代码更简洁 是一个串联的关系
// 2. 更像是 try catch的样子 更容易理解

// Promise 有一个疑问 就是  回调函数 中 书写 resolve 

const readFilePromise = function(fileName){
    return new Promise(function(resolve,reject){
        // 异步操作
        fs.readFile(fileName,(err,data)=>{
            if(err){
                console.log(err)
                reject(err)
            } else {
                console.log(data)
                resolve(data)
            }
        })
    })
}

// promise.all 
// promise.race
// 接收一些数组形式的promise
// Promise.race 接收一个包含多个 promise 对象的数组
Promise.race([result1, result2]).then(data => {
    // data 即最先执行完成的 promise 的返回值
    console.log(data)
})

// promise.reslove()
// 能够将thenanle对象转化为Promise对象
// thenable对象
const thenable = {
    then:(resolve,reject) =>{
        resolve(200)
    }
}
// thenable对象可以转化为Promise对象

/**
 * Promise/A+规范
 * Promise/A+是由CommandJS规定的异步模式编程规范。
 * 1. 规范的核心内容
 * 2. 状态变化
 * 3. then方法
 * 
 */
/**
 * 1. 核心内容
 * 关于状态：
 * promise可能有三个状态  等待 pending 已完成  fulfilled 已拒绝 rejected
 * promise的状态只能从等待变成 完成 或者  拒绝 不能逆向转变  完成状态 不能 转变成 拒绝 状态
 * 关于then方法 
 * promise必须实现then方法  同时then必须返回一个promise 同一个promise的可以调用多次  并且回调的执行顺序 与他们被定义时的顺序一致
 * then 接收两个参数 第一个是成功时的回调 在promise由pending转换为fuifilled时调用，第二个是失败的回调，由pending转化为rejected时调用
 */

 /**
  * 状态变化 
  * const result = readFilePromise(someFileName) 会返回一个promise对象
  * 刚刚创建时的状态 就是 等待状态
  * 如果读取文件成功了 readFilePromise函数中的callback就会自动调用resolve()  将状态转化为fuifilled 
  * 如果失败了 就会调用reject
  * 
  */

  /**
   * Promise 虽然改变了对于异步操作的写法  但是却改变不了 JS单线程 异步的执行模式
   * 
   * 
   */
  // promise 只是对异步操作代码可读性的一种变化 并没有改变JS异步执行的本质
  // promise并没有取代callback 反而promise中要使用callback 