import todoItem from "./todoItem.js";

export default class Project {
  static projectId = 1;
  static items = [];
  constructor(title) {
    this.title = title;
    this.projectId = Project.projectId++;
  }
  addItem(title, description, dueDate) {
    let newTodoItem = new todoItem(title, description, dueDate);
    items.push(newTodoItem);
  }
}
