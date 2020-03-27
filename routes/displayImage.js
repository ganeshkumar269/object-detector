module.exports = (request,response)=>{
    console.log("display request recieved")
    var count = parseInt(request.query.count)
    console.log("Count in /displayImage : " + count)
    response.render("display",{name:"output.jpg",count:count})
}