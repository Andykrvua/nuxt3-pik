<script setup>
const props = defineProps({
  brList: {
    type: Array,
    default: [],
  },
});

console.log("brlist", props.brList);
</script>

<template>
  <div class="breadcrumbs-wrapper container-small">
    <ul class="breadcrumbs">
      <li
        class="breadcrumbs-item breadcrumbs-item__home"
        :class="{ 'breadcrumbs-item__parent': props.brList.length === 1 }"
      >
        <BaseIconSvg
          v-if="props.brList.length === 1"
          iconName="triangle-down"
          width="9"
          height="7"
        />
        <NuxtLink no-prefetch :to="localePath('/')">
          <BaseIconSvg iconName="breadcrumbs-home" width="16" height="16" />
          <span class="breadcrumbs-item__home-title">{{
            $t("common.main")
          }}</span>
        </NuxtLink>
      </li>
      <template v-for="(br, ind) in props.brList" :key="ind">
        <li
          class="breadcrumbs-item"
          :class="{
            'breadcrumbs-item__parent': ind === props.brList.length - 2,
            'breadcrumbs-item__last': ind === props.brList.length - 1,
          }"
        >
          <BaseIconSvg
            v-if="ind === props.brList.length - 2"
            iconName="triangle-down"
            width="9"
            height="7"
          />
          <NuxtLink
            no-prefetch
            v-if="ind !== props.brList.length - 1"
            :to="localePath(`/${br.url || br.slug}`)"
            >{{ br.name }}</NuxtLink
          >
          <template v-else>{{ br.name }}</template>
        </li>
      </template>
    </ul>
  </div>
</template>
