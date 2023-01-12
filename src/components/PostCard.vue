<template>
  <div class="card">
      <div class="card-title">{{ post.title }}</div>
    <div class="card-body">{{ post.body }}</div>
    <div class="card-comments" @click="isShowEmailStats = true">Comments: {{
      this.comments.length
    }}</div>
    <EmailStatsModal v-if="isShowEmailStats" :comments="comments" />
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import EmailStatsModal from './EmailStatsModal.vue';

export default {
  name: 'PostCard',
  props: {
    post: Object,
  },
  data() {
    return {
      comments: [],
      isShowEmailStats: false,
    }
  },
  components: { EmailStatsModal },
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
  },
}
</script>

<style>
.card {
  position: relative;
  padding: 30px 20px;
  border: 1px solid #c0c0c0;
  max-width: 360px;
  height: 450px;
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
  z-index: 1;
}

.card-title {
  font-size: 20px;
  text-transform: capitalize;
  text-align: center;
  color: rgb(0, 0, 0);
  transition: all 0.3s;
  cursor: pointer;
}

.card-title:hover {
  color: rgb(78, 214, 169)
}

.card-body {
  text-align: justify;
}

.card-comments {
  font-size: 13px;
  margin-left: auto;
}

.card-comments:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>

