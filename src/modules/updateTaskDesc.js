import renderList from "./renderList";
import findElem from "./findListItemByID";


function saveTask(element, saveBtn, input) {
    if (input.value == "") {
        console.log("blank input")
        renderList();
        return;
    }
    let taskList = JSON.parse(localStorage.getItem("tasks"));
    console.log(element.classList[0]);
    const listIndex = findElem(taskList, saveBtn.parentElement.id);
    taskList[listIndex][element.classList[0]] = input.value;
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderList();
}

function updateText(element) {
    // TO DO: Hide check mark
    const input = document.createElement("input");
    const saveBtn = document.createElement("button");
    saveBtn.classList.add("btn", "btn-secondary", "desc-saveBtn");
    saveBtn.innerText = "Save";
    saveBtn.addEventListener("click", () => saveTask(element, saveBtn, input));

    element.parentNode.insertBefore(input, element.nextSibling);
    element.remove();
    input.parentNode.insertBefore(saveBtn, input.nextSibling);
    return;
}

export default updateText;
