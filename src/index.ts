import { getItems, saveItems } from "./data-storage";
import {
    CLOSED_TODOS_LIST_EL,
    OPEN_TODOS_LIST_EL, TODOS_FORM_EL,
    TODOS_FORM_IS_IMPORTANT_EL,
    TODOS_FORM_NAME_EL } from "./dom-utils";
import { TodoItem } from "./types";



let todoList: Array<TodoItem> = getItems();

TODOS_FORM_EL.addEventListener('submit', processTodoFormSubmission);

function processTodoFormSubmission(e: SubmitEvent) {
    e.preventDefault();

    let todoName = TODOS_FORM_NAME_EL.value.trim();

    if (todoName.length === 0) {
        return; // Funktion ist durch return zu Ende
    }

    const todoItem = {
        todoName: todoName,
        isDone: false,
        isImportant: TODOS_FORM_IS_IMPORTANT_EL.checked,
        id: `todo-${Date.now()}-${Math.floor(Math.random() * 9999)}`
    }


    todoList.push(todoItem);
    saveTodoList();

    //setze Formular zurück
    TODOS_FORM_NAME_EL.value = "";
    TODOS_FORM_IS_IMPORTANT_EL.checked = false;

    renderTodoList();
}

function saveTodoList(){
    saveItems(todoList)
}


function renderTodoList() {
    //LIST reset
    OPEN_TODOS_LIST_EL.innerHTML = "";
    CLOSED_TODOS_LIST_EL.innerHTML = "";
    //render open todos
    const openTodos = todoList.filter((todoListItem) => {
        return !todoListItem.isDone
    })

    openTodos.forEach((todoListItem) => {
        const LI_ELEMENT = document.createElement('LI');
        LI_ELEMENT.innerHTML = todoListItem.todoName;

        if (todoListItem.isImportant) {
            LI_ELEMENT.classList.add('todo-is-important');
        }

        LI_ELEMENT.addEventListener("click", () => toggleTodo(todoListItem.id))
        OPEN_TODOS_LIST_EL.appendChild(LI_ELEMENT);
    })

    // render closed todos
    const closedTodos = todoList.filter((todoListItem) => {
        return todoListItem.isDone;
    })
    closedTodos.forEach((todoListItem) => {
        const LI_ELEMENT = document.createElement('LI');
        LI_ELEMENT.innerHTML = todoListItem.todoName;
        LI_ELEMENT.classList.add('todo-done');
        LI_ELEMENT.addEventListener("click", () => toggleTodo(todoListItem.id))
        CLOSED_TODOS_LIST_EL.appendChild(LI_ELEMENT);
    })
}

function toggleTodo(todoId: string) {
    todoList = todoList.map((todoListItem) => {
        if (todoListItem.id === todoId) {
            todoListItem.isDone = !todoListItem.isDone;
        }
        return todoListItem;
    })
    renderTodoList();
}


// Startup App
renderTodoList();