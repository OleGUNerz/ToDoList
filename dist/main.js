"use strict";
const form = document.querySelector('.form');
const text = document.querySelector('#text');
const data = document.querySelector('#date');
const check = document.querySelector('#check');
const popup = document.getElementById("popup");
const back = document.querySelector('.back');
const save = document.querySelector('.save');
let edText = document.querySelector('#edText');
let edDate = document.querySelector('#edDate');
let chEdit = document.querySelector('#chEdit');
const all = document.getElementById("all");
const dons = document.getElementById("dons");
const overdue = document.getElementById("overdue");
const not_ready = document.getElementById("not_ready");
function clear() {
    text.value = "";
    data.value = "";
    check.checked = false;
}
class loStorage {
    constructor(cacheKey) {
        this.cacheKey = cacheKey;
    }
    get(idTask) {
        let item = localStorage.getItem(this.cacheKey);
        if (item == undefined) {
            item = '[]';
        }
        let getted = JSON.parse(item);
        for (let i of getted) {
            if (i.id == idTask) {
                return new Task(i.id, i.text, i.data, i.free, i.done);
            }
        }
        return null;
    }
    save(task) {
        let item = localStorage.getItem(this.cacheKey);
        if (item == undefined) {
            item = '[]';
        }
        let locSPac = JSON.parse(item);
        if (locSPac.length !== 0) {
            console.log("Сохраено");
            for (let i = 0; i < locSPac.length; ++i) {
                if (locSPac[i].id == (task === null || task === void 0 ? void 0 : task.id)) {
                    locSPac[i] = task;
                    localStorage.setItem(this.cacheKey, JSON.stringify(locSPac));
                    return;
                }
            }
        }
        locSPac.push(task);
        localStorage.setItem(this.cacheKey, JSON.stringify(locSPac));
    }
    remove(idTask) {
        let item = localStorage.getItem(this.cacheKey);
        if (item == undefined) {
            item = '[]';
        }
        let locSPac = JSON.parse(item);
        for (let i = 0; i < locSPac.length; i++) {
            if (locSPac[i].id == idTask) {
                locSPac.splice(i, 1);
                localStorage.setItem(this.cacheKey, JSON.stringify(locSPac));
            }
        }
    }
    getAll() {
        let item = localStorage.getItem(this.cacheKey);
        if (item == undefined) {
            item = '[]';
        }
        let tasks = JSON.parse(item);
        let arr = [];
        for (let i of tasks) {
            const task = new Task(i.id, i.text, i.data, i.free, i.done);
            arr.push(task);
        }
        return arr;
    }
}
let ne = new loStorage('tasks');
class Task {
    constructor(id, text, data, free, done) {
        this.id = id;
        this.text = text;
        this.data = data;
        this.free = free;
        this.done = done;
    }
    ;
}
class TaskFactory {
    create(text, data, free, done) {
        let taskId = Math.random().toString(36);
        return new Task(taskId, text, data, free, done);
    }
    ;
}
let mo = new TaskFactory;
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (text.value) {
        if (!data.value) {
            const dat = new Date;
            const d = `${dat.getFullYear()}-${dat.getMonth() + 1}-${dat.getDate()}`;
            data.value = d.toString();
        }
        const t = mo.create(text.value, data.value, check.checked, false);
        ne.save(t);
        clear();
        renderTask(null);
    }
    else {
        alert("введи задачу");
    }
});
back.addEventListener("click", () => {
    if (popup) {
        popup.classList.add("none");
    }
});
function renderTask(tasks) {
    let collTask;
    if (tasks) {
        collTask = tasks;
    }
    else {
        collTask = ne.getAll();
    }
    let template = document.getElementById('template').innerHTML;
    document.getElementById('target').innerHTML = Mustache.render(template, { Task: (collTask) });
    let trFa = document.querySelectorAll('td');
    for (let i of trFa) {
        if (i.innerHTML == 'false') {
            i.innerHTML = "Занят/та";
        }
        else if (i.innerHTML == 'true') {
            i.innerHTML = "Свободен/а";
        }
    }
    const btnDel = document.querySelectorAll('.dell');
    const btnDone = document.querySelectorAll('.done');
    const btnEdit = document.querySelectorAll('.edit');
    for (let i of btnDel) {
        i.addEventListener('click', (e) => {
            if (confirm("Вы уверены?")) {
                ne.remove(e.target.id);
                renderTask(null);
            }
        });
    }
    for (let i of btnDone) {
        i.addEventListener('click', (e) => {
            doneTask(e.target.id);
            renderTask(null);
        });
    }
    for (let i of btnEdit) {
        i.addEventListener('click', (e) => {
            editTask(e.target.id);
            saves(e.target.id);
            renderTask(null);
        });
    }
}
renderTask(null);
function doneTask(id) {
    let locDone = ne.get(id);
    if (locDone) {
        locDone.done ? locDone.done = false : locDone.done = true;
    }
    ne.save(locDone);
    renderTask(null);
}
function saves(id) {
    const p = new Promise(function (resolve, reject) {
        save.addEventListener("click", () => {
            resolve(id);
        });
        back.addEventListener("click", () => {
            reject(id);
            return;
        });
    });
    p.then((id) => {
        let locTask = ne.get(id);
        locTask === null || locTask === void 0 ? void 0 : locTask.text = edText.value;
        locTask === null || locTask === void 0 ? void 0 : locTask.data = edDate.value;
        locTask === null || locTask === void 0 ? void 0 : locTask.free = chEdit.checked;
        if (edText.value !== "") {
            ne.save(locTask);
            if (popup) {
                popup.classList.add("none");
            }
            renderTask(null);
        }
        else {
            if (confirm("Вы хоте удалить пустую таску?")) {
                ne.remove(id);
                popup.classList.add("none");
                renderTask(null);
            }
            else {
                saves(id);
            }
        }
    }).catch((id) => console.error("Отмена редактирования таски: -", id));
}
function editTask(id) {
    let locTask = ne.get(id);
    if (popup) {
        popup.classList.remove("none");
    }
    edText.value = locTask === null || locTask === void 0 ? void 0 : locTask.text;
    edDate.value = locTask === null || locTask === void 0 ? void 0 : locTask.data;
    chEdit.checked = locTask === null || locTask === void 0 ? void 0 : locTask.free;
}
dons.addEventListener("click", () => {
    let locTask = ne.getAll();
    let done = [];
    for (let i = 0; i < locTask.length; ++i) {
        if (locTask[i].done == true) {
            done.push(locTask[i]);
        }
    }
    renderTask(done);
});
not_ready.addEventListener("click", () => {
    let locTask = ne.getAll();
    let done = [];
    for (let i = 0; i < locTask.length; ++i) {
        if (locTask[i].done !== true) {
            done.push(locTask[i]);
        }
    }
    renderTask(done);
});
overdue.addEventListener("click", () => {
    let locTask = ne.getAll();
    let done = [];
    let newDtae = new Date();
    const d = `${newDtae.getFullYear()}-${newDtae.getMonth() + 1}-${newDtae.getDate()}`;
    let nDate = Date.parse(d);
    for (let i = 0; i < locTask.length; ++i) {
        let data = Date.parse(locTask[i].data);
        if (nDate > data) {
            if (locTask[i].done !== true) {
                done.push(locTask[i]);
            }
        }
    }
    renderTask(done);
});
all.addEventListener("click", () => {
    renderTask(null);
});
