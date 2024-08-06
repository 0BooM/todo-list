import { format, parseISO } from "date-fns";

export default class TodoItem {
  static itemId = 1;
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = format(parseISO(dueDate), "dd/MM/yyyy");
    this.itemId = TodoItem.itemId++;
  }
}
