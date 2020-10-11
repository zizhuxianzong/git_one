<template>
  <div class="edit" v-if="userInfos">
  <div style="margin-bottom:10px;"> 
      <nav-bar :userDetail="userInfos" pagecome="edit"></nav-bar>
      </div>
  <div class="img-upload">
     <van-uploader :after-read="afterRead" class="uploadimg" preview-size="100vw" />
     <edit-banner left="头像">
       <img :src="userInfos.user_img" slot="right" v-if="userInfos.user_img" />
       <img src="@/assets/default_img.jpg" slot="right" v-else />
   </edit-banner>
  </div>
   <edit-banner left="昵称" @bannerClick="show = true">
       <a href="javascript:;" slot="right">{{userInfos.name}}</a>
   </edit-banner>
   <edit-banner left="账号">
        <a href="javascript:;" slot="right">{{userInfos.username}}</a>
   </edit-banner>
   <edit-banner left="性别" @bannerClick="gennershow = true">
    <a href="javascript:;" slot="right">{{userInfos.gender === '0' ? '女' : '男' }}</a>
   </edit-banner>
   <!-- <edit-banner left="出生日期"></edit-banner> -->
   <edit-banner left="个性签名"  @bannerClick="areaShow = true">
        <a href="javascript:;" slot="right">{{userInfos.user_desc}}</a>
   </edit-banner>
   <div class="back" @click="$router.back()">返回</div>
   <van-dialog v-model="show" title="昵称" show-cancel-button
   @confirm="handlename"
   @cancel="content=''">
    <van-cell-group>
    <van-field v-model="content" placeholder="请输入昵称" autofocus="true" />
</van-cell-group>
   </van-dialog>
   
   <van-dialog v-model="areaShow" title="个性签名" show-cancel-button
   @confirm="handledesc"
   @cancel="content=''">
    <van-cell-group>
    <van-field v-model="content" type="textarea" placeholder="请输入签名" autofocus="true" />
</van-cell-group>
   </van-dialog>
  
   <van-action-sheet v-model="gennershow" cancel-text="取消" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import navBar from '@/components/common/navBar.vue'
import editBanner from '@/components/common/editBanner.vue'
export default {
  components:{
      navBar,
      editBanner
  },
  data(){
      return {
          userInfos:{},
          show:false,
          content:'',
          areaShow:false,
          gennershow:false,
          actions: [
               { name: '男',value:1},
               { name: '女',value:0}], 
      }
  },
  methods:{
   async getEditinfo(){       
        let id = localStorage.getItem('id');       
        let res = await this.$axios.bli.user(id);
        this.userInfos = res.data[0];    
    },
    async afterRead(file){
        let formdata = new FormData();
        formdata.append('file',file.file);
        const res = await this.$axios.bli.upload(formdata);
        this.userInfos.user_img = res.data.url;
        this.updateInfo();
    },
    async updateInfo(){
      const res = await this.$axios.bli.update(localStorage.getItem('id'),this.userInfos);
     if(res.data.code ===200){
         this.$msg.fail("修改成功")
     }

    },
    handlename(){
        this.userInfos.name = this.content;
        this.updateInfo();
        this.content = '';
    },
    handledesc(){
        this.userInfos.user_desc = this.content;
        this.updateInfo();
        this.content = '';
    },
    onSelect(item){   
        console.log(item.value);    
      this.userInfos.gender = item.value;
      this.gennershow=false;
      this.updateInfo();
    },
  },
  created(){
    this.getEditinfo();  
  }
}
</script>

<style lang='less'>
.edit{
    .img-upload{
        position: relative;
        overflow: hidden;
        .uploadimg{
         position: absolute; 
         opacity: 0;  
        }
    }
    .back{
        margin-top: 15px;
        width: 100%;
        height:40px;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
