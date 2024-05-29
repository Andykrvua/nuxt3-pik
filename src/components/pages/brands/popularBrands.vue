<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
</script>

<template>
  <h2 class="cat-page-brands__subtitle">{{ props.data.title }}</h2>
  <div class="cat-page-brands__popular-links">
    <NuxtLink
      no-prefetch
      v-for="brand in props.data.brands"
      :to="localePath(`/${brand.slug}`)"
      :key="brand.id"
    >
      <NuxtImg
        :src="brand.logo?.url || `/images/placeholder-square.svg`"
        :alt="brand.name"
        densities="x1 x2"
      />
    </NuxtLink>
  </div>
</template>
