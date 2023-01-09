<template>
  <div class="filter">
    <p class="filter-label">Sort titles:</p>
    <select class="filter-select" name="sortBy" id="sortBy" @change="sortPostsByTitle">
      <option :selected="option.selected" :disabled="option.disabled" v-for="option in sortOptions" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'FilterTool',
  inject: ['sortBy'],
  data() {
    return {
      sortOptions: [
        { text: 'Select your option', value: '', selected: true, disabled: true },
        { text: 'By descending (A to Z)', value: 'desc'},
        { text: 'By ascending (Z to A)', value: 'asc' },
      ]
    }
  },
  methods: {
    ...mapActions({
      sortPostsByTitle: 'post/sortPostsByTitle',
    }),
  },
};
</script>

<style>
.filter {
  margin-top: 30px;
  display: flex;
  height: 30px;
  gap: 30px;
  color: white;
}

.filter-label {
  font-size: 1.1em;
}

.filter-select {
  outline: none;
  cursor: pointer;
}
</style>