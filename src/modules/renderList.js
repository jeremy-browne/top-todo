import updateText from "./updateTaskDesc";

function findElem(list, id) {
    return list.findIndex((item) => item.id == id);
}

function completeTask(taskID) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    const taskIndex = findElem(tasks, taskID);
    console.log(taskIndex);
    tasks.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderList();
}

function renderList() {
    const cardArea = document.getElementById("cardArea");
    cardArea.innerHTML = "";
    let globalList = JSON.parse(localStorage.getItem("tasks"));
    let dragStart, dragEnd;

    globalList.forEach((item) => {
        const elem = document.createElement("div");
        const checkMark = document.createElement("span");
        checkMark.innerHTML = "check_circle";
        checkMark.classList.add("material-icons-outlined", "check", "draggable");
        checkMark.addEventListener("click" , (event) => {
            console.log(event.target.parentElement.id);
            completeTask(event.target.parentElement.id);
        });
        elem.appendChild(checkMark);

        elem.id = item.id;
        elem.draggable = true;
        elem.addEventListener("dragstart", (event) => {
            const dragElem = event.composedPath()[0].id;
            dragStart = dragElem;
            elem.classList.add("dragging");
        });
        elem.addEventListener("dragend", () => {
            elem.classList.remove("dragging");
            const parentIndex = findElem(globalList, dragEnd)
            const childIndex = findElem(globalList, dragStart)
            console.log("Parent Index:", parentIndex);
            console.log("Child Index:", childIndex);
            globalList[parentIndex].children = globalList[childIndex];
            globalList.splice(childIndex, 1);
            console.log(globalList[parentIndex]);
            localStorage.setItem("tasks", JSON.stringify(globalList));
            renderList();
        });
        elem.addEventListener("dragover", (event) => {
            const parent = event.composedPath()[1].id;
            if (parent != "cardArea") {
                dragEnd = parent;
            }
        });
        elem.classList.add("card");
        for (const property in item) {
            if (!(property == "id" || property == "parent" || property == "children")) {
                let text = document.createElement("p");
                if (property == "taskTitle") {
                    text = document.createElement("h5");
                    text.classList.add(property);
                    text.addEventListener("click", (event) => {
                        updateText(event.target, globalList);
                    });
                }
                if (property == "description") {
                    text.classList.add(property);
                    text.addEventListener("click", (event) => {
                        updateText(event.target, globalList);
                    });
                }
                text.innerText = item[property];
                elem.appendChild(text);
            }
        }
        cardArea.appendChild(elem);
    });
}

export default renderList;