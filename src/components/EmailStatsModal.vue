<template>
  <div class="card-modal">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: "EmailStasModal",
  components: { Pie },
  props: {
    comments: Array,
  },
  data() {
    return {
      chartData: {
        labels: this.comments.map(comment => comment.email),
        datasets: [
          {
            label: 'Amount of symbols in email',
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: this.comments.map(comment => this.countLetters(comment.email)),
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    countLetters(word) {
      let wordsAmount = 0;
      const wordArray = word.split("");

      for (let i = 0; i < wordArray.length; i++) {
        if (word[i] !== '@') {
          wordsAmount += 1;
        } else {
          break;
        }
      }

      return wordsAmount;
    },
  },
  mounted() { },
}
</script>

<style>
.card-modal {
  background-color: #fff;
  height: 300px;
  box-sizing: border-box;
  width: 90%;
  bottom: 50px;
  position: absolute;
  z-index: 10;
  border-radius: 3px;
  transition: 0.5 all ease-in;
}
</style>