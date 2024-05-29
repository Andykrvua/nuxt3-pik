<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

function toggleCollaps(id) {
  const item = document.querySelector(`#collaps-${id}`);
  const btn = document.querySelector(`#btn-${id}`);

  item.classList.toggle("open");
  item.classList.toggle("close");

  btn.classList.toggle("open");
  btn.classList.toggle("close");
}

onMounted(() => {
  const all = document.querySelectorAll(".collapsed");
  all.forEach((item) => {
    const height = item.scrollHeight;
    item.style.setProperty("--height", `${height}px`);
  });
});

console.log("tocData", props.data);
</script>

<template>
  <div class="toc">
    <h2 class="toc__title">{{ $t("pages.toc") }}</h2>
    <ol class="toc__firstlevel">
      <li v-for="item in props.data" :key="item.id">
        <a class="toc__link" :href="`#${item.id}`">{{ item.title }}</a
        ><button
          class="btn toc__collapse-btn close"
          :id="`btn-${item.id}`"
          v-if="item.children && item.children.length"
          @click.prevent="toggleCollaps(item.id)"
        >
          <BaseIconSvg iconName="arrow-right" width="24" height="24" />
        </button>
        <ol
          :id="`collaps-${item.id}`"
          class="close collapsed"
          v-if="item.children && item.children.length"
        >
          <li v-for="itemChildren in item.children" :key="itemChildren.id">
            <a class="toc__link" :href="`#${itemChildren.id}`">{{
              itemChildren.title
            }}</a>
          </li>
        </ol>
      </li>
    </ol>
  </div>
</template>
