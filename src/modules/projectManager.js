import Project from "./project.js";
import todoItemManager from "./todoItemManager.js";
//Project manager is about managin the navbar on the left side. It shows users' projects and manages adding them and also showing their contents

let projects = [
  new Project("Sample Project 1"),
  new Project("Sample Project 2"),
];
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

  //Operates on Add project button
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
  //Makes navbar responsible for adding another projects
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

      showProjectsContent(project, projectDiv);
    });
  }

  function showProjectsContent(project, projectDiv) {
    projectDiv.addEventListener("click", () => {
      console.log(project);
      console.log("Project ID:", project.projectId);
      console.log("Project Title:", project.title);
      let projectContent = document.querySelector(".project-content");
      projectContent.innerHTML = "";
      let todoList = document.createElement("ul");
      todoList.classList.add("to-do-list");
      projectContent.appendChild(todoList);

      let projectItems = project.items;
      projectItems.forEach((item) => {
        let todoElement = todoItemManager.renderItem(item);
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
    });
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
