const FPS = 0.1
Webcam.set({
        width:500,
        height:500,
        image_format:'jpeg',
        jpeg_quality:90
    })
Webcam.attach("#webcamAttachmentContainer")
const socket = io.connect("http://192.168.43.201:3000")
socket.on('dataAfterDetection',(data)=>{
    // image.src = `data:image/jpeg;base64,${data}`
    var img = document.getElementById('snapShotOuput')
    var canvasOutput = document.getElementById('canvasOutput');
    var ctx = canvasOutput.getContext('2d');
    ctx.drawImage(img,0,0)
    ctx.beginPath()
    data.forEach(el => {
        ctx.rect(el.box_points[0], 
        el.box_points[1], el.box_points[2], el.box_points[3])        
        ctx.stroke()
    });
    console.log("dataAfterDetection:",data)
})
function startDetection(){
    function processVideo(){
        let start = Date.now()
        Webcam.snap((dataUri)=>{
            console.log("data length:",dataUri.length)
            document.getElementById('snapShotOuput')
            .src = dataUri
            socket.emit('hello','Hello World')
            socket.emit('base64Data',dataUri)
            console.log("Snap Sent")
            delay = 1000/FPS - (Date.now() - start)
            setTimeout(processVideo,delay > 0 ? delay : 0)
        })
    }
    setTimeout(processVideo,10000)
}
Webcam.on('load',startDetection)