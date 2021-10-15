import "./styles/main.scss";
import "material-icons/iconfont/material-icons.css";
import "bootstrap";

import getLocalStorage from "./modules/getLocalStorage";
import setLocalStorage from "./modules/setLocalStorage";
import createTask from "./modules/createTask";

function removeTask(id) {
    let result = taskList.find((obj) => {
        return obj.id == id;
    });
    taskList.splice(taskList.indexOf(result), 1);
    setLocalStorage(taskListName, taskList);
    console.table(taskList);
    drawTasks();
}

function changeDueDate(id, date) {
    let result = taskList.find((obj) => {
        return obj.id == id;
    });
    const index = taskList.indexOf(result);
    taskList[index].dueDate = date;
    setLocalStorage(taskListName, taskList);
    drawTasks();
}

function updateTaskTitle(id, title) {
    let result = taskList.find((obj) => {
        return obj.id == id;
    });
    const index = taskList.indexOf(result);
    taskList[index].title = title;
    setLocalStorage(taskListName, taskList);
    drawTasks();
}

function updateTaskDescription(id, text) {
    let result = taskList.find((obj) => {
        return obj.id == id;
    });
    const index = taskList.indexOf(result);
    taskList[index].description = text;
    setLocalStorage(taskListName, taskList);
    drawTasks();
}

function updateTaskPriority(id, value) {
    let result = taskList.find((obj) => {
        return obj.id == id;
    });
    const index = taskList.indexOf(result);
    taskList[index].priority = value;
    setLocalStorage(taskListName, taskList);
    drawTasks();
}

const projectTitle = document.createElement("h1");
projectTitle.id = "projectTitle";
const titleContainer = document.getElementById("titleContainer");
const projectNameInput = document.createElement("input");
const projectNameInputSubmit = document.createElement("button");
projectNameInputSubmit.innerText = "Update";
projectNameInputSubmit.style.display = "none";
projectNameInputSubmit.addEventListener("click", () => {
    console.log(taskListName);
    if (projectNameInput.value != null) {
        let newProjectName = projectNameInput.value;
        setLocalStorage(newProjectName, taskList);
        localStorage.removeItem(taskListName);
        taskListName = newProjectName;
        location.reload();
    }
    
    drawProjects();
});
projectNameInput.style.display = "none";

const projectControls = document.createElement("div");
projectControls.id = "projectControls";

titleContainer.appendChild(projectNameInput);
titleContainer.appendChild(projectNameInputSubmit);
titleContainer.appendChild(projectTitle);
titleContainer.appendChild(projectControls);

const renameProject = document.createElement("button");
renameProject.innerText = "Rename Project";
renameProject.addEventListener("click", () => {
    console.log("Rename project");
    projectTitle.style.display = "none";
    projectControls.style.display = "none";
    projectNameInput.style.display = "block";
    projectNameInputSubmit.style.display = "block";
});

const deleteProject = document.createElement("button");
deleteProject.innerText = "Delete Project";
deleteProject.style.marginLeft = "1rem";
deleteProject.addEventListener("click", () => {
    localStorage.removeItem(taskListName);
    taskListName = localStorage.key(0);
    projectTitle.innerText = taskListName;
    location.reload();
});

projectControls.appendChild(renameProject);
projectControls.appendChild(deleteProject);

