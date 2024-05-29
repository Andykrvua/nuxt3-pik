export default (fetch) => ({
  test() {
    return fetch(`https://jsonplaceholder.typicode.com/todos/1`);
  },
  getCart() {
    return fetch(`/carts`);
  },
  addCart(payload) {
    return fetch(`/carts/${payload.id}/add?quantity=${payload.quantity}`, {
      method: "post",
    });
  },
  // removeCart(payload) {
  //   return fetch(`/carts/${payload.id}/remove?quantity=${payload.quantity}`, {
  //     method: "post",
  //   });
  // },
  removeCart(payload) {
    return fetch(`/carts/${payload.id}/remove`, {
      body: {
        quantity: Number(payload.quantity),
      },
      method: "post",
    });
  },

  // codeVerified(payload) {
  //   return fetch(
  //     `/verify?` +
  //       new URLSearchParams({
  //         code: payload.code,
  //         email: payload.email,
  //       })
  //   );
  // },
});
