<script setup>
const props = defineProps({
  close: {
    type: Function,
    default: null,
  },
});

const emits = defineEmits();

const form = reactive({
  name: "",
  check: false,
  radio: "",
  switch: false,
  textarea: "",
});

const to = ref(2000);
const from = ref(5);
</script>

<template>
  <div class="filters">
    <button class="btn btn-close" @click="() => emits('close')">
      <BaseIconSvg iconName="close" width="24" height="24" />
    </button>
    <h3 class="filters__title">
      <BaseIconSvg iconName="filter" width="24" height="24" />Фільтри
    </h3>
    <hr />
    <div class="filters__block">
      <p class="filters__block__title">Торгова марка</p>
      <FieldsCheckbox v-model:checked="form.check" name="КІП" label="КІП" />
      <FieldsCheckbox name="Scholz" label="Scholz" />
      <FieldsCheckbox name="Centrum" label="Centrum" />
      <FieldsCheckbox name="Leitz" label="Leitz" />
      <FieldsCheckbox name="Deli" label="Deli" />
      <FieldsCheckbox name="Eco-Eagle" label="Eco-Eagle" />
      <FieldsCheckbox name="Ранок" label="Ранок" />
      <Collaps class="filters-collaps" :closeText="'Приховати'">
        <template #label>Показати ще 12</template>
        <template #body>
          <div class="filters__block">
            <FieldsCheckbox name="Bic" label="Bic" />
            <FieldsCheckbox name="Axent" label="Axent" />
            <FieldsCheckbox name="Полімербит" label="Полімербит" />
          </div>
        </template>
      </Collaps>
    </div>
    <hr />
    <div class="filters__block">
      <p class="filters__block__title">Товар</p>
      <FieldsCheckbox name="Бокс" label="Бокс" />
      <FieldsCheckbox
        name="Органайзер настільний"
        label="Органайзер настільний"
      />
      <FieldsCheckbox name="Покриття на стіл" label="Покриття на стіл" />
    </div>
    <hr />
    <div class="filters__block">
      <p class="filters__block__title">Ціна</p>
      <FieldsRangeTwoVal
        :to="to"
        :from="from"
        @toChange="to = $event"
        @fromChange="from = $event"
      >
        <template #inputs>
          <FieldsInput
            v-model="from"
            :type="'number'"
          />&nbsp;&nbsp;&nbsp;&mdash;&nbsp;&nbsp;&nbsp;
          <FieldsInput v-model="to" :type="'number'" />
        </template>
      </FieldsRangeTwoVal>
    </div>
    <hr />
    <div class="filters__block sheet-count">
      <p class="filters__block__title">Кількість листів</p>

      <FieldsCheckbox name="5" label="5" :type="'sheet-count'" />
      <FieldsCheckbox name="6" label="6" :type="'sheet-count'" />
      <FieldsCheckbox name="7" label="7" :type="'sheet-count'" />
      <FieldsCheckbox name="8" label="8" :type="'sheet-count'" />
      <FieldsCheckbox name="9" label="9" :type="'sheet-count'" />
      <FieldsCheckbox name="10" label="10" :type="'sheet-count'" />
      <FieldsCheckbox name="12" label="12" :type="'sheet-count'" />
      <FieldsCheckbox name="16" label="16" :type="'sheet-count'" />
      <FieldsCheckbox name="18" label="18" :type="'sheet-count'" />
      <FieldsCheckbox name="20" label="20" :type="'sheet-count'" />
    </div>
    <hr />
    <div class="filters__block sheet-format">
      <p class="filters__block__title">Формат</p>

      <FieldsCheckbox name="5" label="А6 105х148 мм" :type="'sheet-format'" />
      <FieldsCheckbox name="6" label="А5 148х210 мм" :type="'sheet-format'" />
      <FieldsCheckbox name="7" label="А4 210х297 мм" :type="'sheet-format'" />
      <FieldsCheckbox name="8" label="А3 297х420 мм" :type="'sheet-format'" />
      <FieldsCheckbox name="9" label="А2 420х594 мм" :type="'sheet-format'" />
    </div>
    <div class="filters__applybtn">
      <button class="btn btn-loadmore" @click="() => emits('close')">
        Показати
      </button>
    </div>
  </div>
</template>
