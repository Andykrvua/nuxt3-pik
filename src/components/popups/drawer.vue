<template>
  <div
    class="drawer"
    :class="{
      'is-open': isOpen,
      'is-visible': isVisible,
      'mobile-only': mobileOnly,
    }"
  >
    <div
      class="drawer__overlay"
      :style="{ transitionDuration: `${speed}ms` }"
      @click="closeDrawer"
    ></div>
    <div
      class="drawer__content__wrapper"
      :class="direction"
      :style="{ transitionDuration: `${speed}ms` }"
    >
      <slot />
    </div>
  </div>
</template>

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
  direction: {
    type: String,
    default: "right",
  },
  speed: {
    type: Number,
    default: drawerTransitionSpeed,
  },
  mobileOnly: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits();

const isVisible = ref(false);
const isTransitioning = ref(false);
let isLocked;

if (process.client) {
  isLocked = useScrollLock(document.querySelector("body"));
}

const closeDrawer = () => {
  if (!isTransitioning.value) {
    emits("close");
  }
};

watch(
  () => props.isOpen,
  (isOpen) => {
    isTransitioning.value = true;

    if (isOpen) {
      isVisible.value = true;
      isLocked.value = true;
    } else {
      isLocked.value = false;
      setTimeout(() => (isVisible.value = false), props.speed);
    }

    setTimeout(() => (isTransitioning.value = false), props.speed);
  }
);
</script>
