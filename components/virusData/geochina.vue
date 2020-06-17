<template>
    <div id="geochina">
    </div>
</template>
<style scoped>
#geochina{
    width:600px;
    height:450px;
    border:1px solid #ddd;
}
</style>
<script>
import { mapState } from 'vuex'
import 'echarts/map/js/china'
export default {
  
  data(){
      return{
        nowList:[],
        sumList:[],
        deathList:[],
        treatList:[]
      }
  },
  computed:{
      ...mapState('welcome',['geochina']),
  },
  mounted () {
        // this.getNowList()
        // this.getSumList()
        // this.getDeathList()
        // this.getTreatList()
        this.geochinaInit()
  },
  methods:{
    //   getNowList(){
    //       const nowList = []
    //       this.cn_list.forEach(element => {
    //           const name = element.name
    //           const value = element.now
    //           const object = {name,value}
    //           nowList.push(object)
    //       })
    //       this.nowList = nowList
    //   },
    //   getSumList(){
    //       const sumList = []
    //       this.cn_list.forEach(element => {
    //           const name = element.name
    //           const value = element.sum
    //           const object = {name,value}
    //           sumList.push(object)
    //       })
    //       this.sumList = sumList
    //   },
    //   getDeathList(){
    //       const deathList = []
    //       this.cn_list.forEach(element => {
    //           const name = element.name
    //           const value = element.death
    //           const object = {name,value}
    //           deathList.push(object)
    //       })
    //       this.deathList = deathList
    //   },
    //   getTreatList(){
    //       const treatList = []
    //       this.cn_list.forEach(element => {
    //           const name = element.name
    //           const value = element.treat
    //           const object = {name,value}
    //           treatList.push(object)
    //       })
    //       this.treatList = treatList
    //   },
      geochinaInit(){
        const myChart = this.$echarts.init(document.getElementById('geochina'));
        const option = {
            title : {
                text: '中国疫情数据',
                left: 'center'
            },
            tooltip: {
                    // 数据格式化
                    formatter(params,ticket, callback){// eslint-disable-next-line
                        return params.seriesName+'<br />'+params.name+'：'+params.value
                    }
            },
            toolbox: {
                show: true,
                orient : 'vertical',
                left: 'right',
                top: 'center',
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data:['现有确诊','累计确诊', '累计死亡','累计治愈']
            },

            visualMap: {
				type: 'piecewise',
                pieces: [ // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
                {min: 1801,label: '1801-75000'}, // 不指定 max，表示 max 为无限大（Infinity）。
                {min: 1201, max: 1800,label: '1201-1800'},
                {min: 101, max: 1200,label: '101-1200'},
                {min: 6, max: 100,label: '6-100'},
                {min: 0, max: 5,label: '0-5' },
                ],
                left: 'left',
                top: 'bottom',
                textStyle: {
                    color: '#333'
                },
                inRange: {
                    color: [ '#A3E00B', '#E09107','#E0022B'],//  取值范围的颜色
               		
				},
                show:true// 图注
            },
            series : [
                {
                    name: '现有确诊',
                    type: 'map',
                    mapType: 'china',
                    geoIndex: 0,
                    data:this.geochina.nowList
                },
                {
                    name: '累计确诊',
                    type: 'map',
                    mapType: 'china',
                    geoIndex: 0,
                    data:this.geochina.sumList
                },{
                    name: '累计死亡',
                    type: 'map',
                    mapType: 'china',
                    geoIndex: 0,
                    data:this.geochina.deathList
                },{
                    name: '累计治愈',
                    type: 'map',
                    mapType: 'china',
                    geoIndex: 0,
                    data:this.geochina.treatList
                }
            ]
        };
        myChart.setOption(option);
      }
  }
}
</script>