let express=require('express')

let sequelize = require('./database/connection')

let security=require('./model/user')

const cors=require('cors');

let app=express();

let userRoute = require('./routes/user')

app.use(cors());

app.use(express.json())

app.use(userRoute)

sequelize.sync({force:false})
    .then(()=>{
        app.listen(4444)
    })
    .catch((err)=>{
        console.log(err)
    })