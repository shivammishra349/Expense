let User=require('../model/user')

exports.postData = async (req,res,next)=>{

    function isStringInvalid(string){
        if(string == undefined|| string.length === 0){
            return true
        }
        else
        {
            return false
        }
    }

    try{
        let name = req.body.name;
    let email=req.body.email;
    let password = req.body.password;

    console.log(name);
    console.log(email);
    console.log(password)

    if(isStringInvalid(name) ||isStringInvalid(email) || isStringInvalid(password))
    {
        return res.status(400).json({err:'Bad parameters . Somthing went wrong'})
    }

    let data = await User.create({
        name:name,
        email:email,
        password:password
    })

    res.status(201).json({massage:'user created successfully'})
    }
    catch(err){
        res.status(403).json({err})
    }
    
}
