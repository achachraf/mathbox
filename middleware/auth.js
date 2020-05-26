const jwt = require("jsonwebtoken");
const config = require("config");


module.exports = (req,res,next)=>{
    //grab the token
    const token = req.header("x-auth-token");
    // console.log("headers :",req.headers)
    // console.log("the token is :"+token)
    //check if we have a token  !
    if(!token){
        return res.status(401).send({msg:"No token, Access denied"});
    }
    try{
        //decodign the token
        // console.log(token)
        const decode = jwt.verify(token,config.get("jwtSecret"));
        // console.log(decode)
        //passing token to the user object in the request
        req.user = decode.user;
        next();
    }
    catch(err){
        console.log(err)
        console.log(err.message);
        return res.status(401).send({msg:"Authentification failed"});
    }
    
}