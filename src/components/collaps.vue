<script setup>
const emit = defineEmits();
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  closeText: {
    type: String,
    default: "",
  },
});

const content = ref(null);
const isCollapsed = ref(null);

isCollapsed.value = props.modelValue;

watch(
  () => props.modelValue,
  (newValue) => {
    isCollapsed.value = newValue;
    content.value.style.height = isCollapsed.value
      ? `${content.value.scrollHeight}px`
      : "0";
  }
);

function toggleCollaps() {
  isCollapsed.value = !isCollapsed.value;

  content.value.style.height = isCollapsed.value
    ? `${content.value.scrollHeight}px`
    : "0";

  emit("collapseToggled", isCollapsed.value);
}
</script>

<template>
  <details class="collaps" open :class="{ open: isCollapsed }">
    <summary class="collaps__title" @click.prevent="toggleCollaps">
      <slot name="label" />
    </summary>
    <div ref="content" class="collaps__content">
      <slot name="body" />
      <button
        class="btn hide-collaps"
        v-if="closeText"
        @click.prevent="toggleCollaps"
      >
        {{ closeText }}
      </button>
    </div>
  </details>
</template>
