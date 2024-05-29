<script setup>
import { useModalStore } from "~/store/modal";

const props = defineProps({
  meta: {
    type: Object,
    default: {},
  },
  length: {
    type: Number,
    default: 0,
  },
});

const modalStore = useModalStore();
const perPage = ref("За зростанням ціни");
</script>

<template>
  <div class="products-grid-header">
    <button
      class="btn btn-icon btn-filters"
      @click="modalStore.mobileFilters = true"
    >
      <BaseIconSvg iconName="filter" width="18" height="18" />{{
        $t("filter.btnOpenClose")
      }}
    </button>
    <p class="products-grid-header__prod-count">
      {{
        $t("common.productsGridHeaderCounts", {
          count: props.length,
          countTotal: props.meta?.total,
        })
      }}
    </p>
    <FieldsSelect
      v-model="perPage"
      :options="['За зростанням ціни', 'За спаданням ціни', 'За рейтингом']"
    />
  </div>
</template>
