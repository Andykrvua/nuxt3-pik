export const useModalStore = defineStore("modal", () => {
  const burgerMenu = ref(false);
  const catalogMenu = ref(false);
  const cart = ref(false);
  const mobileCatalogMenu = ref(false);
  const mobileFilters = ref(false);
  const auth = ref(false);
  const authType = ref("l");
  const accountMenu = ref(false);
  const entity = ref(false);
  const modalTest = ref(false);

  function toggleBurgerMenu() {
    burgerMenu.value = !burgerMenu.value;
  }
  function toggleCatalogMenu() {
    catalogMenu.value = !catalogMenu.value;
  }
  function toggleCart() {
    cart.value = !cart.value;
  }
  function toggleMobileCatalogMenu() {
    mobileCatalogMenu.value = !mobileCatalogMenu.value;
  }
  function toggleMobileFilters() {
    mobileFilters.value = !mobileFilters.value;
  }
  function toggleAuth(valAuthType = "l") {
    burgerMenu.value = false;
    auth.value = !auth.value;
    authType.value = valAuthType;
  }
  function closeAllModal() {
    burgerMenu.value = false;
    catalogMenu.value = false;
    mobileCatalogMenu.value = false;
    auth.value = false;
    authType.value = "l";
    accountMenu.value = false;
    entity.value = false;
    cart.value = false;
  }
  function toggleTestModal() {
    modalTest.value = !modalTest.value;
  }

  return {
    modalTest,
    toggleTestModal,
    burgerMenu,
    toggleBurgerMenu,
    catalogMenu,
    toggleCart,
    cart,
    auth,
    authType,
    accountMenu,
    entity,
    toggleCatalogMenu,
    mobileCatalogMenu,
    toggleMobileCatalogMenu,
    mobileFilters,
    toggleMobileFilters,
    toggleAuth,
    closeAllModal,
  };
});
