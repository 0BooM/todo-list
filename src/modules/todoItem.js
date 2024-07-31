class TodoItem {
  static itemId = 1;
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.itemId = TodoItem.itemId++;
  }
}
