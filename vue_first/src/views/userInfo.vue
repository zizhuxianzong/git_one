<template>
  <div class="userInfo">
    <nav-bar></nav-bar>
    <img src="@/assets/bannerTop_new.png" alt="" class="backcard">
    <user-one></user-one>
    
  </div>
</template>

<script>
import navBar from  '@/components/common/navBar.vue'
import userOne from  '@/components/common/userOne.vue'
export default {
  components: {
      navBar,
      userOne
  },
  methods:{
    async getUserInfo(){
        let id = localStorage.getItem('id');       
        const res = await this.$axios.get('/user/'+id);
        console.log(res);
     }
  },
  created(){
    this.getUserInfo();
  }
}
</script>

<style lang='less'>
.userInfo{
    .backcard{
        width: 100%;
        height: 23.889vw;
    }
}
</style>
