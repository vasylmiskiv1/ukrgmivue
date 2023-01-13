<template>
  <div class="posts">
    <h1 class="posts-title">{{ title }}</h1>
    <div id="posts-loader" class="spinner-border text-info" role="status" v-if="isLoading">
    </div>
    <div class="posts-list" v-if="postsChunk && postsChunk.length">
      <PostCard :key="post.id" v-for="post in postsChunk" :post="post" />
    </div>
    <h4 v-if="postsChunk && !postsChunk.length" class="posts-empty">
      Post list is empty
    </h4>
  </div>
</template>

<script>
import PostCard from './PostCard.vue';

export default {
  name: 'Posts',
  props: {
    postsChunk: Array,
    isLoading: Boolean,
    filteredPostsLength: Number,
  },
  data() {
    return {
      title: 'Posts',
    }
  },
  components: { PostCard },
}
</script>

<style>
.posts {
  position: relative;
}

.posts-title {
  color: #fff;
  margin-top: 45px;
  text-align: center;
}

.posts-list {
  text-align: center;
  max-width: 1450px;
  padding: 0 20px;
  margin: 50px auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 20px;
  z-index: 5;
}

.posts-list__empty {
  margin-top: 50px;
  text-align: center;
}

#posts-loader {
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

.posts-empty {
  margin-top: 200px;
  color:#fff;
  text-align: center;
}
</style>

