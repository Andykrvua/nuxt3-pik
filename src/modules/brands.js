export default (fetch) => ({
  getBrandsList() {
    return fetch(`/brands?per_page=1000`);
  },
  getBrand(payload) {
    return fetch(`/brands/${payload}`);
  },
});
