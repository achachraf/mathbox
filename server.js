const express = require("express");
const app = express();
const client = require("./config/db");

app.get("/", (req, res) => res.send("API is running"));


//init middleware
app.use(express.json({ extended: false }));

//routes
// app.use("/api/tools/",require("./routes/api/tools/numberTheory/index"));
// app.use("/api/toolsManage/create",require("./routes/api/toolsManage/create"))
app.use("/api/tools/",require("./routes/api/tools"));


//start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));





