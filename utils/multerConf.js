var multer = require('multer');

module.exports = {
    storage : multer.diskStorage({
        destination : function(req,file,next){
            next(null,'./public/');
        },
        filename : (req,file,next)=>{
            console.log(file);
            var ext = file.mimetype.split('/')[1];
            fname = "input.jpg";
            next(null,fname);
        }
    }),
    fileFilter : (req,file,next)=>{
        if(!file) next();
        const image = file.mimetype.startsWith('image/');
        if(image) next(null,true);
        else next({message:"Not Supported File"},false);
    }
}