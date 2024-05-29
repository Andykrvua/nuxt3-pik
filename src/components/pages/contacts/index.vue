<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

const route = useRoute();
console.log("route", route);

const hero = {
  phone: [],
  email: "",
  processing_and_delivery: "",
  schedule_online: "",
};

const searchBlock = findBlockInPageData(
  props.data.blocks,
  blockTypes.contacts,
  "storinka_kontaktiv"
);

if (searchBlock) {
  hero.phone =
    searchBlock.phones && searchBlock.phones.length ? searchBlock.phones : [];
  hero.email = searchBlock.email || "";
  hero.processing_and_delivery = searchBlock.processing_and_delivery || "";
  hero.schedule_online = searchBlock.schedule_online || "";
}

console.log("contacts", props.data);
</script>

<template>
  <main class="contacts">
    <div class="container">
      <h1 class="contacts__title">{{ props?.data?.data?.name }}</h1>
      <div class="contacts__hero" v-if="searchBlock">
        <div class="contacts__hero__item">
          <div class="contacts__hero__item__icon">
            <BaseIconSvg iconName="call" width="24" height="24" />
          </div>
          <p class="contacts__hero__item__title">
            {{ $t("pages.contactsBlock1Title") }}
          </p>
          <a
            v-for="phone in searchBlock.phones"
            :key="phone.number"
            class="contacts__hero__item__text"
            :href="`tel:${cleanedPhone(phone.number)}`"
            >{{ phone.number }}</a
          >
        </div>
        <div class="contacts__hero__item">
          <div class="contacts__hero__item__icon">
            <BaseIconSvg iconName="schedule" width="24" height="24" />
          </div>
          <p class="contacts__hero__item__title">
            {{ $t("pages.contactsBlock2Title") }}
          </p>
          <p class="contacts__hero__item__text">
            {{ hero.schedule_online }}
          </p>
        </div>
        <div class="contacts__hero__item">
          <div class="contacts__hero__item__icon">
            <BaseIconSvg iconName="calendar-today" width="24" height="24" />
          </div>
          <p class="contacts__hero__item__title">
            {{ $t("pages.contactsBlock3Title") }}
          </p>
          <p class="contacts__hero__item__text">
            {{ hero.processing_and_delivery }}
          </p>
        </div>
        <div class="contacts__hero__item">
          <div class="contacts__hero__item__icon">
            <BaseIconSvg iconName="drafts" width="24" height="24" />
          </div>
          <p class="contacts__hero__item__title">
            {{ $t("pages.contactsBlock4Title") }}
          </p>
          <a
            class="contacts__hero__item__text"
            :href="`mailto:${hero.email}`"
            >{{ hero.email }}</a
          >
        </div>
      </div>
    </div>
    <PagesContactsTabs
      :data="props.data?.blocks"
      :contentblocks="props.data?.contentblocks"
      :hash="route.hash"
    />
  </main>
</template>
