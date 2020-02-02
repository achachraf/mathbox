const express = require("express");
const router = express.Router();
const knex = require("./../../config/db");


//  @route  /api/fields
//  @method POST
//  @desc   get fields

router.get("/",async (req,res)=>{
    try {
        const fields = await knex("field");
        return res.send(fields);
    } catch (err) {
        console.log(err);
    }
})

//  @route  /api/fields
//  @method POST
//  @desc   get fields
router.get("/:field_id",async (req,res)=>{
    try {
        let {field_id} = req.params;
        const field = await knex("field").where({field_id}).first();
        if(!field) return res.status(400).send({err:"field not found"});
        return res.send(field);
    } catch (err) {
        console.log(err);
        return res.status(500).send({err: "server error"});
    }
})



module.exports = router;