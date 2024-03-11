async function add(event){
    event.preventDefault();
    let name=event.target.name.value;
    let email=event.target.email.value;
    let password=event.target.password.value;

    // console.log(name);
    // console.log(email);
    // console.log(password)

    let obj={
        name,
        email,
        password
    }
    
    try{ 
        let res=await axios.post('http://localhost:4444/user/signup',obj)
        alert('User registered successfully')
}
    catch(err){
        document.body.innerHTML +=`<div style="color:red">${err='This user allready registered'}</div>`
    }
}


async function log(event){
    event.preventDefault()
    let email=event.target.email.value;
    let password=event.target.pass.value;
    
    let obj={
        email,
        password
    }

    try{
        let val= await axios.post('http://localhost:4444/user/login',obj)
        // alert(val.data.message)
        window.location.href  = "./expense/expense.html"
    }
    catch(err){
        document.body.innerHTML +=`<div style="color:red">${err='email Id or password is incorrect'}</div>`
    
}
}
