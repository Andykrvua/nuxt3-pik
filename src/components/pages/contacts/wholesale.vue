<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
  contentblocks: {
    type: [Array, undefined],
    default: undefined,
  },
});
</script>

<template>
  <div class="purchasing-dep">
    <div class="purchasing-dep__leftcolumn">
      <ul
        class="purchasing-dep__leftcolumn__list"
        v-if="props.data?.items && props.data.items?.length"
      >
        <li v-for="(item, ind) in props.data.items" :key="ind">
          <address class="purchasing-dep__leftcolumn__list__item">
            <a v-if="item?.phone" :href="`tel:${cleanedPhone(item.phone)}`">{{
              item?.phone
            }}</a>
            <p>{{ item?.name }}</p>
            <a :href="`mailto:${item?.email}`">{{ item?.email }}</a>
          </address>
        </li>
      </ul>
    </div>
    <div>
      <ParsedBody
        v-if="props.data?.body"
        :body="props.data.body"
        :contentblocks="props.contentblocks"
      />
    </div>
  </div>
</template>
