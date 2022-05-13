const express = require('express')
const app = express()
// const bodyParser=require('body-parser');
const mainRoute=require("./routes/mainRoute")
const userRoute=require("./routes/userRoute")
const cors=require('cors');
const pool=require("./connection");

const port = 4000 || process.env.PORT

app.use(express.json());//for using req.body
app.use(cors());//for react and express connection
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}))

console.log("----->",pool)

// if(process.env.NODE_ENV){
// app.use(express.static('client/build'));
// }

// app.use(express.static('public'));
app.use("/apis/",mainRoute);
app.use("/apis/users",userRoute);


// LISTENING PORT
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/apis`)
})