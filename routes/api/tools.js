const express = require("express");
const router = express.Router();
const compile = require("../../utils/compile");
const run = require("../../utils/run");
const knex = require("./../../config/db");
const rootpath = require("./../../rootpath");
const inputOrder = require("./../../utils/inputOrder");
const getType = require("./../../utils/getType");
const fs = require("fs");
const stdout = require("../../utils/stdout");
const toolExist = require("../../utils/toolExist");
const auth = require("./../../middleware/auth");



//  @route  /api/tools/
//  @method GET
//  @desc   get tools

router.get("/", async (req, res) => {
  try {
    let tools = await knex("tools");
    for(key in tools){
      let {field_id,user_id} = tools[key];
      let field = await knex("field").where({field_id}).first();
      let user = await knex("users").where({user_id}).first();
      tools[key] = {
        tool: tools[key],
        user,
        field
      }
    }
    res.status(200).send(tools);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "server error" });
  }
});

//  @route  /api/:tool_id
//  @method GET
//  @desc   get tool by id

router.get("/:tool_id", async (req, res) => {
  try {
    let { tool_id } = req.params;
    let tool = await knex("tools")
      .where({ tool_id })
      .first();
    if (!tool) return res.send({ msg: "Tool not found" });

    const { field_id } = tool;
    //getting field
    const field = await knex("field")
      .where({ field_id })
      .first();
    //getting inputs
    const inputs = await knex("input")
      .where({ tool_id })
      .orderBy("input_order", "asc");
    tool = {
      ...tool,
      field,
      inputs
    };
    return res.send(tool);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "server error" });
  }
});

//  @route  /api/tools/:field_id
//  @method GET
//  @desc   get tools in field

router.get("/field/:field_id", async (req, res) => {
  try {
    let { field_id } = req.params;
    let tools = await knex("tools").where({ field_id });
    if (!tools) return res.send({ msg: "This field is empty" });
    const field = await knex("field")
      .where({ field_id })
      .first();
    tools = {
      tools,
      field
    };
    return res.send(tools);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "server error" });
  }
});

//  @route  /api/tools/user/:id
//  @method POST
//  @desc   get output by sending input

router.post("/use/:id", async (req, res) => {
  try {
    const { input } = req.body;
    console.log(input);
    const db_input = await knex("tools")
      .where({
        tool_id: req.params.id
      })
      .first();
    if (!db_input) {
      return res.status(400).send({ err: "Invalid tool id" });
    }
    const { tool_id, tool_name, field_id } = db_input;
    const { field_name } = await knex("field")
      .select("field_name")
      .where({ field_id })
      .first();

    //check if file
    if (!toolExist(field_name + "/" + tool_name)) {
      //delete the tool from the BD to synchronise
      knex("tools").delete({ tool_id });
      return res.status(400).send({ err: "Tool not found in the server" });
    }

    //input verification
    const inputPattern = await knex("input").where({ tool_id });
    //console.log(input);
    let arrInput = input.replace("\n", " ").split(" ");
    if (arrInput.length !== inputPattern.length) {
      console.log("Invaild input");
      return res.status(400).send({ err: "Invalid input" });
    }
    inputPattern.sort(inputOrder);
    //convert string input to numbers
    for (key in arrInput) {
      let c = parseFloat(arrInput[key]);
      if (!isNaN(c)) {
        arrInput[key] = c;
      }
    }
    for (let i = 0; i < arrInput.length; i++) {
      let type = getType(arrInput[i]);
      console.log(type)
      if (type == null) return res.status(400).send({ err: "Invalid input" });
      if (type === "decimal" && type !== inputPattern[i].input_type) {
        console.log("walo");
        return res.status(400).send({
          err: `Invalid input ${i + 1}, expected ${
            inputPattern[i].input_type
          } found ${type}`
        });
      }
    }
    const child = await run(field_name + "/" + tool_name);
    child.stdin.write(input + "\n");
    const data = await stdout(child);
    console.log(data.toString())
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err: "timeout, failed to execute..." });
    console.log(err);
  }
});



//  @route  /api/tools/
//  @method POST
//  @desc   create tools
router.post("/", auth, async (req, res) => {
  // let tool_name,field_id,code,inputPattern;
  let { tool_name, field_id, code, input } = req.body;
  let {user_id} = req.user;
  const isToolExist = await knex("tools")
    .where({ tool_name })
    .first();
  if (isToolExist) {
    return res.status(401).send({ err: "Tool name already exist" });
  }
  const isFiledExist = await knex("field")
    .where({ field_id })
    .first();
  if (!isFiledExist) {
    return res.status(401).send({ err: "filed doesn't exist" });
  }
  
  //writing file in server
  const { field_name } = isFiledExist;
  const path =
    rootpath + "/algorithms/" + field_name + "/" + tool_name + ".cpp";
  try {
    fs.writeFileSync(path, code);
    await compile(field_name + "/" + tool_name);

    //writing records to DB
    let tool_id = await knex("tools")
      .returning("tool_id")
      .insert({
        tool_name,
        field_id,
        user_id
      });
    if (input && input.length !== 0) {
      for (line of input) {
        let { input_order, input_type } = line;
        if (input_type !== "integer" && input_type !== "decimal") {
          return res.status(400).send({ msg: "invalid input type" });
        }
        await knex("input").insert({
          input_order,
          input_type,
          tool_id: tool_id[0]
        });
      }
    }

    return res.send({ msg: "Tool compiled successfully" });
  } catch (err) {
    console.log(err);
    fs.unlinkSync(path);
    if(fs.existsSync(path.replace(".cpp",""))){
      fs.unlinkSync(path.replace(".cpp",""))
    }
    return res.status(500).send({ err: "failed to compile", log: err });
  }
});

module.exports = router;
