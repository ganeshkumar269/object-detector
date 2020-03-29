var i2b = require('image-to-base64')
module.exports = (request,response,py)=>{
    console.log("uploadImage.js: request Arrived")
    py.stdout.on('data',(data)=>{
        let count = data.toString() || 0
        console.log("uploadImage.js: count",count)
        response.redirect('/displayImage?count='+count)
    })
    py.stderr.on('data',(data)=>console.log(data.toString()))

    i2b("./public/input.jpg")
    .then(data=>{
        console.log("uploadImage.js: i2b promise resolved")
        py.stdin.write("retA\n")
        py.stdin.write(data+"\n")
    })
    .catch(err=>console.log("uploadImage.js: i2b promise error",err))
}