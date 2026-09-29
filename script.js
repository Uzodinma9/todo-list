// ======================================
// WELCOME / NAME
// ======================================

const welcomeScreen =
    document.getElementById("welcome-screen");

const app =
    document.getElementById("app");

const nameForm =
    document.getElementById("name-form");

const nameInput =
    document.getElementById("name-input");

const greeting =
    document.getElementById("greeting");

const profileLetter =
    document.getElementById("profile-letter");


// ======================================
// TASK ELEMENTS
// ======================================

const taskForm =
    document.getElementById("task-form");

const taskInput =
    document.getElementById("task-input");

const taskDate =
    document.getElementById("task-date");

const taskTime =
    document.getElementById("task-time");

const taskNote =
    document.getElementById("task-note");

const taskList =
    document.getElementById("task-list");

const emptyState =
    document.getElementById("empty-state");

const totalCount =
    document.getElementById("total-count");

const completedCount =
    document.getElementById("completed-count");

const remainingCount =
    document.getElementById("remaining-count");


// ======================================
// DASHBOARD TASKS
// ======================================

const dashboardTaskList =
    document.getElementById(
        "dashboard-task-list"
    );


// ======================================
// HISTORY
// ======================================

const historyList =
    document.getElementById("history-list");

const historyEmpty =
    document.getElementById("history-empty");


// ======================================
// NOTES
// ======================================

const noteForm =
    document.getElementById("note-form");

const noteInput =
    document.getElementById("note-input");

const notesList =
    document.getElementById("notes-list");

const notesEmpty =
    document.getElementById("notes-empty");


// ======================================
// MODAL
// ======================================

const taskModal =
    document.getElementById("task-modal");

const addTaskButton =
    document.getElementById("add-task-button");

const dashboardAddButton =
    document.getElementById(
        "dashboard-add-button"
    );

const closeModal =
    document.getElementById("close-modal");

const cancelTask =
    document.getElementById("cancel-task");


// ======================================
// LOAD SAVED DATA
// ======================================

let tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];


let notes =
    JSON.parse(
        localStorage.getItem("notes")
    ) || [];


let savedName =
    localStorage.getItem("userName") || "";


// ======================================
// WELCOME SCREEN
// ======================================

function showDashboard() {

    welcomeScreen.classList.add("hidden");

    app.classList.remove("hidden");

    updateUserInformation();

    renderTasks();

    renderNotes();

    renderHistory();

    updateDateAndTime();

}


// ======================================
// USER INFORMATION
// ======================================

function updateUserInformation() {

    if (!savedName) {
        return;
    }


    greeting.textContent =
        `Good evening, ${savedName} 👋`;


    profileLetter.textContent =
        savedName.charAt(0).toUpperCase();

}


// ======================================
// NAME FORM
// ======================================

nameForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            nameInput.value.trim();


        if (name === "") {
            return;
        }


        savedName = name;


        localStorage.setItem(
            "userName",
            savedName
        );


        showDashboard();

    }
);


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
// OPEN TASK MODAL
// ======================================

function openTaskModal() {

    taskModal.classList.remove("hidden");

    taskInput.focus();

    // Set today's date automatically

    const today =
        new Date().toISOString().split("T")[0];

    taskDate.value = today;

}


// ======================================
// CLOSE TASK MODAL
// ======================================

function closeTaskModal() {

    taskModal.classList.add("hidden");

    taskForm.reset();

}


// ======================================
// OPEN MODAL BUTTONS
// ======================================

addTaskButton.addEventListener(
    "click",
    openTaskModal
);


dashboardAddButton.addEventListener(
    "click",
    openTaskModal
);


closeModal.addEventListener(
    "click",
    closeTaskModal
);


cancelTask.addEventListener(
    "click",
    closeTaskModal
);


// ======================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ======================================

taskModal.addEventListener(
    "click",
    function(event) {

        if (event.target === taskModal) {

            closeTaskModal();

        }

    }
);


// ======================================
// ADD TASK
// ======================================

