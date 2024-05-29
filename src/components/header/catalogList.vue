<script setup>
import { useCatStore } from "~/store/cat";

const props = defineProps({
  notDefaultActiveCat: {
    type: Boolean,
    default: false,
  },
  isHomePageLayout: {
    type: Boolean,
    default: false,
  },
});

const catStore = useCatStore();
const catList = ref(false);
const activeHover = ref(!props.notDefaultActiveCat ? 0 : null);

const setIsHoverIndex = (index) => {
  activeHover.value = index;
};

if (props.isHomePageLayout) {
  onClickOutside(catList, (event) => setIsHoverIndex(null), {});
}
</script>

<template>
  <ul
    ref="catList"
    class="category-list"
    :style="{
      '--category-list-width': `${catList.offsetWidth}px`,
      '--category-list-height': `${catList.offsetHeight}px`,
      width: props.isHomePageLayout ? 'auto' : null,
    }"
    id="main-catalog"
    aria-labelledby="main-catalog-btn"
    role="menu"
    tabindex="-1"
    @mouseleave="props.isHomePageLayout && setIsHoverIndex(null)"
    v-if="catStore.catThree.length"
  >
    <li
      v-for="(cat, index) in catStore.catThree"
      :key="cat.id"
      :class="{ active: index === activeHover }"
      class="category-list__level1"
      role="none"
    >
      <NuxtLink
        no-prefetch
        @mouseenter="setIsHoverIndex(index)"
        :to="localePath(`/${cat.slug}`)"
        role="menuitem"
        tabindex="-1"
      >
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
        <span v-if="props.isHomePageLayout" class="text-1-line">
          {{ cat.name }}
        </span>
        <template v-else>{{ cat.name }}</template>
        <BaseIconSvg
          class="category-list__arrow-icon"
          iconName="arrow-right"
          width="16"
          height="16"
        />
      </NuxtLink>
      <div v-if="cat.brands && cat.brands?.length" class="brands-list-child">
        <div class="brands-list-child__wrapper">
          <NuxtLink
            v-for="brand in cat.brands"
            :key="brand.id"
            :to="localePath(`/${brand.slug}`)"
          >
            <NuxtImg
              :src="brand?.logo?.url || `/images/placeholder-square.svg`"
              :alt="brand.name"
              densities="x1 x2"
              width="72"
              height="72"
            />
          </NuxtLink>
        </div>
      </div>
      <ul
        class="category-list__child"
        :class="{ 'has-brands': cat.brands && cat.brands?.length }"
        v-if="cat.children.length"
        role="menu"
      >
        <li
          v-for="child in cat.children"
          :key="child.id"
          class="category-list__level2"
          role="none"
        >
          <NuxtLink
            no-prefetch
            :to="localePath(`/${child.slug}`)"
            role="menuitem"
            tabindex="-1"
          >
            {{ child.name }}
          </NuxtLink>
          <ul
            class="category-list__subchild"
            v-if="child.children.length"
            role="menu"
          >
            <li
              v-for="item in child.children"
              :key="item.id"
              class="category-list__level3"
              role="none"
            >
              <NuxtLink
                no-prefetch
                :to="localePath(`/${item.slug}`)"
                role="menuitem"
                tabindex="-1"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>
