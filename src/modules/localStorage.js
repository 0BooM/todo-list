import Project from "./project.js";
import TodoItem from "./todoItem.js";

const localStorageManager = (() => {
  const saveProjects = (projects) => {
    const serializedProjects = JSON.stringify(projects);
    localStorage.setItem("projects", serializedProjects);
  };

  const loadProjects = () => {
    const serializedProjects = localStorage.getItem("projects");
    if (serializedProjects) {
      const parsedProjects = JSON.parse(serializedProjects);
      return parsedProjects.map((projectData) => {
        let project = new Project(projectData.title);
        project.items = projectData.items.map((item) => {
          let dueDate = item.dueDate.split("/").reverse().join("-");
          return new TodoItem(
            item.title,
            item.description,
            dueDate,
            item.priority,
            item.status === "done"
          );
        });
        project.projectId = projectData.projectId;
        return project;
      });
    }
    return [];
  };

  const ensureDefaultProject = () => {
    const projects = loadProjects();
    if (projects.length === 0) {
      let defaultProject = new Project("Initial project");
      defaultProject.addItem(
        "Initial element",
        "Initial description of an element inside the project",
        "2024-08-04",
        "high",
        false
      );
      saveProjects([defaultProject]);
    }
  };

  return {
    saveProjects,
    loadProjects,
    ensureDefaultProject,
  };
})();

export default localStorageManager;
