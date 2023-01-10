<template>
  <div>
    <BarChart
      :data="chartData"
      :options="barChartOptions"
      class="bar-chart"
      :style="barChartHeight"
      ref="barChart"
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
    BarChart
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
          event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
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
