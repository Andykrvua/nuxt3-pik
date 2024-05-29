<script setup>
import { useModalStore } from "~/store/modal";

const modalStore = useModalStore();

const htmlElBtnCatalog = ref(null);

const toggleDrawer = () => {
  modalStore.toggleBurgerMenu();
};

const toggleCatalog = () => {
  modalStore.toggleCatalogMenu();
};

const closeDrawer = () => {
  modalStore.burgerMenu = false;
};

const closeCatalog = () => {
  modalStore.catalogMenu = false;
};
</script>

<template>
  <header class="header container-small">
    <div class="header__menu">
      <button
        id="navigation-menu-btn"
        class="btn btn-icon"
        :aria-label="$t('header.mobileCatMenuTitle')"
        aria-haspopup="true"
        aria-controls="navigation-menu"
        :aria-expanded="modalStore.burgerMenu ? true : false"
        @click="toggleDrawer"
      >
        <BaseIconSvg iconName="main-menu" width="25" height="17" />
      </button>
      <NuxtLink no-prefetch :to="localePath('/')" class="logo">
        <NuxtImg
          src="/images/logo.webp"
          :alt="$t('common.altLogo')"
          densities="x1 x2"
          width="88"
          height="44"
        />
      </NuxtLink>
      <button
        ref="htmlElBtnCatalog"
        class="btn btn-grey btn-catalog"
        @click="toggleCatalog"
        id="main-catalog-btn"
        aria-haspopup="true"
        aria-controls="main-catalog"
        :aria-expanded="modalStore.catalogMenu ? true : false"
      >
        <BaseIconSvg iconName="catalog" width="22" height="22" />
        {{ $t("header.btnProductsCatalog") }}
      </button>
      <HeaderSearch />
      <HeaderPhones />
    </div>
    <HeaderUserArea />

    <!-- Popups -->
    <PopupsDrawer
      :is-open="modalStore.burgerMenu"
      :direction="drawerDirection.left"
      @close="closeDrawer"
      class="burger__drawer"
    >
      <HeaderBurgerMenu />
    </PopupsDrawer>
    <HeaderCatalog
      :is-open="modalStore.catalogMenu"
      :clickOutsideIgnoreEL="htmlElBtnCatalog"
      @close="closeCatalog"
    />
    <ClientOnly>
      <HeaderCartDrawer />
    </ClientOnly>
  </header>
</template>
