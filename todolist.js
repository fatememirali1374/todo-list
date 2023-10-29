const todoForm=document.querySelector(".todo-form");
const todoInput= document.querySelector(".todo-input")
const todoList=document.querySelector(".todolist")
const backdrop=document.querySelector(".backdrop")
const modal=document.querySelector(".modal")
const closeModalBtn= document.querySelector(".close-modal")
const editForm= document.querySelector(".edit-form")
const editInput= document.querySelector(".edit-input")
const filterTodos= document.querySelector(".filter-todos")
// let todos=[];
let filterValue="all"

class UI{
addNewTodo(){
      if (!todoInput.value) return null;

      const newTodo={
          id: Date.now(),
          createdAt: new Date().toISOString(),
          title: todoInput.value,
          isCompleted: false,
      }
      Storage.saveTodo(newTodo)
     
this.filteredTodo()
      
};
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
})
todoList.innerHTML=result;
todoInput.value="";

const editTodoBtn=[...document.querySelectorAll(".todo__edit")];
editTodoBtn.forEach((btn)=>btn.addEventListener("click",this.openEditTodo))
const checkTodoBtn=[...document.querySelectorAll(".todo__check")];
checkTodoBtn.forEach((btn)=>btn.addEventListener("click",this.checkedTodo))
const removeTodoBtn=[...document.querySelectorAll(".todo__remove")];
removeTodoBtn.forEach((btn)=>btn.addEventListener("click",this.removedTodo))
};
openEditTodo(e){
const id=e.target.dataset.todoId
backdrop.classList.remove("hidden")
modal.classList.remove("hidden")
// console.log(id);
const todos= Storage.getAllTodos();
const todo= todos.find((t)=>Number(t.id)===Number(id));
// console.log(todo);
editInput.value=todo.title;
editInput.id=todo.id;
};
edetedTodo(){
    const todos= Storage.getAllTodos();
const id = editInput.id;
const todo= todos.find((t)=>Number(t.id)===Number(id))
todo.title=editInput.value;
const ui= new UI();
Storage.savedAllTodos(todos);
ui.filteredTodo()
this.closeModul()
};
checkedTodo(e){
    const todos= Storage.getAllTodos();
// console.log("checkeeeed");
const id=Number(e.target.dataset.todoId);
const todo=todos.find((todo)=>todo.id===id);
todo.isCompleted=!todo.isCompleted;
// console.log(todo.isCompleted);
Storage.savedAllTodos(todos);
const ui= new UI();
ui.filteredTodo()
};
removedTodo(e){
// console.log("reeeemove");
let todos = Storage.getAllTodos();  
const id=Number(e.target.dataset.todoId);
todos= todos.filter((todo)=>todo.id!==id);
Storage.savedAllTodos(todos);
const ui= new UI();
ui.filteredTodo()
// console.log(todos);
};
closeModul(){
    backdrop.classList.add("hidden")
    modal.classList.add("hidden") 
};
filteredTodo(){
    const todos= Storage.getAllTodos();
    switch(filterValue) {
        case "all":
        {this.createTodos(todos)
          break;}
        case "completed":
          {const filteredTodos=todos.filter((t)=>t.isCompleted)
          this.createTodos(filteredTodos)
        //   console.log(filteredTodos);
          break;}
          case "uncompleted":
          { const filteredTodos=todos.filter((t)=>!t.isCompleted)
            this.createTodos(filteredTodos)
            // console.log(filteredTodos);
          break;}
        default:
            createTodos(todos);
                break;
          // code block
      }
};
}


class Storage{
 static getAllTodos(){
    const savedTodos=JSON.parse(localStorage.getItem('todos'));
    return savedTodos;
  } 
  static saveTodo(todo){
    const savedTodos=this.getAllTodos()
    savedTodos.push(todo);
    localStorage.setItem('todos', JSON.stringify(savedTodos));
    return savedTodos
  }
  static savedAllTodos(todos){
    localStorage.setItem("todos", JSON.stringify(todos))
  }
}

document.addEventListener("DOMContentLoaded",()=>{
    const todos=Storage.getAllTodos()
    const ui= new UI()
    ui.createTodos(todos)
})
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
editForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const ui= new UI();
    ui.edetedTodo()
})
filterTodos.addEventListener("change",(e)=>{
    filterValue= e.target.value
    const ui= new UI();
    ui.filteredTodo()
})