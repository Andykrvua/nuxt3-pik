<script setup>
definePageMeta({
  middleware: "auth",
});

const route = useRoute();

const Profile = defineAsyncComponent(() =>
  import("/components/user/profile.vue")
);
const Orders = defineAsyncComponent(() =>
  import("/components/user/orders.vue")
);
const Wishlist = defineAsyncComponent(() =>
  import("/components/user/wishlist.vue")
);
const Waitlist = defineAsyncComponent(() =>
  import("/components/user/waitlist.vue")
);

if (
  route.params.slug !== "profile" &&
  route.params.slug !== "orders" &&
  route.params.slug !== "wishlist" &&
  route.params.slug !== "waitlist"
) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

const renderView = (val) => {
  if (val === "profile") return Profile;
  if (val === "orders") return Orders;
  if (val === "wishlist") return Wishlist;
  if (val === "waitlist") return Waitlist;
};
</script>

<template>
  <UserLayout>
    <component :is="renderView(route.params.slug)" />
  </UserLayout>
</template>
