export const findCatInCatTree = (cat, slug, level = 1) => {
  for (const category of cat) {
    if (category.slug === slug) {
      return { level, category };
    }

    if (category.children) {
      const childLevel = findCatInCatTree(category.children, slug, level + 1);
      if (childLevel?.level) {
        return childLevel;
      }
    }
  }

  return null;
};
