import { projects } from "./projectManager.js";

const todoItemManager = (() => {
  function renderItem(item) {
    let todoElement = document.createElement("li");
    todoElement.classList.add("to-do-element");
    let sectionDiv = document.createElement("div");
    sectionDiv.classList.add("sections");

    let leftSection = document.createElement("div");
    leftSection.classList.add("left-section");
    leftSection.innerHTML = `<input type="checkbox" class="to-do-checbox" />
              <p>${item.title}</p>`;

    let rightSection = document.createElement("div");
    rightSection.classList.add("right-section");
    rightSection.innerHTML = `<p class="due-date">Due: 04-08-2024</p>
              <span class="remove-icon material-symbols-outlined">
                delete
              </span>`;

    let expandBtn = document.createElement("span");
    expandBtn.classList.add("expand-icon", "material-symbols-outlined");
    expandBtn.innerHTML = `expand_circle_down`;
    rightSection.append(expandBtn);

    let desc = document.createElement("div");
    desc.classList.add("description");
    desc.innerHTML = `${item.description}`;

    todoElement.appendChild(sectionDiv);
    sectionDiv.appendChild(leftSection);
    sectionDiv.appendChild(rightSection);

    expandDescOfItem(todoElement, desc, expandBtn);
    return todoElement;
  }

  function expandDescOfItem(todoElement, desc, expandBtn) {
    expandBtn.addEventListener("click", () => {
      if (desc.parentNode) {
        todoElement.removeChild(desc);
        expandBtn.innerHTML = `expand_circle_down`;
      } else {
        todoElement.appendChild(desc);
        expandBtn.innerHTML = `expand_circle_up`;
      }
    });
  }
  return {
    renderItem,
  };
})();

export default todoItemManager;
