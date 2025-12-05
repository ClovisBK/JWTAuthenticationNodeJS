
module.exports = (allowedRole) =>{
return (req, res, next) =>{
    try{
        if(!req.user || !req.user.role){
            return res.status(403).json({message: "Unauthorized: no role found"});
        }
        if(req.user.role !== allowedRole){
           return res.status(403).send("Access denied");
        }
        next();
    }catch(error){
        return res.status(500).json({message: "Server Error"});
     }
    };
};