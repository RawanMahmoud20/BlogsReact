class Task {
  name;
  slug;
  image;
  id;
  createdAt;
  updatedAt;
  status;
  constructor(
    name,
    slug,
    image,
    id,
    createdAt,
    updatedAt,
    status = "",
    Details = ""
  ) {
    this.name = name;
    this.slug = slug;
    this.image = image;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.status = status;
    this.Details = Details;
  }

  fromJSON(jsonObject) {
    this.name = jsonObject.name;
    this.slug = jsonObject.slug;
    this.image = jsonObject.image;
    this.id = jsonObject.id;
    this.status = jsonObject.createdAt;
    this.status = jsonObject.updatedAt;
    this.status = jsonObject.status;
    return this;    
  }
}
export default Task;
