const { exec, spawn } = require("child_process");
const { promisify } = require("util");
const rootpath = require("../rootpath");

const execAsync = promisify(exec);

const compile = async (program)=>{
  const basePath = rootpath+"/algorithms/"
  const path = basePath+program;
  const commande = "g++ -o " +path+ " " + path+".cpp";
  const {err,stdout,stderr} = await execAsync(commande);
  if(err) throw err;
  if(stderr) throw stderr;
}
module.exports = compile;

