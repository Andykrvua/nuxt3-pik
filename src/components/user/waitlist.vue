<script setup>
const loading = ref(false);

const {
  data: favoriteList,
  error,
  refresh,
} = await useAsyncData(() => $api().favorite.getFavorite());

if (error.value?.data || !favoriteList?.value) {
  console.log("fetchError", error.value.data);
}

const removeFavorite = async (id) => {
  loading.value = true;
  const favData = await toggleFavorite(id);

  if (favData && !favData?.result) {
    console.log("dataSuss", favData);
    refresh();
  }
  loading.value = false;
};

console.log("favoriteList", favoriteList);
</script>

<template>
  <div class="user-account user-account__profile user-account__wishlist">
    <h1 class="title">{{ $t("account.pageNameWaitlist") }}</h1>
    <div class="user-account__wishlist__items" v-if="favoriteList?.data">
      <template v-for="card in favoriteList.data" :key="card.id">
        <div class="slider-product-card-wrapper">
          <NuxtLink
            no-prefetch
            :to="localePath(`/${card.slug}`)"
            class="slider-product-card"
          >
            <div class="slider-product-card__img-wrapper">
              <NuxtImg
                v-if="card?.images && card?.images?.length"
                :src="card.images[0]?.url || `/images/placeholder-square.svg`"
                :placeholder="[100, 100, 75, 5]"
                :alt="card?.name"
                densities="x1 x2"
                loading="lazy"
              />
              <NuxtImg
                v-else
                :placeholder="[100, 100, 75, 5]"
                :src="`/images/placeholder-square.svg`"
                alt=""
                densities="x1 x2"
                loading="lazy"
              />
            </div>
            <div class="slider-product-card__content">
              <div>
                <h5 class="slider-product-card__name text-3-line">
                  {{ card?.name }}
                </h5>
                <p class="availability" v-if="card?.availability === '1'">
                  <BaseIconSvg iconName="check" width="16" height="16" />
                  {{ $t("product.stockStatus1") }}
                </p>
                <p class="availability" v-if="card?.availability === '3'">
                  {{ $t("product.stockStatus3") }}
                </p>
                <p class="availability" v-else-if="card?.availability === '5'">
                  <BaseIconSvg iconName="noncheck" width="16" height="16" />
                  {{ $t("product.stockStatus5") }}
                </p>
              </div>
              <div class="slider-product-card__price-wrapper">
                <div class="slider-product-card__price-wrapper__content">
                  <p
                    class="old-price"
                    v-if="card?.price_old"
                    :style="card?.price_old ? '' : 'text-decoration: none'"
                  >
                    {{ `${card?.price_old} грн.` }}
                  </p>
                  <p class="price">
                    {{ card?.price }}
                    <span>грн.</span>
                  </p>
                </div>
              </div>
            </div>
          </NuxtLink>
          <div class="slider-product-card-btns">
            <button class="btn btn-icon buy-btn">
              <BaseIconSvg iconName="shopping-cart+" width="32" height="32" />
            </button>
            <BaseDropdown>
              <li>
                <button
                  class="btn basedropdown__item"
                  :disabled="loading"
                  @click="removeFavorite(card.id)"
                >
                  <BaseIconSvg icon-name="delete" width="16" height="16" />
                  {{ $t("common.btnDelete") }}
                </button>
              </li>
            </BaseDropdown>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
