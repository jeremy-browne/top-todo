import addNewTask from "./newTask";

function topNav() {
    const nav = document.createElement("nav");
    nav.classList.add("navbar", "navbar-expand-lg", "navbar-light", "bg-light", "topnav");
    
    const home = document.createElement("a");
    home.classList.add("navbar-brand");
    home.href = "#";
    home.innerText = "TO DO: To do"
    nav.appendChild(home);

    const btnClasses = ["btn", "btn-primary", "nav-item"];
    const newItem = document.createElement("button");
    newItem.innerText = "Add item";
    newItem.addEventListener("click", () => {
        console.log("Adding a new item");
        addNewTask();
    })
    btnClasses.forEach(item => {
        newItem.classList.add(item);
    });
    nav.appendChild(newItem);

    return nav;
}

export default topNav;