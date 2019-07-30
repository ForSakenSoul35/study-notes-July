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