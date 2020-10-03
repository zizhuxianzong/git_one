<template>
  <div class="navBar">
  <div class="barleft">
      <img src="../../assets/logo.png" alt="">
  </div>
  <div class="barmiddle">
       <van-icon name="search" class="search-bar" />
      输入内容    
  </div>
  <div class="barright">
  <img src="../../assets/default_img.jpg" alt="">
  <div>下载APP</div>
  </div>
  </div>
</template>

<script>
export default {
 
}
</script>

<style lang='less'>
.navBar{
    background-color: #fff;
    height:12.5vw;
    display: flex;
    line-height: 12.5vw;
    justify-content: center;
    align-items: center;
    .barleft{
        width: 30.556vw;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 1.389vw 0;
        img{
            width: 80%;
        }
    }
     .barmiddle{
        flex: 1;
        height: 6.667vw;
        line-height: 6.667vw;
        border-radius: 3.333vw;
        background: #e2e2e2;
        display: flex;
        align-items: center;
        font-size: 3.333vw;
        color: #999;
        .search-bar{
           padding:0 2.778vw;
        }
    }
     .barright{
        width: 36.111vw;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 6.667vw;
            height: 6.667vw;

        }
        div{
            font-size: 3.333vw;
            background: #fb7299;
            height: 6.667vw;           
            color: #fff;
            line-height: 6.667vw;
            padding: 0 4.167vw;
            margin-left: 2.778vw;
            border-radius: 0.556vw;
        }
    }
}
</style>
