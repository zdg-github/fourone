<template>
    <div id="geoworld">
    </div>
</template>
<style scoped>
#geoworld{
    width:600px;
    height:450px;
    border:1px solid #ddd;
}
</style>
<script>
import { mapState } from 'vuex'
import { nameMap } from '@/utils/nameMap'
import 'echarts/map/js/world'

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
      ...mapState('welcome',['geoworld']),
  },
  mounted () {
        this.geoworldInit()
  },
  methods:{
    //   getNowList(){
    //       const nowList = []
    //       this.world_list.forEach(element => {
    //           const name = element.name
    //           const value = element.now
    //           const object = {name,value}
    //           nowList.push(object)
    //       })
    //       this.nowList = nowList
    //   },
    //   getSumList(){
    //       const sumList = []
    //       this.world_list.forEach(element => {
    //           const name = element.name
    //           const value = element.sum
    //           const object = {name,value}
    //           sumList.push(object)
    //       })
    //       this.sumList = sumList
    //   },
    //   getDeathList(){
    //       const deathList = []
    //       this.world_list.forEach(element => {
    //           const name = element.name
    //           const value = element.death
    //           const object = {name,value}
    //           deathList.push(object)
    //       })
    //       this.deathList = deathList
    //   },
    //   getTreatList(){
    //       const treatList = []
    //       this.world_list.forEach(element => {
    //           const name = element.name
    //           const value = element.treat
    //           const object = {name,value}
    //           treatList.push(object)
    //       })
    //       this.treatList = treatList
    //   },
      geoworldInit(){
        const myChart = this.$echarts.init(document.getElementById('geoworld'));
        const option = {
            title : {
                text: '世界疫情数据',
                left: 'center'
            },
            tooltip: {
                    // 数据格式化
                    formatter(params,ticket, callback){// eslint-disable-next-line
                        return params.seriesName+'<br />'+params.name+'：'+params.value
                    }
            },
            nameMap,
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
                {min: 60000, label: '>=60000'},// 不指定 max，表示 max 为无限大（Infinity）。
                {min: 1801, max: 59999,label: '1801-59999'}, 
                {min: 1501, max: 1800,label: '1501-1800'},
                {min: 501, max: 1500,label: '501-1500'},
                {min: 101, max: 500,label: '101-500'},
                {min: 0, max: 100,label: '0-100' },
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
                    mapType: 'world',
                    geoIndex: 0,
                    data:this.geoworld.nowList
                },
                {
                    name: '累计确诊',
                    type: 'map',
                    mapType: 'world',
                    geoIndex: 0,
                    data:this.geoworld.sumList
                },{
                    name: '累计死亡',
                    type: 'map',
                    mapType: 'world',
                    geoIndex: 0,
                    data:this.geoworld.deathList
                },{
                    name: '累计治愈',
                    type: 'map',
                    mapType: 'world',
                    geoIndex: 0,
                    data:this.geoworld.treatList
                }
            ]
        };
        myChart.setOption(option);
      }
  }
}
</script>