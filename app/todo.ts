(function () {
  function onPageLoaded() {
    interface ITodo {
      getDescription(): string;
      changeСompleted(): void;
      getСompleted(): boolean;
      getID(): number;
      createID(): number;
      getDeadline(): number | null;
      getFormatedDeadline(): string;
    }
    interface localStorageTodo {
      description: string;
      completed: boolean;
      id: number;
      deadline: number | null;
    }

    class Todo implements ITodo {
      readonly id: number;
      constructor(
        private description: string,
        private completed: boolean = false,
        private deadline: number | null = null
      ) {
        this.id = this.createID();
      }
      getDescription(): string {
        return this.description;
      }
      changeСompleted(): void {
        this.completed = !this.completed;
      }
      getСompleted(): boolean {
        return this.completed;
      }
      getID(): number {
        return this.id;
      }
      createID(): number {
        return Math.floor(Math.random() * Date.now());
      }
      getDeadline(): number | null {
        return this.deadline;
      }
      getFormatedDeadline(): string {
        if (this.deadline) {
          const data = new Date(this.deadline).toDateString();
          return data;
        }
        return "";
      }
    }

    class TodoList {
      private allTodos: Todo[] = new Array();

      addTodoItem(
        description: string,
        completed?: boolean,
        deadline?: number | null
      ): Todo {
        let newItem = new Todo(description, completed, deadline);
        this.allTodos.push(newItem);
        return newItem;
      }

      allTodoItems(): Todo[] {
        return this.allTodos;
      }

      deleteTodoItem(id: string): void {
        const index = this.findItem(id);
        if (index !== -1) {
          this.allTodos.splice(index, 1);
        }
      }

      changeСompletedItem(id: string): void {
        const index = this.findItem(id);
        if (index !== -1) {
          this.allTodos[index].changeСompleted();
        }
      }

      findItem(id: string): number {
        const index = this.allTodos.findIndex((n) => n.id === +id);
        return index;
      }
    }

    class ManagerTodoList {
      private todoList = new TodoList();

      createTodoItem(
        description: string,
        deadline?: number | null,
        completed?: boolean
      ): void {
        if (description) {
          const newItem = this.todoList.addTodoItem(
            description,
            completed,
            deadline
          );
          this.filterTodo(newItem);
        }
      }

      filterTodo(
        newItem: Todo,
        filter: (i: Todo) => boolean = (i: Todo) => true
      ) {
        if (filter(newItem)) {
          const ul = <HTMLElement>document.querySelector("ul.todos");
          const list = <HTMLElement>document.createElement("li");
          list.id = `${newItem.getID()}`;
          const icon = <HTMLElement>document.createElement("i");
          icon.classList.add("fa", "fa-trash-o");
          const spaceString: string = " ";
          list.append(
            newItem.getDescription(),
            spaceString,
            newItem.getFormatedDeadline(),
            spaceString,
            icon
          );
          ul.appendChild(list);
          this.addListenerDeleteTodo(icon);
          this.addListenerChangeСompletedTodo(list);
          if (newItem.getСompleted()) {
            list.classList.toggle("checked");
          }
          (<HTMLInputElement>document.querySelector("input.addTodo")).value =
            "";
          (<HTMLInputElement>(
            document.querySelector("input.addDeadline")
          )).value = "";
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
          const array: localStorageTodo[] = JSON.parse(
            localStorage.allTodoItems
          );
          array.map((obj) =>
            this.createTodoItem(obj.description, obj.deadline, obj.completed)
          );
        }
      }

      removeTodos(): void {
        if (this.todoList.allTodoItems().length == 0) {
          localStorage.removeItem(allTodoItems);
        }
      }

      deleteTodo(icon: HTMLElement): void {
        const id = this.getIdTodo(icon);
        if (id) {
          this.todoList.deleteTodoItem(id);
        }
      }

      changeСompletedTodo(li: HTMLElement): void {
        li.classList.toggle("checked");
        const id = this.getIdTodo(li);
        if (id) {
          this.todoList.changeСompletedItem(id);
        }
      }

      getIdTodo(element: HTMLElement): string | void {
        if (element.id) {
          return element.id;
        } else {
          return element.parentElement?.id;
        }
      }

      addListenerDeleteTodo(icon: HTMLElement): void {
        icon.addEventListener("click", (event) => {
          listenDeleteTodo(icon);
          this.deleteTodo(icon);
          this.removeTodos();
          event.stopPropagation();
        });
      }

      addListenerChangeСompletedTodo(li: HTMLElement): void {
        li.addEventListener("click", (event) => {
          this.changeСompletedTodo(li);
          event.stopPropagation();
        });
      }
      applyFilter(filter: number) {
        this.todoList.allTodoItems().forEach((el) => {
          switch (filter) {
            case FilterTypes.completed:
              this.filterTodo(el, completed);
              break;
            case FilterTypes.notCompleted:
              this.filterTodo(el, notCompleted);
              break;
            case FilterTypes.tomorrow:
              this.filterTodo(el, tomorrow);
              break;
            case FilterTypes.week:
              this.filterTodo(el, week);
              break;
            case FilterTypes.withoutFilters:
            default:
              this.filterTodo(el);
              break;
          }
        });
      }
    }

    function tomorrow(el: Todo): boolean {
      let dateToday = new Date().setHours(0, 0, 0, 0);
      const dateTomorrow = dateToday + 86400000 * 2;
      const deadline = el.getDeadline() || 0;
      if (dateToday <= deadline && deadline < dateTomorrow) {
        return true;
      }
      return false;
    }
    function week(el: Todo): boolean {
      let dateToday = new Date().setHours(0, 0, 0, 0);
      const dateWeek = dateToday + 86400000 * 8;
      const deadline = el.getDeadline() || 0;
      if (dateToday <= deadline && deadline < dateWeek) {
        return true;
      }
      return false;
    }
    function completed(el: Todo): boolean {
      if (el.getСompleted()) {
        return true;
      }
      return false;
    }
    function notCompleted(el: Todo): boolean {
      if (el.getСompleted()) {
        return false;
      }
      return true;
    }

    enum KeyTypes {
      keyEnter = "Enter",
    }
    enum FilterTypes {
      withoutFilters,
      completed,
      notCompleted,
      tomorrow,
      week,
    }

    (function () {
      let inputText = <HTMLInputElement>document.querySelector("input.addTodo");
      let inputData = <HTMLInputElement>(
        document.querySelector("input.addDeadline")
      );
      inputData.min = new Date().toISOString().slice(0, 10);
      inputText.addEventListener("keypress", (event) => {
        if (event.code == KeyTypes.keyEnter) {
          managerTodoList.createTodoItem(
            inputText.value,
            inputData.valueAsDate?.getTime()
          );
        }
      });
      document
        .querySelector("button.add")
        ?.addEventListener("click", () =>
          managerTodoList.createTodoItem(
            inputText.value,
            inputData.valueAsDate?.getTime()
          )
        );
    })();

    const managerTodoList = new ManagerTodoList();
    managerTodoList.loadTodos();

    (function () {
      let divRadio = <HTMLElement>document.querySelector("div.radio");
      divRadio.addEventListener("click", (event) => {
        if (event.target) {
          const radio = event.target as HTMLInputElement;
          if (ul) {
            ul.innerHTML = "";
          }
          managerTodoList.applyFilter(+radio.value);
        }
      });
    })();

    function listenDeleteTodo(element: HTMLElement) {
      element.parentElement?.remove();
    }

    const saveButton = document.querySelector<HTMLButtonElement>(".save");
    const clearButton = document.querySelector<HTMLButtonElement>(
      "button.clear"
    );
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
})();
