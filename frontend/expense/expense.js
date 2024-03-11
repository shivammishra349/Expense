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
    let res= await axios.post('http://localhost:4444/user/expense',obj)
    showData(res.data.details)
}

async function getData(){
    try{
    let res = await axios.get('http://localhost:4444/user/getexpense')
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
           await axios.delete(`http://localhost:4444/user/deleteExpense/${obj.id}`)
            list.removeChild(li)
        }
        catch(err){
            console.log(err)
        }

    }
}