const text2 = document.querySelector('#exampleDataList');
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
const done_block = document.querySelector('.item-blockDone');
const done_box = document.querySelector('.done_box');


interface IStorage{
    get(idTask: number): Task | null;
    save(task: Task): void;
    remove(idTask:string): void;
    getAll(): Array<Task>;
}

class loStorage implements IStorage{
    cacheKey:string
        constructor( cacheKey:string)
            {
                this.cacheKey = cacheKey
            }
    get(idTask: number): Task | null {
        let item = localStorage.getItem(this.cacheKey)
        if(item == undefined){
            item = '[]';
        }
      let getted = JSON.parse(item);
      for(let i of getted){
        if(i.id == idTask){
            return i
        }
      }
      return null
    }
    save(task: Task): void {
        let item = localStorage.getItem(this.cacheKey)
        if(item == undefined){
            item = '[]';
        }
            let locSPac = JSON.parse(item);
            locSPac.push(task)
            localStorage.setItem(this.cacheKey, JSON.stringify(locSPac))
        
       
    }
    
    remove(idTask:string): void {
        let item = localStorage.getItem(this.cacheKey)
        if(item == undefined){
            item = '[]';
        }
        let locSPac = JSON.parse(item)
        for(let i=0;  i<locSPac.length; i++){
            if(locSPac[i].id == idTask){
                locSPac.splice(i, 1)
                localStorage.setItem(this.cacheKey, JSON.stringify(locSPac))
        }
        }
    }
    getAll(): Array<Task>{
        let item = localStorage.getItem(this.cacheKey)
        if(item == undefined){
            item = '[]';
        }
            let tasks = JSON.parse(item)
            let arr = []
            for(let i of tasks){
                let task = new Task(i.id, i.text, i.data, i.free, i.done)
                arr.push(task)
            
            }
            return arr
        
    }
}




let ne = new loStorage('tasks')



class Task {
    id: string
    text: string
    data: number
    free: boolean
    done: boolean
        constructor( id: string, text1:string, data1: number, free1: boolean, done1: boolean){
            this.id = id;
            this.text = text1;
            this.data = data1;
            this.free = free1;
            this.done = false;
            
        };
};

class TaskFactory{
    create(text:string, data:number, free:boolean, done: boolean){
        let taskId = Math.random().toString(36)
        let creation = new Task(taskId, text, data, free, done);
        return creation;
    };
};
let mo = new TaskFactory;
