<script setup>
const searchString = ref("");
</script>

<template>
  <search class="header__search">
    <button
      class="btn btn-icon btn-open-search"
      :aria-label="$t('header.searchTitle')"
    >
      <BaseIconSvg iconName="search" width="24" height="24" />
    </button>
    <form>
      <label for="search" class="visuallyhidden">{{
        $t("header.searchTitle")
      }}</label>
      <FieldsInput
        class="main-search"
        type="search"
        name="search"
        :placeholder="$t('header.searchTitle')"
        v-model="searchString"
      />
      <button type="submit" class="btn btn-grey">
        <BaseIconSvg iconName="search" width="22" height="22" />
      </button>
    </form>
  </search>
</template>
