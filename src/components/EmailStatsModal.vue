<template>
  <div class="card-modal">
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: "EmailStasModal",
  components: { Bar },
  props: {
    comments: Array,
  },
  data() {
    return {
      chartData: {
        labels: this.comments.map(comment => comment.email),
        datasets: [{
          label: 'Amount of symbols in email',
          data: this.comments.map(comment => this.countLetters(comment.email)),
          backgroundColor: '#f87979'
        }],
      },
      chartOptions: {
        responsive: true
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
  background-color: rgba(230, 229, 229, 0.822);
  height: 200px;
  width: 450px;
  left: 100px;
  bottom: 100px;
  position: absolute;
  z-index: 10;
  border-radius: 3px;
  transition: 0.5 all ease-in;
  border: 1px solid #c0c0c0;
}
</style>