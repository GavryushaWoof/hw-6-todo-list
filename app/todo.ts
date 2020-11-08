interface ITodo{
    description:string;
    completed:boolean;
}

class Todo implements ITodo{
    constructor(public description:string,
        public completed: boolean){}
}

class TodoList{
    private allTodos: Todo[]=new Array;
    createTodoItem(description:string):number {
        let newItem = new Todo(description, false);
        let totalCount: number= this.allTodos.push(newItem);
        return totalCount;
    }
    allTodoItems():Todo[]{
        return this.allTodos;
    }
    deleteTodoItem(index:number):void{
        this.allTodos.splice(index, 1);
    }
}
enum KeyTypes{

}

window.onload = function () {
    let description =  <HTMLInputElement>document.querySelector("input.addtodo");
    description.addEventListener("keypress", (event) => {
        const keyEnter = 13;
        if (event.code == keyEnter) {
            toAlltask(description.value);
        }
    });
    document.querySelector("button.add")?.addEventListener(
        'click',()=>toAlltask(description.value)); 
}
const todo = new TodoList();

function toAlltask(description:string){
    if(description){
        todo.createTodoItem(description);
        let ul = <HTMLElement>document.querySelector("ul.todos");
        let list="";
        const icon="<i class='fa fa-trash-o'></i>";
        
        for(const item of todo.allTodoItems()){
        list = "<li> " + item.description + icon +"</li>";}
        ul.innerHTML = list;
        (<HTMLInputElement>document.querySelector("input.addtodo")).value = "";
    }
}

(function loadTodos():void {
    const data = localStorage.getItem("todos");
    if (data) {
        const ul = document.querySelector<HTMLInputElement>("ul.todos");
        if (ul) {
            ul.innerHTML = data;
        }
    }
})();
(function deleteTodo():void {
        const deleteButtons = document.querySelector<HTMLElement>("i.fa-trash-o");
        if(deleteButtons){
            listenDeleteTodo(deleteButtons)};
})();

function listenDeleteTodo(element:HTMLElement) {
    element.addEventListener("click",(event) => {
        element.parentElement?.remove();
        event.stopPropagation();
    });
}

const saveButton = document.querySelector<HTMLButtonElement>(".save");
const clearButton = document.querySelector<HTMLButtonElement>("button.clear");
const showTipsButton = document.querySelector<HTMLButtonElement>("button.showTips");
const closeTipsButton = document.querySelector<HTMLButtonElement>("a.closeTips");
const overlay = document.querySelector<HTMLDivElement>("div.overlay");
const ul = document.querySelector<HTMLElement>("ul.todos");

saveButton?.addEventListener("click", () => {
    localStorage.setItem("todos", ul?.innerHTML||"");
});
clearButton?.addEventListener("click", () => {
    if(ul){ul.innerHTML = "";
}
    localStorage.removeItem('todos');
});
showTipsButton?.addEventListener("click", () => {
    if (overlay) {
        overlay.style.height = "100%";
    }   
});
closeTipsButton?.addEventListener("click", () => {
    if (overlay) {
        overlay.style.height = "0";
    }
});