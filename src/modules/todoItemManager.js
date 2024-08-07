import { projects } from "./projectManager.js"; // Import projects from projectManager
import localStorageManager from "./localStorage.js";
import { format, parseISO } from "date-fns";

const todoItemManager = (() => {
  function renderItem(item, project, todoList) {
    let todoElement = document.createElement("li");
    todoElement.classList.add("to-do-element");

    todoElement.classList.add(item.priority + "-priority");
    if (item.status === "done") {
      todoElement.classList.add("todo-done");
    }

    let sectionDiv = document.createElement("div");
    sectionDiv.classList.add("sections");

    let leftSection = document.createElement("div");
    leftSection.classList.add("left-section");
    leftSection.innerHTML = `<input type="checkbox" class="to-do-checbox" />
              <p>${item.title}</p>`;

    let rightSection = document.createElement("div");
    rightSection.classList.add("right-section");
    rightSection.innerHTML = `<p class="due-date">Due: ${item.dueDate}</p>`;

    let removeBtn = document.createElement("span");
    removeBtn.classList.add("remove-icon", "material-symbols-outlined");
    removeBtn.innerHTML = `delete`;
    rightSection.append(removeBtn);

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
    removeBtn.addEventListener("click", () => {
      removeItem(project, item, todoElement, todoList);
    });

    let checkbox = leftSection.querySelector(".to-do-checbox");
    checkDoneItem(todoElement, checkbox);
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

  function checkDoneItem(todoElement, checkbox) {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        todoElement.classList.add("todo-done");
      } else {
        todoElement.classList.remove("todo-done");
      }
    });
  }
  function showAddItemDialog(addItemBtn) {
    let dialog = document.querySelector("#add-item-dialog");
    addItemBtn.addEventListener("click", () => {
      dialog.showModal();
      console.log(addItemBtn);
    });
  }

  function closeAddItemDialog() {
    let closeDialogBtn = document.querySelector(".close-icon");
    let dialog = document.querySelector("#add-item-dialog");
    closeDialogBtn.addEventListener("click", () => {
      if (dialog.open) dialog.close();
    });
  }

  function submitInputsDialog(project, todoList) {
    let ulTodoList = document.querySelector(".to-do-list");

    let submitBtn = document.querySelector("#submit-button");
    let dialog = document.querySelector("#add-item-dialog");

    let form = document.querySelector("form");
    let itemName = document.querySelector("#todo-title");
    let dueDate = document.querySelector("#todo-duedate");
    let itemPriority = document.querySelector("#todo-priority");
    let itemDesc = document.querySelector("#todo-desc");
    let itemChecked = form.querySelector(".to-do-checbox"); // Ensure to query within the form

    let newSubmitBtn = submitBtn.cloneNode(true);
    submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);

    newSubmitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (itemName.value !== "" && dueDate.value !== "") {
        project.addItem(
          itemName.value,
          itemDesc.value,
          dueDate.value,
          itemPriority.value,
          itemChecked ? itemChecked.checked : false
        );

        localStorageManager.saveProjects(projects);
        form.reset();
        dialog.close();
        renderAllItems(ulTodoList, project);
      }
    });
  }

  function renderAllItems(ulTodoList, project) {
    ulTodoList.innerHTML = "";
    let projectItems = project.items;
    projectItems.forEach((item) => {
      let todoElement = todoItemManager.renderItem(item, project, ulTodoList);
      ulTodoList.appendChild(todoElement);
    });
  }

  function removeItem(project, item, todoElement, todoList) {
    const itemIndex = project.items.indexOf(item);
    if (itemIndex > -1) {
      project.items.splice(itemIndex, 1);
      localStorageManager.saveProjects(projects);
    }
    todoList.removeChild(todoElement);
  }

  return {
    renderItem,
    showAddItemDialog,
    closeAddItemDialog,
    submitInputsDialog,
    removeItem,
  };
})();

export default todoItemManager;
