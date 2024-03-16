


async function fun(event){
    event.preventDefault();
    let num=event.target.num.value;
    let description=event.target.description.value;
    let catagory=event.target.expense.value

    // console.log(num)

    let obj={
        num,
        description,
        catagory
    }

    // console.log(obj.num)
    let token = localStorage.getItem('token')
    let res= await axios.post('http://localhost:4444/expense/expense',obj,{headers : {'Authorization' : token}})
    showData(res.data.details)
}

async function getData(){
    try{
    const token = localStorage.getItem('token')
    let res = await axios.get('http://localhost:4444/expense/getexpense',{headers : {'Authorization' : token}})
    for(let i=0;i<res.data.details.length;i++){
        showData(res.data.details[i])
    }
}
catch(err){
    console.log(err)
}
}
getData()





function showData(obj){
    
    let list = document.getElementById('data');

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
           await axios.delete(`http://localhost:4444/user/deleteExpense/${obj.id}`, {headers : {'Authorization ' : token}})
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
            console.log(res.data)

    var options = {
        "key" : res.data.key_id,
        "order_id": res.data.order.id,

        "handler" : async function (res){
            try{
               
                await axios.post('http://localhost:4444/purchase/updatetransaction',{
                order_id: options.order_id,
                payment_id: res.razorpay_payment_id,
            },{headers :{'Authorization' :token} })

            alert('you are a premium user now')
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