"use strict";
function onPageLoaded() {
    var input = document.querySelector("input[type='text']");
    var ul = document.querySelector("ul.todos");
    function createTodo() {
        var li = document.createElement("li");
        var textSpan = document.createElement("span");
        var newTodo = input.value;
        textSpan.append(newTodo);
        var deleteBtn = document.createElement("span");
        ul.appendChild(li).append(textSpan, deleteBtn);
        input.value = "";
        listenDeleteTodo(deleteBtn);
    }
    input.addEventListener("keypress", function (keyPressed) {
        var keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            createTodo();
        }
    });
    function onClickTodo(event) {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("checked");
        }
    }
    ul.addEventListener("click", onClickTodo);
    function listenDeleteTodo(element) {
        element.addEventListener("click", function (event) {
            element.parentElement.remove();
            event.stopPropagation();
        });
    }
    var saveButton = document.querySelector("button.save");
    var clearButton = document.querySelector("button.clear");
    var showTipsButton = document.querySelector("button.showTips");
    var closeTipsButton = document.querySelector("a.closeTips");
    var overlay = document.querySelector("div.overlay");
    saveButton.addEventListener("click", function () {
        localStorage.setItem("todos", ul.innerHTML);
    });
    clearButton.addEventListener("click", function () {
        ul.innerHTML = "";
        localStorage.removeItem('todos');
    });
    showTipsButton.addEventListener("click", function () {
        overlay.style.height = "100%";
    });
    closeTipsButton.addEventListener("click", function () {
        overlay.style.height = "0";
    });
    function loadTodos() {
        var data = localStorage.getItem("todos");
        if (data) {
            ul.innerHTML = data;
        }
        var deleteButtons = document.querySelectorAll("span.todo-trash");
        for (var _i = 0, deleteButtons_1 = deleteButtons; _i < deleteButtons_1.length; _i++) {
            var button = deleteButtons_1[_i];
            listenDeleteTodo(button);
        }
    }
    loadTodos();
}
document.addEventListener("DOMContentLoaded", onPageLoaded);
