const sequelize = require('../database/connection');
let Expense = require('../model/expense')
let User = require('../model/user')


exports.getExpense =async(req,res,next)=>{
    try{
        const data= await Expense.findAll({where : {userId: req.user.id}});
        res.status(200).json({details:data})
    }
    catch(err){
        res.status(500).json({message:'internal server error'})
    }
}

exports.addExpense =async (req,res,next)=>{

    const t= await sequelize.transaction()

    try{
    let amount= req.body.amount;
    let description = req.body.description;
    let catagory = req.body.catagory;
    let userId= req.user.id
    
    // console.log(des)

    if(amount ==undefined || amount.length ===0){
        return res.status(400).json({success:false , message :'parameter missing'})
    }

   let response = await  Expense.create({amount , description , catagory , userId},{transaction:t})

        // console.log('Existing Total_cost:', req.user.Total_cost);

        const total_expense= Number(req.user.Total_cost) + Number(amount);

       await User.update({
            Total_cost : total_expense,
            
        }, {
            where:{id : userId},
            transaction:t
        })
         await t.commit()
        res.status(200).json({expense:response})
    
    }
    catch(err){
        await t.rollback()
        res.status(500).json({success:false , error:err})
    }
}



exports.deleteExpense =async (req,res,next)=>{

    try{
        
        if(!req.params.id){
            console.log('id not found')
            return res.status(400).json({message:'id is missing'})
        }
        let id = req.params.id;
    

        const expense = await Expense.findByPk(id)
        const amount = expense.amount;



        await Expense.destroy({where: {id : id}})

        let user = await User.findByPk(expense.userId)
        const updateCost = Number(user.Total_cost) - Number(amount)

        await user.update({ Total_cost: updateCost });

    // await t.commit()
    res.status(200).json({message:'Data deleted succes'})
    }
    catch(err){
        // await t.rollback()
        res.status(500).json({message:'Somthing went wrong in deletetion'})
    }
}