export const useStaticStore = defineStore("static", () => {
  const lang = ref("");
  const cart = ref({ quantity: 0, total: 0 });
  const favorites = ref(0);
  const menu = ref({
    about: false,
    footer: false,
    header: false,
    info: false,
    popular_categories: false,
  });
  const pages_info = ref(false);
  const pages_legal = ref(false);
  const posttypes = ref(false);
  const phones = ref(false);
  const socials = ref(false);
  const email = ref("");

  function setLang(val) {
    lang.value = val;
  }

  function setFavorites(bool) {
    if (bool) {
      favorites.value += 1;
    } else {
      favorites.value =
        favorites.value > 0 ? favorites.value - 1 : favorites.value;
    }
  }

  function setCartData(obj) {
    cart.value.quantity = Number(obj.quantity) || 0;
    cart.value.total = Number(obj.total) || 0;
  }

  function setStaticData(obj) {
    if (obj?.cart) {
      cart.value.quantity = Number(obj.cart.quantity) || 0;
      cart.value.total = Number(obj.cart.total) || 0;
    }

    favorites.value = Number(obj.favorites) || 0;

    if (obj.menu) {
      if (
        obj.menu.about &&
        obj.menu.about.items &&
        obj.menu.about.items.length
      ) {
        menu.value.about = {
          name: obj.menu.about.name,
          items: [...obj.menu.about.items],
        };
      }
      if (
        obj.menu.footer &&
        obj.menu.footer.items &&
        obj.menu.footer.items.length
      ) {
        menu.value.footer = {
          name: obj.menu.footer.name,
          items: [...obj.menu.footer.items],
        };
      }
      if (
        obj.menu.header &&
        obj.menu.header.items &&
        obj.menu.header.items.length
      ) {
        menu.value.header = {
          name: obj.menu.header.name,
          items: [...obj.menu.header.items],
        };
      }
      if (obj.menu.info && obj.menu.info.items && obj.menu.info.items.length) {
        menu.value.info = {
          name: obj.menu.info.name,
          items: [...obj.menu.info.items],
        };
      }
      if (
        obj.menu.popular_categories &&
        obj.menu.popular_categories.items &&
        obj.menu.popular_categories.items.length
      ) {
        menu.value.popular_categories = {
          name: obj.menu.popular_categories.name,
          items: [...obj.menu.popular_categories.items],
        };
      }
    }

    if (obj.pages_info && obj.pages_info.length) {
      pages_info.value = [...obj.pages_info];
    }

    if (obj.pages_legal && obj.pages_legal.length) {
      pages_legal.value = [...obj.pages_legal];
    }

    if (obj.posttypes && obj.posttypes.length) {
      posttypes.value = [...obj.posttypes];
    }

    if (obj.blocks && obj.blocks.length) {
      const block = findBlockInPageData(
        obj.blocks,
        blockTypes.contacts,
        "contacts"
      );

      if (block.phones && block.phones.length) {
        phones.value = [...block.phones];
      }

      if (block.socials && block.socials.length) {
        socials.value = [...block.socials];
      }

      if (block.email) {
        email.value = block.email || "";
      }
    }
  }

  return {
    setLang,
    setCartData,
    lang,
    setStaticData,
    setFavorites,
    cart,
    favorites,
    menu,
    pages_info,
    pages_legal,
    posttypes,
    phones,
    socials,
    email,
  };
});
