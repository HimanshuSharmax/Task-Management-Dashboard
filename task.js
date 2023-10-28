// Task data array to store tasks
let tasks = JSON.parse(localStorage.getItem('taskInfo')) || [];

// Completed task data array
let completedTasks = JSON.parse(localStorage.getItem('completedInfo')) || [];

// DOM elements
const taskForm = document.querySelector('.form');
const taskList = document.querySelector('.task-list');
const completedTaskList = document.querySelector('.completed-task-list');

// Event listener for form submission
taskForm.addEventListener('submit',(e) =>{
    e.preventDefault();

    const title = document.querySelector('.task-title').value;
    const description = document.querySelector('.task-description').value;
    const dueDate = document.querySelector('.task-due-date').value;

    if (title.trim() === '' || description.trim() === '' || new Date(dueDate) < new Date()) {
        alert('Please fill in all fields correctly or Enter valid future due date');
        return; 
    }

    const task = {
        title,
        description,
        dueDate,
        completed: false
    };

    tasks.push(task);
    taskForm.reset();
    localStorage.setItem('taskInfo', JSON.stringify(tasks));
    displayTasks();
    window.location.assign("./task-list.html")
});

// Function to display tasks
function displayTasks(){
    taskList.innerHTML = '';

    tasks.forEach((task,index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        taskItem.innerHTML = `
        <h3>YOUR TASK</h3>
            <div class="task-info">
                <h2>Title 🠚</h2>
                <p class="task-name">${task.title}</>
                <h2>Description 🠚</h2>
                <p>${task.description}</p>
            </div>
            
            <div class="extra-info">
                <h2>Due Date 🠚</h2> 
                <p> ${task.dueDate}</p>

                <div>
                <h2>Status 🠚</h2>
                    <input type="checkbox" id="task-completed-${index}" ${task.completed ? 'checked' : ''}>
                    <label for="task-completed-${index}">Completed</label>
                    
                    <input type="checkbox" id="task-completed-${index}" ${task.completed ? 'checked' : ''}>
                    <label for="task-completed-${index}">Not Completed</label>
                </div>
                
                <div class="info-buttons">
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            </div>
        `;

        taskList.appendChild(taskItem);

        //Event listner for checkbox change
        const checkbox = document.getElementById(`task-completed-${index}`);
        checkbox.addEventListener('change', () =>{
            tasks[index].completed = checkbox.checked;

            if(tasks[index].completed){
                // Move completed task to completedTasks array
                completedTasks.push(tasks[index]);
                tasks.splice(index, 1);
                localStorage.setItem('taskInfo', JSON.stringify(tasks));
                displayTasks();
                displayCompletedTasks();
            }
        });
    });
}

// Function to display completed tasks
function displayCompletedTasks(){
    completedTaskList.innerHTML = '';

    completedTasks.forEach((task,index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('completed-task-item');

        taskItem.innerHTML = `
            <div class="completed-info">
                <h3>${task.title}</h3>
                <p>Due Date: ${task.dueDate}</p>
            </div>
            <p>${task.description}</p>

            <div class="completed-delete">
                <button onclick="deleteCompletedTask(${index})">Delete</button>
            </div>
        `;

        completedTaskList.appendChild(taskItem);
    });

    localStorage.setItem('completedInfo', JSON.stringify(completedTasks));
}

// Function to edit a task
function editTask(index){
    const updatedTitle = prompt('Enter updated title:', tasks[index].title);
    const updatedDescription = prompt('Enter updated description:', tasks[index].description);
    const updatedDueDate = prompt('Enter updated due date:', tasks[index].dueDate);

    if (updatedTitle !== null && updatedDescription !== null && updatedDueDate !== null) {
        tasks[index].title = updatedTitle;
        tasks[index].description = updatedDescription;
        tasks[index].dueDate = updatedDueDate;

        localStorage.setItem('taskInfo', JSON.stringify(tasks));
        displayTasks();
    }
}

// Function to delete a task
function deleteTask(index){
    tasks.splice(index,1);
    localStorage.setItem('taskInfo', JSON.stringify(tasks));
    displayTasks();
}


// Initial display of tasks and completed task
displayTasks();

