export default (fetch) => ({
  get() {
    return fetch(`/app/content`);
  },
});
