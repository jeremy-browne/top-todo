import topNav from "./modules/topNav";
import "./styles/main.scss";
import "material-icons/iconfont/material-icons.css";
import "bootstrap";
import renderList from "./modules/renderList";

let globalList = JSON.parse(localStorage.getItem("tasks"));
console.log(globalList);

const content = document.getElementById("content");
const cardArea = document.createElement("div");
cardArea.id = "cardArea";
content.classList.add("container-fluid");
const topNavElem = topNav(globalList);
content.appendChild(topNavElem)
content.appendChild(cardArea);
renderList(cardArea);