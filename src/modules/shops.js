export default (fetch) => ({
  getShops() {
    return fetch(`/shops`);
  },
});
