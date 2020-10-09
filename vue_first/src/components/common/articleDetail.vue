<template>
  <div class="articale" @click="articleClick">
    <div class="one">
      <img :src="objDetail.img" class="oneimg" />
      <div class="bottom">
        <div class="icon-play2">
          <van-icon name="play-circle-o" />
          <span class="video">1233</span>
        </div>
        <div class="icon-file-text">
          <van-icon name="comment-o" />
          <span class="comment">{{ !objDetail.commentlen ? 22 : objDetail.commentlen}}</span>
        </div>
      </div>
    </div>
     <div><p>{{objDetail.name}}</p></div>
  </div>
</template>
<script>
export default {
  props: ["objDetail"],
  methods:{
      articleClick(){
          if(this.$route.fullPath != `/acticleEvery/${this.objDetail.id}` ){
              //跳转到的不是当前路径的时候在进行跳转
              this.$router.push(`/acticleEvery/${this.objDetail.id}`)
          }
    }
  }
};
</script>
<style lang="less">
.articale {
  width: 100%;
  p {
    font-size: 3.333vw;
    padding: 0.833vw 0;
  }
  .one {
    position: relative;
    width: 100%;
    .oneimg {
      width: 100%;
      min-height: 29.167vw;
    }
    .bottom {
      padding: 0 2.778vw;
      margin-bottom: 1.389vw;
      position: absolute;
      bottom: 0.556vw;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
      justify-content: space-between;
      color: white;
      display: flex;
      left: 0;
      right: 0;
      .video{
          vertical-align: top;
          font-size: 3.889vw;
      }
      .comment{
          vertical-align: top;
          font-size: 3.889vw;
      }
    }
  }
}
</style>
