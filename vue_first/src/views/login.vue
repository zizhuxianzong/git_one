<template>
  <div>
    <login-top middleText="登录Bilibli">
      <div
        slot="top-right"
        @click="$router.push({ path: 'register' })"
        style="font-size:3.611vw"
      >
        跳转到注册
      </div>
    </login-top>
    <login-text
      label="账号"
      placeholder="请输入账号"
      rule="^.{6,16}$"
      @inputChange="(res) => (userName = res)"
      style="margin:4.167vw 0"
    ></login-text>
    <login-text
      label="密码"
      placeholder="请输入密码"
      rule="^.{6,16}$"
      type="password"
      @inputChange="(res) => (passWord = res)"
    ></login-text>
    <login-btn btnlabel="登录" @registerSubmit="registerSubmit"></login-btn>
  </div>
</template>

<script>
import loginTop from "@/components/common/loginTop.vue";
import loginText from "@/components/common/loginText.vue";
import loginBtn from "@/components/common/loginBtn.vue";
export default {
  data() {
    return {
      userName: "",
      passWord: "",
    };
  },
  methods: {
    registerSubmit() {
      if (this.userName && this.passWord) {
        // 调用api接口，并且提供了两个参数
        this.$axios.bli
          .login({
            username: this.userName,
            password: this.passWord,
          })
          .then((res) => {
            if (res.data.msg === "登录成功") {
              this.$msg.success(res.data.msg);
              //登录成功以后跳转到个人信息页面
              localStorage.setItem("id", res.data.id);
              localStorage.setItem("token", res.data.token);
              setTimeout(() => {
                this.$router.push("/userInfo");
              }, 1000);
            } else {
              this.$msg.fail(res.data.msg);
            }
          });
      } else {
        this.$msg.fail("格式不正确,请重新输入");
      }
    },
  },
  components: {
    loginTop,
    loginText,
    loginBtn,
  },
};
</script>

<style lang="less">
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background-color: #f4f4f4;
}
</style>
