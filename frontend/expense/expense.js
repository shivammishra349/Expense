


async function fun(event){
    event.preventDefault();
    let amount=event.target.num.value;
    let description=event.target.description.value;
    let catagory=event.target.expense.value

    // console.log(num)

    let obj={
        amount,
        description,
        catagory
    }

    // console.log(obj.num)
    let token = localStorage.getItem('token')
    let res= await axios.post('http://localhost:4444/expense/addexpense',obj,{headers : {'Authorization' : token}})
    showData(res.data.expense)
}


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

async function getData(){
    try{
        let token = localStorage.getItem('token')
        let adminData = parseJwt(token)
        let ispremiumuser = adminData.ispremiumuser;
        if(ispremiumuser){
            isPremium()
        }
        
       
    let res = await axios.get('http://localhost:4444/expense/getexpense',{headers : {'Authorization' : token}})
    for(let i=0;i<res.data.details.length;i++){
        showData(res.data.details[i])
    }
    // console.log(res.data)
}
catch(err){
    console.log(err)
}
}
getData()





function showData(obj){
    
    let list = document.getElementById('data');
    let h2 = document.createElement('h2')
    // h2.textContent = 'My Expense'
    // list.appendChild(h2)

    let li=document.createElement('li')
    li.textContent = `${obj.amount} - ${obj.description} - ${obj.catagory}`

    let deleteBut=document.createElement('input')
    deleteBut.type='button';
    deleteBut.value='delete';


    li.appendChild(deleteBut)
    list.appendChild(li)


    deleteBut.addEventListener('click',deleteExpense)

   async function deleteExpense(){

        try{
            let token = localStorage.getItem('token')
           await axios.delete(`http://localhost:4444/expense/deleteExpense/${obj.id}`, {headers : {'Authorization ' : token}})
            list.removeChild(li)
        }
        catch(err){
            console.log(err)
        }

    }
}

document.getElementById('premium').onclick = async function(e) {
    const token = localStorage.getItem('token')
    let res= await axios.get('http://localhost:4444/purchase/getpremium', {headers :{'Authorization': token}})
            

    var options = {
        "key" : res.data.key_id,
        "order_id": res.data.order.id,

        "handler" : async function (res){
            try{
               
               const response= await axios.post('http://localhost:4444/purchase/updatetransaction',{
                order_id: options.order_id,
                payment_id: res.razorpay_payment_id,
            },{headers :{'Authorization' :token} })

            alert('you are a premium user now')
            isPremium()

            localStorage.setItem('token' , response.data.token)
   
            }
           catch(err){
            console.log(err)
           }
        },
    };


const rzp1 = new Razorpay(options);
rzp1.open();
e.preventDefault()

rzp1.on('payment.failed' ,async function(res){
    console.log('payment failed', res);
    const updateResponse = await axios.post('http://localhost:4444/purchase/updatetransaction',
    {
        order_id:options.order_id
    },{headers :{'Authorization' :token} })
    
    
})
}

function isPremium(){

    var elem = document.getElementById('premium');
    elem.style.visibility = 'hidden';

    var message = document.createElement('div');
    message.innerHTML = 'You are a premium user now:';
    message.style.display = 'inline-block';

    var button = document.createElement('input');
    button.type = 'button';
    button.value = 'Show Leaderboard';
    button.style.display = 'inline-block'; 

    var messageDiv = document.getElementById('message');
    messageDiv.innerHTML = ''; 
    messageDiv.appendChild(message);
    messageDiv.appendChild(button);


    button.onclick = async ()=>{
                const token = localStorage.getItem('token')
                const result = await axios.get('http://localhost:4444/premium/getfeature',{headers :{'Authorization' :token} })
                console.log(result)


                let leaderboard=document.getElementById('leaderboard')
                leaderboard.innerHTML += '<h1>Leader Board</h1>'

                result.data.forEach((details)=>{
                    leaderboard.innerHTML += `<li>Name :- ${details.name} , Total-Expensecost:- ${details.Total_cost}</li>`
                })
        }

        

}