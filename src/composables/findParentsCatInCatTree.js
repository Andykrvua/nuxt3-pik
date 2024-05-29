export const findParentsCatInCatThree = (categories, targetSlug) => {
  function searchInCategories(
    categories,
    targetSlug,
    parentSlug = "",
    parentName = ""
  ) {
    for (let category of categories) {
      if (category.slug === targetSlug) {
        return { level: 1, slug: category.slug, name: category.name };
      } else if (category.children) {
        for (let child of category.children) {
          if (child.slug === targetSlug) {
            return {
              level: 2,
              slug: child.slug,
              name: child.name,
              parentSlug: category.slug,
              parentName: category.name,
              grandParentSlug: null,
              grandParentName: null,
            };
          } else if (child.children) {
            for (let grandChild of child.children) {
              if (grandChild.slug === targetSlug) {
                return {
                  level: 3,
                  slug: grandChild.slug,
                  name: grandChild.name,
                  parentSlug: child.slug,
                  parentName: child.name,
                  grandParentSlug: category.slug,
                  grandParentName: category.name,
                };
              }
            }
          }
        }
      }
    }
    return null;
  }

  return searchInCategories(categories, targetSlug);
};
