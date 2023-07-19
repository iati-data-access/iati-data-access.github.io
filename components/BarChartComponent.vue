<template>
  <div>
    <Bar
      :chart-data="chartData"
      :chart-options="barChartOptions"
      class="bar-chart"
      :style="barChartHeight"
      ref="barChart"
      ></Bar>
  </div>
</template>
<style scoped>
.bar-chart {
  width: 100%;
  height: 400px;
}
</style>
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  data() {
    return {
      isBusy: true,
      valueLabel: `${this.$t('dataDashboards.amount')} (${this.currency.toUpperCase()})`
    }
  },
  props: {
    'cells' : {
      default() { return [] }
    },
    'drilldown': {
      default: null
    },
    'currency': {
      default: 'usd'
    },
    'datasets': {
      default() { return [] }
    },
    'clickable': {
      default: false
    },
    'height': {
      default: '400px'
    },
    'selectedDrilldown': {
      default() { return function () {} }
    }
  },
  components: {
    Bar
  },
  methods: {
    handleClick(evt, item) {
      if (this.clickable == false) { return }
      if (item.length == 0) { return }
      const itemIndex = item[0]._index
      const cell = this.cells[item[0]._index]
      this.selectedDrilldown(cell[`${this.drilldown}.code`])
    }
  },
  computed: {
    barChartHeight() {
      return `height: ${this.height};`
    },
    barChartOptions(){
      return {
        onClick: this.handleClick,
        onHover: (event, chartElement) => {
          if (this.clickable == false) { return }
          event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
        },
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            title: ((tooltipItem, data) => {
              return this.chartData.labels[tooltipItem[0].index]
            }),
            label: ((tooltipItem, data) => {
              const datasetLabel = data.datasets[tooltipItem.datasetIndex].label
              var label = `${datasetLabel} (${this.currency.toUpperCase()})` || '';

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
          yAxis: {
            ticks: {
              beginAtZero: true,
              callback: function(tick) {
                return tick.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0
                })
              }
            },
            title: {
              display: true,
              text: this.valueLabel
            }
          },
          xAxis: {
            ticks: {
              callback: function(value, index, ticks) {
                const tick = this.getLabelForValue(value)
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
        }
      }
    },
    chartData() {
      return {
        datasets: this.datasets.map(dataset => {
          return {
            label: dataset.label,
            fill: true,
            data: this.cells.map(item => {
              return item[dataset.field]
            }),
            backgroundColor: dataset.backgroundColor
          }
        }),
        labels: this.cells.map((item) => {
          return item[this.drilldown]
        })
      }
    }
  }
}
</script>
