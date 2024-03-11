let Expense = require('../model/expense')

exports.getExpense =async(req,res,next)=>{
    try{
        const data= await Expense.findAll();
        res.status(200).json({details:data})
    }
    catch(err){
        res.status(500).json({message:'internal server error'})
    }
}

exports.addExpense = async(req,res,next)=>{
    try{
    let amount= req.body.num;
    let des = req.body.description;
    let catagory = req.body.catagory;

    console.log(amount);
    console.log(des);
    console.log(catagory)

    let data = await Expense.create({
        amount:amount,
        description:des,
        catagory:catagory
    })

    res.status(200).json({details:data})
}
catch(err){
    res.status(500).json({message:'internal server error'})
}
}

exports.deleteExpense =async (req,res,next)=>{

    try{
        if(!req.params.id){
            console.log('id not found')
            return res.status(400).json({message:'id is missing'})
        }
        let id = req.params.id;
        console.log(id)

    

    await Expense.destroy({where: {id : id}})

    res.status(200).json({message:'data deleted successfully'})
    }
    catch(err){
        res.status(500).json({message:'Somthing went wrong in deletetion'})
    }
}