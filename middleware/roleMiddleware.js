
module.exports = (allowedRole) =>{
return (req, res, next) =>{
    try{
        if(!req.user || !req.user.role){
            return res.status(403).json({message: "Unauthorized: no role found"});
        }
        if(req.user.role !== allowedRole){
           return res.status(403).send("Access was denied");
        }
        next();
    }catch(error){
        return res.status(500).json({message: "Server Error"});
     }
     console.log("Role in token:", req.user.role);
     console.log("Allowed role:", allowedRole);
    };
    
};