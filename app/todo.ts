function onPageLoaded() {
  interface ITodo {
    getDescription(): string;
    changeСompleted(): void;
    getID(): number;
    createID(): number;
  }
  interface localStorageTodo {
    description: string;
    completed: boolean;
    id: number;
  }

  class Todo implements ITodo {
    readonly id: number;
    constructor(
      private description: string,
      private completed: boolean = false
    ) {
      this.id = this.createID();
    }
    getDescription(): string {
      return this.description;
    }
    changeСompleted(): void {
      this.completed = !this.completed;
    }
    getID(): number {
      return this.id;
    }
    createID(): number {
      return Math.floor(Math.random() * Date.now());
    }
  }

  class TodoList {
    private allTodos: Todo[] = new Array();

    addTodoItem(description: string, completed?: boolean): Todo {
      let newItem = new Todo(description, completed);
      this.allTodos.push(newItem);
      return newItem;
    }
    allTodoItems(): Todo[] {
      return this.allTodos;
    }
    deleteTodoItem(id: string): void {
      const index = this.allTodos.findIndex((n) => n.id === +id);
      if (index !== -1) {
        this.allTodos.splice(index, 1);
      }
    }
  }

  class ManagerTodoList {
    private todoList = new TodoList();

    createTodoItem(description: string, completed?: boolean): void {
      if (description) {
        const newItem = this.todoList.addTodoItem(description, completed);
        const ul = <HTMLElement>document.querySelector("ul.todos");
        const list = <HTMLElement>document.createElement("li");
        list.id = `${newItem.getID()}`;
        const icon = <HTMLElement>document.createElement("i");
        icon.classList.add("fa", "fa-trash-o");
        list.append(newItem.getDescription(), icon);
        ul.appendChild(list);
        this.addlistenerDeleteTodo(icon);
        (<HTMLInputElement>document.querySelector("input.addtodo")).value = "";
      }
    }

    saveTodos(): void {
      if (this.todoList.allTodoItems().length > 0) {
        localStorage.allTodoItems = JSON.stringify(
          this.todoList.allTodoItems()
        );
      }
    }

    loadTodos(): void {
      if (localStorage.allTodoItems) {
        const array: localStorageTodo[] = JSON.parse(localStorage.allTodoItems);
        array.map((obj) => this.createTodoItem(obj.description, obj.completed));
      }
    }

    removeTodos(): void {
      if (this.todoList.allTodoItems().length == 0) {
        localStorage.removeItem(allTodoItems);
      }
    }

    deleteTodo(icon: HTMLElement): void {
      const li = this.getIdTodo(icon);
      if (li) {
        this.todoList.deleteTodoItem(li);
      }
    }

    getIdTodo(icon: HTMLElement): string | void {
      if (icon) {
        const li = icon.parentElement?.id;
        return li;
      }
    }

    addlistenerDeleteTodo(icon: HTMLElement) {
      icon.addEventListener("click", (event) => {
        listenDeleteTodo(icon);
        this.deleteTodo(icon);
        this.removeTodos();
        event.stopPropagation();
      });
    }
  }

  enum KeyTypes {
    keyEnter = "Enter",
  }

  window.onload = function () {
    let input = <HTMLInputElement>document.querySelector("input.addtodo");
    input.addEventListener("keypress", (event) => {
      const keyEnter = 13;
      if (event.code == KeyTypes.keyEnter) {
        managerTodoList.createTodoItem(input.value);
      }
    });
    document
      .querySelector("button.add")
      ?.addEventListener("click", () =>
        managerTodoList.createTodoItem(input.value)
      );
  };

  const managerTodoList = new ManagerTodoList();
  managerTodoList.loadTodos();

  function listenDeleteTodo(element: HTMLElement) {
    element.parentElement?.remove();
  }

  const saveButton = document.querySelector<HTMLButtonElement>(".save");
  const clearButton = document.querySelector<HTMLButtonElement>("button.clear");
  const showTipsButton = document.querySelector<HTMLButtonElement>(
    "button.showTips"
  );
  const closeTipsButton = document.querySelector<HTMLButtonElement>(
    "a.closeTips"
  );
  const overlay = document.querySelector<HTMLDivElement>("div.overlay");
  const ul = document.querySelector<HTMLElement>("ul.todos");
  const allTodoItems = "allTodoItems";

  saveButton?.addEventListener("click", () => {
    managerTodoList.saveTodos();
  });
  clearButton?.addEventListener("click", () => {
    if (ul) {
      ul.innerHTML = "";
    }
    localStorage.removeItem(allTodoItems);
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
}
document.addEventListener("DOMContentLoaded", onPageLoaded);
