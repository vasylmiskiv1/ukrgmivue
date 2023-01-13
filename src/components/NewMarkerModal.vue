<template>
  <div class="new-marker">
    <div class="new-marker__title">Create a new marker</div>
    <form clas="new-marker__form" action="">
      <div class="new-marker__form-group">
        <label class="new-marker__label">
          Name of the marker:
          <input class="new-marker__input" type="text" placeholder="Name..." v-model="nameOfTheMarker">
        </label>
      </div>
      <div class="new-marker__form-group">
        <label class="new-marker__label">
          Latitude:
          <input class="new-marker__input" :value="votedCoordinates.lat.toFixed(4)" type="text" disabled>
        </label>
      </div>
      <div class="new-marker__form-group">
        <label class="new-marker__label">
          Longitude:
          <input class="new-marker__input" :value="votedCoordinates.lng.toFixed(4)" type="text" disabled>
        </label>
      </div>
      <button class="new-marker__submit" :disabled="!this.nameOfTheMarker.length" v-on:click="createMarker">
        Create a new marker
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'NewMarkerModal',
  props: {
    votedCoordinates: Object,
  },
  data() {
    return {
      nameOfTheMarker: "",
      markerCoordinates: [this.votedCoordinates.lat, this.votedCoordinates.lng],
      isSubmitButtonDisabled: true,
    }
  },
  methods: {
    createMarker(e) {
      e.preventDefault();
      this.$emit("onSubmitModal", this.nameOfTheMarker, this.votedCoordinates.lat, this.votedCoordinates.lng)
    }
  }
}
</script>

<style>
.new-marker {
  position: absolute;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 20%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.781);
  padding: 60px 20px;
  z-index: 2;
  border: 1px solid #c0c0c0;
  border-radius: 10px;
}

.new-marker__form {
  display: flex;
  flex-direction: column;
}

.new-marker__title {
  font-size: 30px;
  font-weight: 700;
}

.new-marker__form-group {
  margin-top: 30px;
  display: flex;
}

.new-marker__label {
  width: 100%;
  font-weight: 500;
}

.new-marker__input {
  width: 100%;
  padding: 5px 10px;
  outline: none;
  border: 1px solid #c0c0c0;
  border-radius: 5px;
}

.new-marker__submit {
  background-color: rgb(36, 214, 155);
  color: rgb(255, 255, 255);
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-top: 30px;
  transition: 0.2s all ease-in;
}

.new-marker__submit[disabled=disabled],
button:disabled {
  background-color: #c0c0c0;
}
</style>