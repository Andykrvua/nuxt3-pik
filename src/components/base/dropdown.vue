<script setup>
const props = defineProps({
  triangle: {
    type: Boolean,
    default: false,
  },
  position: {
    type: Object,
    default: {
      top: 0,
      right: 0,
    },
  },
});

const style = ref(props.position);

const dropdownEl = ref(false);
const isOpen = ref(false);

onClickOutside(dropdownEl, (event) => (isOpen.value = false));
</script>

<template>
  <div ref="dropdownEl" class="basedropdown">
    <button
      v-if="props.triangle"
      class="btn triangle-btn"
      @click="isOpen = true"
    >
      <slot name="btn-title" />
      <BaseIconSvg iconName="triangle-down" width="9" height="7" />
    </button>
    <button v-else class="btn btn-icon dots-btn" @click="isOpen = true">
      <span></span><span></span><span></span>
    </button>
    <ul class="basedropdown__list" :class="{ open: isOpen }" :style="style">
      <slot />
    </ul>
  </div>
</template>
