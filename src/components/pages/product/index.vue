<script setup>
import { useModalStore } from "~/store/modal";

const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

const { t, locale } = useI18n();
const route = useRoute();
const modalStore = useModalStore();
const stockStatus = ref(props.data?.data?.availability);
const rating = ref(Math.floor(props.data?.data?.rating));
const productCount = ref(1);
const loading = ref(false);
const price = ref(props.data?.data?.price);
const targetBuyBtn = ref(null);
const fixedBlockBuyBtn = ref(null);
const visibilityHelper = ref(null);
const targetIsVisible = useElementVisibility(targetBuyBtn);
const visibilityHelperEl = useElementVisibility(visibilityHelper);
const showShareMessage = ref(false);
const showCartMessage = ref(false);
const isFavorite = ref(props.data?.data?.states?.is_favorite);
const getAllViewedProducts = ref([]);
const comments = {
  [commentsForm.review]: Number(props.data.data?.comments_count) || 0,
  [commentsForm.faq]: Number(props.data.data?.questions_count) || 0,
};

const br = props.data?.crumbs;

const options = ref({
  url: process.client ? location.href : "",
  title: t("product.mobileShareTitle"),
  text: props.data.data.name,
});

const { share, isSupported } = useShare(options);
const { copy } = useClipboard();

async function startShare() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) &&
    isSupported
  ) {
    return share().catch((err) => err);
  } else {
    const messageTime = () => {
      copy(location.href);
      showShareMessage.value = true;
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve((showShareMessage.value = false));
        }, 3000);
      });
    };
    messageTime();
  }
}

const handleIncr = () => {
  productCount.value++;
  calcSum();
};

const handleIncr5 = () => {
  productCount.value += 5;
  calcSum();
};

const handleDecr = () => {
  productCount.value--;
  calcSum();
};

const calcPromotePrice = computed(() => {
  const percent = Number(props.data.data?.offer?.percent);
  const qty = Number(props.data.data?.offer?.qty);
  if (isNaN(percent) || isNaN(qty)) {
    return null;
  }
  return subtractPercentage(props.data?.data?.price, percent);
});

const calcSum = () => {
  if (
    props.data.data?.offer?.active &&
    calcPromotePrice.value &&
    productCount.value >= Number(props.data.data?.offer?.qty)
  ) {
    price.value = calcProductCountPrice(
      Number(calcPromotePrice.value),
      productCount.value
    );
  } else {
    price.value = calcProductCountPrice(
      props.data.data.price,
      productCount.value
    );
  }
};

const addToFavorite = async () => {
  const favData = await toggleFavorite(props.data.data.id);

  if (favData) {
    isFavorite.value = favData?.result;
    console.log("dataSuss", favData);
  }
};

onMounted(() => {
  const productData = {
    id: props.data.data.id,
    slug: props.data.data.slug,
    price: props.data.data.price,
    price_old: props.data.data.price_old,
    name: props.data.data.name,
    states: {
      is_favorite: props.data.data.states?.is_favorite,
    },
    images: [
      {
        url:
          props.data.data.images && props.data.data.images?.length
            ? props.data.data.images[0]?.url
            : null,
      },
    ],
  };

  saveViewedProduct(productData, locale.value);

  getAllViewedProducts.value =
    JSON.parse(localStorage.getItem(`storedProducts-${locale.value}`)) || [];
});

const { width } = useWindowSize();

const addToCart = () => {
  loading.value = true;
  const tryAdd = async () => {
    let data;
    try {
      data = await $api().cart.addCart({
        id: props.data.data.id,
        quantity: 1,
      });
      if (width.value <= 700) {
        showCartMessage.value = true;
        const runShowCartMessage = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve((showCartMessage.value = false));
            }, 2500);
          });
        };
        runShowCartMessage();
      } else {
        modalStore.cart = true;
      }
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

console.log("product props", props.data);
</script>

