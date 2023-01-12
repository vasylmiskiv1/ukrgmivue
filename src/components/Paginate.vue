<template>
  <paginate :page-count="pagesAmount" :page-range="4" :force-page="this.currentPage"
    :click-handler="changePage" :prev-text="'Prev'" :next-text="'Next'"
    :container-class="'pagination justify-content-center flex-wrap pointer'"
    :page-class="'page-item flex justify-center'" v-if="pagesAmount">
  </paginate>
</template>

<script>
import Paginate from 'vuejs-paginate-next';

export default {
  name: 'Pagination',
  components: {
    paginate: Paginate,
  },
  props: {
    pagesAmount: Number,
    changePage: Function,
    currentPage: Number,
  },
};
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";

.pagination {
  cursor: pointer;
}
</style>