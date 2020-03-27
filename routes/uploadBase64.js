module.exports = (request,response)=>{
    let dataArrived = request.body.data
    console.log("uploadBase64 request arrived")
    var spawn = require('child_process').spawn,
        py    = spawn('python', ['./utils/py/imaiBase64.py'])  ///change the imaaiBase64.py
    var dataString

    py.stdout.on('data', (data)=>{
        var str = t.replace(/\'/g,'\"');
        dataString = JSON.parse(str.toString())
    });
    py.stdout.on('end', ()=>{
        console.log(dataString)
        response.json(dataString)
    });
    py.stdin.write(JSON.stringify(dataArrived));
    py.stdin.end();
}