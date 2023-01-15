<template>
  <div id="loader" class="spinner-border text-info" role="status">
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    isLoading: Boolean,
  }
}
</script>

<style>
#loader {
  position: absolute;
  left: 0;
  right: 0;
  top: 200px;
  margin-left: auto;
  margin-right: auto;
  height: 70px;
  width: 70px;
  z-index: 5;
}
</style>