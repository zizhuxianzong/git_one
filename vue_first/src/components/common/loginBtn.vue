<template>
  <div class="parentBtn">
     <div class="loginBtn" @click="registerClick">{{btnlabel}}</div>
  </div>
</template>

<script>
export default {
  props:['btnlabel'],
  methods:{
      registerClick(){       
          this.$emit('registerSubmit')
      }
  }
}
</script>

<style lang='less'>
.parentBtn{
    padding:4.167vw 2.778vw;
    .loginBtn {
      height: 45px;
      background-color: #ff9db5;
      border-radius: 6.25vw;
      display: flex; 
      align-items: center; 
      justify-content: center;
      font-size: 4.444vw;
      color: white;
    }
}
</style>
