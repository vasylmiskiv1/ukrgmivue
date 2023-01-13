<template>
  <div class="card">
    <div class="card-title">{{ post.title }}</div>
    <div class="card-body">{{ post.body }}</div>
    <div class="card-comments">
      <img class="card-arrow arrow_up" v-if="isShowEmailStats" src="../assets/arrow-up.svg" alt="arrow-up">
      <img class="card-arrow arrow_down" v-else src="../assets/arrow-down.svg" alt="arrow-down">
      <div @click="isShowEmailStats = !isShowEmailStats">Comments: {{
      this.comments.length
    }}</div>
    </div>
    
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
  padding: 30px 18px;
  border: 1px solid #c0c0c0;
  height: 450px;
  justify-content: center;
  gap: 20px;
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
  display: flex;
  gap: 5px;
}

.card-comments:hover {
  text-decoration: underline;
  cursor: pointer;
}

.card-arrow {
  height: 12px;
  margin-top: 5px;
}
</style>

