module.exports = (request,response,py)=>{
    console.log(__filename+": request arrived")
    let data = request.body.data
    let dataArrived = data.replace(/^data:image\/jpeg;base64,/, "");

    console.log("uploadBase64 request arrived")
    py.stdout.on('data', (data)=>{
        console.log(__filename + " Data Event Triggered")
        let dataString = JSON.parse(data.toString().replace(/\'/g,'\"'))
        response.json(dataString)
    })
    py.stdout.on('end', ()=>{
        console.log(__filename + " End Event Triggered")
    })
    py.stderr.on('data',(err)=> console.log("uploadBase64.js:"," Error Event , err",err))
    py.stdin.write(dataArrived+"\n")
}