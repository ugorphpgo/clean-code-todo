const newTaskInput = document.getElementById('new-task')
const addTaskButton = document.getElementsByTagName('button')[0]
const toDoList = document.getElementById('incompleteTasks')
const completedList = document.getElementById('completed-tasks')

const createTaskItem = function (taskText) {
    const taskItem = document.createElement('li')

    const checkBox = document.createElement('input')
    const label = document.createElement('label')
    const editInput = document.createElement('input')
    const editButton = document.createElement('button')

    const deleteButton = document.createElement('button')
    const deleteIcon = document.createElement('img')

    // innerText, not innerHTML: the task text must stay text
    label.innerText = taskText
    label.className = 'task'

    checkBox.type = 'checkbox'
    editInput.type = 'text'
    editInput.className = 'task'

    editButton.innerText = 'Edit'
    editButton.className = 'edit'

    deleteButton.className = 'delete'
    deleteIcon.src = './remove.svg'
    deleteButton.appendChild(deleteIcon)

    taskItem.appendChild(checkBox)
    taskItem.appendChild(label)
    taskItem.appendChild(editInput)
    taskItem.appendChild(editButton)
    taskItem.appendChild(deleteButton)
    return taskItem
}

const addTask = function () {
    if (!newTaskInput.value) return
    const taskItem = createTaskItem(newTaskInput.value)

    toDoList.appendChild(taskItem)
    bindTaskEvents(taskItem, moveTaskToCompleted)

    newTaskInput.value = ''
}

const editTask = function () {
    const taskItem = this.parentNode

    const editInput = taskItem.querySelector('input[type=text]')
    const label = taskItem.querySelector('label')
    const editButton = taskItem.querySelector('.edit')
    const isEditMode = taskItem.classList.contains('editMode')
    if (isEditMode) {
        label.innerText = editInput.value
        editButton.innerText = 'Edit'
    } else {
        editInput.value = label.innerText
        editButton.innerText = 'Save'
    }

    taskItem.classList.toggle('editMode')
}

const deleteTask = function () {
    const taskItem = this.parentNode
    const taskList = taskItem.parentNode
    taskList.removeChild(taskItem)
}

const moveTask = function (taskItem, targetList, nextCheckboxHandler) {
    targetList.appendChild(taskItem)
    bindTaskEvents(taskItem, nextCheckboxHandler)
}

const moveTaskToCompleted = function () {
    moveTask(this.parentNode, completedList, moveTaskToTodo)
}

const moveTaskToTodo = function () {
    moveTask(this.parentNode, toDoList, moveTaskToCompleted)
}

const bindTaskEvents = function (taskItem, onCheckboxChange) {
    const checkBox = taskItem.querySelector('input[type=checkbox]')
    const editButton = taskItem.querySelector('button.edit')
    const deleteButton = taskItem.querySelector('button.delete')

    editButton.onclick = editTask
    deleteButton.onclick = deleteTask
    checkBox.onchange = onCheckboxChange
}

const bindListEvents = function (taskList, checkboxHandler) {
    for (const taskItem of taskList.children) {
        bindTaskEvents(taskItem, checkboxHandler)
    }
}

addTaskButton.addEventListener('click', addTask)
bindListEvents(toDoList, moveTaskToCompleted)
bindListEvents(completedList, moveTaskToTodo)
