<script setup>
import { useStaticStore } from "~/store/static";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

const staticStore = useStaticStore();
</script>

<template>
  <div class="news-blog-all__left-column">
    <p class="news-blog-all__left-column__title">{{ props.title }}</p>
    <ul v-if="staticStore.pages_info">
      <li v-for="link in staticStore.posttypes" :key="link.slug">
        <NuxtLink
          no-prefetch
          :to="localePath(`/${link.slug}`)"
          class="news-blog-all__left-column__link"
          >{{ link.name }}</NuxtLink
        >
      </li>
    </ul>
  </div>
</template>
