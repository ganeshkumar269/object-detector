require("module-alias/register")

var fs = require("fs")
var express = require('express');
var bodyParser = require('body-parser');
var options = {key: fs.readFileSync('./file.pem'),cert: fs.readFileSync('./file.crt')}
var multer = require('multer');
var app = express();
const server = require('https').Server(options,app)
var io = require('socket.io')(server)

//Route Handlers
var onConnection = require('@onConnection')
var uploadBase64 = require('@uploadBase64')
var multerConf = require('@multerConf')
var uploadImage = require('@uploadImage')
var displayImage = require('@displayImage')


//Configuring app variable
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');


app.get("/",(request,response)=>{console.log("Request recieved");response.render('home');});
app.get('/displayImage',displayImage)
app.get('/detectFromWebCam',(req,res)=>res.render('detectFromWebcam'))
app.get("/download",(req,res)=> response.download("./public/output.jpg"))

app.post('/uploadImage',multer(multerConf).single('photo'),uploadImage)
app.post('/uploadBase64',uploadBase64)   

let spawn = require('child_process').spawn
let py    = spawn('python', ['./utils/py/imaiBase64Stream.py'])

io.on('connection', (s)=>onConnection(s,py))

server.listen(process.env.PORT || 3000 , (err)=>{
    if(err) throw err;
    console.log("Server Started in port " + 3000);
});