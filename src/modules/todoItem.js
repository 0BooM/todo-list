import { format, parseISO } from "date-fns";

export default class TodoItem {
  static itemId = 1;
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = format(parseISO(dueDate), "dd/MM/yyyy");
    this.priority = priority;
    this.itemId = TodoItem.itemId++;
  }
}
