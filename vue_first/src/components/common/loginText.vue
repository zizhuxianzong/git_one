<template>
 <van-field v-model="content" 
 :type="type"
 :placeholder="placeholder"
 :rule="rule"
 :label="label" />
</template>

<script>

export default {
 props:['label','type','placeholder','rule'],
 data(){
     return {
         content:''
     }
 },
 methods:{
    handlerule(){
        let rule = new RegExp(this.rule);  
          
         if(rule.test(this.content || 0)){
            this.$emit('inputChange',this.content)
         }else{
            this.$emit('inputChange',0)
           
         }
    }
 },
 watch:{
     content(){
        this.handlerule();
     }
 }
}
</script>

<style lang='less'>
</style>
