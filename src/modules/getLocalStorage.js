function getLocalStorage(itemName) {
    return JSON.parse(localStorage.getItem(itemName));
}

export default getLocalStorage;