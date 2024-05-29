export const findBlockInPageData = (arr, type, slug) => {
  if (arr && arr.length) {
    for (let obj of arr) {
      if (obj.type === type && obj.slug === slug) {
        return obj.data;
      }
    }
  }
  return null;
};
