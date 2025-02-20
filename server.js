const express = require("express");
const app = express();
const cookie_parser = require("cookie-parser")
const cors = require("cors") 
const db = require("./Model/DB")
const env = require("dotenv");
const Logger = require("./middleware/logger")
const studentRouter = require("./Routes/studentRouter");
const wardenRouter = require("./Routes/wardenRouter");
const securityRouter = require("./Routes/securityRouter");
const adminPanel = require("./Routes/adminPanel");
const wardenModel = require("./Model/Schema/wardenModel");

// envoronment variable
env.config()

const PORT = process.env.PORT

// middleware
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookie_parser())

app.use(cors({
  credentials : true,
  methods : ['GET', 'POST', 'PUT'],
}))


// db connection
db()

app.use(Logger)
// Routes
app.use("/",studentRouter)
app.use("/warden",wardenRouter)
app.use("/security",securityRouter)
app.use("/admin",adminPanel)


app.listen(5000, () => {
  console.log(`http://localhost:${PORT}`);
});
