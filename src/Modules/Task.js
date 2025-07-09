class Task {
  name;
  slug;
  image;
  id;
  createdAt;
  updatedAt;
  status;
  constructor(name, slug, image, id, createdAt, updatedAt, status = "", Details = "") {
    this.name = name;
    this.slug = slug;
    this.image = image;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.status = status;
    this.Details = Details;
  }
}
export default Task;
