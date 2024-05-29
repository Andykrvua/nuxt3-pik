<script setup>
import { useModalStore } from "~/store/modal";
import { useStaticStore } from "~/store/static";

const staticStore = useStaticStore();
const modalStore = useModalStore();
</script>

<template>
  <nav class="main-navigation">
    <ul>
      <li class="btn-catalog-wrapper">
        <button
          class="btn btn-grey btn-catalog"
          @click="modalStore.toggleMobileCatalogMenu()"
        >
          <BaseIconSvg iconName="catalog" width="22" height="22" />
          {{ $t("header.btnProductsCatalog") }}
        </button>
      </li>
      <ClientOnly>
        <slot name="account" />
      </ClientOnly>
      <template v-for="nav in staticStore.menu.header?.items" :key="nav.id">
        <li>
          <NuxtLink
            no-prefetch
            class="menu-link menu-link-strong"
            :to="localePath(`/${nav.path}`)"
            >{{ nav.name }}</NuxtLink
          >
          <ul v-if="nav.children && nav.children.length">
            <li v-for="navChild in nav.children" :key="navChild.id">
              <NuxtLink
                no-prefetch
                class="menu-link"
                :to="localePath(`/${navChild.path}`)"
                >{{ navChild.name }}</NuxtLink
              >
            </li>
          </ul>
        </li>
      </template>
    </ul>
  </nav>
</template>
