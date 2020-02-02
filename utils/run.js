const {spawn} = require("child_process");
const rootpath = require("../rootpath");
const compile = require("./compile");
const fs = require("fs")

const run = async (program)=>{
    try{
        const basePath = rootpath+"/algorithms/"
        const executable = basePath+program;
        if(fs.existsSync(executable)){
            return child = spawn(executable);
           
        }else{
            const source = executable+".cpp";
            console.log("executable not found, compiling source...")
            if(fs.existsSync(source)){
                await compile(program);
                console.log("source compile successfully...")
                return spawn(executable);
            }else{
                throw "Source source not found";
            }
        }
    }catch(err){
        console.log(err);
    }
    
}

module.exports = run;