<template>
  <div class="map-wrapper">
    <div id="map"></div>
    <NewMarkerModal v-if="isModalActive" :votedCoordinates="votedCoordinates" @onSubmitModal="onSubmitModal" />
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
      map: {},
      markerCoordinates: {},
      marker: {},
      isLocalStorageChanged: false,
    }
  },
  methods: {
    mapInit() {
      this.map = leaflet.map('map',
        { zoomControl: true, zoom: 1, zoomAnimation: false, fadeAnimation: true, markerZoomAnimation: true })
        .setView([48.3799, 31.1656], 6.3)
        .on('click', this.onMapClick);

      this.markerCoordinates = Object.fromEntries(Object.entries({ ...localStorage }));

      this.marker =
        leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
      this.getAllMarkers();
    },
    onMapClick(e) {
      this.isModalActive = !this.isModalActive;

      if (this.isModalActive) {
        this.votedCoordinates = { ...e.latlng }
      }
    },
    onSubmitModal(nameOfTheMarker, lat, lng) {
      if (!Object.keys(this.markerCoordinates).includes(nameOfTheMarker)) {
        const coordinates = [lat, lng];
        localStorage.setItem(nameOfTheMarker, JSON.stringify(coordinates));
        this.isModalActive = false;
        this.markerCoordinates = Object.fromEntries(Object.entries({ ...localStorage }));
        this.isLocalStorageChanged = true;
      } else {
        alert(`${nameOfTheMarker} already exists. Please choose another name`);
      }
    },
    getAllMarkers() {
      for (const marker in this.markerCoordinates) {
        const nameOfTheMarker = marker;
        const lat = JSON.parse(this.markerCoordinates[marker])[0];
        const lng = JSON.parse(this.markerCoordinates[marker])[1];

        leaflet.marker([lat, lng]).addTo(this.map).bindTooltip(nameOfTheMarker);
      }
    },
  },
  watch: {
    isLocalStorageChanged() {
      if (this.isLocalStorageChanged) {
        this.getAllMarkers();
        this.isLocalStorageChanged = false;
      }
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
  height: 100vh;
  margin: 0 auto;
  width: 90%;
  border: 1px solid #c0c0c0;
  border-radius: 5px;
}
</style>