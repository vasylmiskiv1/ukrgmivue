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
      favMarkers: {},
      isLocalStorageChanged: false,
    }
  },
  methods: {
    mapInit() {
      this.map = leaflet.map('map', { zoomControl: true, zoom: 1, zoomAnimation: false, fadeAnimation: true, markerZoomAnimation: true })
        .setView([48.3799, 31.1656], 6.3)
        .on('click', this.onMapClick);

      leaflet.tileLayer(`${import.meta.env.VITE_APP_OPENSTREET_URL}`, {
        maxZoom: 16,
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
      if (!Object.keys(this.favMarkers).includes(nameOfTheMarker)) {
        const coordinates = [lat, lng];
        localStorage.setItem(nameOfTheMarker, JSON.stringify(coordinates));
        this.favMarkers = Object.fromEntries(Object.entries({ ...localStorage }));
        this.isLocalStorageChanged = true;
        this.isModalActive = false;
      } else {
        alert(`${nameOfTheMarker} already exists. Please choose another name`);
      }
    },
    getAllMarkers() {
      this.favMarkers = Object.fromEntries(Object.entries({ ...localStorage }));

      for (const favMarker in this.favMarkers) {
        const lat = JSON.parse(this.favMarkers[favMarker])[0];
        const lng = JSON.parse(this.favMarkers[favMarker])[1];

        leaflet.marker([lat, lng]).addTo(this.map).bindPopup(favMarker);
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
  min-height: calc(100vh - 56px);
  margin: 0 auto;
  width: 100%;
  border: 1px solid #c0c0c0;
}
</style>