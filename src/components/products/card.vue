<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
  showMess: {
    type: Function,
    default: null,
  },
});

const emits = defineEmits();
const productCount = ref(1);
const loading = ref(false);
const price = ref(props.data.price);
const isFavorite = ref(props.data?.states?.is_favorite);

const handleIncr = () => {
  productCount.value++;
  price.value = calcProductCountPrice(props.data.price, productCount.value);
};

const handleDecr = () => {
  productCount.value--;
  price.value = calcProductCountPrice(props.data.price, productCount.value);
};

const addToFavorite = async () => {
  const favData = await toggleFavorite(props.data.id);

  if (favData) {
    isFavorite.value = favData?.result;
    console.log("dataSuss", favData);
  }
};

const addToCart = () => {
  loading.value = true;
  const tryAdd = async () => {
    let data;
    try {
      data = await $api().cart.addCart({
        id: props.data.id,
        quantity: 1,
      });
      emits("showMess");
      // showCartMessage.value = true;
      // const runShowCartMessage = () => {
      //   return new Promise((resolve) => {
      //     setTimeout(() => {
      //       resolve((showCartMessage.value = false));
      //     }, 2500);
      //   });
      // };
      // runShowCartMessage();
    } catch (error) {
      data = error.data;
      loading.value = false;
      console.log("cartError", data);
    }

    loading.value = false;
    console.log("cartdata", data);
  };

  tryAdd();
};
</script>

<template>
  <div class="product-card">
    <NuxtLink
      no-prefetch
      :to="localePath(`/${props.data?.slug}`)"
      class="product-card__link"
    >
      <div class="product-card__img-wrapper">
        <NuxtImg
          :src="props.data?.images[0]?.url || `/images/placeholder-square.svg`"
          :alt="props.data.name"
          loading="lazy"
          densities="x1 x2"
        />
      </div>
      <div class="product-card__content">
        <h5 class="product-card__name text-3-line">
          {{ props.data.name }}
        </h5>
        <div class="product-card__price-wrapper">
          <div class="product-card__price-wrapper__content">
            <p v-if="props.data.price_old" class="old-price">
              {{ props.data.price_old }} грн.
            </p>
            <!-- <p class="price">{{ price }} <span>грн.</span></p> -->
            <p class="price">{{ props.data.price }} <span>грн.</span></p>
          </div>
        </div>
      </div>
    </NuxtLink>
    <button @click="addToCart" class="btn btn-icon buy-btn">
      <BaseIconSvg iconName="shopping-cart+" width="32" height="32" />
    </button>
    <button @click="addToFavorite" class="btn btn-icon favorite-btn">
      <BaseIconSvg
        :iconName="isFavorite ? 'favorite-fill' : 'favorite'"
        width="32"
        height="32"
      />
    </button>
    <div
      class="product-card__hover-block"
      :class="{ 'has-video': props.data?.has_video }"
    >
      <div class="count-btns">
        <button
          class="btn btn-count"
          @click="handleDecr"
          :disabled="productCount === 1"
        >
          -
        </button>
        <span class="product-count">{{ productCount }}</span>
        <button class="btn btn-count" @click="handleIncr">+</button>
      </div>
      <div class="product-details">
        <div class="product-details__item">
          <p>{{ $t("product.code") }}</p>
          <span>{{ props.data.extern_id }}</span>
        </div>
        <div class="product-details__item">
          <p>{{ $t("product.article") }}</p>
          <span>{{ props.data.artikul }}</span>
        </div>
      </div>
      <NuxtLink
        no-prefetch
        :to="
          localePath({ path: `/${props.data?.slug}`, hash: '#product-info' })
        "
        :class="{ 'has-video': props.data?.has_video }"
      >
        <BaseIconSvg iconName="play-circle" width="16" height="16" />
        {{ $t("common.linkProductGridCardIsVideo") }}</NuxtLink
      >
    </div>
    <p v-if="props.data.is_action" class="product-card__promote-badge">
      {{ $t("product.promouteBadge") }}
    </p>
  </div>
</template>
