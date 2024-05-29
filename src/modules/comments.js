export default (fetch) => ({
  addReview(payload) {
    return fetch(`/comments/${payload.productId}`, {
      body: payload.body,
      method: "post",
    });
  },
  getReviews(payload) {
    return fetch(`/comments/${payload}`);
  },
  addProductQuestion(payload) {
    return fetch(`/questions/${payload.productId}`, {
      body: payload.body,
      method: "post",
    });
  },
  getProductQuestion(payload) {
    return fetch(`/questions/${payload}`);
  },
});
