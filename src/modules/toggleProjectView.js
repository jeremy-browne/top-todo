function toggleProjectView(tasks) {
    console.log(tasks);
    tasks.forEach(card => {
        console.log(card);
        if (card.style.display != "none") {
            card.style.display = "none";
            return
        } else {
            card.style.display = "flex";
        }
    });
}

export default toggleProjectView;