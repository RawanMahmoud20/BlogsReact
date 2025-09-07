export default class Category {
#id;
#name;
#slug;

    constructor(id, name, slug) {
    this.#id = id;
    this.#name = name;
    this.#slug = slug;
  };
  get _id(){
    return this.#id;
  };
  get _name(){
    return this.#name;
  };
  get _slug(){
    return this.#slug;
  };
};
// export default Category;
