<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

// function parseCustomURLParams(url) {
//   const params = new URLSearchParams();
//   const pairs = url.split(";");

//   pairs.forEach((pair) => {
//     const [key, value] = pair.split("=");
//     params.append(key.trim(), value.trim());
//   });

//   return params;
// }
console.log("posts comp");
const nuxtApp = useNuxtApp();
const route = useRoute();
const router = useRouter();
console.log(
  "parseURLParams",
  route.params.sluglvl2 ? parseCustomURLParams(route.params.sluglvl2) : null
);
const params = route.params.sluglvl2
  ? parseCustomURLParams(route.params.sluglvl2)
  : null;
const page = ref(Number(params?.get("page")) || 1);
const per_page = ref(2);

const paginationHandler = async (page) => {
  if (page === 1) {
    await navigateTo(`/${route.params.slug}/`);
  } else {
    await navigateTo(`/${route.params.slug}/page=${page}/`);
  }
};

const { data: posts, error } = await useAsyncData(
  `${route.params.slug}-${page.value}`,
  () =>
    $api().posts.getPosts({
      type: props.data?.data?.slug,
      page: page.value,
      per_page: per_page.value,
      // per_page: defaultNumberOfPostsEntries,
    }),
  {
    // watch: [page],
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);

if (error.value) {
  console.log("fetchError", error.value.data);
}

console.log("props.data", props.data);
console.log("posts", posts);
</script>

<template>
  <main class="page news-blog-all">
    <PagesPostsLayout :title="props.data?.seo?.h1 || props.data?.data.name">
      <template #cards v-if="posts?.data && posts.data.length">
        <SlidersNewsCard
          :variant="newsSlider[props.data?.data?.template]"
          v-for="item in posts.data"
          :key="item.id"
          :data="item"
        />
      </template>
      <template #pagination>
        <VueAwesomePaginate
          v-if="per_page < Number(posts.meta.total)"
          :total-items="posts?.meta.total"
          :items-per-page="per_page"
          :max-pages-shown="5"
          v-model="page"
          :on-click="paginationHandler"
          type="link"
          :hide-prev-next-when-ends="true"
          :link-url="`/${route.params.slug}/page=[page]/`"
        >
          <template #prev-button>
            <BaseIconSvg iconName="arrow-right" width="24" height="24" />
          </template>
          <template #next-button>
            <BaseIconSvg iconName="arrow-right" width="24" height="24" />
          </template>
        </VueAwesomePaginate>
      </template>
    </PagesPostsLayout>
  </main>
</template>
