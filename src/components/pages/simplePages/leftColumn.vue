<script setup>
import { useStaticStore } from "~/store/static";

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

const staticStore = useStaticStore();

const icons = ["local-shiping", "balance-wallet", "percent"];
</script>

<template>
  <div class="news-blog-all__left-column">
    <p class="news-blog-all__left-column__title">{{ props.title }}</p>
    <ul
      v-if="props.type !== templateHelper.legalpages && staticStore.pages_info"
    >
      <li v-for="(link, ind) in staticStore.pages_info" :key="ind">
        <NuxtLink
          no-prefetch
          :to="localePath(`/${linksHelper.page}/${link.slug}`)"
          class="news-blog-all__left-column__link"
        >
          <BaseIconSvg :iconName="icons[ind]" width="20" height="20" />
          {{ link.name }}</NuxtLink
        >
      </li>
    </ul>
    <ul
      v-else-if="
        props.type === templateHelper.legalpages && staticStore.pages_legal
      "
    >
      <li v-for="(link, ind) in staticStore.pages_legal" :key="ind">
        <NuxtLink
          no-prefetch
          :to="localePath(`/${linksHelper.page}/${link.slug}`)"
          class="news-blog-all__left-column__link"
        >
          {{ link.name }}</NuxtLink
        >
      </li>
    </ul>
  </div>
</template>
