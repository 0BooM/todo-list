import TodoItem from "./todoItem.js";

export default class Project {
  static projectId = 1;
  items = [
    new TodoItem(
      "Initial Task",
      "This is an initial task description",
      "2024-08-04",
      "high",
      "done"
    ),
  ];
  constructor(title) {
    this.title = title;
    this.projectId = Project.projectId++;
  }
  addItem(title, description, dueDate, priority, checked = false) {
    let newTodoItem = new TodoItem(
      title,
      description,
      dueDate,
      priority,
      checked
    );
    this.items.push(newTodoItem);
    console.log(this.items);
  }
}
