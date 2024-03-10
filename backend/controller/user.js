let User=require('../model/user')
let bcrypt =require('bcrypt')

function isStringInvalid(string){
    if(string == undefined|| string.length === 0){
        return true
    }
    else
    {
        return false
    }
}

exports.postSignup = async (req,res,next)=>{

    try{
    
    let name = req.body.name;
    let email=req.body.email;
    let password = req.body.password;

    if(isStringInvalid(name) ||isStringInvalid(email) || isStringInvalid(password))
    {
        return res.status(400).json({err:'Bad parameters . Somthing went wrong'})
    }

    bcrypt.hash(password ,10, async (err,hash)=>{
        console.log(err)
        await User.create({ name,email,password:hash })
        res.status(201).json({massage:'user created successfully'})
    })

    
    }
    catch(err){
        res.status(403).json({err})
    }
    
}


exports.postLogin= async(req,res,next)=>{
    try{
    let email = req.body.email;
    let password = req.body.password
    
    if(isStringInvalid(email) || isStringInvalid(password)){
        res.status(400).json({message:'email id or password is missing'})
    }

    let user= await User.findAll({
        where:{
            email:email,
            // password:password
        }
    })
    // console.log(user)
        if(user.length >0){ 
            bcrypt.compare(password, user[0].password,(err,result)=>{
                if(err){
                    res.status(500).json({success:false,message:'somthing went wrong'})
                }
                if(result === true){
                    res.status(200).json({success:true,message:'user logged successfully'})
                }
                else
                {
                    res.status(400).json({massege:'password is incorrect'})
                }
            })
           
        }
        else{
            res.status(404).json({success:false,message:'user does not exits'})
        }
    

   
}
catch(err){
    console.error(err)
    res.status(500).json({message:'internal server error'})
}
    
    
}