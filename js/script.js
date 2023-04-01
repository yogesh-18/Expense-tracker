const balance = document.querySelector("#balance");
const inc_amt = document.querySelector("#inc-amt");
const exp_amt = document.querySelector("#exp-amt");
const trans = document.querySelector("#trans");
const form = document.querySelector("#form");
const description = document.querySelector("#desc");
const amount = document.querySelector("#amount");

// const dummydata = [
//     {id:1, description:"movie", amount:-200},
//     {id:2, description:"salary", amount:40000},
//     {id:3, description:"petrol", amount:-500},
//     {id:4, description:"food", amount:-1200}
// ];

// let transactions = dummydata;

const localStorageTrans = JSON.parse(localStorage.getItem("trans"));

let transactions = localStorage.getItem("trans")!=null?localStorageTrans:[];


function loadTransDetail(transaction){
    //console.log(transaction);
    const sign=transaction.amount>0?"+":"-";
    const item = document.createElement("li");
    item.classList.add(transaction.amount>0?"inc":"exp");
    item.innerHTML=`
      ${transaction.description}
      <span>${sign} ${Math.abs(transaction.amount)}</span>
      <button class="btn-del" onclick="removeTrans(${transaction.id})" >x</button>

    `;
    trans.appendChild(item);
}

function removeTrans(id){
    if(confirm("Are you sure to delete the transaction?")){
        transactions=transactions.filter((transaction)=>transaction.id!=id);
        config();
    }
    else{
        return;
    }
    updateLocalStorage();
}

function updateAmount(){
    const amounts=transactions.map(transaction=>transaction.amount);
    const total = amounts.reduce((acc,item)=>(acc+item),0).toFixed(2);
    balance.innerHTML=`₹ ${total}`;

    const income = amounts.filter((item)=> item>0).reduce((acc,item)=>(acc+item),0).toFixed(2);
    inc_amt.innerHTML=`₹ ${income}`;

    const expence = amounts.filter((item)=> item<0).reduce((acc,item)=>(acc+item),0).toFixed(2);
    
    exp_amt.innerHTML=`₹ ${expence}`;
}

function uniqueId(){
    return Math.floor(Math.random() * 1000000);
}


function addTransaction(e){
    e.preventDefault();
    if(description.value.trim()==""||amount.value.trim()==""){
        alert("Enter the description and amount");
    }
    else{
        const transaction = {
            id: uniqueId(),
            description: description.value,
            amount: +amount.value
        };
        transactions.push(transaction);
        loadTransDetail(transaction);
        description.value="";
        amount.value="";
        updateAmount();
        updateLocalStorage();
    }
}

form.addEventListener("submit",addTransaction);

function config(){ 
    trans.innerHTML="";
    transactions.forEach(loadTransDetail);
    updateAmount();
}

window.addEventListener("load",function(){
    config();
});

function updateLocalStorage(){
    localStorage.setItem("trans",JSON.stringify(transactions));
}
