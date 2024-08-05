import Project from "./project.js";
import todoItemManager from "./todoItemManager.js";

let projects = [
  new Project("Sample Project 1"),
  new Project("Sample Project 2"),
];
let activeProject = null; // Dodano zmienną przechowującą aktualnie aktywny projekt

const ProjectManager = (function () {
  function showInputOnAddButtonClick() {
    let addProjectBtn = document.querySelector(".add-project");
    let displaySettingBtn = document.querySelector(".display-setting");
    displaySettingBtn.style.display = "none";
    addProjectBtn.addEventListener("click", () => {
      if (displaySettingBtn.style.display == "none")
        displaySettingBtn.style.display = "inherit";
      else displaySettingBtn.style.display = "none";
      console.log(displaySettingBtn.style.display);
    });
  }

  function addNewProject() {
    let displaySettingBtn = document.querySelector(".display-setting");
    let projectName = document.querySelector("#add-project-input");
    let addProjectBtn = document.querySelector(".add-project");
    addProjectBtn.addEventListener("click", () => {
      if (
        displaySettingBtn.style.display == "inherit" &&
        projectName.value.length > 1
      ) {
        let newProject = new Project(projectName.value);
        projects.push(newProject);
        console.log(projects);
        projectName.value = "";
        showProjectsOnNavbar();
      }
    });
  }

  function showProjectsOnNavbar() {
    let projectsList = document.querySelector(".projects-list");
    projectsList.innerHTML = "";

    projects.forEach((project) => {
      let projectDiv = document.createElement("div");
      projectDiv.classList.add("project");

      let icon = document.createElement("span");
      icon.classList.add("material-symbols-outlined");
      icon.textContent = "edit";

      let projectName = document.createElement("h3");
      projectName.textContent = project.title;

      projectDiv.appendChild(icon);
      projectDiv.appendChild(projectName);
      projectsList.appendChild(projectDiv);

      projectDiv.addEventListener("click", () =>
        setActiveProject(project, projectDiv)
      );
    });
  }

  function setActiveProject(project, projectDiv) {
    // activeProject = project;
    let projectContent = document.querySelector(".project-content");
    projectContent.innerHTML = "";
    let todoList = document.createElement("ul");
    todoList.classList.add("to-do-list");
    projectContent.appendChild(todoList);

    let projectItems = project.items;
    projectItems.forEach((item) => {
      let todoElement = todoItemManager.renderItem(item, project, todoList);
      todoList.appendChild(todoElement);
    });

    let addItemBtn = document.createElement("button");
    addItemBtn.classList.add("add-item");
    addItemBtn.innerHTML = `<span class="material-symbols-outlined"> add </span>
      <p>Add item</p>`;
    projectContent.appendChild(addItemBtn);

    todoItemManager.showAddItemDialog(addItemBtn);
    todoItemManager.closeAddItemDialog();
    todoItemManager.submitInputsDialog(project, todoList);
  }

  function init() {
    showProjectsOnNavbar();
    addNewProject();
    showInputOnAddButtonClick();
  }

  return {
    showInputOnAddButtonClick,
    addNewProject,
    init,
  };
})();

export default ProjectManager;
export { projects };
