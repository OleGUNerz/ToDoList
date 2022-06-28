const text = document.querySelector('#text_form');
const data = document.querySelector('#data');
const loggle = document.getElementById('free');
const btnSet = document.querySelector('#set');
const itemBox = document.querySelector('.item-block');
const btnRes = document.querySelector('#res');
const storage =[];
let tootg;

const getItems = localStorage.getItem('doList');
const storItems = JSON.parse(getItems);
const renderPro = function(){
    for(const key in storItems){
        storItems[key];
        if (storItems[key].tog){
            tootg = "свободен"
        }else{
            tootg = "занят"
        }
        const doItem = `<div>
        <p>${storItems[key].str} - ${tootg} - ${storItems[key].date}</p>
        </div>`;
        itemBox.insertAdjacentHTML('beforeend', doItem);
        let i = {
            str: storItems[key].str,
            date: storItems[key].date,
            tog: storItems[key].tog,
        };
       storage.push(i);
    }

    
}


    btnSet.addEventListener('click', function(event){
        event.preventDefault();
       
        if(text.value){
        if(loggle.checked){
            togStat = 'свободен';
        } else{
            togStat = 'занят';
        }
        const doItem = 
        `<div>
        <p>${text.value} - ${togStat} - ${data.value}</p>
        </div>`;
        itemBox.insertAdjacentHTML('beforeend', doItem);
    } else{
            alert('Введите задачу.');
            return;
        }
        let i = {
            str: text.value,
            date: data.value,
            tog: loggle.checked,
        };
        storage.push(i);
        localStorage.setItem('doList', JSON.stringify(storage));
    });

    renderPro();
    btnRes.addEventListener('click', function(){
        localStorage.clear('doList');
        location.reload(); return false;
    });


