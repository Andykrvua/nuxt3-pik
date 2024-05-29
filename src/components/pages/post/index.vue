<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

const nuxtApp = useNuxtApp();
const route = useRoute();

const br = [
  {
    name: props.data?.data?.type?.name,
    url: props.data?.data?.type?.slug,
  },
  { name: props.data?.data?.name },
];

console.log("props.data", props.data);
console.log("template", props.data?.data?.template);
</script>

<template>
  <main class="page single-post">
    <BaseBreadcrumbs :brList="br" />
    <PagesPostLayout
      :slug="props.data?.data?.type?.slug"
      :template="props.data?.data?.template"
      :variant="singlePostHelper[props.data?.data?.template]"
      :otherPosts="
        props.data?.other && props.data?.other?.length
          ? props.data.other
          : false
      "
    >
      <template #header>
        <PagesPostHeader
          :variant="singlePostHelper[props.data?.data?.template]"
          :img="props.data?.data?.image"
          :title="props.data?.data?.name"
          :date="
            singlePostHelper[props.data?.data?.template] ===
            singlePostHelper.promote
              ? {
                  start_at: props.data?.data?.start_at,
                  end_at: props.data?.data?.end_at,
                }
              : props.data?.data?.published_at
          "
        />
      </template>
      <ParsedBody
        v-if="props.data?.data?.body"
        :body="props.data.data.body"
        :contentblocks="props.data.data?.contentblocks"
        :toc="
          props.data?.data?.template === singlePostHelper.blog &&
          props.data?.data?.has_table_contents
            ? true
            : false
        "
      />
      <PagesPostPagination
        v-if="props.data?.data?.template === singlePostHelper.blog"
        :data="props.data"
      />
    </PagesPostLayout>
  </main>
</template>
