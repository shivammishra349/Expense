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
    let res= await axios.post('http://localhost:4444/user/expense',obj,{headers : {'Authorization' : token}})
    showData(res.data.details)
}

async function getData(){
    try{
    const token = localStorage.getItem('token')
    let res = await axios.get('http://localhost:4444/user/getexpense',{headers : {'Authorization' : token}})
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