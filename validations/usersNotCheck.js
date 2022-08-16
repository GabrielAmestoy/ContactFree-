module.exports = (req,res,next) => {
    if(req.session.userLogin !== undefined){
        next()
    }else{
        res.redirect('/')
    }
}