<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  close: {
    type: Function,
    default: null,
  },
  speed: {
    type: Number,
    default: drawerTransitionSpeed,
  },
  clickOutsideIgnoreEL: {
    type: Object,
    default: null,
  },
});

const emits = defineEmits();

const isVisible = ref(false);
const isTransitioning = ref(false);
let isLocked;

if (process.client) {
  isLocked = useScrollLock(document.querySelector("body"));
}

const catalogWrapper = ref(false);

const closeCatalog = () => {
  if (!isTransitioning.value) {
  }
  emits("close");
};

watch(
  () => props.isOpen,
  (isOpen) => {
    isTransitioning.value = true;

    if (isOpen) {
      isVisible.value = true;
      onClickOutside(catalogWrapper, (event) => closeCatalog(), {
        ignore: [props.clickOutsideIgnoreEL],
      });
      isLocked.value = true;
    } else {
      setTimeout(() => (isVisible.value = false), props.speed);
      isLocked.value = false;
    }

    setTimeout(() => (isTransitioning.value = false), props.speed);
  }
);

// TODOS: fix tabindex
</script>

<template>
  <div
    class="main-catalog"
    ref="catalogWrapper"
    :class="{ open: isOpen }"
    :style="{
      transitionDuration: `${speed}ms`,
    }"
  >
    <HeaderCatalogList />
  </div>
</template>
