


module.exports = (socket,py)=>{
    var saveImage = false
    console.log(__filename+" socket connection established")
    py.stdout.on('data', (data)=>{
        let jsonData = JSON.parse(data.toString().replace(/\'/g,'\"').toString())
        console.log("Data Event Triggered, jsonData:",jsonData)
        socket.emit('dataAfterDetection',jsonData)
    })
    py.stdout.on('end', ()=>console.log("Connection Has been ended"))
    py.stderr.on('data',(data)=>console.log("py.stderr data Event ",data.toString()))

    socket.on('base64Data',(data)=>{
        var dataArrived = data.replace(/^data:image\/jpeg;base64,/, "")
        if(saveImage) fs.writeFile("thisisanimage.jpeg", dataArrived, 'base64', (err) =>console.log(err));
        console.log("base64Data socket request arrived ,data length:",data.length)
        py.stdin.write(dataArrived+"\n")
    })
    // socket.on('disconnect',()=>py.stdin.end())
    socket.on('hello',(data)=>{console.log("Socket Event Hello, Data: ",data)})
}