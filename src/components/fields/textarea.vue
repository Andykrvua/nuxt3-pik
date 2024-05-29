<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    default: "",
  },
  className: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "input:focus"]);

const name = toRef(props, "name");

function handleTextArea(e) {
  emit("update:modelValue", e.target.value);
}

function handleFocus(e) {
  emit("input:focus");
}
</script>

<template>
  <div class="textarea">
    <div class="textarea__wrapper">
      <label v-if="label" :for="name" class="textarea__label">{{
        label
      }}</label>
      <textarea
        :class="className"
        :name="name"
        :id="name"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleTextArea"
        @focus="handleFocus"
      ></textarea>
    </div>
    <p v-if="error" class="error">
      {{ error }}
    </p>
  </div>
</template>
