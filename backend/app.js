let express=require('express')

let sequelize = require('./database/connection')

let user = require('./model/user')

let expense = require('./model/expense')

let order = require('./model/order')

const cors=require('cors');

let app=express();

let userRoute = require('./routes/user')

let expenseRoute =require('./routes/expense')

let purchaseRoute = require('./routes/premium')

let primumRoute = require('./routes/premiumfeatures')

app.use(cors());

app.use(express.json())

app.use('/user',userRoute)

app.use('/expense',expenseRoute)

app.use('/purchase' , purchaseRoute)

app.use('/premium' , primumRoute)

user.hasMany(expense)
expense.belongsTo(user)

user.hasMany(order)
order.belongsTo(user)


sequelize.sync()
    .then(()=>{
        app.listen(4444)
    })
    .catch((err)=>{
        console.log(err)
    })