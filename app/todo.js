"use strict";
var Todo = /** @class */ (function () {
    function Todo(description, completed) {
        this.description = description;
        this.completed = completed;
    }
    return Todo;
}());
var TodoList = /** @class */ (function () {
    function TodoList() {
    }
    TodoList.prototype.createTodoItem = function (description) {
        var newItem = new Todo(description, false);
        var totalCount = TodoList.allTodos.push(newItem);
        return totalCount;
    };
    TodoList.prototype.allTodoItems = function () {
        return TodoList.allTodos;
    };
    TodoList.allTodos = new Array;
    return TodoList;
}());
window.onload = function () {
    var _a;
    var description = document.querySelector("input.addtodo");
    description.addEventListener("keypress", function (keyPressed) {
        var keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            toAlltask(description.value);
        }
    });
    (_a = document.querySelector("button.add")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return toAlltask(description.value); });
};
function toAlltask(description) {
    if (description) {
        var todo = new TodoList();
        todo.createTodoItem(description);
        var ul_1 = document.querySelector("ul.todos");
        var list = "";
        var icon = "<i class='fa fa-trash-o'></i>";
        for (var _i = 0, _a = TodoList.allTodos; _i < _a.length; _i++) {
            var item = _a[_i];
            list = "<li> " + item.description + icon + "</li>";
        }
        ul_1.innerHTML = list;
        document.querySelector("input.addtodo").value = "";
    }
}
(function loadTodos() {
    var data = localStorage.getItem("todos");
    if (data) {
        var ul_2 = document.querySelector("ul.todos");
        if (ul_2) {
            ul_2.innerHTML = data;
        }
    }
})();
(function deleteTodo() {
    var deleteButtons = document.querySelector("i.fa-trash-o");
    if (deleteButtons) {
        listenDeleteTodo(deleteButtons);
    }
    ;
})();
function listenDeleteTodo(element) {
    element.addEventListener("click", function (event) {
        var _a;
        (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
        event.stopPropagation();
    });
}
var saveButton = document.querySelector(".save");
var clearButton = document.querySelector("button.clear");
var showTipsButton = document.querySelector("button.showTips");
var closeTipsButton = document.querySelector("a.closeTips");
var overlay = document.querySelector("div.overlay");
var ul = document.querySelector("ul.todos");
saveButton === null || saveButton === void 0 ? void 0 : saveButton.addEventListener("click", function () {
    localStorage.setItem("todos", (ul === null || ul === void 0 ? void 0 : ul.innerHTML) || "");
});
clearButton === null || clearButton === void 0 ? void 0 : clearButton.addEventListener("click", function () {
    if (ul) {
        ul.innerHTML = "";
    }
    localStorage.removeItem('todos');
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
