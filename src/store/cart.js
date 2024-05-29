export const useCartStore = defineStore("cart", () => {
  const cart = ref({});

  function setCart(obj) {
    cart.value = { ...obj };
  }

  return {
    cart,
    setCart,
  };
});
