export default class Project {
  static projectId = 1;
  static items = [];
  constructor(title) {
    this.title = title;
    this.projectId = Project.projectId++;
  }
}
