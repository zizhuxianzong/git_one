<template>
  <div class="userInfo">
    <nav-bar :userDetail="infoDetail" pagecome="userinfo"></nav-bar>
    <img src="@/assets/bannerTop_new.png" alt="" class="backcard">
    <user-one :userDetail="infoDetail"></user-one>
    
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
  data(){
    return {
      infoDetail:{}
    }
  },
  methods:{
    async getUserInfo(){
        let id = localStorage.getItem('id');       
        const res = await this.$axios.get('/user/'+id);
        this.infoDetail =res.data[0];
        
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
