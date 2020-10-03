<template>
  <div>
   <div class="login_top">
     <div></div>
     <div>{{middleText}}</div>
     <div>
       <slot name="top-right"></slot>
     </div>
   </div>
  </div>
</template>

<script>
export default {
 props:['middleText']
}
</script>

<style lang='less'>
.login_top{
  height: 12.5vw;  
  background-color: #ffffff;
  display: flex;
  div{
     flex:1;
     justify-content: center;
     align-items: center;
     display: flex;
     font-size: 4.444vw;
  }
}
</style>


