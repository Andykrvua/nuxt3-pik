<script setup>
// import _ from "lodash";
import debounce from "lodash/debounce";
// import { createPopper } from "@popperjs/core";
import { useField } from "vee-validate";

const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  border: {
    type: Boolean,
    default: false,
  },
  searchable: {
    type: Boolean,
    default: false,
  },
  filterable: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  labelName: {
    type: String,
    default: "name",
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  appendToBody: {
    type: Boolean,
    default: false,
  },
  star: {
    type: Boolean,
    default: false,
  },
  vector: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: String,
    default: "",
  },
  iconWidth: {
    type: Number,
    default: 10,
  },
  iconHeight: {
    type: Number,
    default: 7,
  },
  options: {
    type: [Array, Object],
    default() {
      return [];
    },
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "",
  },
  reduce: {
    type: Function,
    default: (option) => option,
  },
});

const emit = defineEmits(["update:modelValue", "search"]);

let q = ref("");
const select = ref(null);
const name = toRef(props, "name");
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.modelValue,
});

function changeValue(e) {
  emit("update:modelValue", e);
}
function onSearch(search, loading) {
  loading(true);
  searchHandler(loading, search, this);
}

const searchHandler = debounce(async (loading, search, vm) => {
  try {
    loading(true);
    q = search;
    await emit("search", search);
  } catch (e) {
    console.log(e);
  } finally {
    loading(false);
  }
}, 350);

function getOptionLabel(option, value, search) {
  // console.log(option, value, search);
  // return option[props.labelName].toLowerCase().includes(q.toLowerCase());

  if (typeof option === "object") {
    if (!option.hasOwnProperty(props.labelName)) {
      return console.warn(
        `[vue-select warn]: Label key "option.${props.labelName}" does not` +
          ` exist in options object ${JSON.stringify(option)}.\n` +
          "https://vue-select.org/api/props.html#getoptionlabel"
      );
    }
    return option[props.labelName];
  }
  return option;
}

// function withPopper(dropdownList, component, { width }) {
//   dropdownList.style.width = width;

//   const popper = createPopper(component.$refs.toggle, dropdownList, {
//     placement: "top",
//     modifiers: [
//       {
//         name: "offset",
//         options: {
//           offset: [0, -1],
//         },
//       },
//       {
//         name: "toggleClass",
//         enabled: true,
//         phase: "write",
//         fn({ state }) {
//           component.$el.classList.toggle("drop-up", state.placement === "top");
//         },
//       },
//     ],
//   });

//   return () => popper.destroy();
// }
/*  onMounted(() => {
   ref.select.open = true;
}); */
</script>
<template>
  <div class="select">
    <ClientOnly>
      <div
        class="default-select__wrapper form-group"
        :class="{
          'has-error': !meta.valid && errorMessage,
        }"
      >
        <label v-if="label" class="default-label">
          {{ label }}
          <span v-if="star" class="default-label__star">*</span>
        </label>
        <v-select
          ref="select"
          :name="name"
          :id="name"
          :model-value="modelValue"
          :searchable="searchable"
          :options="options"
          :value="modelValue"
          :placeholder="placeholder"
          :clearable="clearable"
          :append-to-body="appendToBody"
          :label="labelName"
          :multiple="multiple"
          :reduce="reduce"
          :loading="loading"
          class="default-select"
          :class="{ border: border, iconActive: icon }"
          :filterable="filterable"
          :getOptionLabel="getOptionLabel"
          @update:modelValue="emit('update:modelValue', $event)"
          @search="onSearch"
        >
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes" v-if="vector">
              <BaseIconSvg iconName="arrow-right" width="22" height="22" />
            </span>
          </template>
          <template #selected-option="option">
            <slot name="afterSelected"> </slot>
            <slot name="selected" :itemName="option">
              {{ labelName ? option[labelName] : option.name }}
            </slot>
          </template>
        </v-select>
        <div v-if="errorMessage" class="errors">
          <p>
            {{ errorMessage }}
          </p>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
