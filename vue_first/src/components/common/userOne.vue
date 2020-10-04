<template>
  <div class="person-info">
        <div class="left">
            <img :src="userDetail.user_img" v-if='userDetail.user_img' alt="" class="backcard">
            <img src="@/assets/head_img.jpg" v-else alt="" class="backcard">

        </div>
        <div class="right">
          <div class="top">
            <p>
              <span>10</span>
              <span>粉丝</span>
            </p>
             <p>
              <span>33</span>
              <span>关注</span>
            </p>
             <p>
              <span>900</span>
              <span>获赞</span>
            </p>
          </div>
          <div class="foot" @click="$router.push('/edit')">
            <div>编辑资料</div>
          </div>
        </div>
   
  </div>
</template>

<script>
export default {
  props:['userDetail']

}
</script>

<style scoped lang='less'>
.person-info{
  padding: 0 2.778vw;
  height: 23.611vw;
  width: 100%;
  background: #fff;
   display: flex;
   box-sizing: border-box;
  .left{
    width: 85px;
    display: flex;
    img{
      width: 23.611vw;
      height: 23.611vw;
      border-radius: 11.806vw;
    }
  }
  .right{
    flex: 1;
    display: flex;
    flex-direction:column;
    .top{
      display: flex;       
      margin-left: 5.556vw;
      height: 15.278vw;
      p{
        flex: 1;
        display: flex;
        flex-direction:column;
         justify-content: center;
         align-items: center;
      }
    }
    .foot{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
     >div{   
      width: 80%;
      border: 1px solid #FB7299;
      color:#FB7299;
      background: #fff;
      text-align: center;
    }
    }
  }
}
</style>
