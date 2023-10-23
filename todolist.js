const todoForm=document.querySelector(".todo-form");
const todoInput= document.querySelector(".todo-input")
const todoList=document.querySelector(".todolist")
const backdrop=document.querySelector(".backdrop")
const modal=document.querySelector(".modal")
const closeModalBtn= document.querySelector(".close-modal")
let todos=[];


class UI{
addNewTodo(){
      if(!todoInput.value) return null;

      const newTodo={
          id: Date.now(),
          createdAt: new Date().toISOString(),
          title: todoInput.value,
          isCompleted: false,
      }
todos=[...todos, newTodo];
this.createTodos(todos)

}
createTodos(todos){
let result="";
todos.forEach(todo => {
    result+=`<li class="todo">
    <p class="todo__title ${todo.isCompleted && "completed"}" >${todo.title}</p>
    <span class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString("fa-IR")}</span>
    <button  class="todo__edit " data-todo-id=${todo.id}><i class="todo-editor fa fa-edit"></i></i></button>
    <button class="todo__check " data-todo-id=${todo.id}><i class="${!todo.isCompleted && "fa fa-square-o"} ${todo.isCompleted && "fa fa-check-square-o"}" aria-hidden="true"></i></button>
    <button class="todo__remove" data-todo-id=${todo.id}><i class=" far fa-trash-alt"></i></button>
    </li>`
todoList.innerHTML=result;
todoInput.value="";

const editTodoBtn=[...document.querySelectorAll(".todo__edit")];
editTodoBtn.forEach((btn)=>btn.addEventListener("click",this.editTodo))
const checkTodoBtn=[...document.querySelectorAll(".todo__check")];
checkTodoBtn.forEach((btn)=>btn.addEventListener("click",this.checkedTodo))
const removeTodoBtn=[...document.querySelectorAll(".todo__remove")];
removeTodoBtn.forEach((btn)=>btn.addEventListener("click",this.removedTodo))
});
}
editTodo(e){
const id=e.target.dataset.todoId
backdrop.classList.remove("hidden")
modal.classList.remove("hidden")
};
checkedTodo(e){
console.log("checkeeeed");
const id=Number(e.target.dataset.todoId);
const todo=todos.find((todo)=>todo.id===id);
todo.isCompleted=!todo.isCompleted;
console.log(todo.isCompleted);
const ui= new UI();
ui.createTodos(todos)
};
removedTodo(e){
console.log("reeeemove");
const id=Number(e.target.dataset.todoId);
todos= todos.filter((todo)=>todo.id!==id);
const ui= new UI();
ui.createTodos(todos)
}
closeModul(){
    backdrop.classList.add("hidden")
    modal.classList.add("hidden") 
}
}

class Storage{

}
todoForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const ui= new UI();
    ui.addNewTodo()
})
closeModalBtn.addEventListener("click",()=>{
    const ui= new UI();
    ui.closeModul()
})
backdrop.addEventListener('click',()=>{
    const ui= new UI();
    ui.closeModul()
})
