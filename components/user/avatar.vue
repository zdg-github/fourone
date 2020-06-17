<template>
      <div class="demo-basic-circle">
        <div class="block center-avatar">
          <el-row type="flex" justify="center" align="middle">
            <el-avatar :size="size" :src="circleUrl"> </el-avatar>
          </el-row>
        </div>
      </div>
</template>
<script>
export default {
    props:{
        circleUrl:{
            type:String,
            default:()=> {return "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"}
        },
        size:{
            type:Number,
            default:()=> {return 50}
        }
    }
}
</script>
