require("module-alias/register")

var fs = require("fs")
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();
var options = {key: fs.readFileSync('./file.pem'),cert: fs.readFileSync('./file.crt')}
const server = require('https').Server(options,app)
var io = require('socket.io')(server)

//Route Handlers
var onConnection = require('@onConnection')
var uploadBase64 = require('@uploadBase64')
var uploadImage = require('@uploadImage')
var displayImage = require('@displayImage')

//Middlewares
var multerConf = require('@multerConf')


//Python process
var spawn = require('child_process').spawn
var py    = spawn('python', ['./utils/py/imaiBase64Stream.py'])

//Configuring app variable
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');

//Get Methods
app.get("/",(request,response)=>{console.log("Request recieved");response.render('home');});
app.get('/displayImage',displayImage)
app.get('/detectFromWebCam',(req,res)=>res.render('detectFromWebcam'))
app.get("/download",(req,res)=> response.download("./public/output.jpg"))


//Post Methods
app.post('/uploadImage',multer(multerConf).single('photo'),uploadImage)
app.post('/uploadBase64',(res,req)=>uploadBase64(res,req,py))   


//Socket Events
io.on('connection', (s)=>onConnection(s,py))



//Listener
server.listen(process.env.PORT || 3000 , (err)=>{
    if(err) throw err;
    console.log("Server Started in port " + 3000);
});