<script setup>
const nuxtApp = useNuxtApp();

const { data: respSlug, error } = await useAsyncData(
  "shops",
  () => $api().shops.getShops(),
  {
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);

if (error.value?.data || !respSlug?.value || !respSlug?.value?.data) {
  console.log("fetchError", error.value.data);
}

console.log("allshops", respSlug.value);

const currentStore = ref(
  respSlug.value.data.length ? respSlug.value.data[0] : null
);
const selectModel = ref(currentStore.value?.name);

const handleUpdate = (name) => {
  const index = respSlug.value.data.findIndex((item) => item.name === name);
  currentStore.value = respSlug.value.data[index];
};
</script>

<template>
  <div class="stores">
    <div class="stores__leftcolumn" v-if="respSlug.data?.length">
      <FieldsSelect
        class="store-select"
        v-model="selectModel"
        :options="respSlug.data"
        :reduce="(item) => item.name"
        @update:modelValue="handleUpdate"
      />
      <BaseAddress :data="currentStore">
        <template #link>
          <NuxtLink
            v-if="currentStore.slug"
            no-prefetch
            class="stores-address__link"
            :to="localePath(`/page/${currentStore.slug}`)"
            >{{ $t("pages.contactsLinkStoreDetails") }}</NuxtLink
          >
        </template>
      </BaseAddress>
    </div>
    <div class="stores__map" v-if="respSlug.data?.length">
      <PagesContactsMap :coords="[currentStore.lat, currentStore.lng]" />
    </div>
  </div>
</template>
