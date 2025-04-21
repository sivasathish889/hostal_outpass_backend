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
const bodyParser = require("body-parser")
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// envoronment variable
env.config()

const PORT = process.env.PORT || 5000

// middleware
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookie_parser())
app.use(cors({
  credentials : true,
  methods : ['GET', 'POST', 'PUT','DELETE'],

}))


// db connection
db()

app.use(Logger)
// Routes
app.use("/",studentRouter)
app.use("/warden",wardenRouter)
app.use("/security",securityRouter)
app.use("/api/admin",adminPanel)

app.post("/api/notification", async (req, res) => {
  const { title, body ,token} = req.body;
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token : 'ekuf7ON4TiCf4OGuPNqdy6:APA91bFP6Ct9Dhn6gO8uSe4gVb39Dv1iqPRbSvCfV9jqYXW3p1Sw9oMBCKm-VR5C2VQ5qNbImeQ9b2DvcBnoCiRgiKsJPz4syT7GmFkAAfCHpsGzt-OO838'
  };
console.log(req.body)
  try {
    const response = await admin.messaging().send(message);
    console.log("Notification sent successfully:", response);
    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Failed to send notification" });
  }
}
)

app.listen(5000, () => {
  console.log(`server is running ${PORT}`);
});