<template>
  <main class="page product-page">
    <BaseBreadcrumbs
      v-if="props.data?.crumbs && props.data?.crumbs?.length"
      :brList="br"
    />
    <!-- Product area start -->
    <div class="container">
      <div class="product-area">
        <div class="product-area__image">
          <PagesProductMainSlider
            v-if="props.data.data?.images && props.data.data.images?.length"
            :images="props.data.data.images"
            :name="props.data.data?.name"
            :video="
              props.data.data?.videos && props.data.data.videos?.length
                ? props.data.data.videos
                : false
            "
          />
          <NuxtImg
            v-else
            style="width: 100%"
            src="/images/placeholder-square.svg"
            :placeholder="[100, 100, 75, 5]"
            :alt="props.data?.data?.name"
            loading="lazy"
          />
          <p v-if="props.data.data.is_action" class="promote-badge">
            {{ t("product.promouteBadge") }}
          </p>
        </div>
        <div class="product-area__infoheader">
          <div class="product-area__infoheader__top">
            <NuxtLink
              no-prefetch
              class="brandlink"
              :to="
                localePath(
                  props.data.data?.brand?.slug
                    ? `/${props.data.data.brand.slug}`
                    : ''
                )
              "
            >
              <NuxtImg
                :src="
                  props.data.data?.brand?.logo?.url ||
                  '/images/placeholder-square.svg'
                "
                densities="x1 x2"
                width="50"
                height="50"
                :alt="props.data.data?.brand?.name"
                loading="lazy"
              />
            </NuxtLink>
            <div class="codeinfo">
              <span
                >{{ t("product.code") }}: {{ props.data.data.extern_id }}</span
              >
              <span
                >{{ t("product.article") }}: {{ props.data.data.artikul }}</span
              >
            </div>
          </div>
          <div class="product-area__infoheader__content-wrapper">
            <h1>
              {{ props.data.data?.name }}
            </h1>
            <div v-if="showShareMessage" class="popup-message">
              <div class="popup-message__icon">
                <BaseIconSvg iconName="check" width="16" height="16" />
              </div>
              {{ t("product.copyUrlMessage") }}
            </div>
            <button class="btn btn-share btn-icon" @click="startShare">
              <BaseIconSvg iconName="share" width="28" height="28" />
            </button>
            <button @click="addToFavorite" class="btn btn-favorite btn-icon">
              <BaseIconSvg
                :iconName="isFavorite ? 'favorite-fill' : 'favorite'"
                width="32"
                height="32"
              />
            </button>
            <p class="stock-status">
              <BaseIconSvg
                v-if="stockStatus !== '3'"
                :iconName="
                  stockStatus === '1'
                    ? 'check'
                    : stockStatus === '5'
                    ? 'noncheck'
                    : null
                "
                width="16"
                height="16"
              />
              {{
                stockStatus === "1"
                  ? t("product.stockStatus1")
                  : stockStatus === "5"
                  ? t("product.stockStatus5")
                  : stockStatus === "3"
                  ? t("product.stockStatus3")
                  : ""
              }}
            </p>
            <div class="rating-view">
              <BaseIconSvg
                v-for="(star, index) in 5"
                :key="index"
                iconName="star"
                width="16"
                height="16"
                :class="{ active: rating > index }"
              />
              <p
                v-if="props.data.data?.comments_count"
                class="rating-view__count"
              >
                {{ props.data.data.comments_count }}
                {{
                  declensions(
                    props.data.data.comments_count,
                    t("product.reviewItemOne"),
                    t("product.reviewItemTwo"),
                    t("product.reviewItemFive")
                  )
                }}
              </p>
              <a
                class="rating-view__ancor"
                href="#product-users-feedback-reviews"
                >{{ t("product.reviewFormTitle") }}</a
              >
            </div>
          </div>
        </div>
        <div class="product-area__infomain">
          <PagesProductVariationSlider
            v-if="props.data.productgroup && props.data.productgroup.length"
            :data="props.data.productgroup"
          />
          <div class="product-area__infomain__controls">
            <div class="price-block">
              <div v-if="props.data.data.price_old" class="old-price-block">
                <span class="old-price"
                  >{{ props.data.data.price_old }} <span>грн.</span
                  ><BaseIconSvg iconName="highlighter" width="16" height="16"
                /></span>
                <span class="discount"
                  >{{
                    comparePricesPercent(
                      props.data.data.price_old,
                      props.data.data.price
                    )
                  }}%</span
                >
              </div>

              <span class="price">{{ price }} <span>грн.</span></span>
            </div>
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
              <button class="btn btn-count" @click="handleIncr5">
                <BaseIconSvg iconName="product-box" width="25" height="24" />+5
              </button>
            </div>
            <button
              ref="targetBuyBtn"
              class="btn btn-buy"
              :class="{ outofstock: stockStatus === '5' }"
              @click="stockStatus === '5' ? null : addToCart()"
              :disabled="loading"
            >
              <BaseIconSvg
                v-if="stockStatus !== '5'"
                iconName="shopping-cart"
                width="27"
                height="27"
              />{{
                stockStatus === "5"
                  ? t("product.btnBuyOutOfStock")
                  : t("product.btnBuy")
              }}
            </button>
          </div>
          <p
            v-if="props.data.data?.offer?.active && calcPromotePrice"
            class="promotion-block-info"
          >
            {{ t("product.promouteBadge") }}
            <span
              ><span class="cost">{{ calcPromotePrice }} грн</span> від
              {{ props.data.data?.offer?.qty }}-х штук</span
            >
            <img
              src="/images/product/promotion-small-banner.webp"
              :alt="t('product.promouteBadge')"
              width="123"
              height="64"
            />
          </p>
          <p
            v-if="props.data.data?.is_freedelivery"
            class="free-delivery-block-info"
          >
            {{ t("product.freeDeliveryBlockTitle") }}
            <NuxtLink
              no-prefetch
              :to="localePath(linksHelper.deliveryandpayment)"
              >{{ t("product.LinkFreeDeliveryBlock") }}</NuxtLink
            >
          </p>
          <PagesProductCollapsedInfoItems />
        </div>
      </div>
    </div>
    <!-- Product area end -->
    <SlidersSimilarProductsSlider
      v-if="props.data.similars && props.data?.similars?.length"
      :data="props.data.similars"
    />
    <PagesProductMainTabs
      :properties="props.data.data?.properties"
      :brand="props.data.data?.brand"
      :body="props.data.data?.body"
      :contentblocks="props.data.data?.contentblocks"
      :video="
        props.data.data?.videos && props.data.data?.videos.length
          ? props.data.data?.videos[0]
          : false
      "
      :hash="route.hash"
    />
    <PagesProductCommentsTabs
      :prodId="props.data.data?.id"
      :comments="comments"
    />
    <ClientOnly>
      <SlidersProductsSlider
        :title="t('common.viewedProdSliderTitle')"
        :variant="productsSlider.productPage"
        v-if="getAllViewedProducts.length"
        :data="getAllViewedProducts"
      />
    </ClientOnly>
    <div
      :class="{
        active: !targetIsVisible,
        disableshadow: visibilityHelperEl,
      }"
      class="fixed-price-block container"
      ref="fixedBlockBuyBtn"
    >
      <LazyProductsAddToCartMess v-if="showCartMessage" />
      <NuxtImg
        :src="
          props.data.data?.images[0]?.conversions?.big?.url ||
          props.data.data?.images[0]?.url ||
          '/images/placeholder-square.svg'
        "
        :alt="props.name"
        loading="lazy"
      />
      <p class="fixed-price-block__name">
        {{ props.data.data?.name }}
      </p>
      <p class="fixed-price-block__price">
        <span class="fixed-price-block__price_mobtext">{{
          t("product.price")
        }}</span>
        {{ price }}&nbsp;<span>грн.</span>
      </p>
      <p class="fixed-price-block__count">
        {{ t("product.count") }} {{ productCount }} шт.
      </p>
      <button
        class="btn btn-buy"
        :class="{ outofstock: stockStatus === '5' }"
        @click="stockStatus === '5' ? null : addToCart()"
        :disabled="loading"
      >
        <BaseIconSvg
          v-if="stockStatus !== '5'"
          iconName="shopping-cart"
          width="27"
          height="27"
        />{{
          stockStatus === "5"
            ? t("product.btnBuyOutOfStock")
            : t("product.btnBuy")
        }}
      </button>
    </div>
    <div ref="visibilityHelper" />
  </main>
</template>
