<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
});

console.log("productsArr", props.data);
const showMess = () => {
  console.log("sjOWWWWW");
};
// <LazyProductsAddToCartMess v-if="showCartMessage" />
</script>

<template>
  <div class="products-grid">
    <ProductsCard
      @showMess="showMess"
      v-for="card in props.data"
      :key="card.id"
      :data="card"
    />
  </div>
</template>
