<template>
  <div v-if="model">
    <nav-bar :userDetail="article"></nav-bar>
    <div class="detailinfo">
      <div class="video">
        <video controls="controls" :src="model.content"></video>
      </div>
      <div class="detailinfoText">
        <div>
          <span>{{ model.category.title }}</span>
          <span>{{ model.name }}</span>
        </div>
        <div>
          <span>{{ model.userinfo.name }}</span>
          <span>146.4万次观看</span>
          <span>5281弹幕</span>
          <span>{{ model.date }}</span>
        </div>
        <div>
          <p
            @click="collectionClick"
            :class="{ activeColor: collectionActive }"
          >
            <span class="icon-star-full"></span>
            <span>收藏</span>
          </p>
          <p
            @click="subscriptClick"
            :class="{ activeColor: subscritionActive }"
          >
            <span class="icon-bubble"></span>
            <span>关注</span>
          </p>
          <p>
            <span class="icon-redo2"></span>
            <span>分享</span>
          </p>
        </div>
      </div>
      <div class="detailparent">
        <article-detail
          class="detailitem"
          v-for="(item, index) in commendList"
          :key="index"
          :objDetail="item"
        />
      </div>
      <commend-title
       :dataLength="lens"
       ref="commendzujian"
       @Postcomment="PostSuccess"
       />      
      <commend @lengthselect="len => lens = len" @publishClick="publishMsg" ref="commendpublish" /> 
    </div>
  </div>
</template>

<script>
import navBar from "./navBar";
import articleDetail from "./articleDetail";
import commend from "../article/commend";
import commendTitle from "../article/commendTitle";
export default {
  components: {
    navBar,
    articleDetail,
    commend,
    commendTitle
  },
  data() {
    return {
      model: "",
      article: "",
      commendList:[],
      subscritionActive:false,
      collectionActive:false,
      lens:null,
      postComment:{
        comment_content:'',
        comment_date:'',
        parent_id:null,
        article_id:null
      }
    };
  },
  methods: {
    //获取用户信息
    async getinfousers() {
      let id = localStorage.getItem("id");
      if(id){
         let res = await this.$axios.get("/user/" + id);
         this.article = res.data[0];
      }
    },
    //获取视频的信息
    async getArticleData() {
      let res = await this.$axios.get("/article/" + this.$route.params.id);
      this.model = res.data[0];
      if(this.model){
        this.subscriptCheck();
      }
    },
    //获取推荐文章
    async commendData() {
      const res = await this.$axios.get("/commend");
      this.commendList = res.data;
    },
    //从子组件的子组件接受的参数
    publishMsg(id){
     console.log(id);
     this.postComment.parent_id = id;
     this.$refs.commendzujian.focusIpt();
    },
    //点击收藏
    async collectionClick(){
      if(localStorage.getItem('token')){
        //如果是登录用户就可以收藏
        let res = await this.$axios.post('/collection/'+localStorage.getItem('id'),{article_id:this.$route.params.id});      
        if(res.data.msg =="收藏成功"){
           this.collectionActive = true;
        }else{
             this.collectionActive = false;
        }
         this.$msg.success(res.data.msg)
      }else{
       this.$msg.fail('请登录')
      }
    },
    //进入页面首先判断下是否收藏
    async collectionCheck(){
      if(localStorage.getItem('token')){
        //如果是登录用户就可以收藏
        let res = await this.$axios.get('/collection/'+localStorage.getItem('id'),{
          params:{
            article_id:this.$route.params.id
          }
        });      
           this.collectionActive = res.data.success;         
        
      }
    },
    //关注当前用户
    async subscriptClick(){
      if(localStorage.getItem('token')){
        //如果是登录用户就可以收藏
        let res = await this.$axios.post('/sub_scription/'+localStorage.getItem('id'),{sub_id:this.model.userinfo.id});      
        if(res.data.msg =="关注成功"){
           this.subscritionActive = true;
           this.$msg.success('已关注')
        }else{
             this.subscritionActive = false;
             this.$msg.success('已取消关注')
        }
      }else{
       this.$msg.fail('请登录')
      }
    }, 
     //进入页面首先判断下是否关注
    async subscriptCheck(){
      if(localStorage.getItem('token')){
        //如果是登录用户就可以收藏
        let res = await this.$axios.get('/sub_scription/'+localStorage.getItem('id'),{
          params:{
            sub_id:this.model.userinfo.id
          }
        });      
           this.subscritionActive = res.data.success;         
        
      }
    },
    async PostSuccess(data){
     this.postComment.comment_content = data;
     var all = new Date();
     let m = all.getMonth()+1;
     let d = all.getDate();
     if(m<10){
       m="0"+m;
       }
     if(d<10){
         d="0"+d;
       }
     let str = m+'-'+d;
     this.postComment.comment_date = str; 
     this.postComment.article_id = this.$route.params.id;   
     const res = await this.$axios.post('/comment_post/' + localStorage.getItem('id'),this.postComment);
     if(res.status == 200) {
          this.$msg.success('评论发表成功')
          this.$refs.commendpublish.commentData();
          this.parent_id=null;
         }
    },
  },
  watch:{
      $route(){
         this.getArticleData();
         this.commendData();
         this.collectionCheck();
         
      }
  },
  created() {
    this.getinfousers();
    this.getArticleData();
    this.commendData();
    this.collectionCheck();  
  },
};
</script>
<style lang="less">
.detailinfo {
  background-color: white;
  .video {
    width: 100%;
    video {
      width: 100%;
    }
  }
}
.detailinfoText {
  padding: 4.167vw;
  div:nth-child(1) {
    span:nth-child(1) {
      padding: 0 2.778vw;
      color: #fb7299;
      background-color: #f4f4f4;
      border-radius: 2.778vw;
    }
  }
  div:nth-child(2) {
    padding: 2.778vw 2.778vw;
    span {
      color: #aaa;
      font-size: 3.333vw;
      margin-right: 2.778vw;
    }
    span:nth-child(1) {
      color: black;
      font-size: 4vw;
      padding-right: 2.778vw;
    }
  }
  div:nth-child(3) {
    padding: 0 2.778vw;
    display: flex;

    p {
      margin-right: 10px;
      display: flex;
      align-items: center;
      color: #757575;
      span:nth-child(1) {
        margin-right: 3px;
        font-size: 21px;
      }
      span:nth-child(2) {
        font-size: 13px;
      }
    }
    .activeColor {
      color: #fb7299;
    }
  }
}

.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem {
    margin: 1.389vw 0;
    width: 45%;
  }
}
</style>
