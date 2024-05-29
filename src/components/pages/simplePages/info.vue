<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

const { data: shops, error } = await useLazyAsyncData(() => {
  return props.data.data?.template === templateHelper.delivery
    ? $api().shops.getShops()
    : null;
});

console.log("respSlugShops", shops.value);

const br = [{ name: props.data?.data?.name }];
console.log("simple page props", props.data);
</script>

<template>
  <main class="page simple-pages delivery payment">
    <BaseBreadcrumbs :brList="br" />
    <PagesSimplePagesLayout
      :title="props.data.data.name"
      :type="
        props.data.data.template === templateHelper.legalpages ||
        props.data.data.template === templateHelper.warranty
          ? templateHelper.legalpages
          : ''
      "
    >
      <template #content>
        <div class="simple-pages__content">
          <ParsedBody
            v-if="props.data.data.body"
            :body="props.data.data.body"
            :contentblocks="props.data.data.contentblocks"
          />
          <template
            v-for="(shop, ind) in shops?.data?.filter((item) => item.is_pickup)"
            :key="shop.id"
          >
            <div
              class="address-block"
              :class="{ first: ind === 0 }"
              v-if="props.data.data.template === templateHelper.delivery"
            >
              <div class="address-block__title">
                <BaseIconSvg iconName="share-location" width="24" height="24" />
                <h3 class="address-block__title__text">
                  {{ shop.name }}
                </h3>
              </div>
              <address class="address-block__content">
                <p class="address-block__content__title">
                  {{ $t("pages.contactsStoreAddres") }}
                </p>
                <p>{{ shop.address }}</p>
                <div class="address-block__content__phonetime">
                  <div class="address-block__content__phone">
                    <p class="address-block__content__title">
                      {{ $t("pages.contactsStorePhone") }}
                    </p>
                    <a
                      v-if="shop.phone"
                      :href="`tel:${cleanedPhone(shop.phone)}`"
                      >{{ shop.phone }}</a
                    >
                  </div>
                  <div class="address-block__content__time">
                    <p class="address-block__content__title">
                      {{ $t("pages.contactsStoreSchedule") }}
                    </p>
                    <p>
                      <span>{{ $t("pages.contactsStoreWeekdays") }}</span
                      >{{ shop?.weekdays?.open }} —
                      {{ shop?.weekdays?.close }}
                    </p>
                    <p>
                      <span>{{ $t("pages.contactsStoreSaturday") }}</span
                      >{{ shop?.saturday?.open }} —
                      {{ shop?.saturday?.close }}
                    </p>
                    <p>
                      <span>{{ $t("pages.contactsStoreSunday") }}</span
                      >{{
                        shop?.sunday?.open === shop?.sunday?.close
                          ? shop?.sunday?.open
                          : `${shop?.sunday?.open} — ${shop?.sunday?.close}`
                      }}
                    </p>
                  </div>
                </div>
              </address>
            </div>
            <hr
              :style="ind === shops.data.length - 1 ? 'display:none' : null"
              v-if="props.data.data.template === templateHelper.delivery"
            />
          </template>
        </div>
      </template>
    </PagesSimplePagesLayout>
  </main>
</template>
