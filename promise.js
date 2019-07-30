console.log(Promise)
/**
 Promise 是什么
Promise 是一个构造函数 
    自己身上有 all,reject,resolve
    原型上有 then catch方法
 */
/**
 * 异步操作有哪些
 * 1. 网络请求
 * 2. 定时器
 * 3. 回调函数
 * 4. ···
 */
var p = new Promise(function(resolve,reject){
    // 做一些异步操作
    setTimeout(function(){
        console.log("执行完成")
        resolve("whatever data")
    },2000)
})
/**
 Promise的构造函数接收一个函数作为参数 并且传入两个参数 
 分别为 resolve reject 也是函数 表示回调函数
 分别表示异步操作成功时的回调函数 和 异步操作失败时的回调函数
  resolve是将Promise的状态 设置为 fullfilled 
  reject是将Promise的状态 设置为rejected 
 */


// 使用细节 一般在使用Promise的时候 会将Promise用一个函数包裹，在需要的时候去执行这个函数
function newPromise() {
    let p = new Promise(function(resolve,reject){
        // 做一些异步操作
        setTimeout(function(){
            console.log("执行完成")
            resolve("whatever data")
        },2000)
    })
    return p
}
newPromise()

// 在包装好的函数最后 会return出这个Promise对象  执行这个函数 得到了一个Promise对象

newPromise().then(function(data){
    console.log(data)
    // 后面可以继续进行操作

})
// newPromise()返回的Promise对象上调用then方法，then会接收一个函数作为参数，并且会拿到在newPromise()中调用resolve时传递给resolve()的参数

// 简单来说 Promise的作用就是  将原来的回调写法 分离出来，在异步操作 执行完后，用链式调用的方式 执行回调函数

// 下面是一般回调函数的写法
// 异步回调最常见的形式  就是Ajax了
var ajax = $.ajax({
    url:'/getMsg',
    type:'GET',
    dataType:'json',
    success:function(ret){
        if(ret && ret.status) {
            console.log(ret.status)
        }
    },
    error:function(xhr) {
        // 
    }
})

console.log(ajax)// 返回的是一个xhr对象 

/**
 链式操作的用法
 实质上 Promise的精髓是 状态 
 用维护状态 传递状态 的方式 来使得回调函数能够及时调用，
 */

 // reject的作用就是把Promise的状态设置为rejected 
 // 然后在then中就可以捕获到

function getNumber(){
    var p = new Promise(function(resolve,reject){
        // 异步操作
        setTimeout(function(){
            // 生成1到10 随机数
            var num = Math.ceil(Math.random()*10)
            if( num >5) {
                resolve(num)
            }else {
                reject("数字太大了")
            }

        },2000)
    })
    return p
}
getNumber().then(
    function(data) {
        console.log('reoslve')
        console.log(data)
    },
    function(reason,data) {
        console.log('rejected')
        console.log(reason)
    }
)
// 运行getNumber() 得到一个Promise对象 执行then方法
// then 方法接受两个参数 第一个对应resolve的回调 第二个对应reject的回调。

/**
 Promise除了then方法之外 还有catch方法
 用法： 和then的第二个参数一样 用来指定reject的回调

 */

getNumber().then(function(data){
    console.log("resolved")
    console.log(data)
}).catch(function(reason){
    console.log("rejected")
    console.log(reason)
})
/**
 * 为什么要使用catch
 在执行resolve的回调函数时，如果抛出异常了，代码出错了，那么并不会报错卡死js，而是会进到catch里面
 */

getNumber().then(function(data){
    console.log("resolved")
    console.log(data)
    console.log(somedata)// somedata 未定义  而且把错误传到了catch里面
}).catch(function(reason){
    console.log("rejected")
    console.log(reason)
})
/**
 * all的用法
 Promise的all方法  提供了 并行执行异步操作的能力  并且在所有异步操作执行完后才进行回调
 */
Promise
.all([getNumber1(),getNumber2(),getNumber3()])
.then(function(results){
    console.log(results)
})
// all 方法接收一个数组参数， 里面的值最终都返回给Promise对象 这样 三个异步操作是并行执行的，等他们都执行完 才会进到then里面
// 三个异步操作的数据 都在then里面，all会把所有异步操作的结果都放进一个数组中传给then 就是上面的results

/**
 * race的用法 
 * all方法的效果 实际上 是 谁跑得慢 以谁为准执行回调  
 * 相对的 就有一个方法 谁跑的快 以谁为准 执行回调
 * 这就是race方法 
 */
// race的使用场景 : 用race给某个请求设置超时时间，并且在超时后执行相应的操作
Promise
.race([requestImg(), timeout()])
.then(function(results){
    console.log(results);
})
.catch(function(reason){
    console.log(reason);
});
// requestImg() 是请求图片的操作  
// timeout()  设置请求超时之后 做的操作
















