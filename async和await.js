

/**
 * Generator和async-await的对比
 * 使用async-await的不同和好处
 */

 co(function* (){
     const r1 = yield readFilePromise('som1.json')
     console.log(r1)
 })
 /**
  * callback 方式
  */
 fs.readFile('1.json',(err,data)=>{
    fs.readFile('2.json',(err,data)=>{
        fs.readFile('3.json',(err,data)=>{
        //···
        })
    })
 })
 /**
  * promise方式
  */
readFilePromise('1.json').then(data=>{
    return readFilePromise('2.json')
}).then(data=>{
    return readFilePromise('3.json')
}).then(data=>{
    return readFilePromise('4.json')
})
  /**
  * Generator 方式
  */
 co(function* () {
     const r1= yield readFilePromise('1.json')
     const r2= yield readFilePromise('2.json')
     const r3= yield readFilePromise('3.json')

 })
 /**
  * async await 方式
  */
 const readFileAsync = async function () {
    const f1 = await readFilePromise('data1.json')
    const f2 = await readFilePromise('data2.json')
    const f3 = await readFilePromise('data3.json')
    const f4 = await readFilePromise('data4.json')
}
 