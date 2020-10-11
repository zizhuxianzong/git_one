<template>
  <div class="home" v-if="category">
    <nav-bar :userDetail="model" pagecome="home"></nav-bar>

    <van-tabs v-model="active" swipeable>
      <van-icon name="edit" class="editicon"  @click="$router.push('/tabitemEdit')" />
      <van-tab
        v-for="(item, index) in category"
        :title="item.title"
        :key="index"
      >
        <van-list
          v-model="item.loading"
          :immediate-check="false"
          @load="onLoad"
          :finished="item.finished"
          finished-text="已经到底了"
        >
          <div class="detailParent">
            <article-detail
              :objDetail="categoryitem"
              v-for="(categoryitem, categoryitemIndex) in item.list"
              :key="categoryitemIndex"
              class="detailItem"
            ></article-detail>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import navBar from "@/components/common/navBar";
import articleDetail from "@/components/common/articleDetail";
export default {
  components: {
    navBar,
    articleDetail,
  },
  data() {
    return {
      model: {},
      category: [],
      active: 0,
    };
  },
  methods: {
    async getinfousers() {
      let id = localStorage.getItem("id");
      if (id) {
        let res = await this.$axios.get("/user/" + id);
        this.model = res.data[0];
      }
    },
    async gettabData() {
      //获取导航条菜单数据
      if (localStorage.getItem("newCat")) {
      let data = JSON.parse(localStorage.getItem("newCat"));
        this.categoryChange(data);           
      }else{
      let res = await this.$axios.get("/category");
       this.categoryChange(res.data); 
      }
      this.selectArtical();
    },
    categoryChange(data) {
      //切换tab栏后后去对应谈的数据
      const newCategory = data.map((item) => {
        item.list = [];
        item.pagesize = 10;
        item.page = 0;
        item.loading = true;
        item.finished = false;
        return item;
      });
      this.category = newCategory;
    },
    categoryItem() {
      const categoryselect = this.category[this.active];
      return categoryselect;
    },
    async selectArtical() {
      //获取每一个tab栏目下需要展示的详细信息
      let categoryobj = this.categoryItem();
      let res = await this.$axios.get("/detail/" + categoryobj._id, {
        params: {
          page: categoryobj.page,
          pagesize: categoryobj.pagesize,
        },
      });
      categoryobj.list.push(...res.data);
      categoryobj.loading = false;
      if (res.data.length < categoryobj.pagesize) {
        categoryobj.finished = true;
      }
    },
    onLoad() {
      console.log("加载");
      const categoryitem = this.categoryItem();
      setTimeout(() => {
        categoryitem.page += 1;
        this.selectArtical();
      }, 1000);
    },
  },
  watch: {
    active() {
      this.selectArtical();
    },
  },
  activated(){
    this.gettabData();
  },
  created() {
    this.getinfousers(); 
  },
};
</script>

<style lang="less">
.home {
  background-color: white;
  position: relative;
  .editicon {
    position: absolute;
    right: 0px;
    top: 12px;
    z-index: 22;
    width: 50px;
    height: 20px;
    text-align: center;
    background: #fff;
  }
}
.detailParent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailItem {
    margin: 1.389vw 0;
    width: 45%;
  }
}
</style>
