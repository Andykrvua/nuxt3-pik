export default (fetch) => ({
  toggleFavorite(payload) {
    return fetch(`/my/favorites/products/${payload}`, {
      method: "post",
    });
  },
  getFavorite() {
    return fetch(`/my/favorites/products`);
  },
});
