<template>
  <div>
    <BarChart
      :data="chartData"
      :options="barChartOptions"
      class="bar-chart"
      ></BarChart>
  </div>
</template>
<style scoped>
.bar-chart {
  width: 100%;
  height: 400px;
}
</style>
<script>
import BarChart from '~/components/charts/bar-chart'

export default {
  data() {
    return {
      isBusy: true,
      valueLabel: `Amount (${this.currency.toUpperCase()})`
    }
  },
  props: ['cells', 'drilldown', 'currency'],
  components: {
    BarChart
  },
  computed: {
    barChartOptions(){
      return {
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            title: ((tooltipItem, data) => {
              return this.chartData.labels[tooltipItem[0].index]
            }),
            label: ((tooltipItem, data) => {
              var label = this.valueLabel || '';

              if (label) {
                  label += ': ';
              }
              label += tooltipItem.yLabel.toLocaleString(undefined, {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1
              })
              return label;
            })
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: function(tick) {
                  return tick.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0
                  })
                }
              },
              scaleLabel: {
                display: true,
                labelString: this.valueLabel
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                callback: function(tick) {
                  const characterLimit = 20
                  if (tick?.length >= characterLimit) {
                    return (
                      tick
                        .slice(0, tick.length)
                        .substring(0, characterLimit - 1)
                        .trim() + '...'
                    )
                  }
                  return tick
                }
              }
            }
          ]
        }
      }
    },
    chartData() {
      const colours = [
        "#6e40aa", "#6849b9", "#6153c7", "#585fd2", "#4e6cda", "#4479df", "#3988e1", "#2f96e0", "#26a5db", "#1fb3d3", "#1bc1c8", "#19cdbb", "#1bd9ac", "#20e29d", "#28ea8d", "#34f07e", "#44f470", "#56f665", "#6bf75c", "#81f558", "#98f357", "#aff05b"
      ]
      return {
        datasets: [{
          label: 'Value',
          fill: true,
          data: this.cells.map((ds) => { return ds[`value_${this.currency}.sum`] }),
          backgroundColor: colours
        }],
        labels: this.cells.map((ds) => { return ds[this.drilldown] })
      }
    }
  }
}
</script>
