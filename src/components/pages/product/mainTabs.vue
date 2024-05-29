<script setup>
const props = defineProps({
  properties: {
    type: [Array, undefined],
    default: undefined,
  },
  brand: {
    type: [Object, undefined],
    default: undefined,
  },
  body: {
    type: String,
    default: "",
  },
  contentblocks: {
    type: [Array, undefined],
    default: undefined,
  },
  video: {
    type: [Object, Boolean],
    default: false,
  },
  hash: {
    type: String,
    default: "",
  },
});

const { t } = useI18n();
const showVideo = ref(false);

const tabList = [
  {
    id: "product-info",
    name: t("product.mainTabDescr"),
    active: props.hash === "#product-info" ? false : true,
  },
  { id: "product-characteristics", name: t("product.mainTabCharacteristics") },
  ...(props.video
    ? [
        {
          id: "product-video",
          name: t("product.mainTabVideo"),
          active: props.hash === "#product-info" ? true : false,
        },
      ]
    : []),
];

console.log("props.body", props.body);
console.log("props.hash", props.hash);
</script>

<template>
  <div class="product-info-tabs container">
    <Tabs :tabs="tabList">
      <template #body>
        <div
          id="product-info"
          class="tab"
          :class="{ active: props.hash !== '#product-info' }"
        >
          <div>
            <p class="title">{{ t("product.mainTabDescrTitle") }}</p>
            <ParsedBody
              v-if="props.body"
              :body="props.body"
              :contentblocks="props.contentblocks"
            />
          </div>
          <div class="characteristics">
            <p class="title">{{ t("product.mainTabCharacteristics") }}</p>
            <div>
              <span>{{ t("product.mainTabBrandTitle") }}</span
              ><span class="dots"></span
              ><span class="characteristics__name"
                ><NuxtLink
                  no-prefetch
                  class="color-accent"
                  :to="localePath(`/${props.brand?.slug}`)"
                  >{{ props.brand?.name }}</NuxtLink
                ></span
              >
            </div>
            <template v-if="props.properties && props.properties?.length">
              <div v-for="item in props.properties" :key="item.id">
                <span>{{ item?.attribute?.name }}</span
                ><span class="dots"></span
                ><span class="characteristics__name">{{ item.value }}</span>
              </div>
            </template>
          </div>
        </div>
        <div id="product-characteristics" class="tab">
          <div class="characteristics characteristics-full">
            <div>
              <span>{{ t("product.mainTabBrandTitle") }}</span
              ><span class="dots"></span
              ><span class="characteristics__name"
                ><NuxtLink
                  no-prefetch
                  class="color-accent"
                  :to="localePath(`/${props.brand?.slug}`)"
                  >{{ props.brand?.name }}</NuxtLink
                ></span
              >
            </div>
            <div v-for="item in props.properties" :key="item.id">
              <span>{{ item.attribute?.name }}</span
              ><span class="dots"></span
              ><span class="characteristics__name">{{ item.value }}</span>
            </div>
          </div>
        </div>
        <div
          v-if="video"
          id="product-video"
          class="tab"
          :class="{ active: props.hash === '#product-info' }"
        >
          <button class="btn" @click="showVideo = true" v-if="!showVideo">
            <NuxtImg
              class="video__media"
              alt=""
              :src="`https://i.ytimg.com/vi_webp/${getYouTubeVideoId(
                props.video?.url
              )}/maxresdefault.webp`"
              densities="x1 x2"
            />
            <svg height="100%" viewBox="0 0 68 48" width="100%">
              <path
                class="youtube-btn-shape"
                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
              ></path>
              <path class="youtube-btn-icon" d="M 45,24 27,14 27,34"></path>
            </svg>
          </button>
          <div class="video-responsive" v-else>
            <iframe
              width="100%"
              :src="`https://www.youtube.com/embed/${getYouTubeVideoId(
                props.video?.url
              )}?rel=0&showinfo=0&autoplay=1`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              autoplay
            ></iframe>
          </div>
        </div>
      </template>
    </Tabs>
  </div>
</template>
