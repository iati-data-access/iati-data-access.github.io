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
  height: 300px;
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
  props: {
    'cells': {
      default() { return [] }
    },
    'drilldown': {
      default: null
    },
    'currency': {
      default: null
    },
    'bar-chart-datasets': {
      default() { return [] }
    }
  },
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
      return {
        datasets: this.barChartDatasets.map(dataset => {
          return {
            label: dataset.label,
            fill: true,
            data: Object.values(this.cells).map(item => {
              return item[dataset.valueField]
            }),
            backgroundColor: dataset.backgroundColor
          }
        }),
        labels: Object.keys(this.cells)
      }
    }
  }
}
</script>
