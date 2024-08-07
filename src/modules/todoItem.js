import { format, parseISO, isValid } from "date-fns";

export default class TodoItem {
  static itemId = 1;
  constructor(title, description, dueDate, priority, checked = false) {
    let parsedDate = parseISO(dueDate);
    if (!isValid(parsedDate)) {
      parsedDate = new Date(dueDate);
    }
    this.title = title;
    this.description = description;
    this.dueDate = isValid(parsedDate)
      ? format(parsedDate, "dd/MM/yyyy")
      : dueDate;
    this.priority = priority;
    this.status = checked ? "done" : "not-done";
    this.itemId = TodoItem.itemId++;
  }
  toJSON() {
    return {
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      status: this.status,
      itemId: this.itemId,
    };
  }
}
