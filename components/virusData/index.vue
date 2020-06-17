<template>
    <div>
    <el-row type="flex" direction="horizontal">
        <el-col :span="8">
            <el-card style="height:490px; padding-top:10px" shadow="always">
                <h2 align="center"  style="margin-bottom:1.5rem" >
                    全国疫情(含港澳台)
                </h2>          
                <chinaVirusData/>
            </el-card>
        </el-col>
        <el-col :span="16">
            <el-card shadow="always">
                <geochina/>
            </el-card>
        </el-col>
    </el-row>
    <div style="margin-top:2rem"></div>
    <el-row type="flex" direction="horizontal">
        <el-col :span="8">
            <el-card style="height:490px; padding-top:10px" shadow="always">
                <h2 align="center"  style="margin-bottom:1.5rem" >
                    世界疫情(含中国)
                </h2>
                <globalVirusData/>
            </el-card>
        </el-col>
        <el-col :span="16">
            <el-card shadow="always">
                <geoworld/>
            </el-card>
        </el-col>
    </el-row>
    </div>
</template>
<script>

    // <echart/>
// import {mapActions} from 'vuex'

import geochina from '@/components/virusData/geochina.vue'
import geoworld from '@/components/virusData/geoworld.vue'
import chinaVirusData from '@/components/virusData/chinaVirusData.vue'
import globalVirusData from '@/components/virusData/globalVirusData.vue'

export default {
    components:{
        geochina,
        geoworld,
        chinaVirusData,
        globalVirusData
    },
    data(){
        return {
            currentTab:0
        }
    },
    methods:{
        handleChangeTab(index){
            this.currentTab=index
        },
    }
}
</script>
<style lang="stylus" scoped>


.cover-tab
    float left;
    cursor pointer
    width 50%;
    height 2.25rem;
    font 1rem/2rem -apple-system-font,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial;
    font-weight 600
    color #333;
    text-align center;
    background #f1f1f1;
    border-top 4px solid #f1f1f1
    box-sizing border-box
    margin-bottom 0.5rem
    &.active
      background-color #ffffff
      border-top 4px solid #ffdd44
.cover_tabs
    overflow hidden;
    border-top-left-radius 16px;
    border-top-right-radius 16px;
</style>