<script setup>
const props = defineProps({
  data: {
    type: [Object, Boolean],
    default: false,
  },
});

const isFavorite = ref(props.data?.states?.is_favorite);

const addToFavorite = async () => {
  const favData = await toggleFavorite(props.data.id);

  if (favData) {
    isFavorite.value = favData?.result;
    console.log("dataSuss", favData);
  }
};
</script>

<template>
  <div class="slider-product-card-wrapper">
    <NuxtLink
      no-prefetch
      :to="localePath(`/${props.data?.slug}`)"
      class="slider-product-card"
    >
      <div class="slider-product-card__img-wrapper">
        <NuxtImg
          v-if="props.data?.images && props.data?.images?.length"
          :src="props.data.images[0]?.url || `/images/placeholder-square.svg`"
          :placeholder="[100, 100, 75, 5]"
          :alt="props.data?.name"
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
        <h5 class="slider-product-card__name text-3-line">
          {{ props.data?.name }}
        </h5>
        <div class="slider-product-card__price-wrapper">
          <div class="slider-product-card__price-wrapper__content">
            <p
              class="old-price"
              :style="props.data?.price_old ? '' : 'text-decoration: none'"
            >
              {{
                props.data?.price_old
                  ? `${props.data?.price_old} грн.`
                  : "&nbsp;"
              }}
            </p>
            <p class="price">
              {{ props.data?.price }}
              <span>грн.</span>
            </p>
          </div>
        </div>
      </div>
    </NuxtLink>

    <button class="btn btn-icon buy-btn">
      <BaseIconSvg iconName="shopping-cart+" width="32" height="32" />
    </button>
    <button @click="addToFavorite" class="btn btn-icon favorite-btn">
      <BaseIconSvg
        :iconName="isFavorite ? 'favorite-fill' : 'favorite'"
        width="32"
        height="32"
      />
    </button>
  </div>
</template>