function addTask() {

    const text =
        taskInput.value.trim();


    const date =
        taskDate.value;


    const time =
        taskTime.value;


    const note =
        taskNote.value.trim();


    const selectedPriority =
        document.querySelector(
            'input[name="priority"]:checked'
        );


    const priority =
        selectedPriority
            ? selectedPriority.value
            : "Medium";


    if (
        text === "" ||
        date === "" ||
        time === ""
    ) {

        return;

    }


    const newTask = {

        id: Date.now(),

        text: text,

        date: date,

        time: time,

        note: note,

        priority: priority,

        completed: false,

        createdAt: new Date().toISOString()

    };


    tasks.push(newTask);


    saveTasks();

    renderTasks();

    renderHistory();

    closeTaskModal();

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
// FORMAT DATE
// ======================================

function formatDate(dateString) {

    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-NG",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


// ======================================
// FORMAT TIME
// ======================================

function formatTime(timeString) {

    const [hours, minutes] =
        timeString.split(":");


    const date =
        new Date();


    date.setHours(
        Number(hours),
        Number(minutes)
    );


    return date.toLocaleTimeString(
        "en-NG",
        {
            hour: "numeric",
            minute: "2-digit"
        }
    );

}


// ======================================
// PRIORITY CLASS
// ======================================

function getPriorityClass(priority) {

    return priority.toLowerCase();

}


// ======================================
// RENDER TASKS
// ======================================

function renderTasks() {

    taskList.innerHTML = "";

    dashboardTaskList.innerHTML = "";


    if (tasks.length === 0) {

        emptyState.style.display =
            "block";

    } else {

        emptyState.style.display =
            "none";

    }


    // ==================================
    // MAIN TASK LIST
    // ==================================

    tasks.forEach(function(task) {

        const taskElement =
            createTaskElement(task);

        taskList.appendChild(taskElement);

    });


    // ==================================
    // DASHBOARD TASK PREVIEW
    // ==================================

    const upcomingTasks =
        tasks
            .filter(function(task) {

                return !task.completed;

            })
            .slice(0, 5);


    if (upcomingTasks.length === 0) {

        dashboardTaskList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">✓</div>
                <h3>No upcoming tasks</h3>
                <p>Your schedule is clear.</p>
            </div>
        `;

    } else {

        upcomingTasks.forEach(
            function(task) {

                const taskElement =
                    createTaskElement(task);

                dashboardTaskList.appendChild(
                    taskElement
                );

            }
        );

    }


    updateCounts();

}


// ======================================
// CREATE TASK ELEMENT
// ======================================

function createTaskElement(task) {

    const taskElement =
        document.createElement("div");


    taskElement.className =
        "task-item";


    if (task.completed) {

        taskElement.classList.add(
            "completed"
        );

    }


    // CHECKBOX

    const checkbox =
        document.createElement("input");


    checkbox.type =
        "checkbox";


    checkbox.className =
        "task-checkbox";


    checkbox.checked =
        task.completed;


    checkbox.addEventListener(
        "change",
        function() {

            task.completed =
                checkbox.checked;


            saveTasks();

            renderTasks();

            renderHistory();

        }
    );


    // CONTENT

    const content =
        document.createElement("div");


    content.className =
        "task-content";


    // TASK TEXT

    const taskText =
        document.createElement("span");


    taskText.className =
        "task-text";


    taskText.textContent =
        task.text;


    // DETAILS

    const details =
        document.createElement("div");


    details.className =
        "task-details";


    const dateTime =
        document.createElement("span");


    dateTime.className =
        "task-date-time";


    dateTime.textContent =
        `${formatDate(task.date)} • ${formatTime(task.time)}`;


    // PRIORITY

    const priority =
        document.createElement("span");


    priority.className =
        `priority-badge ${getPriorityClass(task.priority)}`;


    priority.textContent =
        task.priority;


    details.appendChild(dateTime);

    details.appendChild(priority);


    // NOTE

    content.appendChild(taskText);

    content.appendChild(details);


    if (task.note) {

        const note =
            document.createElement("p");


        note.className =
            "task-note";


        note.textContent =
            task.note;


        content.appendChild(note);

    }


    // DELETE

    const deleteButton =
        document.createElement("button");


    deleteButton.className =
        "delete-button";


    deleteButton.textContent =
        "Delete";


    deleteButton.addEventListener(
        "click",
        function() {

            deleteTask(task.id);

        }
    );


    taskElement.appendChild(
        checkbox
    );

    taskElement.appendChild(
        content
    );

    taskElement.appendChild(
        deleteButton
    );


    return taskElement;

}


// ======================================
// DELETE TASK
// ======================================

function deleteTask(id) {

    tasks =
        tasks.filter(
            function(task) {

                return task.id !== id;

            }
        );


    saveTasks();

    renderTasks();

    renderHistory();

}


// ======================================
// UPDATE COUNTS
// ======================================

function updateCounts() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            function(task) {

                return task.completed;

            }
        ).length;


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
// RENDER HISTORY
// ======================================

function renderHistory() {

    historyList.innerHTML = "";


    if (tasks.length === 0) {

        historyEmpty.style.display =
            "block";

        return;

    }


    historyEmpty.style.display =
        "none";


    // Show newest tasks first

    const historyTasks =
        [...tasks].reverse();


    historyTasks.forEach(
        function(task) {

            const item =
                document.createElement("div");


            item.className =
                "history-item";


            // TASK

            const taskName =
                document.createElement("div");


            taskName.className =
                "history-task";


            taskName.textContent =
                task.text;


            // DATE

            const date =
                document.createElement("div");


            date.className =
                "history-date";


            date.textContent =
                `${formatDate(task.date)} • ${formatTime(task.time)}`;


            // PRIORITY

            const priority =
                document.createElement("span");


            priority.className =
                `priority-badge ${getPriorityClass(task.priority)}`;


            priority.textContent =
                task.priority;


            // STATUS

            const status =
                document.createElement("span");


            status.className =
                "history-status";


            if (task.completed) {

                status.classList.add(
                    "completed"
                );

                status.textContent =
                    "Completed";

            } else {

                status.textContent =
                    "Pending";

            }


            item.appendChild(taskName);

            item.appendChild(date);

            item.appendChild(priority);

            item.appendChild(status);


            historyList.appendChild(item);

        }
    );

}


// ======================================
// ADD NOTE
// ======================================

function addNote() {

    const text =
        noteInput.value.trim();


    if (text === "") {

        return;

    }


    const newNote = {

        id: Date.now(),

        text: text,

        createdAt:
            new Date().toISOString()

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
// RENDER NOTES
// ======================================

function renderNotes() {

    notesList.innerHTML = "";


    if (notes.length === 0) {

        notesEmpty.style.display =
            "block";

        return;

    }


    notesEmpty.style.display =
        "none";


    [...notes].reverse().forEach(
        function(note) {

            const noteElement =
                document.createElement("div");


            noteElement.className =
                "note";


            const noteText =
                document.createElement("p");


            noteText.className =
                "note-text";


            noteText.textContent =
                note.text;


            const deleteButton =
                document.createElement("button");


            deleteButton.className =
                "delete-note";


            deleteButton.textContent =
                "Delete";


            deleteButton.addEventListener(
                "click",
                function() {

                    notes =
                        notes.filter(
                            function(item) {

                                return item.id !== note.id;

                            }
                        );


                    saveNotes();

                    renderNotes();

                }
            );


            noteElement.appendChild(
                noteText
            );


            noteElement.appendChild(
                deleteButton
            );


            notesList.appendChild(
                noteElement
            );

        }
    );

}


// ======================================
// DATE & TIME
// ======================================

function updateDateAndTime() {

    const now =
        new Date();


    const date =
        now.toLocaleDateString(
            "en-NG",
            {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );


    const time =
        now.toLocaleTimeString(
            "en-NG",
            {
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit"
            }
        );


    document.getElementById(
        "current-date"
    ).textContent = date;


    document.getElementById(
        "current-time"
    ).textContent = time;

}


// Update every second

setInterval(
    updateDateAndTime,
    1000
);


// ======================================
// SIDEBAR NAVIGATION
// ======================================

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


navLinks.forEach(
    function(link) {

        link.addEventListener(
            "click",
            function() {

                navLinks.forEach(
                    function(item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                link.classList.add(
                    "active"
                );

            }
        );

    }
);


// ======================================
// START APPLICATION
// ======================================

if (savedName) {

    showDashboard();

} else {

    welcomeScreen.classList.remove(
        "hidden"
    );

    app.classList.add(
        "hidden"
    );

}