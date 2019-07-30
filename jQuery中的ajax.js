/**
 * 1. 传统的 $.ajax
 * 2. 1.5版本之后的$.ajax
 * 3. 改进之后的好处
 * 4. 
 */
/**
 * 
 */
var ajax = $.ajax({
    url:'data.json',
    success: function(){
        console.log("success")
    },
    error: function (){
        console.log("error")
    }
})
console.log(ajax)
// 返回的是XHR对象

// 过了1.5版本之后的ajax，代码可以这么写了
var ajax = $.ajax('data.json')
ajax.done(function(){
    console.log("success1")
})
  .fail(function(){
      console.log("error")
  })
  .done(function(){
      console.log("success2")
  })
console.log(ajax)
// 返回一个deferred对象

/**
 * 1.5版本之前 返回的是一个XHR对象 这个对象不可能有done或者fail方法的
 * 1.5版本之后 返回的是一个deferred对象 这个对象有done和fail方法的 ，并且是等着请求返回之后再去调用的
 */
// 改进之后的好处
/**
 * 虽然JS是异步请求的代码 ，但是人的思维是同步的
 * 开发者总是寻求如何使用逻辑上看似同步的代码 来完成 JS的异步请求 
 */

 // 如何改变的  
 /**
  * jQuery 不能改变异步请求需要callback的本质，只不过是自己定义了一些特殊的API，并对异步操作的callback进行了封装而已
  */

  /**
   * jQuery deferred
   * 
   */

// 传统的异步操作
var wait = function(){
    var task = function(){
        console.log("执行完成")
    }
    setTimeout(task,2000)
}
wait()

//增加需求  需要在执行完成之后 进行更复杂的操作  没办法 都写在task函数中 因为可能更复杂的操作  导致task执行非常慢

// jQuery的解决方案 

function waitHandle() {
    var dtd = $.Defferred() // 创建一个deferred对象，一个deferred对象会有done fail和then方法
    var wait = function( dtd ){
        // 重新定义wait函数  
        // 1.要传入一个deferred对象 
        // 2. 当task函数(callback) 执行完成之后，要执行dtd.resolve() 告诉传入的deferred对象 代码成功执行了 
        // 3. 将这个deferred对象返回
        var task = function(){
            console.log("执行完成")
            dtd.resolve() // 表示异步请求已经完成
        }
        setTimeout(task,2000)
        return dtd // 一定要返回deferred对象
    }
    // 一定要有返回值   
    // 才能保证 能够链式调用
    // 返回wait(dtd) 的执行结果 
    // wait函数中 最终返回的是 一个deferred对象，因此 wait(dtd) 返回的就是dtd

    return wait(dtd)
}
/**
 * 怎么做的
 * deferred对象
 * deferred对象有几个方法  done,fail,resolve,rejected
 * done,fail 是被动触发  
 * resolve
 * rejected 是主动触发
 */



// 函数最终return wait(dtd) 即最终返回dtd对象 针对一个deferred对象  它有done，fail和then方法 还有reslove方法
var w = waitHandle()
w.then(function(){
    console.log(1)
},function(){
    console.log("error1")
}).then(function(){
    console.log(2)
},function(){
    console.log("error 2")
})

// return Promise
function waitHandle() {
    var dtd = $.Defferred() // 创建一个deferred对象，一个deferred对象会有done fail和then方法
    var wait = function( dtd ){
        // 重新定义wait函数  
        // 1.要传入一个deferred对象 
        // 2. 当task函数(callback) 执行完成之后，要执行dtd.resolve() 告诉传入的deferred对象 代码成功执行了 
        // 3. 将这个deferred对象返回
        var task = function(){
            console.log("执行完成")
            dtd.resolve() // 表示异步请求已经完成
        }
        setTimeout(task,2000)
        return dtd.promise() // 与上面的区别 是这一行 返回promise()  而不是deferred对象
    }
    // 一定要有返回值   
    // 才能保证 能够链式调用
    // 返回wait(dtd) 的执行结果 
    // wait函数中 最终返回的是 一个deferred对象，因此 wait(dtd) 返回的就是dtd

    return wait(dtd)
}
var w = waitHandle()//  经过上面的改动    这边接收的是一个promise对象
// 与deferred对象的区别就是 没有reslove/reject 这两组属性

