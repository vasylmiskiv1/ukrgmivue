<template>
  <div class="searchbar">
    <input class="searchbar-input" v-model="searchSuggestion" type="text" placeholder="Search...">
    <FilterTool />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FilterTool from "./FilterTool.vue";
export default {
  name: "App",
  components: { FilterTool },
  data() {
    return {
      searchSuggestion: '',
    }
  },
  methods: {
    ...mapActions({
      filterPostsBySuggestion: 'post/filterPostsBySuggestion',
    }),
  },
  watch: {
    searchSuggestion(newValue) {
      this.filterPostsBySuggestion(newValue);
    }
  }
};
</script>

<style>
.searchbar {
  text-align: center;
  margin: 0 auto;
  max-width: 900px;
  padding: 0 20px;
  margin-top: 30px;
}

.searchbar-input {
  width: 100%;
  padding: 10px 20px;
  border: 1px solid #c0c0c0;
  background-color: #e9e9e9;
  border-radius: 5px;
  outline: none;
  transition: 0.5s;
  height: 50px;
}

.searchbar-input:hover {
  background-color: #fff;
}

.searchbar-input:focus {
  background-color: #fff;
}
</style>