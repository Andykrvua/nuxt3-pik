<template>
  <label class="switch">
    <input
      type="checkbox"
      :value="modelValue"
      @input="changeValue"
      :checked="modelValue"
    />
    <span class="switch__slider round"></span>
  </label>
</template>
  <script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const result = ref(props.modelValue);
function changeValue(e) {
  emit("update:modelValue", e.target.checked);
}
</script>
