export default (fetch) => ({
  getCatThree() {
    return fetch(`/categories/tree`);
  },
  getCategory(payload) {
    return fetch(`/categories/${payload}`);
  },
});
