
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');



// to load all event listeners of the elements
loadEventListeners();

function loadEventListeners(){

    // add task event
    form.addEventListener('submit',addTask);
    // remove task
    taskList.addEventListener('click',removeTask);
    // clear all tasks
    clearBtn.addEventListener('click', clearTasks);
    //Filter tasks
    filter.addEventListener('keyup',filterTasks);
    //DOM loding event
    document.addEventListener('DOMContentLoaded',getTasks)
}

// All Event Listners

// add Task
function addTask(e){   
    if(taskInput.value === '')
    {
        alert('Add a Task');
    }
 // create li element
const li = document.createElement('li');
// add class to li
li.className = 'collection-item';
// create text node and append to li
li.appendChild(document.createTextNode(taskInput.value));
// create new link element for the delete icon
const link = document.createElement('a');
link.className = 'delete-item secondary-content';
link.innerHTML = '<i class="fa fa-remove"></i>'
// append the new icon to the li
li.appendChild(link)
//append the li to the ul
taskList.appendChild(li)
// save in local storage
storeTaskInLocalStorage(taskInput.value);
taskInput.value = '';


    e.preventDefault();
}

// Remove Task
function removeTask(e){

    // When clicking the delete icon the <i> is returned not the <a>
    // and we need the a tag which is parent to i
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure you want to delete the task ?')){
        //remove the whole of <li> which is parent to <a>
        e.target.parentElement.parentElement.remove();
        // reomove frome local storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);

        }
    }
}

// Remove all tasks
function clearTasks(e){
    // option1
   //taskList.innerHTML = '';

   // faster option2
   while(taskList.firstChild)
   {
       taskList.removeChild(taskList.firstChild);

   }

   clearTasksFromLocalStorage();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
       const item = task.firstChild.textContent;
       // index of returns the index of the text in the item if found
       // if not found it returns -1
       if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block'
       }else{
            task.style.display = 'none'
       }
    })

}

// Store task in local storage
function storeTaskInLocalStorage(task){
    
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks))

}

// get tasks from local storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    

    tasks.forEach(function(task){

         
        const li = document.createElement('li');        
        li.className = 'collection-item';        
        li.appendChild(document.createTextNode(task));        
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>'       
        li.appendChild(link)      
        taskList.appendChild(li)
       

    });

}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    
    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1)
        }
    });
localStorage.setItem('tasks',JSON.stringify(tasks))
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}