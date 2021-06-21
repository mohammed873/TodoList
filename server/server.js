const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: './.env' });
const db = require('./config/DB');

//requiring routes
const taskRouter = require('./routes/task')
const listRouter = require('./routes/list')

app.use(express.json())

// working with cors
app.use(cors())
//custum cors function
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,auth-token"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "*"
    );
    next();
});

//connecting to database
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("connected to database"));


app.use('/task', taskRouter)
app.use('/list', listRouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server is running on port ${port}`))