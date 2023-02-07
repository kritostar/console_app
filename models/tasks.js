const colors = require('colors');
const Task = require('./task');
/**
 * _listado:
 *  {'uuidv4-23456765432:' {id:12, desc:asd,completedAt:323232}  }
 */

class Tasks{
    _list = {};

    get listArr (){
        const list = [];
        Object.keys(this._list).forEach( key => {
            list.push(this._list[key]);
        });
        return list;
    } 

    constructor(){
        this._list = {};
    }

    deleteTask(id = ''){
        if (this._list[id]){
            delete this._list[id];
        }
    }

    loadTasksFromFile (tasks = []){
        tasks.forEach(task => {
            this._list[task.id] = task;
            
        });
        console.log(this._list);
        
    }

    createTask(desc = ''){

        const task = new Task(desc);
        this._list[task.id] = task;
    }

    completeList (){
        
        console.log();
        this.listArr.forEach( (task, i) => {

            const idx = `${i + 1}`.green;
            const {desc, completedAt} = task;
            const status = (completedAt)
                ? 'Completed'.green 
                : 'Pending'.red;
            console.log(`${idx} ${desc} :: ${status}`);

        });
       
    }

    listPendingCompleted ( completed = true ){
        console.log();
        let idx = 0;
        this.listArr.forEach( task => {

            const {desc, completedAt} = task;
            const status = (completedAt)
                    ? 'Completed'.green 
                    : 'Pending'.red;

            if (completed){
                if (completedAt) {
                    idx += 1;
                    console.log(`${ (idx + '.').green} ${desc} :: ${completedAt.green}`)
                }
            } else {
                if (!completedAt) {
                    idx += 1;
                    console.log(`${(idx + '.').green} ${desc} :: ${status}`)
                }
            }
        });
    }

    toggleTasks(ids = []){
        ids.forEach( id => {

            const task = this._list[id];
            if (!task.completedAt) {
                  task.completedAt = new Date().toISOString();  
            }
        });

        this.listArr.forEach(task =>{
            if (!ids.includes(task.id)){
                this._list[task.id].completedAt = null;
            }
        })
    }
}

module.exports = Tasks;