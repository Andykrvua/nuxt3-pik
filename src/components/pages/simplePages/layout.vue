<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="news-blog-all__wrapper container">
    <PagesSimplePagesLeftColumn
      :title="
        props.type === templateHelper.legalpages
          ? ''
          : $t('pages.simplePageColumnTitle')
      "
      :type="props.type"
    />
    <div class="news-blog-all__content">
      <h1 class="news-blog-all__content__title">{{ props.title }}</h1>
      <slot name="content" />
    </div>
  </div>
</template>
