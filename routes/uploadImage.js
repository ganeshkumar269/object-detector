module.exports = (request,response)=>{
    const spawn = require("child_process").spawn
    var py = spawn("python",["./utils/py/imai.py"])
    var count = 0
    py.stdout.on('data',(data)=>{count = data.toString();console.log("uploadImage.js: ",count)})
    py.stdout.on('end',()=>response.redirect('/displayImage?count='+count))
    py.stderr.on('data',(data)=>console.log(data.toString()))
}