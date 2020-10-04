<template>
  <div class="editBanner">
    <div class="editInfo" @click="bannerClick">
        <span>{{left}}</span>
        <span><slot name="right"  /></span>        
    </div>
  </div>
</template>

<script>

export default {
    props:['left'],
    methods: {
        bannerClick(){
           this.$emit('bannerClick')
        }
    },
}
</script>

<style lang='less'>
.editBanner{
  .editInfo{
      padding: 4.167vw;
      background: #fff;
      border-bottom: 0.278vw solid #eee;
      font-size: 3.889vw;
      color: #111;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
          width: 12.778vw;
          height: 12.778vw;
          border-radius: 6.389vw;
      }
  }
}
</style>
