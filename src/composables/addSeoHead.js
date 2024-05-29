export const addSeoHead = (seo, seoSlug, route) => {
  // TODOS: add check ?
  const seoHead = {
    ...(seo.title && {
      title: seo.title,
    }),
    ...(seo.description && {
      description: seo.description,
    }),
    ...(seo.keywords && {
      keywords: seo.keywords,
    }),
    ...(seo.og_site_name && {
      ogSiteName: seo.og_site_name,
    }),
    ...(seo.og_title && {
      ogTitle: seo.og_title,
    }),
    ...(seo.og_description && {
      ogDescription: seo.og_description,
    }),
    ...(seo.og_image && {
      ogImage: seo.og_image,
    }),
    ...(seo.twitter_title && {
      twitterTitle: seo.twitter_title,
    }),
    ...(seo.twitter_description && {
      twitterDescription: seo.twitter_description,
    }),
    ...(seo.robots && {
      robots: seo.robots,
    }),
  };

  useSeoMeta(seoHead);

  // TODOS: fix slug
  route.meta.nuxtI18n = {
    uk: {
      slug: seoSlug?.uk || seoSlug,
    },
    ru: {
      slug: seoSlug?.ru || seoSlug,
    },
  };

  const head = useLocaleHead({
    identifierAttribute: "id",
    addSeoAttributes: true,
  });

  useHead({
    link: head.value.link,
  });
};
