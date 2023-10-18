const todoForm=document.querySelector(".todo-form");
const todoInput= document.querySelector(".todo-input")
const todoList=document.querySelector(".todolist")

let todos=[]



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
    result+=` <li class="todo">
<p class="todo__title">${todo.title}</p>
<span class="todo__createdAt">${todo.createdAt}</span>
<button><i class="todo__check far fa-check-square" data-id=${todo.id}></i></button>
<button><i class="todo__remove far fa-trash-alt" data-id=${todo.id}></i></button>
</li>`
todoList.innerHTML=result;
});
}

}

class Storage{

}
todoForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const ui= new UI();
    ui.addNewTodo()
})