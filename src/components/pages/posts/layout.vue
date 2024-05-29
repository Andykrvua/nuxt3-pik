<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="news-blog-all__wrapper container">
    <PagesPostsLeftColumn :title="$t('pages.allPostsTitle')" />
    <div class="news-blog-all__content">
      <h1 class="news-blog-all__content__title">{{ props.title }}</h1>
      <div class="news-blog-all__content__grid">
        <slot name="cards" />
      </div>
      <slot name="pagination" />
    </div>
  </div>
</template>
