"use strict";
(function () {
    function onPageLoaded() {
        var Todo = /** @class */ (function () {
            function Todo(description, completed, deadline) {
                if (completed === void 0) { completed = false; }
                if (deadline === void 0) { deadline = null; }
                this.description = description;
                this.completed = completed;
                this.deadline = deadline;
                this.id = this.createID();
            }
            Todo.prototype.getDescription = function () {
                return this.description;
            };
            Todo.prototype.changeСompleted = function () {
                this.completed = !this.completed;
            };
            Todo.prototype.getСompleted = function () {
                return this.completed;
            };
            Todo.prototype.getID = function () {
                return this.id;
            };
            Todo.prototype.createID = function () {
                return Math.floor(Math.random() * Date.now());
            };
            Todo.prototype.getDeadline = function () {
                return this.deadline;
            };
            Todo.prototype.getFormatedDeadline = function () {
                if (this.deadline) {
                    var data = new Date(this.deadline).toDateString();
                    return data;
                }
                return "";
            };
            return Todo;
        }());
        var TodoList = /** @class */ (function () {
            function TodoList() {
                this.allTodos = new Array();
            }
            TodoList.prototype.addTodoItem = function (description, completed, deadline) {
                var newItem = new Todo(description, completed, deadline);
                this.allTodos.push(newItem);
                return newItem;
            };
            TodoList.prototype.allTodoItems = function () {
                return this.allTodos;
            };
            TodoList.prototype.deleteTodoItem = function (id) {
                var index = this.findItem(id);
                if (index !== -1) {
                    this.allTodos.splice(index, 1);
                }
            };
            TodoList.prototype.changeСompletedItem = function (id) {
                var index = this.findItem(id);
                if (index !== -1) {
                    this.allTodos[index].changeСompleted();
                }
            };
            TodoList.prototype.findItem = function (id) {
                var index = this.allTodos.findIndex(function (n) { return n.id === +id; });
                return index;
            };
            return TodoList;
        }());
        var ManagerTodoList = /** @class */ (function () {
            function ManagerTodoList() {
                this.todoList = new TodoList();
            }
            ManagerTodoList.prototype.createTodoItem = function (description, deadline, completed) {
                if (description) {
                    var newItem = this.todoList.addTodoItem(description, completed, deadline);
                    this.filterTodo(newItem);
                }
            };
            ManagerTodoList.prototype.filterTodo = function (newItem, filter) {
                if (filter === void 0) { filter = function (i) { return true; }; }
                if (filter(newItem)) {
                    var ul_1 = document.querySelector("ul.todos");
                    var list = document.createElement("li");
                    list.id = "" + newItem.getID();
                    var icon = document.createElement("i");
                    icon.classList.add("fa", "fa-trash-o");
                    var spaceString = " ";
                    list.append(newItem.getDescription(), spaceString, newItem.getFormatedDeadline(), spaceString, icon);
                    ul_1.appendChild(list);
                    this.addListenerDeleteTodo(icon);
                    this.addListenerChangeСompletedTodo(list);
                    if (newItem.getСompleted()) {
                        list.classList.toggle("checked");
                    }
                    document.querySelector("input.addTodo").value =
                        "";
                    (document.querySelector("input.addDeadline")).value = "";
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
                    array.map(function (obj) {
                        return _this.createTodoItem(obj.description, obj.deadline, obj.completed);
                    });
                }
            };
            ManagerTodoList.prototype.removeTodos = function () {
                if (this.todoList.allTodoItems().length == 0) {
                    localStorage.removeItem(allTodoItems);
                }
            };
            ManagerTodoList.prototype.deleteTodo = function (icon) {
                var id = this.getIdTodo(icon);
                if (id) {
                    this.todoList.deleteTodoItem(id);
                }
            };
            ManagerTodoList.prototype.changeСompletedTodo = function (li) {
                li.classList.toggle("checked");
                var id = this.getIdTodo(li);
                if (id) {
                    this.todoList.changeСompletedItem(id);
                }
            };
            ManagerTodoList.prototype.getIdTodo = function (element) {
                var _a;
                if (element.id) {
                    return element.id;
                }
                else {
                    return (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.id;
                }
            };
            ManagerTodoList.prototype.addListenerDeleteTodo = function (icon) {
                var _this = this;
                icon.addEventListener("click", function (event) {
                    listenDeleteTodo(icon);
                    _this.deleteTodo(icon);
                    _this.removeTodos();
                    event.stopPropagation();
                });
            };
            ManagerTodoList.prototype.addListenerChangeСompletedTodo = function (li) {
                var _this = this;
                li.addEventListener("click", function (event) {
                    _this.changeСompletedTodo(li);
                    event.stopPropagation();
                });
            };
            ManagerTodoList.prototype.applyFilter = function (filter) {
                var _this = this;
                this.todoList.allTodoItems().forEach(function (el) {
                    switch (filter) {
                        case FilterTypes.completed:
                            _this.filterTodo(el, completed);
                            break;
                        case FilterTypes.notCompleted:
                            _this.filterTodo(el, notCompleted);
                            break;
                        case FilterTypes.tomorrow:
                            _this.filterTodo(el, tomorrow);
                            break;
                        case FilterTypes.week:
                            _this.filterTodo(el, week);
                            break;
                        case FilterTypes.withoutFilters:
                        default:
                            _this.filterTodo(el);
                            break;
                    }
                });
            };
            return ManagerTodoList;
        }());
        function tomorrow(el) {
            var dateToday = new Date().setHours(0, 0, 0, 0);
            var dateTomorrow = dateToday + 86400000 * 2;
            var deadline = el.getDeadline() || 0;
            if (dateToday <= deadline && deadline < dateTomorrow) {
                return true;
            }
            return false;
        }
        function week(el) {
            var dateToday = new Date().setHours(0, 0, 0, 0);
            var dateWeek = dateToday + 86400000 * 8;
            var deadline = el.getDeadline() || 0;
            if (dateToday <= deadline && deadline < dateWeek) {
                return true;
            }
            return false;
        }
        function completed(el) {
            if (el.getСompleted()) {
                return true;
            }
            return false;
        }
        function notCompleted(el) {
            if (el.getСompleted()) {
                return false;
            }
            return true;
        }
        var KeyTypes;
        (function (KeyTypes) {
            KeyTypes["keyEnter"] = "Enter";
        })(KeyTypes || (KeyTypes = {}));
        var FilterTypes;
        (function (FilterTypes) {
            FilterTypes[FilterTypes["withoutFilters"] = 0] = "withoutFilters";
            FilterTypes[FilterTypes["completed"] = 1] = "completed";
            FilterTypes[FilterTypes["notCompleted"] = 2] = "notCompleted";
            FilterTypes[FilterTypes["tomorrow"] = 3] = "tomorrow";
            FilterTypes[FilterTypes["week"] = 4] = "week";
        })(FilterTypes || (FilterTypes = {}));
        (function () {
            var _a;
            var inputText = document.querySelector("input.addTodo");
            var inputData = (document.querySelector("input.addDeadline"));
            inputData.min = new Date().toISOString().slice(0, 10);
            inputText.addEventListener("keypress", function (event) {
                var _a;
                if (event.code == KeyTypes.keyEnter) {
                    managerTodoList.createTodoItem(inputText.value, (_a = inputData.valueAsDate) === null || _a === void 0 ? void 0 : _a.getTime());
                }
            });
            (_a = document
                .querySelector("button.add")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                var _a;
                return managerTodoList.createTodoItem(inputText.value, (_a = inputData.valueAsDate) === null || _a === void 0 ? void 0 : _a.getTime());
            });
        })();
        var managerTodoList = new ManagerTodoList();
        managerTodoList.loadTodos();
        (function () {
            var divRadio = document.querySelector("div.radio");
            divRadio.addEventListener("click", function (event) {
                if (event.target) {
                    var radio = event.target;
                    if (ul) {
                        ul.innerHTML = "";
                    }
                    managerTodoList.applyFilter(+radio.value);
                }
            });
        })();
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
})();
