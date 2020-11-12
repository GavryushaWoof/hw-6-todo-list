"use strict";
function onPageLoaded() {
    var Todo = /** @class */ (function () {
        function Todo(description, completed) {
            if (completed === void 0) { completed = false; }
            this.description = description;
            this.completed = completed;
            this.id = this.createID();
        }
        Todo.prototype.getDescription = function () {
            return this.description;
        };
        Todo.prototype.changeСompleted = function () {
            this.completed = !this.completed;
        };
        Todo.prototype.getID = function () {
            return this.id;
        };
        Todo.prototype.createID = function () {
            return Math.floor(Math.random() * Date.now());
        };
        return Todo;
    }());
    var TodoList = /** @class */ (function () {
        function TodoList() {
            this.allTodos = new Array();
        }
        TodoList.prototype.addTodoItem = function (description, completed) {
            var newItem = new Todo(description, completed);
            this.allTodos.push(newItem);
            return newItem;
        };
        TodoList.prototype.allTodoItems = function () {
            return this.allTodos;
        };
        TodoList.prototype.deleteTodoItem = function (id) {
            var index = this.allTodos.findIndex(function (n) { return n.id === +id; });
            if (index !== -1) {
                this.allTodos.splice(index, 1);
            }
        };
        return TodoList;
    }());
    var ManagerTodoList = /** @class */ (function () {
        function ManagerTodoList() {
            this.todoList = new TodoList();
        }
        ManagerTodoList.prototype.createTodoItem = function (description, completed) {
            if (description) {
                var newItem = this.todoList.addTodoItem(description, completed);
                var ul_1 = document.querySelector("ul.todos");
                var list = document.createElement("li");
                list.id = "" + newItem.getID();
                var icon = document.createElement("i");
                icon.classList.add("fa", "fa-trash-o");
                list.append(newItem.getDescription(), icon);
                ul_1.appendChild(list);
                this.addlistenerDeleteTodo(icon);
                document.querySelector("input.addtodo").value = "";
            }
        };
        ManagerTodoList.prototype.saveTodos = function () {
            if (this.todoList.allTodoItems().length > 0) {
                localStorage.allTodoItems = JSON.stringify(this.todoList.allTodoItems());
            }
        };
        ManagerTodoList.prototype.loadTodos = function () {
            var _this = this;
            if (localStorage.allTodoItems) {
                var array = JSON.parse(localStorage.allTodoItems);
                array.map(function (obj) { return _this.createTodoItem(obj.description, obj.completed); });
            }
        };
        ManagerTodoList.prototype.removeTodos = function () {
            if (this.todoList.allTodoItems().length == 0) {
                localStorage.removeItem(allTodoItems);
            }
        };
        ManagerTodoList.prototype.deleteTodo = function (icon) {
            var li = this.getIdTodo(icon);
            if (li) {
                this.todoList.deleteTodoItem(li);
            }
        };
        ManagerTodoList.prototype.getIdTodo = function (icon) {
            var _a;
            if (icon) {
                var li = (_a = icon.parentElement) === null || _a === void 0 ? void 0 : _a.id;
                return li;
            }
        };
        ManagerTodoList.prototype.addlistenerDeleteTodo = function (icon) {
            var _this = this;
            icon.addEventListener("click", function (event) {
                listenDeleteTodo(icon);
                _this.deleteTodo(icon);
                _this.removeTodos();
                event.stopPropagation();
            });
        };
        return ManagerTodoList;
    }());
    var KeyTypes;
    (function (KeyTypes) {
        KeyTypes["keyEnter"] = "Enter";
    })(KeyTypes || (KeyTypes = {}));
    window.onload = function () {
        var _a;
        var input = document.querySelector("input.addtodo");
        input.addEventListener("keypress", function (event) {
            var keyEnter = 13;
            if (event.code == KeyTypes.keyEnter) {
                managerTodoList.createTodoItem(input.value);
            }
        });
        (_a = document
            .querySelector("button.add")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
            return managerTodoList.createTodoItem(input.value);
        });
    };
    var managerTodoList = new ManagerTodoList();
    managerTodoList.loadTodos();
    function listenDeleteTodo(element) {
        var _a;
        (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
    }
    var saveButton = document.querySelector(".save");
    var clearButton = document.querySelector("button.clear");
    var showTipsButton = document.querySelector("button.showTips");
    var closeTipsButton = document.querySelector("a.closeTips");
    var overlay = document.querySelector("div.overlay");
    var ul = document.querySelector("ul.todos");
    var allTodoItems = "allTodoItems";
    saveButton === null || saveButton === void 0 ? void 0 : saveButton.addEventListener("click", function () {
        managerTodoList.saveTodos();
    });
    clearButton === null || clearButton === void 0 ? void 0 : clearButton.addEventListener("click", function () {
        if (ul) {
            ul.innerHTML = "";
        }
        localStorage.removeItem(allTodoItems);
    });
    showTipsButton === null || showTipsButton === void 0 ? void 0 : showTipsButton.addEventListener("click", function () {
        if (overlay) {
            overlay.style.height = "100%";
        }
    });
    closeTipsButton === null || closeTipsButton === void 0 ? void 0 : closeTipsButton.addEventListener("click", function () {
        if (overlay) {
            overlay.style.height = "0";
        }
    });
}
document.addEventListener("DOMContentLoaded", onPageLoaded);
