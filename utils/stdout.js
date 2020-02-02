const stdout = async (child)=>{
    return new Promise((resolve,reject)=>{
        child.stdout.on('data',(data)=>{
            resolve(data);
        })
        setTimeout(()=>{
            reject("timeout, failed to execute ...")
        },3000)
        
    })
}

module.exports = stdout;