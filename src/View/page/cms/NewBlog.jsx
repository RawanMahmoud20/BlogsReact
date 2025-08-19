let NewBlog = () => {
  return (
    <section className="content">
      <div className="content-header">
        <span>New Blog</span>
      </div>
      <div className="content-body">
        <section className="create-item">
          <form className="create-item_form">
            <div className="create-item_form_content">
              <section className="create-item_left">
                <div className="form-group">
                  <label htmlFor="blog-title">Blog Title</label>
                  <input
                    className="form-input"
                    type="text"
                    name="blog-title"
                    id="blog-title"
                    placeholder="Blog title"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="blog-title">Publisher Name</label>
                  <input
                    type="text"
                    className="form-input"
                    name="publisher-name"
                    id="publisher-name"
                    placeholder="Publisher Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="categories">Category</label>
                  <select
                    name="categories"
                    id="categories"
                    className="form-select"
                  >
                    <option value="c-1">Category 1</option>
                    <option value="c-2">Category 2</option>
                    <option value="c-3">Category 3</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="blog-title">Image</label>
                  <input
                    type="file"
                    className="form-input file-input"
                    name="publisher-name"
                    id="publisher-name"
                    placeholder="Publisher Name"
                  />
                </div>
              </section>
              <section className="create-item_right">
                <div className="form-group">
                  <label htmlFor="blog-description">Description</label>
                  <textarea
                    className="form-textarea"
                    id="blog-description"
                    rows="11"
                    placeholder="Write description"
                  ></textarea>
                </div>
              </section>
            </div>
            <div className="create-item_form_actions">
              <button className="form-action" type="reset">
                Cancel
              </button>
              <button className="form-action done-action" type="submit">
                Save
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};
export default NewBlog;
