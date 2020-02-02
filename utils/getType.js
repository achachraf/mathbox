const getType = (value)=>{
    if(typeof(value) === "number"){
        if(Math.floor(value) === value){
            return "integer";
        }else{
            return "decimal"
        }
    }else if(typeof(value) == "string"){
        return "string";
    }else{
        return null
    }
}

module.exports = getType;