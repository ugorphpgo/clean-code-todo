//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById('new-task') //Add a new task.
const addTaskButton = document.getElementsByTagName('button')[0] //first button
const toDoList = document.getElementById('incompleteTasks') //ul of #incompleteTasks
const completedList = document.getElementById('completed-tasks') //completed-tasks

//New task list item
const createTaskItem = function (taskText) {
    const taskItem = document.createElement('li')

    //input (checkbox)
    const checkBox = document.createElement('input') //checkbx
    //label
    const label = document.createElement('label') //label
    //input (text)
    const editInput = document.createElement('input') //text
    //button.edit
    const editButton = document.createElement('button') //edit button

    //button.delete
    const deleteButton = document.createElement('button') //delete button
    const deleteIcon = document.createElement('img') //delete button image

    label.innerText = taskText
    label.className = 'task'

    //Each elements, needs appending
    checkBox.type = 'checkbox'
    editInput.type = 'text'
    editInput.className = 'task'

    editButton.innerText = 'Edit' //innerText encodes special characters, HTML does not.
    editButton.className = 'edit'

    deleteButton.className = 'delete'
    deleteIcon.src = './remove.svg'
    deleteButton.appendChild(deleteIcon)

    //and appending.
    taskItem.appendChild(checkBox)
    taskItem.appendChild(label)
    taskItem.appendChild(editInput)
    taskItem.appendChild(editButton)
    taskItem.appendChild(deleteButton)
    return taskItem
}

const addTask = function () {
    //Create a new list item with the text from the #new-task:
    if (!newTaskInput.value) return
    const taskItem = createTaskItem(newTaskInput.value)

    //Append listItem to incompleteTaskHolder
    toDoList.appendChild(taskItem)
    bindTaskEvents(taskItem, moveTaskToCompleted)

    newTaskInput.value = ''
}

//Edit an existing task.

const editTask = function () {
    const taskItem = this.parentNode

    const editInput = taskItem.querySelector('input[type=text]')
    const label = taskItem.querySelector('label')
    const editButton = taskItem.querySelector('.edit')
    const isEditMode = taskItem.classList.contains('editMode')
    //If class of the parent is .editmode
    if (isEditMode) {
        //switch to .editmode
        //label becomes the inputs value.
        label.innerText = editInput.value
        editButton.innerText = 'Edit'
    } else {
        editInput.value = label.innerText
        editButton.innerText = 'Save'
    }

    //toggle .editmode on the parent.
    taskItem.classList.toggle('editMode')
}

//Delete task.
const deleteTask = function () {
    const taskItem = this.parentNode
    const taskList = taskItem.parentNode
    //Remove the parent list item from the ul.
    taskList.removeChild(taskItem)
}

//Mark task completed
const moveTaskToCompleted = function () {
    //Append the task list item to the #completed-tasks
    const taskItem = this.parentNode
    completedList.appendChild(taskItem)
    bindTaskEvents(taskItem, moveTaskToTodo)
}

const moveTaskToTodo = function () {
    //Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    const taskItem = this.parentNode
    toDoList.appendChild(taskItem)
    bindTaskEvents(taskItem, moveTaskToCompleted)
}

//Set the click handler to the addTask function.
addTaskButton.addEventListener('click', addTask)

const bindTaskEvents = function (taskItem, onCheckboxChange) {
    //select ListItems children
    const checkBox = taskItem.querySelector('input[type=checkbox]')
    const editButton = taskItem.querySelector('button.edit')
    const deleteButton = taskItem.querySelector('button.delete')

    //Bind editTask to edit button.
    editButton.onclick = editTask
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = onCheckboxChange
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < toDoList.children.length; i++) {
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(toDoList.children[i], moveTaskToCompleted)
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedList.children.length; i++) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedList.children[i], moveTaskToTodo)
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
