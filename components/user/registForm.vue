<template>
    <div>
    <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="4rem">
        <el-form-item prop="id" label="账号：">
            <el-input           
            v-model="form.id">
            </el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱：">
            <el-input           
            v-model="form.email">
            </el-input>
        </el-form-item>
        <el-form-item prop="name" label="昵称：">
            <el-input           
            v-model="form.name">
            </el-input>
        </el-form-item>
        <el-form-item prop="password"  label="密码：">
            <el-input
            v-model="form.password"
            type="password">
            </el-input>
        </el-form-item>
        <el-form-item prop="passwAgain"  label="确认：">
            <el-input
            v-model="form.passwAgain"
            type="password">
            </el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" style="width:100%;" @click="handleRegister">    注册    </el-button>
        </el-form-item>
    </el-form>
<el-dialog
  title="注册"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>注册成功</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
  title="注册"
  :visible.sync="dialogVisible1"
  width="30%"
  :before-close="handleClose">
  <span>注册失败</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>
<style lang="stylus" scoped>
.avtar-wrapper 
  height 6rem
.el-form
    .el-form-item
        margin-top 1.5rem
        margin-bottom 0.5rem
</style>
<script>
function valId(rule, value,callback){
    if(value===''||value===undefined||value===null){
        callback();
    }else{
        const reg = /^[a-zA-Z0-9]{6,18}$/ 
        if ((!reg.test(value)) && value !== '') {
            callback(new Error('账号只包含字母和数字'));
        } else {
            callback();
        }
    }
}
let password,passwAgain
function valPassword(rule, value,callback){
    if(value===''||value===undefined||value===null){
        callback();
    }else{
        const reg = /^[a-zA-Z0-9]{6,18}$/ 
        password=value
        if ((!reg.test(value)) && value !== '') {
            callback(new Error('密码只包含字母和数字'));
        } else {
            callback();
        }
    }
}
function valPasswAgain(rule, value,callback){
    if(value===''||value===undefined||value===null){
        callback();
    }else{
        const reg = /^[a-zA-Z0-9]{6,18}$/ 
        passwAgain=value
        if ((!reg.test(value)) && value !== '') {
            callback(new Error('确认密码只包含字母和数字'));
        } else if(passwAgain !== password){
            callback(new Error('两次密码不相同'));
        }else {
            callback();
        }
    }
}

export default {
    data(){
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            form:{
                id:"",
                password:"",
                passwAgain:"",
                name:"",
                email:""
            },
            dialogVisible:false,
            dialogVisible1:false,
            rules:{
                id:[
                    {required:true,message:"请输入账号/手机号",trigger:"blur"},
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' },
                    { validator:valId, trigger: 'blur' },
                ],
                password:[{required:true,message:"请输入密码",trigger:"blur"},
                    { validator:valPassword, trigger: 'blur' },
                    ],
                passwAgain:[{required:true,message:"请输入确认密码",trigger:"blur"},
                    { validator:valPasswAgain, trigger: 'blur' },
                    ],
                name:[{required:true,message:"请输入昵称",trigger:"blur"}],
                email:[{required:true,message:"请输入昵称",trigger:"blur"}]
            }
        }
    },
    methods:{
         handleRegister() {// eslint-disable-next-line
            console.log('submit!');
            this.$refs.form.validate(valid=>{
                if(valid){
                // 调用注册接口
                this.$axios({
                    url:'/usermodel/user/save',
                    method:'post',
                    data: this.form
                }).then(res=>{
                    // eslint-disable-next-line
                    const code = res.data.code
                    const msg = res.data.msg
                    if(code === 200){
                        this.$message.success("注册成功")
                        this.$router.push('/welcome')
                    }
                    if(code === 500){
                        this.$message.warning(msg)
                    }
                })
                }
            })
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }
    }
}
</script>
