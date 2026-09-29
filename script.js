// ======================================
// GET HTML ELEMENTS
// ======================================

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const emptyState = document.getElementById("empty-state");

const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");
const remainingCount = document.getElementById("remaining-count");

const clearCompletedButton =
    document.getElementById("clear-completed");


// ======================================
// NOTES ELEMENTS
// ======================================

const noteForm = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const notesList = document.getElementById("notes-list");


// ======================================
// LOAD TASKS
// ======================================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// ======================================
// LOAD NOTES
// ======================================

let notes = JSON.parse(localStorage.getItem("notes")) || [];


// ======================================
// SAVE TASKS
// ======================================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// ======================================
// SAVE NOTES
// ======================================

function saveNotes() {

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

}


// ======================================
// DISPLAY TASKS
// ======================================

function renderTasks() {

    taskList.innerHTML = "";


    tasks.forEach(function(task) {

        const taskElement =
            document.createElement("div");

        taskElement.className = "task-item";


        // Completed task
        if (task.completed) {

            taskElement.classList.add("completed");

        }


        // CHECKBOX

        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className = "task-checkbox";

        checkbox.checked = task.completed;


        checkbox.addEventListener(
            "change",
            function() {

                task.completed =
                    checkbox.checked;

                saveTasks();

                renderTasks();

            }
        );


        // TASK TEXT

        const taskText =
            document.createElement("span");

        taskText.className = "task-text";

        taskText.textContent =
            task.text;


        // DELETE BUTTON

        const deleteButton =
            document.createElement("button");

        deleteButton.className =
            "delete-button";

        deleteButton.textContent =
            "Delete";


        deleteButton.addEventListener(
            "click",
            function() {

                tasks =
                    tasks.filter(function(item) {

                        return item.id !== task.id;

                    });

                saveTasks();

                renderTasks();

            }
        );


        // ADD ELEMENTS

        taskElement.appendChild(checkbox);

        taskElement.appendChild(taskText);

        taskElement.appendChild(deleteButton);

        taskList.appendChild(taskElement);

    });


    updateCounts();

    updateEmptyState();

}


// ======================================
// ADD TASK
// ======================================

function addTask() {

    const text =
        taskInput.value.trim();


    // Prevent empty tasks

    if (text === "") {

        return;

    }


    const newTask = {

        id: Date.now(),

        text: text,

        completed: false

    };


    tasks.push(newTask);


    saveTasks();

    renderTasks();


    taskInput.value = "";

    taskInput.focus();

}


// ======================================
// TASK FORM
// ======================================

taskForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        addTask();

    }
);


// ======================================
// UPDATE COUNTS
// ======================================

function updateCounts() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(function(task) {

            return task.completed;

        }).length;


    const remaining =
        total - completed;


    totalCount.textContent =
        total;

    completedCount.textContent =
        completed;

    remainingCount.textContent =
        remaining;

}


// ======================================
// EMPTY STATE
// ======================================

function updateEmptyState() {

    if (tasks.length === 0) {

        emptyState.style.display =
            "block";

    } else {

        emptyState.style.display =
            "none";

    }

}


// ======================================
// CLEAR COMPLETED
// ======================================

clearCompletedButton.addEventListener(
    "click",
    function() {

        tasks =
            tasks.filter(function(task) {

                return !task.completed;

            });


        saveTasks();

        renderTasks();

    }
);


// ======================================
// DISPLAY NOTES
// ======================================

function renderNotes() {

    notesList.innerHTML = "";


    notes.forEach(function(note) {

        const noteElement =
            document.createElement("div");

        noteElement.className = "note";


        // NOTE TEXT

        const noteText =
            document.createElement("p");

        noteText.className =
            "note-text";

        noteText.textContent =
            note.text;


        // DELETE NOTE

        const deleteNote =
            document.createElement("button");

        deleteNote.className =
            "delete-note";

        deleteNote.textContent =
            "Delete";


        deleteNote.addEventListener(
            "click",
            function() {

                notes =
                    notes.filter(function(item) {

                        return item.id !== note.id;

                    });


                saveNotes();

                renderNotes();

            }
        );


        noteElement.appendChild(noteText);

        noteElement.appendChild(deleteNote);

        notesList.appendChild(noteElement);

    });

}


// ======================================
// ADD NOTE
// ======================================

function addNote() {

    const text =
        noteInput.value.trim();


    // Prevent empty notes

    if (text === "") {

        return;

    }


    const newNote = {

        id: Date.now(),

        text: text

    };


    notes.push(newNote);


    saveNotes();

    renderNotes();


    noteInput.value = "";

    noteInput.focus();

}


// ======================================
// NOTE FORM
// ======================================

noteForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        addNote();

    }
);


// ======================================
// START APPLICATION
// ======================================

renderTasks();

renderNotes();