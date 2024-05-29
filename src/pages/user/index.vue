<script setup>
definePageMeta({
  middleware: "auth",
});

const Profile = defineAsyncComponent(() =>
  import("/components/user/profile.vue")
);
</script>

<template>
  <UserLayout>
    <Profile />
  </UserLayout>
</template>
