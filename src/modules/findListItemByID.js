function findElem(list, id) {
    return list.findIndex((item) => item.id == id);
}

export default findElem;