function drawTasks() {
    let destroy = Array.from(document.querySelectorAll(".task"));
    for (let i = 0; i < destroy.length; i++) {
        const element = destroy[i];
        element.remove();
    }
    taskList.forEach((task) => {
        const elem = document.createElement("div");
        elem.classList.add("task");
        elem.id = task.id;

        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.style.display = "none";
        titleInput.classList.add("titleInput");

        const titleUpdate = document.createElement("button");
        titleUpdate.innerText = "Update";
        titleUpdate.style.display = "none";
        titleUpdate.addEventListener("click", (event) => {
            updateTaskTitle(event.target.parentElement.id, titleInput.value);
        });

        const title = document.createElement("h3");
        title.innerText = task.title;
        title.classList.add("taskTitle");
        title.addEventListener("click", (event) => {
            event.target.style.display = "none";
            titleInput.style.display = "block";
            titleInput.select();
            titleUpdate.style.display = "block";
        });

        const checkMark = document.createElement("span");
        checkMark.innerHTML = "check_circle";
        checkMark.classList.add("material-icons-outlined", "check");
        checkMark.addEventListener("click", (event) => {
            removeTask(event.target.parentElement.id);
        });

        const descriptionInput = document.createElement("input");
        descriptionInput.type = "text";
        descriptionInput.style.display = "none";
        descriptionInput.classList.add("descriptionInput");

        const descriptionUpdate = document.createElement("button");
        descriptionUpdate.innerText = "Update";
        descriptionUpdate.style.display = "none";
        descriptionUpdate.addEventListener("click", (event) => {
            updateTaskDescription(
                event.target.parentElement.id,
                descriptionInput.value
            );
        });

        const description = document.createElement("p");
        description.classList.add("taskDescription");
        description.innerText = task.description;
        description.addEventListener("click", (event) => {
            event.target.style.display = "none";
            descriptionInput.style.display = "block";
            descriptionUpdate.style.display = "block";
            descriptionInput.select();
        });

        const dueDate = document.createElement("input");
        dueDate.type = "date";
        dueDate.classList.add("dueDate");
        if (null != task.dueDate) {
            dueDate.value = task.dueDate;
        }
        dueDate.min = new Date().toISOString().split("T")[0];
        dueDate.addEventListener("change", (event) => {
            changeDueDate(event.target.parentElement.id, event.target.value);
        });

        const priority = document.createElement("select");
        priority.classList.add("prioritySelector");
        const priorties = ["Low", "Medium", "High"];
        priorties.forEach((item) => {
            const option = document.createElement("option");
            option.innerText = item;
            priority.appendChild(option);
        });
        if (null != task.priority) {
            priority.value = task.priority;
        }
        priority.addEventListener("change", (event) => {
            updateTaskPriority(event.target.parentElement.id, priority.value);
        });

        const controlWrapper = document.createElement("div");
        controlWrapper.classList.add("controlWrapper");

        elem.appendChild(checkMark);
        elem.appendChild(title);
        elem.appendChild(titleInput);
        elem.appendChild(titleUpdate);
        elem.appendChild(description);
        elem.appendChild(descriptionInput);
        elem.appendChild(descriptionUpdate);
        elem.appendChild(controlWrapper)
        controlWrapper.appendChild(dueDate);
        controlWrapper.appendChild(priority);
        container.appendChild(elem);
    });
}

function newTask() {
    const task = createTask();
    taskList.push(task);
    setLocalStorage(taskListName, taskList);
    console.table(taskList);
    return task.id;
}

function updateTaskList() {
    taskList = getLocalStorage(taskListName);
    if (taskList == null) {
        taskList = setLocalStorage(taskListName, []);
    }
    drawTasks();
}


const container = document.getElementById("content");
let taskListName = localStorage.key(0);
if (taskListName == null) {
    taskListName = "Blank Project";
}
let taskList;
updateTaskList();


const newTaskBtn = document.createElement("button");
const buttonPanel = document.getElementById("buttons");
newTaskBtn.innerText = "Create Task";
newTaskBtn.id = "newTask";
newTaskBtn.addEventListener("click", () => {
    newTask();
    drawTasks();
});

const sidebar = document.getElementById("sidebar");

const newProjectBtn = document.createElement("button");
newProjectBtn.innerText = "New Project";
newProjectBtn.id = "newProject";
buttonPanel.appendChild(newProjectBtn);

const newProjectName = document.createElement("input");
newProjectName.type = "text";
newProjectName.placeholder = "Enter a name for your project";
newProjectName.style.display = "none";
newProjectName.classList.add("newProjectInput");
buttonPanel.appendChild(newProjectName);

const newProjectSubmit = document.createElement("button");
newProjectSubmit.innerText = "Create New Project";
newProjectSubmit.style.display = "none";
buttonPanel.appendChild(newProjectSubmit);
newProjectBtn.addEventListener("click", () => {
    newProjectSubmit.style.display = "block";
    newProjectName.style.display = "block";
    newProjectName.value = null;
    newProjectName.placeholder = "Enter a name for your project";
});

newProjectSubmit.addEventListener("click", () => {
    if (newProjectName.value != "") {
        console.log(newProjectName.value);
        setLocalStorage(newProjectName.value, []);
        drawProjects();
        newProjectName.value = undefined;
        newProjectName.style.display = "none";
        newProjectSubmit.style.display = "none";
    }
});
buttonPanel.appendChild(newTaskBtn);

function drawProjects() {
    const oldElems = Array.from(document.getElementsByClassName("projectSelector"));
    oldElems.forEach((elem) => elem.remove());

    let projectList = [];
    for (let i = 0; i < Object.entries(localStorage).length; i++) {
        projectList.push(Object.entries(localStorage)[i][0]);
    }

    projectList.forEach((project) => {
        const projectBtn = document.createElement("button");
        projectBtn.innerText = project;
        projectBtn.classList.add("projectSelector");
        projectBtn.addEventListener("click", (event) => {
            taskListName = event.target.innerText;
            updateTaskList();
            projectTitle.innerText = taskListName;
        });
        sidebar.appendChild(projectBtn);
    });
}

projectTitle.innerText = taskListName;
drawProjects();