const text = document.querySelector('#exampleDataList');
const data = document.querySelector('#data');
const loggle = document.getElementById('free');
const btnSet = document.querySelector('#set');
const btnRes = document.querySelector('#res');
const del = document.querySelectorAll('#del')
const itemBox = document.querySelector('.item_box');
const checkI = document.querySelector('.item-block');
const changeBtn = document.querySelector('.changeBtn');
const btnOnOff = document.getElementById('changeBtn');
const change_box = document.querySelector('.change_box');
const jobCh = document.getElementById('jobCh');
const timeCh = document.getElementById('timeCh');
const saveCh = document.getElementById('saveCh');
const snoCh = document.getElementById('noCh');
let storage;
let chIt;
let truCh;
let moviCh;

const boxNone = ()=>{
    if(storage.length == 0){
        checkI.classList.add("none");
    }else{
        checkI.classList.remove("none");
    }
}
!localStorage.items ? storage = [] : storage = JSON.parse(localStorage.getItem('items'));
boxNone();

function CreateItem(text, data, free){
    this.text = text;
    this.data = data;
    this.free = free;
};

const createItems = (element, index) => {
    return `
<div class="row" id="item">
    <div class="col-sm" id="job">${element.text}</div>
    <div class="col-sm" id="time">${element.data}</div>
    <div class="col-sm" id="free">${element.free ? 'свободен/на':'занят/та'}</div>
    <button onclick ='delItem(${index})' style="width: auto;" class="btn btn-primary" display: inline; id="del_item">удалить</button>
    <button onclick ='changeItem(${index})' style="width: auto;" class="btn btn-primary" display: inline; id="change_item">редактировать</button>
</div>
`
};

const addHTML = () => {
    itemBox.innerHTML = "";
    if (storage.length > 0){
        storage.forEach((item, index) => {
            itemBox.innerHTML += createItems(item, index);
        })
    
    }
}
addHTML();

const updateLocal = () => {
    localStorage.setItem('items', JSON.stringify(storage));
};

btnSet.addEventListener('click', ()=>{
    if(text.value){storage.push(new CreateItem(text.value, data.value, loggle.checked))
    updateLocal();
    addHTML();
    boxNone();
    text.value="";
    text.focus();
    }else{
        alert('Введите задачу')
    }
});
btnRes.addEventListener('click', ()=>{
    storage = [];
    updateLocal();
    addHTML();
    boxNone();
});

const delItem = (item) => {
    storage.splice(item, 1);
    console.log(item)
    updateLocal();
    addHTML();
    boxNone();
}

const changeItem = (index)=>{
    chIt = index;
    jobCh.value = storage[index].text;
    timeCh.value = storage[index].data;
    truCh = storage[index].free;
    moviCh = truCh;
    if(truCh){
        btnOnOff.classList.replace('redBtn', 'greenBtn');
        btnOnOff.innerText = 'Свободен/дна';
    }else{
        btnOnOff.classList.replace('greenBtn', 'redBtn');
        btnOnOff.innerText = 'Занят/та';
    }
    change_box.classList.remove('none');
    
}
snoCh.addEventListener('click', ()=>{
    change_box.classList.add('none');
})

saveCh.addEventListener('click', ()=>{
   
    storage[chIt].text = jobCh.value;
    storage[chIt].data = timeCh.value;
    storage[chIt].free = truCh;
    change_box.classList.add('none')
    updateLocal();
    addHTML();
}
)
btnOnOff.addEventListener("click", ()=>{
    if(moviCh){
        btnOnOff.classList.replace('greenBtn', 'redBtn');
        btnOnOff.innerText = 'Занят/та';
        moviCh = false;
    }else{
        btnOnOff.classList.replace('redBtn', 'greenBtn');
        btnOnOff.innerText = 'Свободен/дна';
        moviCh = true;
    }
    truCh=moviCh;
});
