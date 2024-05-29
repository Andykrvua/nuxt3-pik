export const saveViewedProduct = (product, locale) => {
  const addProductToLocalStorage = (product) => {
    const storedProducts =
      JSON.parse(localStorage.getItem(`storedProducts-${locale}`)) || [];

    if (storedProducts.length >= 20) {
      storedProducts.shift();
    }

    storedProducts.unshift(product);
    localStorage.setItem(
      `storedProducts-${locale}`,
      JSON.stringify(storedProducts)
    );
  };

  const getAllProductsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(`storedProducts-${locale}`)) || [];
  };

  const updateProductInLocalStorage = (productId, updatedProductData) => {
    const storedProducts =
      JSON.parse(localStorage.getItem(`storedProducts-${locale}`)) || [];

    const index = storedProducts.findIndex(
      (product) => product.id === productId
    );
    if (index !== -1) {
      storedProducts[index] = {
        ...storedProducts[index],
        ...updatedProductData,
      };
      localStorage.setItem(
        `storedProducts-${locale}`,
        JSON.stringify(storedProducts)
      );
    }
  };

  const storedProducts = getAllProductsFromLocalStorage();
  const existingProductIndex = storedProducts.findIndex(
    (item) => item.id === product.id
  );

  if (existingProductIndex !== -1) {
    updateProductInLocalStorage(product.id, product);
  } else {
    addProductToLocalStorage(product);
  }
};
