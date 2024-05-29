<script setup>
const props = defineProps({
  tabs: {
    type: Array,
    default: [],
  },
});

const tabsContent = ref(null);
const activeTab = ref(null);

const openTab = (id) => {
  tabsContent.value.querySelectorAll(`.tab, .tabs__nav__link`).forEach((el) => {
    el.classList.remove("active");
  });

  tabsContent.value
    .querySelectorAll(`#${id}, [href="#${id}"]`)
    .forEach((el) => {
      el.classList.add("active");
    });
};
</script>

<template>
  <div v-if="props.tabs.length" class="tabs" ref="tabsContent">
    <nav class="tabs__nav">
      <a
        v-for="(tab, ind) in props.tabs"
        :key="ind"
        :href="`#${tab.id}`"
        class="tabs__nav__link"
        :class="tab.active ? 'active' : null"
        @click.prevent="openTab(tab.id)"
        >{{ tab.name }}</a
      >
    </nav>
    <div class="tabs__content">
      <slot name="body" />
    </div>
  </div>
</template>
