<template>
  <div class="home">
    <nav-bar :userDetail="model"></nav-bar>
    <van-tabs v-model="active" @change="selectArtical" swipeable="true">
  <van-tab v-for="(item) in category" :title="item.title" :key="item._id" >
     <article-detail :objDetail="categoryitem"  v-for=" categoryitem in item.list" :key="categoryitem.id"></article-detail>
  </van-tab>
    
</van-tabs>
  </div>
</template>

<script>
import navBar from '@/components/common/navBar'
import articleDetail from '@/components/common/articleDetail'
export default {
     components:{
       navBar,
       articleDetail,
     },
     data(){
       return {
          model:{},
          category: [],
          active:0,
         
       }
     },
     methods:{
      async getinfousers(){
         let id = localStorage.getItem('id');       
         let res = await this.$axios.get('/user/'+id);
         this.model = res.data[0]; 
      },
       async gettabData(){
         //获取导航条菜单数据   
         let res = await this.$axios.get('/category');
         this.categoryChange(res.data)
         
      },
      categoryChange(data){
         //切换tab栏后后去对应谈的数据
         const newCategory = data.map((item)=>{
             item.list=[];
             item.pagesize =10;
             item.page=0;
             return item;
         })   
          this.category = newCategory; 
      }, 
      async selectArtical(){
        //获取每一个tab栏目下需要展示的详细信息
        const categoryItem=this.category[this.active];
       
        let res = await this.$axios.get('/detail/'+categoryItem._id,{
          params:{
            page:categoryItem.page,
            pagesize:categoryItem.pagesize
          }
        });
         categoryItem.list = res.data;
      }
     },
    watch:{
        // active(){
        //   this.selectArtical();         
        // }
     },
     created(){
       this.getinfousers();
       this.gettabData();
     }  
}
</script>

<style lang='less'>
</style>
