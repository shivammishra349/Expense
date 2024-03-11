let express=require('express')

let sequelize = require('./database/connection')

let user=require('./model/user')

let expense = require('./model/expense')

const cors=require('cors');

let app=express();

let userRoute = require('./routes/user')

let expenseRoute =require('./routes/expense')

app.use(cors());

app.use(express.json())

app.use(userRoute)

app.use(expenseRoute)

sequelize.sync({force:false})
    .then(()=>{
        app.listen(4444)
    })
    .catch((err)=>{
        console.log(err)
    })