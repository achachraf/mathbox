const knex = require("knex")({
    client :'pg',
    connection:{
        host: 'localhost',
        user: 'achraf', 
        password: '123456',
        database: 'mathbox'
    }
})

//testing if database connected
knex.raw("select 1+1 as result")
    .then(()=>console.log("POSTGRESQL DATABASE IS CONNECTED"))
    .catch((err)=>console.log(err))

module.exports = knex;

