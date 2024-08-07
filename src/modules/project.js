import TodoItem from "./todoItem.js";

export default class Project {
  static projectId = 1;
  items = [];
  constructor(title) {
    this.title = title;
    this.projectId = Project.projectId++;
  }
  addItem(
    title,
    description,
    dueDate = "01/01/1999",
    priority,
    checked = false
  ) {
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
  toJSON() {
    return {
      title: this.title,
      projectId: this.projectId,
      items: this.items,
    };
  }
}
