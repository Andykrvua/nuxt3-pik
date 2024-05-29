<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
</script>

<template>
  <div class="stores-item">
    <div class="stores-block-title">
      <BaseIconSvg iconName="share-location" width="24" height="24" />
      <h2 class="title">{{ props.data?.name }}</h2>
    </div>

    <address class="stores-address">
      <p class="stores-address__title">
        {{ $t("pages.contactsStoreAddres") }}
      </p>
      <p>{{ props.data?.address }}</p>
      <p class="stores-address__title">
        {{ $t("pages.contactsStorePhone") }}
      </p>
      <a
        v-if="props.data?.phone"
        :href="`tel:${cleanedPhone(props.data.phone)}`"
        >{{ props.data.phone }}</a
      >
      <p class="stores-address__title">
        {{ $t("pages.contactsStoreSchedule") }}
      </p>
      <p>
        <span>{{ $t("pages.contactsStoreWeekdays") }}</span
        >{{ props.data?.weekdays?.open }} —
        {{ props.data?.weekdays?.close }}
      </p>
      <p>
        <span>{{ $t("pages.contactsStoreSaturday") }}</span
        >{{ props.data?.saturday?.open }} —
        {{ props.data?.saturday?.close }}
      </p>
      <p>
        <span>{{ $t("pages.contactsStoreSunday") }}</span
        >{{
          props.data?.sunday?.open === props.data?.sunday?.close
            ? props.data?.sunday?.open
            : `${props.data?.sunday?.open} — ${props.data?.sunday?.close}`
        }}
      </p>
      <slot name="link" />
    </address>
  </div>
</template>
