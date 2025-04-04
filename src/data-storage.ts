import { TodoItem } from "./types";

export function saveItems(todoList: Array<TodoItem>) {
    const todoListJson = JSON.stringify(todoList);
    window.localStorage.setItem("todoList", todoListJson);
}

export function getItems(): Array<TodoItem> {
    const todoListJson = window.localStorage.getItem("todoList");
    if (todoListJson) {
        try {
            const todoList: Array<TodoItem> = JSON.parse(todoListJson);
            if(Array.isArray(todoList)){
                return todoList
            }
            return []
        } catch {
            return []
        }
    }
    return []
}