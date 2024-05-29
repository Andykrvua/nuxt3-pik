<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
  contentblocks: {
    type: [Array, undefined],
    default: undefined,
  },
  hash: {
    type: String,
    default: "",
  },
});

console.log("HASH", props.hash);

const searchBlockWholesale = findBlockInPageData(
  props.data,
  blockTypes.contactsInfo,
  "contacts-page-gurt"
);
const searchBlockPurchasingdep = findBlockInPageData(
  props.data,
  blockTypes.contactsInfo,
  "contacts-page-zakup"
);
</script>

<template>
  <div class="contacts__tabs container">
    <Tabs
      :tabs="[
        {
          id: 'stores',
          name: $t('pages.contactsTabsStores'),
          active: props.hash === '#stores' || props.hash === '' ? true : false,
        },
        {
          id: 'wholesale',
          name: searchBlockWholesale?.title,
          active: props.hash === '#wholesale' ? true : false,
        },
        {
          id: 'purchasing-dep',
          name: searchBlockPurchasingdep?.title,
          active: props.hash === '#purchasing-dep' ? true : false,
        },
      ]"
    >
      <template #body>
        <div
          id="stores"
          class="tab"
          :class="{
            active:
              props.hash === '#stores' || props.hash === '' ? true : false,
          }"
        >
          <PagesContactsStores />
        </div>
        <div
          id="wholesale"
          class="tab"
          :class="{ active: props.hash === '#wholesale' ? true : false }"
        >
          <PagesContactsWholesale
            v-if="searchBlockWholesale"
            :data="searchBlockWholesale"
            :contentblocks="props.contentblocks"
          />
        </div>
        <div
          id="purchasing-dep"
          class="tab"
          :class="{ active: props.hash === '#purchasing-dep' ? true : false }"
        >
          <PagesContactsWholesale
            v-if="searchBlockPurchasingdep"
            :data="searchBlockPurchasingdep"
            :contentblocks="props.contentblocks"
          />
        </div>
      </template>
    </Tabs>
  </div>
</template>
