<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

const br = [{ name: props.data?.data?.name }];
console.log("simple page props", props.data);
</script>

<template>
  <main class="page shop-pages">
    <BaseBreadcrumbs :brList="br" />
    <div class="container">
      <h1 class="shop-pages__title">{{ props.data?.data?.name }}</h1>
      <div class="shop-pages__layout">
        <BaseAddress :data="props.data.data" />
        <!-- <div class="stores-item">
          <div class="stores-block-title">
            <BaseIconSvg iconName="share-location" width="24" height="24" />
            <h2 class="title">{{ props.data?.data?.name }}</h2>
          </div>

          <address class="stores-address">
            <p class="stores-address__title">
              {{ $t("pages.contactsStoreAddres") }}
            </p>
            <p>{{ props.data?.data?.address }}</p>
            <p class="stores-address__title">
              {{ $t("pages.contactsStorePhone") }}
            </p>
            <a
              v-if="props.data?.data?.phone"
              :href="`tel:${cleanedPhone(props.data.data.phone)}`"
              >{{ props.data.data.phone }}</a
            >
            <p class="stores-address__title">
              {{ $t("pages.contactsStoreSchedule") }}
            </p>
            <p>
              <span>{{ $t("pages.contactsStoreWeekdays") }}</span
              >{{ props.data?.data?.weekdays?.open }} —
              {{ props.data?.data?.weekdays?.close }}
            </p>
            <p>
              <span>{{ $t("pages.contactsStoreSaturday") }}</span
              >{{ props.data?.data?.saturday?.open }} —
              {{ props.data?.data?.saturday?.close }}
            </p>
            <p>
              <span>{{ $t("pages.contactsStoreSunday") }}</span
              >{{
                props.data?.data?.sunday?.open ===
                props.data?.data?.sunday?.close
                  ? props.data?.data?.sunday?.open
                  : `${props.data?.data?.sunday?.open} — ${props.data?.data?.sunday?.close}`
              }}
            </p>
          </address>
        </div> -->
        <div>
          <ParsedBody
            v-if="props.data?.data?.body"
            :body="props.data.data.body"
            :contentblocks="props.data?.contentblocks"
          />
        </div>
      </div>
    </div>
  </main>
</template>
