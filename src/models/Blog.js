class Blog{
  #id;
  #title;
  #briefInfo;

  constructor(id, title, briefInfo) {
    this.#id = id;
    this.#title = title;
    this.#briefInfo = briefInfo;
  }
  get _id() {
    return this.#id;
}
  get _title() {
    return this.#title;
  }

  get _briefInfo() {
    return this.#briefInfo;
  }
}
export default Blog;