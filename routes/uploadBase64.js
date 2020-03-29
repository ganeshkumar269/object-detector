module.exports = (request,response,py)=>{
    let data = request.body.data
    let dataArrived = data.replace(/^data:image\/jpeg;base64,/, "");

    console.log("uploadBase64 request arrived")
    var dataString
    py.stdout.on('data', (data)=>{
        console.log(__filename + " Data Event Triggered")
        dataString = JSON.parse(data.toString().replace(/\'/g,'\"').toString())
    });
    py.stdout.on('end', ()=>{
        console.log(__filename + " End Event Triggered")
        console.log("DataString:",dataString)
        response.json(dataString)
    });
    py.stdin.write(dataArrived+"\n");
    py.stdin.write('quit')
    py.stdin.end()
}