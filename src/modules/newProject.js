function addNewProject(parentElem) {
    const div = document.createElement("div");
    div.classList.add("card", "project");
    const content = document.createElement("p");
    content.innerText = "This is a project"
    div.appendChild(content);

    parentElem.appendChild(div);
}

export default addNewProject;