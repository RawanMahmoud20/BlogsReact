class Blog{
  #id;
  #title;
  #publisherName;
  #categoryId;
  #image;
  #description;
  

  constructor(id, title, publisherName, categoryId ,image, description) {
    this.#id = id;
    this.#title = title;
    this.#publisherName = publisherName;
    this.#categoryId = categoryId;
    this.#image = image;
    this.#description = description;

    this.#image = image;
        this.#categoryId = categoryId;

  }
  get _id() {
    return this.#id;
  }
  get _title() {
    return this.#title;
  }
  get _publisherName() {
    return this.#publisherName;
  }
  get _description() {
    return this.#description;
  }
    get image() {
    return this.#image;
  }
  get _categoryId() {
    return this.#categoryId;
  }

  
  
  
}
export default Blog;