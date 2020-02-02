const fs = require("fs");
const rootpath = require("../rootpath");

const toolExist = (program)=>{
    const basePath = rootpath+"/algorithms/";
    const file = basePath+program;
    return fs.existsSync(file);
}

module.exports = toolExist;