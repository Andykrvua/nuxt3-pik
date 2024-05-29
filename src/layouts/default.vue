<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <template v-for="link in head.link" :key="link.id">
        <Link
          :id="link.id"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>
    <div class="page-wrapper">
      <NuxtLoadingIndicator
        :color="'repeating-linear-gradient(to right, var(--text-primary) 0%, var(--text-dark-grey) 50%, var(--color-accent) 100%)'"
      />
      <Header />
      <slot />
      <Footer />
      <Auth />
    </div>
  </Html>
</template>

<script setup>
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});
</script>
