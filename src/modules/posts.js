export default (fetch) => ({
  getPosts(payload) {
    return fetch(
      `/posts?` +
        new URLSearchParams({
          type: payload.type,
          page: payload.page,
          per_page: payload.per_page,
        })
    );
  },
});
