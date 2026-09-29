// --------------------------------------
// Get the HTML elements we need
// --------------------------------------

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const emptyState = document.getElementById("empty-state");

const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");
const remainingCount = document.getElementById("remaining-count");

const clearCompletedButton =
    document.getElementById("clear-completed");


// --------------------------------------
// Load tasks from localStorage
// --------------------------------------

// localStorage stores information inside the browser.
// If there are no saved tasks, we start with an empty array.

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// --------------------------------------
// Save tasks to localStorage
// --------------------------------------

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// --------------------------------------
// Display all tasks
// --------------------------------------

function renderTasks() {

    // Clear the current task list before rebuilding it.
    taskList.innerHTML = "";

    // Create a task element for every task.
    tasks.forEach(function(task) {

        const taskElement = document.createElement("div");

        taskElement.className = "task";

        // Add the completed class when necessary.
        if (task.completed) {
            taskElement.classList.add("completed");
        }


        // --------------------------------------
        // Checkbox
        // --------------------------------------

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";

        checkbox.checked = task.completed;


        // When the checkbox changes, update the task.
        checkbox.addEventListener("change", function() {

            task.completed = checkbox.checked;

            saveTasks();

            renderTasks();
        });


        // --------------------------------------
        // Task text
        // --------------------------------------

        const taskText = document.createElement("span");

        taskText.className = "task-text";

        taskText.textContent = task.text;


        // --------------------------------------
        // Delete button
        // --------------------------------------

        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-button";

        deleteButton.textContent = "Delete";


        deleteButton.addEventListener("click", function() {

            // Remove this task from the array.
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            saveTasks();

            renderTasks();
        });


        // --------------------------------------
        // Put everything inside the task
        // --------------------------------------

        taskElement.appendChild(checkbox);
        taskElement.appendChild(taskText);
        taskElement.appendChild(deleteButton);

        taskList.appendChild(taskElement);
    });


    updateCounts();

    updateEmptyState();
}


// --------------------------------------
// Add a new task
// --------------------------------------

function addTask() {

    // trim() removes unnecessary spaces
    // from the beginning and end.
    const text = taskInput.value.trim();


    // Do not allow empty tasks.
    if (text === "") {
        return;
    }


    // Create a new task object.
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };


    // Add the new task to our tasks array.
    tasks.push(newTask);


    // Save the updated list.
    saveTasks();


    // Display the updated list.
    renderTasks();


    // Clear the input field.
    taskInput.value = "";

    // Put the cursor back into the input.
    taskInput.focus();
}


// --------------------------------------
// Handle the Add Task form
// --------------------------------------

taskForm.addEventListener("submit", function(event) {

    // Prevent the browser from refreshing
    // the page when the form is submitted.
    event.preventDefault();

    addTask();
});


// --------------------------------------
// Update task counts
// --------------------------------------

function updateCounts() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const remaining = total - completed;


    totalCount.textContent = total;
    completedCount.textContent = completed;
    remainingCount.textContent = remaining;
}


// --------------------------------------
// Show or hide the empty state
// --------------------------------------

function updateEmptyState() {

    if (tasks.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }
}


// --------------------------------------
// Clear completed tasks
// --------------------------------------

clearCompletedButton.addEventListener("click", function() {

    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    saveTasks();

    renderTasks();
});


// --------------------------------------
// Start the application
// --------------------------------------

// Display saved tasks when the page loads.
renderTasks();