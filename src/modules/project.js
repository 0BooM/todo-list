import TodoItem from "./todoItem.js";

export default class Project {
  static projectId = 1;
  items = [
    new TodoItem(
      "Initial Task",
      "This is an initial task description",
      "2024-08-04"
    ),
  ];
  constructor(title) {
    this.title = title;
    this.projectId = Project.projectId++;
  }
  addItem(title, description, dueDate) {
    let newTodoItem = new TodoItem(title, description, dueDate);
    this.items.push(newTodoItem);
  }
}
