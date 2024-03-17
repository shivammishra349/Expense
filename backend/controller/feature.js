let User = require('../model/user')

let Expense = require('../model/expense')

exports.getFeatures = async (req,res,next) =>{
    try{
        let user = await  User.findAll();
        let expense =await Expense.findAll()

        const AgreegateExpense = {}
        expense.forEach((expense)=>{
            if(AgreegateExpense[expense.userId]){
                AgreegateExpense[expense.userId] = AgreegateExpense[expense.userId] + expense.amount
            }
            else{
                AgreegateExpense[expense.userId] = expense.amount
            }
        })

        var userLeaderboardDetails = []
        user.forEach((user)=>{
            
            userLeaderboardDetails.push({name:user.name, total_cost:AgreegateExpense[user.id] || 0})
            
        })

        userLeaderboardDetails.sort((a, b) => b.total_cost - a.total_cost);
        console.log(userLeaderboardDetails)
        res.status(200).json(userLeaderboardDetails)
        
    }
    catch(err){
        res.status(500).json({message:'somthing went wrong'})
    }   
}