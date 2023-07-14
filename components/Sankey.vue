<template>
  <div class="sankey">
    <canvas id="chart" ref="chart"></canvas>
  </div>
</template>

<script>
import { Chart as ChartJS } from "chart.js";
import { SankeyController, Flow } from "chartjs-chart-sankey";


export default {
  props: {
    data: {
      default() {
        return []
      }
    },
    from: {
      default: `provider_organisation.name_en`,
    },
    to: {
      default: `receiver_organisation.name_en`,
    },
    flow1: {
      default: 'value_usd.sum_1',
    },
    flow3: {
      default: 'value_usd.sum_3',
    },
    flow: {
      default: 'value_usd.sum',
    }
  },
  computed: {
    chartData() {
      return this.data.reduce((summary, item) => {
        if (!([0, undefined].includes(item[this.flow1]))) {
          summary.push({
            from: item[this.from],
            to: item[this.to],
            flow: item[this.flow1],
            _type: 'incoming'
          })
        }
        if (!([0, undefined].includes(item[this.flow3]))) {
          summary.push({
            from: item[this.from],
            to: item[this.to],
            flow: item[this.flow3],
            _type: 'outgoing'
          })
        }
        if (!([0, undefined].includes(item[this.flow]))) {
          summary.push({
            from: item[this.from],
            to: item[this.to],
            flow: item[this.flow],
            _type: 'outgoing'
          })
        }
        return summary
      }, [])
    },
    colours() {
      const _colours = [
        '#6e40aa', '#6849b9', '#6153c7', '#585fd2',
        '#4e6cda', '#4479df', '#3988e1', '#2f96e0',
        '#26a5db', '#1fb3d3', '#1bc1c8', '#19cdbb',
        '#1bd9ac', '#20e29d', '#28ea8d', '#34f07e',
        '#44f470', '#56f665', '#6bf75c', '#81f558',
        '#98f357', '#aff05b'
      ]
      return this.chartData.reduce((summary, item) => {
        if (item._type == 'incoming') { return summary }
        if (!(item.from in summary)) {
          summary[item.from] = _colours[Object.keys(summary).length]
        }
        return summary
      }, {})
    }
  },
  mounted: function () {
    ChartJS.register(SankeyController, Flow);
    var ctx = this.$refs.chart.getContext("2d");

    const getColor = (name) => {
      return this.colours[name] || "#155366";
    }

    new ChartJS(ctx, {
      type: "sankey",
      data: {
        datasets: [
          {
            data: this.chartData,
            borderWidth: 2,
            borderColor: "black",
            colorFrom: (c) => getColor(c.dataset.data[c.dataIndex].from),
            colorTo: (c) => getColor(c.dataset.data[c.dataIndex].to),
          },
        ],
      },
      options: {
          maintainAspectRatio: false,
      }
    });
  },
};
</script>

<style scoped>
canvas {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.sankey {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 400px;
}
</style>
