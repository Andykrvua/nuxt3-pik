<script setup>
import { useModalStore } from "~/store/modal";

useSeoMeta({
  title: "My Amazing Site",
});

const modalStore = useModalStore();

const selectTimeData = ref("24");
const perPage = ref("1");
const form = reactive({
  name: "",
  check: false,
  radio: "",
  switch: false,
  textarea: "",
});
const optionsTimeSelect = reactive([
  {
    name: "Last 24 hours",
    system: "24",
  },
  {
    name: "Last 7 hours",
    system: "7",
  },
  {
    name: "Last 30 hours",
    system: "30",
  },
]);
</script>

<template>
  <div>
    <p>Index</p>
    <span>{{ $t("main.welcome") }}</span>
    <NuxtLink :to="localePath('/')">Main</NuxtLink>
    <button @click="modalStore.toggleTestModal()">open modal</button>

    <FieldsInput v-model="form.name" name="name" icon-name="okay" />
    <FieldsCheckbox v-model="form.check" name="check" label="check" />
    <FieldsRadio
      v-model="form.radio"
      label="radio 0"
      value="0"
      id="0"
      name="radio"
    />
    <FieldsRadio
      v-model="form.radio"
      label="radio 1"
      value="1"
      id="1"
      name="radio"
    />
    <FieldsRadio
      v-model="form.radio"
      label="radio 2"
      value="2"
      id="2"
      name="radio"
    />
    <FieldsSwitch />
    <FieldsTextarea />

    <Collaps>
      <template #label>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit
      </template>
      <template #body>
        <p>
          11Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi unde,
          ex rem voluptates autem aliquid veniam quis temporibus repudiandae
          illo, nostrum, pariatur quae! At animi modi dignissimos corrupti
          placeat voluptatum!
        </p>
      </template>
    </Collaps>

    <FieldsSelect
      v-model="perPage"
      :border="false"
      :options="[1, 2, 3, 4, 5]"
      :appendToBody="true"
    />
    <FieldsSelect
      v-model="selectTimeData"
      id="selectTime"
      name="select"
      label-name="name"
      :options="optionsTimeSelect"
      :reduce="(el) => el.system"
    />
  </div>
</template>
