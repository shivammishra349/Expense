async function add(event){
    event.preventDefault();
    let name=event.target.name.value;
    let email=event.target.email.value;
    let password=event.target.password.value;

    console.log(name);
    console.log(email);
    console.log(password)

    let obj={
        name,
        email,
        password
    }
    
    try{ 
        let res=await axios.post('http://localhost:4444/user/signup',obj)
        console.log(res.data.userdetail)
}
    catch(err){
        document.body.innerHTML +=`<div style="color:red">${err}</div>`
    }
}

