<template>
 <div id="echarts">
   <div id="myChart"></div>
   <div id="myChart2"></div>
 </div>
</template>
<script type="text/javascript">
export default {
  name: 'Echarts',
  data () {
    return {}
  },
  mounted () {
    this.echartsInit()
    this.echartsInit2()
  },
  methods: {
    echartsInit () {
      // 找到容器
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 开始渲染
      myChart.setOption({
        title: {text: '在Vue中使用echarts'},
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '文章数量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    },
    echartsInit2 () {
      // 找到容器
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 开始渲染
      myChart.setOption({
        title: {text: '评论数'},
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '文章数量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    },
    }
}
</script>
<style scoped>
  #echarts{
      height: 300px;
  }
  #myChart{
    width: 600px;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
    float: left;
  }
  #myChart2{
    width: 600px;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
    float: right;
  }
</style>