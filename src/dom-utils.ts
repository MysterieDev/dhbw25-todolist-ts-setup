export const TODOS_FORM_EL = document.querySelector('#todos_add_form') as HTMLFormElement;
export const TODOS_FORM_NAME_EL = document.querySelector('#todo_name') as HTMLInputElement;
export const TODOS_FORM_IS_IMPORTANT_EL = document.querySelector('#todo_is_important') as HTMLInputElement;
export const OPEN_TODOS_LIST_EL = document.querySelector('#open_todos_list') as HTMLUListElement;
export const CLOSED_TODOS_LIST_EL = document.querySelector('#closed_todos_list') as HTMLUListElement;

export function createDeleteButtonForTodoItem(){
    const deleteButton = document.createElement("BUTTON");
    deleteButton.innerHTML = "x";
    return deleteButton;
}