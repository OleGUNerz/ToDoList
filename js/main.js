var text2 = document.querySelector('#exampleDataList');
var data = document.querySelector('#data');
var loggle = document.getElementById('free');
var btnSet = document.querySelector('#set');
var btnRes = document.querySelector('#res');
var del = document.querySelectorAll('#del');
var itemBox = document.querySelector('.item_box');
var checkI = document.querySelector('.item-block');
var changeBtn = document.querySelector('.changeBtn');
var btnOnOff = document.getElementById('changeBtn');
var change_box = document.querySelector('.change_box');
var jobCh = document.getElementById('jobCh');
var timeCh = document.getElementById('timeCh');
var saveCh = document.getElementById('saveCh');
var snoCh = document.getElementById('noCh');
var done_block = document.querySelector('.item-blockDone');
var done_box = document.querySelector('.done_box');
var loStorage = /** @class */ (function () {
    function loStorage(cacheKey) {
        this.cacheKey = cacheKey;
    }
    loStorage.prototype.get = function (idTask) {
        var item = localStorage.getItem(this.cacheKey);
        if (item == undefined) {
            item = '[]';
        }
        var getted = JSON.parse(item);
        for (var _i = 0, getted_1 = getted; _i < getted_1.length; _i++) {
            var i = getted_1[_i];
            if (i.id == idTask) {
                return i;
            }
        }
        return null;
    };
    loStorage.prototype.save = function (task) {
        var item = localStorage.getItem(this.cacheKey);
        if (item == undefined) {
            item = '[]';
        }
        var locSPac = JSON.parse(item);
        locSPac.push(task);
        localStorage.setItem(this.cacheKey, JSON.stringify(locSPac));
    };
    loStorage.prototype.remove = function (idTask) {
        var item = localStorage.getItem(this.cacheKey);
        if (item == undefined) {
            item = '[]';
        }
        var locSPac = JSON.parse(item);
        for (var i = 0; i < locSPac.length; i++) {
            if (locSPac[i].id == idTask) {
                locSPac.splice(i, 1);
                localStorage.setItem(this.cacheKey, JSON.stringify(locSPac));
            }
        }
    };
    loStorage.prototype.getAll = function () {
        var item = localStorage.getItem(this.cacheKey);
        if (item == undefined) {
            item = '[]';
        }
        var tasks = JSON.parse(item);
        var arr = [];
        for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
            var i = tasks_1[_i];
            var task = new Task(i.id, i.text, i.data, i.free, i.done);
            arr.push(task);
        }
        return arr;
    };
    return loStorage;
}());
var ne = new loStorage('tasks');
var Task = /** @class */ (function () {
    function Task(id, text1, data1, free1, done1) {
        this.id = id;
        this.text = text1;
        this.data = data1;
        this.free = free1;
        this.done = false;
    }
    ;
    return Task;
}());
;
var TaskFactory = /** @class */ (function () {
    function TaskFactory() {
    }
    TaskFactory.prototype.create = function (text, data, free, done) {
        var taskId = Math.random().toString(36);
        var creation = new Task(taskId, text, data, free, done);
        return creation;
    };
    ;
    return TaskFactory;
}());
;
var mo = new TaskFactory;
