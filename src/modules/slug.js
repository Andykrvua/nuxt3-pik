export default (fetch) => ({
  getSlug(payload) {
    return fetch(`/slug/${payload}`);
  },
});
