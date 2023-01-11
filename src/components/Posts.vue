<template>
  <div class="posts">
    <h1 class="posts-title">{{ title }}</h1>
    <div class="post-list">
      <PostCard :key="post.id" v-for="post in postsChunk" :post="post" />
    </div>
  </div>
</template>

<script>
import PostCard from './PostCard.vue';

export default {
  name: 'Posts',
  props: {
    postsChunk: Array,
  },
  data() {
    return {
      title: 'Posts',
    }
  },
  components: { PostCard },
  emits: [],
  mounted() { }
}
</script>

<style>
.post {
  text-decoration: none;
  color: #000;
}

.posts-title {
  color: #fff;
  margin-top: 45px;
  text-align: center;
}

.post-list {
  text-align: center;
  max-width: 1200px;
  padding: 0 20px;
  margin: 50px auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 20px;
}

.posts-list__empty {
  margin-top: 50px;
  text-align: center;
}
</style>

