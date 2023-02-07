require('colors');

const Tasks = require('./models/tasks');
const { 
    inquirerMenu, 
    pause, 
    leerInput,
    listTasksDelete,
    listTasksComplete,
    confirm
} = require('./helpers/inquirer');

const { 
    saveDb,
    readDb,
} = require('./helpers/saveFile');

const colors = require('colors');


const main = async() => {

    let opt = '';
    const tasks = new Tasks();
    const tareasDb = readDb();

    if (tareasDb) {
        tasks.loadTasksFromFile(tareasDb);
    }

    do {
       opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Description:');
                tasks.createTask(desc);
                break;
            case '2':
                tasks.completeList();
                break;
            case '3':
                tasks.listPendingCompleted(true);
                break;
            case '4':
                tasks.listPendingCompleted(false);
                break;
            case '5':
                const ids = await listTasksComplete(tasks.listArr);
                tasks.toggleTasks(ids);
                break;
            case '6':
                const id = await listTasksDelete(tasks.listArr);
                if (id!=='0') {
                    const ok = await confirm('Are you sure?');
                    if (ok) {
                        tasks.deleteTask(id);
                        console.log('Task deleted succesfully');
                    }
                }
                break;
        }

        saveDb(tasks.listArr);

        await pause();

    } while ( opt !== '0' )
    

}

main();