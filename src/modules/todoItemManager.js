import { projects } from "./projectManager.js";

const todoItemManager = (() => {
  function renderItem(item) {
    let todoElement = document.createElement("li");
    todoElement.classList.add("to-do-element");
    todoElement.innerHTML = `<div class="sections">
            <div class="left-section">
              <input type="checkbox" class="to-do-checbox" />
              <p>${item.title}</p>
            </div>
            <div class="right-section">
              <p class="due-date">Due: 04-08-2024</p>
              <span class="remove-icon material-symbols-outlined">
                delete
              </span>
            </div>
          </div>
          <div class="description">
            ${item.title}
          </div>`;
    return todoElement;
  }
  return {
    renderItem,
  };
})();

export default todoItemManager;
