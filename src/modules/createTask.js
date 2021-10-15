import uuidv4 from "./uuid4";

const createTask = () => {
    const task = {};
    task.id = uuidv4();
    task.title = "New Task";
    task.parent = null;
    task.priority = null;
    task.dueDate = null;
    task.children = null;
    task.description = "Enter details";

    return task;
};

export default createTask;