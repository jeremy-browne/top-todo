import addNewTask from "./newTask";

function sidebar() {
    const div = document.createElement("div");
    div.id = "sidebar";
    div.classList.add("sidebar", "col-sm");
    const btnClasses = ["btn", "btn-primary", "nav-item"]
    const newItem = document.createElement("button");
    newItem.innerText = "Add item";
    newItem.addEventListener("click", () => {
        console.log("Adding a new item");
        addNewTask(document.getElementById("cardArea"));
    })
    btnClasses.forEach(item => {
        newItem.classList.add(item);
    });
    div.appendChild(newItem);

    const newProject = document.createElement("button");
    newProject.innerText = "New Project";
    newProject.addEventListener("click", () => {
        console.log("Adding a new project");
    })
    btnClasses.forEach(item => {
        newProject.classList.add(item);
    });
    div.appendChild(newProject);

    return div;
}

export default sidebar;
