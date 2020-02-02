const express = require("express");
const app = express();
const client = require("./config/db");
const rootpath = require("./rootpath");

app.get("/", (req, res) => res.send("API is running"));


//init middleware
app.use(express.json({ extended: false }));

//routes
// app.use("/api/tools/",require("./routes/api/tools/numberTheory/index"));
// app.use("/api/toolsManage/create",require("./routes/api/toolsManage/create"))
app.use("/api/tools/",require("./routes/api/tools"));
app.use("/api/fields/",require("./routes/api/fields"));
app.use("/api/auth/",require("./routes/api/auth"));


//start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Create algorithms directory if not exist
// const path = rootpath+"/"
// if(rootpath)



