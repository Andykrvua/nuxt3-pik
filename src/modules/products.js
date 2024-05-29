export default (fetch) => ({
  getProducts(payload) {
    return fetch(
      `/products?` +
        new URLSearchParams({
          per_page: payload.per_page,
          page: payload.page,
        })
    );
  },
  getProduct(payload) {
    return fetch(`/products/${payload}`);
  },
});
