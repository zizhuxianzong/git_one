<template>
  <div>
  <login-top middleText="注册Bilibli">
     <div slot="top-right" @click="$router.push({ path: 'login'})" style="font-size:3.611vw">跳转到登录</div>
  </login-top>
  <login-text label="姓名" style="margin:4.167vw 0" placeholder="请输入姓名" rule="^.{6,16}$" @inputChange="res=>name=res"></login-text>
  <login-text label="账号" placeholder="请输入账号" rule="^.{6,16}$" @inputChange="res=>userName=res"></login-text>
  <login-text label="密码" placeholder="请输入密码" rule="^.{6,16}$" type="password" @inputChange="res=>passWord=res"></login-text>
  <login-btn btnlabel="注册" @registerSubmit="registerSubmit"></login-btn>

  </div>
</template>

<script>
import loginTop from '@/components/common/loginTop.vue'
import loginText from '@/components/common/loginText.vue'
import loginBtn from '@/components/common/loginBtn.vue'
export default {
  data(){
    return{
        name:"",
        userName:"",
        passWord:""
    }
  },
  methods:{
    succChange(content){
     console.log(content);
    },
    registerSubmit(){
      if(this.name && this.userName && this.passWord){
         this.$axios.bli.register({
           name:this.name,
           username:this.userName,
           password:this.passWord,
         }).then(res=>{
          this.$msg.fail(res.data.msg);
          //注册成功以后需要跳转到个人信息页面
          localStorage.setItem("id",res.data.id);
          localStorage.setItem("token",res.data.objtoken);
          setTimeout(()=>{
            this.$router.push('/userInfo');
          },1000)
         }).catch(err=>{
          this.$msg.fail(err);
         })
      }else{
          this.$msg.fail('格式不正确,请重新输入');
      }
     
    }
  },
  components: {
   loginTop,
   loginText,
   loginBtn
  }
}
</script>

<style lang='less'>
body {
    padding:0;
    margin:0;
    box-sizing: border-box;
    background-color: #f4f4f4;
}
</style>

