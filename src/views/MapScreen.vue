<template>
  <div class="map-wrapper">
    <div id="map"></div>
    <NewMarkerModal v-if="isModalActive" :votedCoordinates="votedCoordinates" @onModalClose="onModalClose"/>
  </div>
</template>

<script>
import leaflet from "leaflet";
import NewMarkerModal from "../components/NewMarkerModal.vue";

export default {
  name: "Home",
  components: {
    NewMarkerModal
  },
  data() {
    return {
      isModalActive: false,
      votedCoordinates: {},
    }
  },
  methods: {
    mapInit() {
      const markerCoordinates = Object.entries({ ...localStorage });
      let map;
      let marker;

      map = leaflet.map('map').setView([48.3799, 31.1656], 6.3);

      this.getAllMarkers(markerCoordinates, map);

      marker =
        leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

      map.on('click', this.onMapClick);
    },
    onMapClick(e) {
      this.isModalActive = !this.isModalActive;

      if (this.isModalActive) {
        this.votedCoordinates = { ...e.latlng }
      }
    },
    onModalClose() {
      this.isModalActive = false;
    },
    getAllMarkers(markerCoordinates, map) {
      for (let i = 0; i < markerCoordinates.length; i++) {
        const nameOfTheMarker = markerCoordinates[i][0];
        const lat = Number(JSON.parse(markerCoordinates[i][1])[0].toFixed(4));
        const lng = Number(JSON.parse(markerCoordinates[i][1])[1].toFixed(4));

        leaflet.marker([lat, lng]).addTo(map).bindPopup(`${nameOfTheMarker}`, onmouseover);
      }
    },
  },
  watch: {
    coordinatesAmount(newValue) {
      console.log(newValue);
    }
  },
  mounted() {
    this.mapInit();
  },
};
</script>

<style>
#map {
  position: relative;
  z-index: 1;
  height: 800px;
  width: 100%;
  border: 1px solid #c0c0c0;
  border-radius: 5px;
}
</style>