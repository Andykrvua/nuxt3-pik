<script setup>
const emit = defineEmits(["update:checked"]);
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "id",
  },
  checked: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "",
  },
});

let result = ref(props.modelValue);

function changeValue(e) {
  emit("update:checked", e.target.checked);
}
</script>

<template>
  <label
    class="checkbox"
    :class="{
      'sheet-count': props.type === 'sheet-count',
      'sheet-format': props.type === 'sheet-format',
    }"
  >
    <input
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      @input="changeValue($event)"
    />
    <span class="checkbox__check"> </span>
    <template v-if="props.type === 'sheet-format'">
      <span>
        {{ label.split(" ")[0] }}
        <span>{{ label.split(" ")[1] + " " + label.split(" ")[2] }}</span>
      </span>
    </template>
    <template v-else>
      {{ label }}
    </template>
  </label>
</template>
