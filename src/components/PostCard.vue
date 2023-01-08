<template>
  <div class="card">
    <router-link class="post" :to="`/post/${post.id}`">
      <div class="card-title">{{ post.title }}</div>
    </router-link>
    <div class="card-body">{{ post.body }}</div>
    <div class="card-comments">Comments: {{ this.comments.length }}</div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'PostCard',
  props: {
    post: Object,
  },
  data() {
    return {
      comments: [],
    }
  },
  components: {},
  computed: {},
  methods: {
    ...mapActions({
      getPostComments: 'post/getPostComments',
    }),
  },
  emits: [],
  async mounted() {
   const comments = await this.getPostComments(this.post.id);
   this.comments = comments;
  }
}
</script>

<style>
.card {
  padding: 30px 20px;
  border: 1px solid #c0c0c0;
  max-width: 360px;
  border-radius: 2%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

.card:hover {
  transform: scale(1.01);
  transition: all 0.3s;
}

.card-title {
  font-size: 20px;
  text-transform: capitalize;
  text-align: center;
  color: aquamarine;
  transition: all 0.3s;
}

.card-title:hover {
  color: rgb(80, 224, 176);
}

.card-body {
  text-align: justify;
}

.card-comments {
  text-align: right;
  font-size: 13px;
}
</style>

