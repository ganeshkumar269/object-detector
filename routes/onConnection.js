


module.exports = (socket,py)=>{
    var saveImage = false
    console.log(__filename+" connection established")
    py.stdout.on('data', (data)=>{
        console.log("Data Event Triggered")
        var t = data.toString()
        var str = t.replace(/\'/g,'\"');
        var jsonData = JSON.parse(str.toString())
        console.log("jsonData:",jsonData)
        socket.emit('dataAfterDetection',jsonData)
    })
    py.stdout.on('end', ()=>console.log("Connection Has been ended"))
    py.stderr.on('data',(data)=>console.log("py.stderr data Event ",data.toString()))

    socket.on('base64Data',(data)=>{
        var dataArrived = data.replace(/^data:image\/jpeg;base64,/, "");
        if(saveImage)
            fs.writeFile("thisisanimage.jpeg", dataArrived, 'base64', (err) =>console.log(err));
        console.log("base64Data socket request arrived")
        console.log("data length:",data.length)
        
        py.stdin.write(dataArrived+"\n")
    })
    // socket.on('disconnect',()=>py.stdin.end())
    socket.on('hello',(data)=>{console.log("Socket Event Hello, Data: ",data)})
}