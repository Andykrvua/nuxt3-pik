<script setup>
const props = defineProps({
  coords: {
    type: Array,
    default: [],
  },
});

const gmap = ref(null);

watch(
  () => props.coords,
  () => {
    mapInit();
  }
);

function mapInit() {
  const center = new google.maps.LatLng({
    lat: +props.coords[0],
    lng: +props.coords[1],
  });

  const image = {
    url: "/images/map_marker2.webp",
    anchor: new google.maps.Point(82, 134),
  };

  const map = new google.maps.Map(gmap.value, {
    center: center,
    zoom: 15,
  });

  const marker = new google.maps.Marker({
    position: center,
    map: map,
    icon: image,
  });
}

onMounted(() => {
  if (window.initMap === undefined) {
    var script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCQ0Ym13HS6WoZhjhi6lCUrZvcl7MgsBHU&amp;v=3.exp&callback=initMap";
    script.async = true;

    window.initMap = function () {
      mapInit();
    };

    document.head.appendChild(script);
  } else {
    mapInit();
  }
});
</script>

<template>
  <div ref="gmap" class="gmap"></div>
</template>
