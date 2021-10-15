import getLocalStorage from "./getLocalStorage";

function setLocalStorage(itemName, arr) {
    if (itemName == null || arr == null) {
        return;
    }
    localStorage.setItem(itemName, JSON.stringify(arr));
    return getLocalStorage(itemName);
}

export default setLocalStorage;