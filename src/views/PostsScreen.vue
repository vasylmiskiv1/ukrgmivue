<template>
  <div class="posts-screen">
    <SearchBar />
    <Posts :postsChunk="postsChunk" :comments="postsChunkComments" :isLoading="isLoading"/>
    <Paginate :pagesAmount="pagesAmount" :changePage="changePage" :currentPage="currentPage" :isLoading="isLoading"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

import Posts from '../components/Posts.vue'
import Paginate from '../components/Paginate.vue';
import SearchBar from '../components/SearchBar.vue';

export default {
  name: 'PostsScreen',
  components: { Posts, Paginate, SearchBar},
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      postsChunk: state => state.post.postsChunk,
      postsChunkComments: state => state.post.postsChunkComments,
      isLoading: state => state.post.isLoading,
      currentPage: state => state.post.currentPage,
      pagesAmount: state => state.post.pagesAmount,
      errorText: state => state.post.errorText,
    }),
  },
  methods: {
    ...mapActions({
      getPosts: 'post/getPosts',
      getPostComments: 'post/getPostComments',
      changePage: 'post/changePage',
    }),
  },
  watch: {
    errorText(error) {
      if (error) {
        createToast(error);
      }
    }
  },
  mounted() {
    this.getPosts();
    this.getPostComments();
  },
}
</script>

<style>
.posts-screen {
  padding: 45px 0;
}
</style>


