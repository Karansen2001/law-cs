const express = require("express");
const app = express();

const cookieParser = require("cookie-parser")
const cors = require("cors")
const database = require("./config/database")
const mailSender = require("./utils/mailSender")
const {contactUsEmail} = require("./mail/Request")
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

const dotenv = require("dotenv");
dotenv.config();
database.connect();

app.use(express.json())
app.use(cookieParser());
app.use(
    cors({
        origin:process.env.CLIENT
    })
)
app.post("/api/v1/request", (req, res) => {
    console.log("POST request to /api/v1/request received");
    const { fullname, email, tel } = req.body
    console.log("req body:",req.body)
    try{
      const emailRes = mailSender(
        process.env.RECIPIENT,
        "Legisconsulting just got a request!",
        contactUsEmail(fullname, email, tel)
      )
      console.log("Email Res ", emailRes)
      return res.status(200).json({
        success: true,
        message: "Request Email sent successfuly!"
      })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Failed to send request."
        })
    }
    }
)
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message:'Your server is up and running...'
    })
})
app.listen(PORT, ()=>{
    console.log(`App is running at ${PORT}`)
})