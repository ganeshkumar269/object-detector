var fs = require('fs')

module.exports = (socket,py)=>{
    var saveImage = false
    console.log("onConnection.js:socket connection established")
    
    py.stdout.on('data', (data)=>{
        let jsonData = JSON.parse(data.toString().replace(/\'/g,'\"'))
        console.log("onConnection.js: Data Event Triggered, jsonData:",jsonData)
        socket.emit('dataAfterDetection',jsonData)
    })
    py.stdout.on('end', ()=>console.log("py.stdout: End Event Triggered , Connection has been ended"))
    py.stderr.on('data',(data)=>console.log("py.stderr: data Event ",data.toString()))

    socket.on('base64Data',(data)=>{
        var dataArrived = data.replace(/^data:image\/jpeg;base64,/, "")
        if(saveImage) fs.writeFile("thisisanimage.jpeg", dataArrived, 'base64', (err) =>console.log(err))
        console.log("base64Data socket request arrived ,data length:",data.length)
        py.stdin.write(dataArrived+"\n")
    })

    socket.on('hello',(data)=>{console.log("Socket Event Hello, Data: ",data)})
}