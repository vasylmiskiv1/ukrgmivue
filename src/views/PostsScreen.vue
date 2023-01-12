<template>
  <div class="posts-screen">
    <SearchBar />
    <Posts :postsChunk="postsChunk" :comments="postsChunkComments" :isLoading="isLoading"/>
    <Paginate :pagesAmount="pagesAmount" :changePage="changePage" :currentPage="currentPage" :isLoading="isLoading"/>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

import Posts from '../components/Posts.vue'
import Paginate from '../components/Paginate.vue';
import SearchBar from '../components/SearchBar.vue';

export default {
  name: 'PostsScreen',
  components: { Posts, Paginate, SearchBar },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      filteredPosts: state => state.post.filteredPosts,
      postsChunk: state => state.post.postsChunk,
      postsChunkComments: state => state.post.postsChunkComments,
      isLoading: state => state.post.isLoading,
      postsOnPage: state => state.post.postsOnPage,
      offset: state => state.post.offset,
      currentPage: state => state.post.currentPage,
      pagesAmount: state => state.post.pagesAmount,
    }),
  },
  methods: {
    ...mapMutations({
      setOffset: 'post/setOffset',
      setCurrentPage: 'post/setCurrentPage',
    }),
    ...mapActions({
      getPosts: 'post/getPosts',
      getPostComments: 'post/getPostComments',
      changePage: 'post/changePage',
    }),
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


