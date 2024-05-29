<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  image: {
    type: Object,
    default: {},
  },
});
</script>

<template>
  <div class="cat-page__banner-wrapper container">
    <div class="cat-page__banner">
      <h1 class="cat-page__banner__title">{{ props.title }}</h1>
      <NuxtImg
        :src="props.image?.url || `/images/placeholder-square.svg`"
        preload
        :alt="props.title"
        densities="x1 x2"
      />
    </div>
  </div>
</template>
