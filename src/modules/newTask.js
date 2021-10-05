import renderList from "./renderList";

function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		let r = (Math.random() * 16) | 0, v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

const newTask = () => {
    const task = {};
    task.id = uuidv4();
    task.taskTitle = "New Task"
    task.parent = undefined;
    task.children = undefined;
    task.description = "Enter details";

    return task;
}

function addNewTask() {
    let localStore = JSON.parse(localStorage.getItem("tasks"));
    localStore.push(newTask());
    console.table(localStore);
    localStorage.setItem("tasks", JSON.stringify(localStore));
    renderList(document.getElementById("cardArea"));
}

export default addNewTask;