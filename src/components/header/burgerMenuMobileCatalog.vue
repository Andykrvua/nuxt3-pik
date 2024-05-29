<script setup>
import { useModalStore } from "~/store/modal";
import { useCatStore } from "~/store/cat";

const modalStore = useModalStore();
const catStore = useCatStore();
const activeCat = ref(null);

const setIsActiveCatIndex = (index) => {
  activeCat.value = index;
};
</script>

<template>
  <div class="mobile-catalog" v-if="catStore.catThree.length">
    <button class="btn btn-close" @click="modalStore.toggleBurgerMenu">
      <BaseIconSvg iconName="close" width="24" height="24" />
    </button>
    <div v-if="activeCat === null">
      <button
        class="btn mobile-catalog__back"
        @click="modalStore.toggleMobileCatalogMenu()"
      >
        <BaseIconSvg iconName="triangle-down" width="9" height="7" />{{
          $t("header.mobileCatMenuTitle")
        }}
      </button>
      <ul class="category-list">
        <li
          v-for="(cat, index) in catStore.catThree"
          :key="cat.id"
          :class="{ active: index === activeCat }"
          class="category-list__level1"
        >
          <NuxtLink @click="setIsActiveCatIndex(index)">
            <span class="category-list__icon-wrapper">
              <NuxtImg
                :src="cat?.icon?.url || `/images/cat-icon-placeholder.svg`"
                loading="lazy"
                :alt="cat.name"
                :width="cat?.icon?.url ? 32 : 20"
                :height="cat?.icon?.url ? 32 : 20"
                aria-hidden="true"
              />
            </span>
            {{ cat.name }}
            <BaseIconSvg
              class="category-list__arrow-icon"
              iconName="arrow-right"
              width="16"
              height="16"
            />
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div v-else>
      <button class="btn mobile-catalog__back" @click="activeCat = null">
        <BaseIconSvg iconName="triangle-down" width="9" height="7" />{{
          $t("header.mobileAllCatTitle")
        }}
      </button>
      <NuxtLink
        no-prefetch
        class="category-list__current"
        :to="localePath(`/${catStore.catThree[activeCat].slug}`)"
      >
        <span class="category-list__icon-wrapper">
          <NuxtImg
            :src="
              catStore.catThree[activeCat]?.icon?.url ||
              `/images/cat-icon-placeholder.svg`
            "
            loading="lazy"
            :alt="catStore.catThree[activeCat].name"
            :width="catStore.catThree[activeCat]?.icon?.url ? 32 : 20"
            :height="catStore.catThree[activeCat]?.icon?.url ? 32 : 20"
            aria-hidden="true"
          />
        </span>
        {{ catStore.catThree[activeCat].name }}
      </NuxtLink>
      <hr class="category-list__child__separator" />
      <ul class="category-list__child">
        <li
          v-for="child in catStore.catThree[activeCat].children"
          :key="child.id"
          class="category-list__level2"
        >
          <NuxtLink no-prefetch :to="localePath(`/${child.slug}`)">
            {{ child.name }}
          </NuxtLink>
          <ul class="category-list__subchild" v-if="child.children.length">
            <li
              v-for="item in child.children"
              :key="item.id"
              class="category-list__level3"
            >
              <NuxtLink no-prefetch :to="localePath(`/${item.slug}`)">
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
      <div
        v-if="
          catStore.catThree[activeCat].brands &&
          catStore.catThree[activeCat].brands?.length
        "
        class="brands-list"
      >
        <NuxtLink
          class="brand-item"
          v-for="brand in catStore.catThree[activeCat].brands"
          :key="brand.id"
          :to="localePath(`/${brand.slug}`)"
        >
          <NuxtImg
            :src="brand?.logo?.url || `/images/placeholder-square.svg`"
            :alt="brand.name"
            densities="x1 x2"
            width="44"
            height="44"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
